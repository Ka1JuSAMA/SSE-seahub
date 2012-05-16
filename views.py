# encoding: utf-8

from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render_to_response, redirect
from django.core.urlresolvers import reverse
from django.template import RequestContext
from auth.decorators import login_required
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_protect
from auth.forms import AuthenticationForm, PasswordResetForm, SetPasswordForm, \
    PasswordChangeForm
from auth.tokens import default_token_generator

from pysearpc import SearpcError
from seaserv import ccnet_rpc, get_groups, get_users, get_repos, \
    get_repo, get_commits, get_branches, \
    seafserv_threaded_rpc, seafserv_rpc, get_binding_peerids, get_ccnetuser, \
    get_group_repoids

from seahub.share.models import GroupShare, UserShare
from seahub.share.forms import GroupAddRepoForm
from seahub.base.accounts import CcnetUser
from forms import AddUserForm
from urllib import quote

from seahub.contacts.models import Contact

from utils import go_permission_error, go_error, list_to_string, get_httpserver_root, \
    get_ccnetapplet_root, gen_token

import stat
import settings
    
@login_required
def root(request):
    return HttpResponseRedirect(reverse(myhome))

def peers(request):
    peer_type = request.REQUEST.get('type', 'all')
    peer_ids = ccnet_rpc.list_peers()
    peers = []
    for peer_id in peer_ids.split("\n"):
        # too handle the ending '\n'
        if peer_id == '':
            continue
        peer = ccnet_rpc.get_peer(peer_id)
        if peer_type == 'all':
            peers.append(peer)
        if peer_type == 'mypeer':
            if peer.props.role_list.find('MyPeer') != -1:
                peers.append(peer)

    users = get_users()
    return render_to_response('peers.html', { 
            'peers': peers,
            'users': users,
            }, context_instance=RequestContext(request))

def validate_owner(request, repo_id):
    # check whether email in the request own the repo
    return seafserv_threaded_rpc.is_repo_owner(request.user.username, repo_id)

def check_shared_repo(request, repo_id):
    """
    check whether user has been shared this repo or
    the repo share to the groups user join
    
    """
    repos = seafserv_threaded_rpc.list_share_repos(request.user.username, 'to_email', -1, -1)
    for repo in repos:
        if repo.props.id == repo_id:
            return True

    groups = ccnet_rpc.get_groups(request.user.username)
    # for every group that user joined...    
    for group in groups:
        # ...get repo ids in that group, and check whether repo ids contains that repo id 
        repo_ids = get_group_repoids(group.props.id)
        if repo_ids.__contains__(repo_id):
            return True

    return False

def validate_emailuser(emailuser):
    """
    check whether emailuser is in the database

    """
    try:
        user = ccnet_rpc.get_emailuser(emailuser)
    except:
        user = None
        
    if user:
        return True
    else:
        return False

def repo(request, repo_id):
    # get repo web access property, if no repo access property in db, then
    # assume repo ap is 'own'
    repo_ap = seafserv_threaded_rpc.repo_query_access_property(repo_id)
    if repo_ap == None:
        repo_ap = 'own'
        
    # if repo is 'own' and user is not staff and is not owner
    # and not shared this repo, then goto 404 page..
    if cmp(repo_ap, 'own') == 0 and not validate_owner(request, repo_id) \
            and not check_shared_repo(request, repo_id) and not request.user.is_staff:
        raise Http404

    repo = get_repo(repo_id)
    if repo == None:
        raise Http404

    is_owner = False
    if request.user.is_authenticated():
        if validate_owner(request, repo_id):
            is_owner = True

    repo_size = seafserv_threaded_rpc.server_repo_size(repo_id)

    latest_commit = {}
    dirs = []
    if not repo.props.encrypted:
        latest_commit = get_commits(repo_id, 0, 1)[0]
        if not request.GET.get('root_id'):
            # use HEAD commit's root id
            commit = seafserv_rpc.get_commit(repo.props.head_cmmt_id)
            root_id = commit.props.root_id
        else:
            root_id = request.GET.get('root_id')

        try:
            dirs = seafserv_rpc.list_dir(root_id)
            for dirent in dirs:
                if stat.S_ISDIR(dirent.props.mode):
                    dirent.is_dir = True
                else:
                    dirent.is_dir = False
        except:
            pass

    # used to determin whether show repo content in repo.html
    # if a repo is shared to me, or repo shared to the group I joined,
    # then I can view repo content on the web
    if check_shared_repo(request, repo_id):
        share_to_me = True
    else:
        share_to_me = False

    return render_to_response('repo.html', {
            "repo": repo,
            "latest_commit": latest_commit,
            "is_owner": is_owner,
            "repo_ap": repo_ap,
            "repo_size": repo_size,
            "dirs": dirs,
            "share_to_me": share_to_me,
            }, context_instance=RequestContext(request))


