# encoding: utf-8
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.utils.translation import ugettext as _
from django.conf import settings

from avatar.forms import PrimaryAvatarForm, DeleteAvatarForm, UploadAvatarForm,\
    GroupAvatarForm
from avatar.models import Avatar, GroupAvatar
from avatar.settings import AVATAR_MAX_AVATARS_PER_USER, AVATAR_DEFAULT_SIZE
from avatar.signals import avatar_updated
from avatar.util import get_primary_avatar, get_default_avatar_url, \
    invalidate_cache
from seahub.utils import render_error, render_permission_error

from auth.decorators import login_required
from seaserv import ccnet_threaded_rpc, check_group_staff

def _get_next(request):
    """
    The part that's the least straightforward about views in this module is how they 
    determine their redirects after they have finished computation.

    In short, they will try and determine the next place to go in the following order:

    1. If there is a variable named ``next`` in the *POST* parameters, the view will
    redirect to that variable's value.
    2. If there is a variable named ``next`` in the *GET* parameters, the view will
    redirect to that variable's value.
    3. If Django can determine the previous page from the HTTP headers, the view will
    redirect to that previous page.
    """
    next = request.POST.get('next', request.GET.get('next',
        request.META.get('HTTP_REFERER', None)))
    if not next:
        next = request.path
    return next

def _get_avatars(user):
    # Default set. Needs to be sliced, but that's it. Keep the natural order.
    avatars = Avatar.objects.filter(emailuser=user.email)
    
    # Current avatar
    primary_avatar = avatars.order_by('-primary')[:1]
    if primary_avatar:
        avatar = primary_avatar[0]
    else:
        avatar = None
    
    if AVATAR_MAX_AVATARS_PER_USER == 1:
        avatars = primary_avatar
    else:
        # Slice the default set now that we used the queryset for the primary avatar
        avatars = avatars[:AVATAR_MAX_AVATARS_PER_USER]
    return (avatar, avatars)

@login_required
def add(request, extra_context=None, next_override=None,
        upload_form=UploadAvatarForm, *args, **kwargs):
    if extra_context is None:
        extra_context = {}
    avatar, avatars = _get_avatars(request.user)
    upload_avatar_form = upload_form(request.POST or None,
        request.FILES or None, user=request.user)
    if request.method == "POST" and 'avatar' in request.FILES:
        if upload_avatar_form.is_valid():
            avatar = Avatar(
                emailuser = request.user.username,
                primary = True,
            )
            image_file = request.FILES['avatar']
            avatar.avatar.save(image_file.name, image_file)
            avatar.save()
#            request.user.message_set.create(
#                message=_("Successfully uploaded a new avatar."))
            avatar_updated.send(sender=Avatar, user=request.user, avatar=avatar)
            return HttpResponseRedirect(next_override or _get_next(request))
    return render_to_response(
            'avatar/add.html',
            extra_context,
            context_instance = RequestContext(
                request,
                { 'avatar': avatar, 
                  'avatars': avatars, 
                  'upload_avatar_form': upload_avatar_form,
                  'next': next_override or _get_next(request), }
            )
        )

@login_required
def group_add(request):
    group_id = request.GET.get('gid', '')
    try:
        group_id_int = int(group_id)
    except ValueError:
        return render_error(request, u'group id 不是有效参数')        

    if not check_group_staff(group_id_int, request.user):
        return render_permission_error(request, u'只有小组管理员有权设置小组图标')

    group = ccnet_threaded_rpc.get_group(group_id_int)
    if not group:
        return HttpResponseRedirect(reverse('group_list', args=[]))

    form = GroupAvatarForm(request.POST or None, request.FILES or None)

    if request.method == 'POST' and 'avatar' in request.FILES:
        if form.is_valid():
            image_file = request.FILES['avatar']
            avatar = GroupAvatar()
            avatar.group_id = group_id
            avatar.avatar.save(image_file.name, image_file)
            avatar.save()
 
    return render_to_response('avatar/set_avatar.html', {
            'group' : group,
            'form' : form,
            }, context_instance=RequestContext(request))

@login_required
def change(request, extra_context=None, next_override=None,
        upload_form=UploadAvatarForm, primary_form=PrimaryAvatarForm,
        *args, **kwargs):
    if extra_context is None:
        extra_context = {}
    avatar, avatars = _get_avatars(request.user)
    if avatar:
        kwargs = {'initial': {'choice': avatar.id}}
    else:
        kwargs = {}
    upload_avatar_form = upload_form(user=request.user, **kwargs)
    primary_avatar_form = primary_form(request.POST or None,
        user=request.user, avatars=avatars, **kwargs)
    if request.method == "POST":
        updated = False
        if 'choice' in request.POST and primary_avatar_form.is_valid():
            avatar = Avatar.objects.get(id=
                primary_avatar_form.cleaned_data['choice'])
            avatar.primary = True
            avatar.save()
            updated = True
#            request.user.message_set.create(
#                message=_("Successfully updated your avatar."))
        if updated:
            avatar_updated.send(sender=Avatar, user=request.user, avatar=avatar)
        return HttpResponseRedirect(next_override or _get_next(request))
    return render_to_response(
        'avatar/change.html',
        extra_context,
        context_instance = RequestContext(
            request,
            { 'avatar': avatar, 
              'avatars': avatars,
              'upload_avatar_form': upload_avatar_form,
              'primary_avatar_form': primary_avatar_form,
              'next': next_override or _get_next(request), }
        )
    )

@login_required
def delete(request, extra_context=None, next_override=None, *args, **kwargs):
    if extra_context is None:
        extra_context = {}
    avatar, avatars = _get_avatars(request.user)
    delete_avatar_form = DeleteAvatarForm(request.POST or None,
        user=request.user, avatars=avatars)
    if request.method == 'POST':
        if delete_avatar_form.is_valid():
            ids = delete_avatar_form.cleaned_data['choices']
            if unicode(avatar.id) in ids and avatars.count() > len(ids):
                # Find the next best avatar, and set it as the new primary
                for a in avatars:
                    if unicode(a.id) not in ids:
                        a.primary = True
                        a.save()
                        avatar_updated.send(sender=Avatar, user=request.user, avatar=avatar)
                        break

            # NOTE: `Avatar.objects.filter(id__in=ids).delete()` will NOT work
            # correctly. Sinct delete() on QuerySet will not call delete 
            # method on avatar object.
            for a in Avatar.objects.filter(id__in=ids):
                a.delete()
            
#            request.user.message_set.create(
#                message=_("Successfully deleted the requested avatars."))
            return HttpResponseRedirect(next_override or _get_next(request))
    return render_to_response(
        'avatar/confirm_delete.html',
        extra_context,
        context_instance = RequestContext(
            request,
            { 'avatar': avatar, 
              'avatars': avatars,
              'delete_avatar_form': delete_avatar_form,
              'next': next_override or _get_next(request), }
        )
    )
    
def render_primary(request, extra_context={}, user=None, size=AVATAR_DEFAULT_SIZE, *args, **kwargs):
    size = int(size)
    avatar = get_primary_avatar(user, size=size)
    if avatar:
        # FIXME: later, add an option to render the resized avatar dynamically
        # instead of redirecting to an already created static file. This could
        # be useful in certain situations, particulary if there is a CDN and
        # we want to minimize the storage usage on our static server, letting
        # the CDN store those files instead
        return HttpResponseRedirect(avatar.avatar_url(size))
    else:
        url = get_default_avatar_url()
        return HttpResponseRedirect(url)
    