def repo_history(request, repo_id):
    # TODO: check permission
    repo = get_repo(repo_id)
    try:
        current_page = int(request.GET.get('page', '1'))
        per_page= int(request.GET.get('per_page', '25'))
    except ValueError:
        current_page = 1
        per_page = 25

    commits_all = get_commits(repo_id, per_page * (current_page -1), per_page + 1)
    commits = commits_all[:per_page]

    if len(commits_all) == per_page + 1:
        page_next = True
    else:
        page_next = False


    return render_to_response('repo_history.html', {
            "repo": repo,
            "commits": commits,
            'current_page': current_page,
            'prev_page': current_page-1,
            'next_page': current_page+1,
            'per_page': per_page,
            'page_next': page_next,
            }, context_instance=RequestContext(request))


@login_required
def modify_token(request, repo_id):
    if not validate_owner(request, repo_id):
        return HttpResponseRedirect(reverse(repo, args=[repo_id]))

    token = request.POST.get('token', '')
    if token:
        seafserv_threaded_rpc.set_repo_token(repo_id, token)

    return HttpResponseRedirect(reverse(repo, args=[repo_id]))


@login_required
def remove_repo(request, repo_id):
    if not validate_owner(request, repo_id) and not request.user.is_staff:
        return go_permission_error(request, u'权限不足：无法查看该用户信息')
    
    seafserv_threaded_rpc.remove_repo(repo_id)
    return HttpResponseRedirect(request.META['HTTP_REFERER'])
    
@login_required
def remove_fetched_repo(request, user_id, repo_id):
    if user_id and repo_id:
        seafserv_threaded_rpc.remove_fetched_repo (user_id, repo_id)
        
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def myhome(request):
    owned_repos = []
    quota_usage = 0
    output_msg = {}

    email = request.user.username
    quota_usage = seafserv_threaded_rpc.get_user_quota_usage(email)
    owned_repos = seafserv_threaded_rpc.list_owned_repos(email)
    
    # Repos that are share to me
    in_repos = seafserv_threaded_rpc.list_share_repos(request.user.username, 'to_email', -1, -1)

    # handle share repo request
    if request.method == 'POST':
        output_msg = repo_add_share(request)

    # my contacts
    contacts = Contact.objects.filter(user_email=email)
    
    # groups I join
    groups = ccnet_rpc.get_groups(email)
    for group in groups:
        if group.props.creator_name == request.user.username:
            group.my_create = True
        else:
            group.my_create = False
    
    return render_to_response('myhome.html', {
            "owned_repos": owned_repos,
            "quota_usage": quota_usage,
            "in_repos": in_repos,
            "output_msg": output_msg,
            "contacts": contacts,
            "groups": groups,
            }, context_instance=RequestContext(request))

@login_required
def ownerhome(request, owner_name):
    owned_repos = []
    quota_usage = 0

    owned_repos = seafserv_threaded_rpc.list_owned_repos(owner_name)
    quota_usage = seafserv_threaded_rpc.get_user_quota_usage(owner_name)

    user_dict = user_info(request, owner_name)
    
    return render_to_response('ownerhome.html', {
            "owned_repos": owned_repos,
            "quota_usage": quota_usage,
            "owner": owner_name,
            "user_dict": user_dict,
            }, context_instance=RequestContext(request))

@login_required
def repo_set_access_property(request, repo_id):
    if repo_id:
        ap = request.GET.get('ap', '')
        seafserv_threaded_rpc.repo_set_access_property(repo_id, ap)

    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def repo_list_dir(request, repo_id):
    if repo_id:
        # any person visit private repo, go to 404 page
        repo_ap = seafserv_threaded_rpc.repo_query_access_property(repo_id)
        if repo_ap == 'private':
            raise Http404

        # people who is not owner visits own repo, go to 404 page
        if not validate_owner(request, repo_id):
            if repo_ap == 'own':
                raise Http404
            
        repo = seafserv_threaded_rpc.get_repo(repo_id)

        dirs = []
        encrypted = repo.props.encrypted
        if not encrypted:
            if not request.GET.get('root_id'): # No root id..?
                # ..use HEAD commit's root id
                commit = seafserv_rpc.get_commit(repo.props.head_cmmt_id)
                root_id = commit.props.root_id
            else:
                root_id = request.GET.get('root_id')

            try:
                dirs = seafserv_rpc.list_dir(root_id)
                for dirent in dirs:
                    if stat.S_ISDIR(dirent.props.mode):
                        dirent.is_dir = True
                    else:
                        dirent.is_dir = False
            except:
                pass
                
    return render_to_response('repo_dir.html', {
            "repo_id": repo_id,
            "dirs": dirs,
            "encrypted": encrypted,
            },
            context_instance=RequestContext(request))

def repo_operation_file(request, op, repo_id, obj_id):
    if repo_id:
        # if a repo doesn't have access property in db, then assume it's 'own'
        repo_ap = seafserv_threaded_rpc.repo_query_access_property(repo_id)
        if not repo_ap:
            repo_ap = 'own'

        # if a repo is shared to me, then I can view and download file no mater whether
        # repo's access property is 'own' or 'public'
        if check_shared_repo(request, repo_id):
            share_to_me = True
        else:
            share_to_me = False
            
        token = ''        
        if repo_ap == 'own':
            # people who is owner or this repo is shared to him, can visit the repo;
            # others, just go to 404 page           
            if validate_owner(request, repo_id) or share_to_me:
                # owner should get a token to visit repo                
                token = gen_token()
                # put token into memory in seaf-server
                seafserv_rpc.web_save_access_token(token, obj_id)
            else:
                raise Http404

        http_server_root = get_httpserver_root()
        file_name = request.GET.get('file_name', '')
        return HttpResponseRedirect('%s/%s?id=%s&filename=%s&op=%s&t=%s' %
                                    (http_server_root,
                                     repo_id, obj_id,
                                     file_name, op, token))
    
@login_required
def repo_add_share(request):
    output_msg = {}
    
    if request.method == 'POST':
        from_email = request.user.username
        repo_id = request.POST.get('share_repo_id', '')
        
        # Handle the diffent separator
        to_email_str = request.POST.get('to_email', '').replace(';',',')
        to_email_str = to_email_str.replace('\n',',')
        to_email_str = to_email_str.replace('\r',',')

        to_email_list = to_email_str.split(',')
        info_emails = []
        err_emails = []
        for to_email in to_email_list:
            to_email = to_email.strip(' ')
            if not to_email:
                continue

            # if to_email is user name, the format is: 'example@mail.com';
            # if to_email is group, the format is 'group_name <creator@mail.com>'
            if (to_email.split(' ')[0].find('@') == -1):
                group_name = to_email.split(' ')[0]
                group_creator = to_email.split(' ')[1]
                if validate_owner(request, repo_id):
                    groups = ccnet_rpc.get_groups(request.user.username)
                    find = False
                    for group in groups:
                        if group.props.group_name == group_name and \
                                group_creator.find(group.props.creator_name) >= 0:
                            from seahub.group.views import group_share_repo
                            group_share_repo(request, repo_id, int(group.props.id), from_email)
                            find = True
                            info_emails.append(group_name)

                    if not find:
                        err_emails.append(group_name)
                else:
                    err_emails.append(group_name)
            else:
                if validate_emailuser(to_email) and validate_owner(request, repo_id):
                    seafserv_threaded_rpc.add_share(repo_id, from_email, to_email, 'rw')
                    info_emails.append(to_email)
                else:
                    err_emails.append(to_email)

        if info_emails:
            output_msg['info_msg'] = u'共享给%s成功，' % list_to_string(info_emails)
        if err_emails:
            output_msg['err_msg'] = u'共享给%s失败：用户或组不存在' % list_to_string(err_emails)

    return output_msg

@login_required
def repo_list_share(request):
    username = request.user.username

    # repos that are share to user
    out_repos = seafserv_threaded_rpc.list_share_repos(username, 'from_email', -1, -1)

    # repos that are share to groups
    group_repos = seafserv_threaded_rpc.get_group_my_share_repos(request.user.username)
    for group_repo in group_repos:
        repo_id = group_repo.props.repo_id
        if not repo_id:
            continue
        repo = get_repo(repo_id)
        group_id = group_repo.props.group_id
        group = ccnet_rpc.get_group(int(group_id))
        repo.props.shared_email = group.props.group_name
        repo.gid = group_id
        
        out_repos.append(repo)

    return render_to_response('share_repos.html', {
            "out_repos": out_repos,
            }, context_instance=RequestContext(request))

@login_required
def repo_download(request):
    repo_id = request.GET.get('repo_id', '')

    repo = seafserv_threaded_rpc.get_repo(repo_id)    
    repo_name = repo.props.name
    quote_repo_name = quote(repo_name)
    encrypted = repo.props.encrypted
    if encrypted:
        enc = '1'
    else:
        enc = ''
    relay_id = ccnet_rpc.get_session_info().id
    if not relay_id:
        return render_to_response('error.html', {
                "error_msg": u"下载失败：无法取得中继"
                }, context_instance=RequestContext(request))

    ccnet_applet_root = get_ccnetapplet_root()
    redirect_url = "%s/repo/download/?repo_id=%s&relay_id=%s&repo_name=%s&encrypted=%s" % (
        ccnet_applet_root, repo_id, relay_id, quote_repo_name, enc)

    return HttpResponseRedirect(redirect_url)

def seafile_access_check(request):
    repo_id = request.GET.get('repo_id', '')

    return render_to_response(
        'seafile_access_check.html', {
            'repo_id': repo_id,
        },
        context_instance=RequestContext(request))

@login_required
def repo_remove_share(request):
    repo_id = request.GET.get('repo_id', '')
    group_id = request.GET.get('gid')
    from_email = request.user.username
    
    # if request params don't have 'gid', then remove repos that share to
    # to other person; else, remove repos that share to groups
    if not group_id:
        to_email = request.GET.get('to_email', '')
        seafserv_threaded_rpc.remove_share(repo_id, from_email, to_email)
    else:
        try:
            group_id_int = int(group_id)
        except:
            return go_error(request, u'group id 不是有效参数')
        
        from seahub.group.views import group_unshare_repo
        group_unshare_repo(request, repo_id, group_id_int, from_email)
        
    return HttpResponseRedirect(request.META['HTTP_REFERER'])        
    
@login_required
def mypeers(request):
    cid = get_user_cid(request.user)

@login_required
def seafadmin(request):
    if not request.user.is_staff:
        raise Http404

    # Make sure page request is an int. If not, deliver first page.
    try:
        current_page = int(request.GET.get('page', '1'))
        per_page= int(request.GET.get('per_page', '25'))
    except ValueError:
        current_page = 1
        per_page = 25

    repos_all = seafserv_threaded_rpc.get_repo_list(per_page * (current_page -1), per_page + 1)
    repos = repos_all[:per_page]

    if len(repos_all) == per_page + 1:
        page_next = True
    else:
        page_next = False

    for repo in repos:
        try:
            repo.owner = seafserv_threaded_rpc.get_repo_owner(repo.props.id)
        except:
            repo.owner = None
            
    return render_to_response(
        'repos.html', {
            'repos': repos,
            'current_page': current_page,
            'prev_page': current_page-1,
            'next_page': current_page+1,
            'per_page': per_page,
            'page_next': page_next,
        },
        context_instance=RequestContext(request))

@login_required
def useradmin(request):
    if not request.user.is_staff:
        raise Http404

    users = ccnet_rpc.get_emailusers(-1,-1)
    for user in users:
        if user.props.id == request.user.id:
            user.is_self = True
            
    return render_to_response(
        'useradmin.html', {
            'users': users,
        },
        context_instance=RequestContext(request))

@login_required
def user_info(request, email):
    if request.user.username == email:
        return HttpResponseRedirect(reverse(myhome))
    
    if not request.user.is_staff:
        return go_permission_error(request, u'权限不足：无法查看该用户信息')

    user_dict = {}
    owned_repos = []
    quota_usage = 0

    owned_repos = seafserv_threaded_rpc.list_owned_repos(email)
    quota_usage = seafserv_threaded_rpc.get_user_quota_usage(email)

    try:
        peers = ccnet_rpc.get_peers_by_email(email)
        for peer in peers:
            if not peer:
                continue
            peername = peer.props.name
            roles = peer.props.role_list
            user_dict[peername] = roles
    except:
        pass

    # Repos that are share to user
    in_repos = seafserv_threaded_rpc.list_share_repos(email, 'to_email', -1, -1)

    return render_to_response(
        'userinfo.html', {
            'owned_repos': owned_repos,
            'quota_usage': quota_usage,
            "in_repos": in_repos,
            'user_dict': user_dict,
            'email': email
            },
        context_instance=RequestContext(request))

@login_required
def role_add(request, user_id):
    if not request.user.is_staff:
        raise Http404

    if request.method == 'POST':
        role = request.POST.get('role', '')
        if role and len(role) <= 16:
            ccnet_rpc.add_role(user_id, role)

    return HttpResponseRedirect(request.META['HTTP_REFERER'])


@login_required
def role_remove(request, user_id):
    if not request.user.is_staff:
        raise Http404

    role = request.REQUEST.get('role', '')
    if role and len(role) <= 16:
        ccnet_rpc.remove_role(user_id, role)

    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def user_remove(request, user_id):
    """The user id is emailuser id."""
    
    if not request.user.is_staff:
        raise Http404

    ccnetuser = get_ccnetuser(userid=int(user_id))
    ccnetuser.delete()
    
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def activate_user(request, user_id):
    """The user id is emailuser id."""

    if not request.user.is_staff:
        raise Http404

    ccnetuser = get_ccnetuser(userid=int(user_id))
    ccnetuser.is_active = True
    ccnetuser.save()
    
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def user_add(request):
    """Add a user"""

    if not request.user.is_staff:
        raise Http404

    if request.method == 'POST':
        form = AddUserForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password1']

            ccnetuser = CcnetUser(username=email, raw_password=password)
            ccnetuser.is_active = True
            ccnetuser.save()
            
            return HttpResponseRedirect(reverse('useradmin', args=[]))
    else:
        form = AddUserForm()
    
    return render_to_response("add_user_form.html",  {
            'form': form, 
            }, context_instance=RequestContext(request))

def back_local(request):
    ccnet_applt_root = get_ccnetapplet_root()

    redirect_url = '%s/home/' % ccnet_applt_root

    return HttpResponseRedirect(redirect_url)

