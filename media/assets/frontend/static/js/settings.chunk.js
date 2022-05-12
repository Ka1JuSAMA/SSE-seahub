(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[16],{1583:function(e,t,n){n(55),e.exports=n(1699)},1584:function(e,t,n){},1699:function(e,t,n){"use strict";n.r(t);var a=n(6),s=n(7),c=n(9),i=n(8),o=n(2),r=n.n(o),l=n(24),b=n.n(l),d=n(17),h=n(5),u=n(1),j=n(10),m=n(11),O=n(52),p=n(0),f=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){return Object(a.a)(this,n),t.call(this,e)}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsx)("ul",{className:"nav flex-column user-setting-nav",children:this.props.data.map((function(t,n){return t.show?Object(p.jsx)("li",{className:"nav-item ".concat(e.props.curItemID==t.href.substr(1)&&"active"),children:Object(p.jsx)("a",{className:"nav-link",href:t.href,children:t.text})},n):null}))})}}]),n}(r.a.Component),g=window.app.pageOptions,x=g.avatarURL,v=g.csrfToken,w=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).fileInputChange=function(){if(s.fileInput.current.files.length){var e=s.fileInput.current.files[0],t=e.name;if(-1==t.lastIndexOf("."))return m.a.danger(Object(u.qb)("Please choose an image file."),{duration:5}),!1;var n=t.substr(t.lastIndexOf(".")+1).toLowerCase(),a=["jpg","jpeg","png","gif"];if(-1==a.indexOf(n)){var c=Object(u.qb)("File extensions can only be {placeholder}.").replace("{placeholder}",a.join(", "));return m.a.danger(c,{duration:5}),!1}if(e.size>1048576){var i=Object(u.qb)("The file is too large. Allowed maximum size is 1MB.");return m.a.danger(i,{duration:5}),!1}j.a.updateUserAvatar(e,160).then((function(e){s.setState({avatarSrc:e.data.avatar_url}),m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))}},s.openFileInput=function(){s.fileInput.current.click()},s.handleMouseOver=function(){s.setState({isEditShown:!0})},s.handleMouseOut=function(){s.setState({isEditShown:!1})},s.onEditIconKeyDown=function(e){"Enter"!=e.key&&"Space"!=e.key||e.target.click()},s.fileInput=r.a.createRef(),s.form=r.a.createRef(),s.state={avatarSrc:x,isEditShown:!1},s}return Object(s.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("form",{ref:this.form,className:"form-group row",encType:"multipart/form-data",method:"post",action:"".concat(u.qc,"avatar/add/"),children:[Object(p.jsx)("input",{type:"hidden",name:"csrfmiddlewaretoken",value:v}),Object(p.jsx)("label",{className:"col-sm-1 col-form-label",children:Object(u.qb)("Avatar:")}),Object(p.jsxs)("div",{className:"col-auto position-relative",onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut,onFocus:this.handleMouseOver,tabIndex:"0",children:[Object(p.jsx)("img",{src:this.state.avatarSrc,width:"80",height:"80",alt:"",className:"user-avatar"}),Object(p.jsx)("input",{type:"file",name:"avatar",className:"d-none",onChange:this.fileInputChange,ref:this.fileInput}),Object(p.jsx)("span",{className:"avatar-edit fas fa-edit ".concat(!this.state.isEditShown&&"d-none"),onClick:this.openFileInput,role:"button","aria-label":Object(u.qb)("Edit"),tabIndex:"0",onKeyDown:this.onEditIconKeyDown})]})]})}}]),n}(r.a.Component),k=window.app.pageOptions,y=k.nameLabel,N=k.enableUpdateUserInfo,q=k.enableUserSetContactEmail,C=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;Object(a.a)(this,n),(s=t.call(this,e)).handleNameInputChange=function(e){s.setState({name:e.target.value})},s.handleContactEmailInputChange=function(e){s.setState({contactEmail:e.target.value})},s.handleSubmit=function(e){e.preventDefault();var t={name:s.state.name};q&&(t.contact_email=s.state.contactEmail),s.props.updateUserInfo(t)};var c=s.props.userInfo,i=c.contact_email,o=c.login_id,r=c.name;return s.state={contactEmail:i,loginID:o,name:r},s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state,t=e.contactEmail,n=e.loginID,a=e.name;return Object(p.jsxs)("form",{action:"",method:"post",onSubmit:this.handleSubmit,children:[Object(p.jsxs)("div",{className:"form-group row",children:[Object(p.jsx)("label",{className:"col-sm-1 col-form-label",htmlFor:"name",children:y}),Object(p.jsx)("div",{className:"col-sm-5",children:Object(p.jsx)("input",{className:"form-control",id:"name",type:"text",name:"nickname",value:a,disabled:!N,onChange:this.handleNameInputChange})})]}),n&&Object(p.jsxs)("div",{className:"form-group row",children:[Object(p.jsx)("label",{className:"col-sm-1 col-form-label",htmlFor:"user-name",children:Object(u.qb)("Username:")}),Object(p.jsx)("div",{className:"col-sm-5",children:Object(p.jsx)("input",{className:"form-control",id:"user-name",type:"text",name:"username",value:n,disabled:!0,readOnly:!0})}),Object(p.jsx)("p",{className:"col-sm-5 m-0 input-tip",children:Object(u.qb)("You can use this field at login.")})]}),(t||q)&&Object(p.jsxs)("div",{className:"form-group row",children:[Object(p.jsx)("label",{className:"col-sm-1 col-form-label",htmlFor:"contact-email",children:Object(u.qb)("Contact Email:")}),Object(p.jsx)("div",{className:"col-sm-5",children:Object(p.jsx)("input",{className:"form-control",id:"contact-email",type:"text",name:"contact_email",value:t,disabled:!q,readOnly:!q,onChange:this.handleContactEmailInputChange})}),Object(p.jsx)("p",{className:"col-sm-5 m-0 input-tip",children:Object(u.qb)("Your notifications will be sent to this email.")})]}),Object(p.jsx)("button",{type:"submit",className:"btn btn-outline-primary offset-sm-1",disabled:!N,children:Object(u.qb)("Submit")})]})}}]),n}(r.a.Component),I=n(20),S=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).getAuthToken=function(){j.a.getAuthTokenBySession().then((function(e){s.setState({authToken:e.data.token})})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))},s.createAuthToken=function(){j.a.createAuthTokenBySession().then((function(e){s.setState({authToken:e.data.token,isAuthTokenVisible:!1}),m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))},s.deleteAuthToken=function(){j.a.deleteAuthTokenBySession().then((function(e){s.setState({authToken:"",isAuthTokenVisible:!1}),m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))},s.toggleAuthTokenVisible=function(){s.setState({isAuthTokenVisible:!s.state.isAuthTokenVisible})},s.onIconKeyDown=function(e){"Enter"!=e.key&&"Space"!=e.key||e.target.click()},s.state={authToken:"",isAuthTokenVisible:!1},s}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.getAuthToken()}},{key:"render",value:function(){var e=this.state,t=e.authToken,n=e.isAuthTokenVisible;return Object(p.jsx)(r.a.Fragment,{children:Object(p.jsxs)("div",{id:"get-auth-token",className:"setting-item",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Web API Auth Token")}),t?Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{className:"d-flex align-items-center",children:[Object(p.jsx)("label",{className:"m-0 mr-2",htmlFor:"token",children:Object(u.qb)("Token:")}),Object(p.jsx)("input",{id:"token",className:"border-0 mr-1",type:"text",value:n?t:"****************************************",readOnly:!0,size:Math.max(t.length,10)}),Object(p.jsx)("span",{tabIndex:"0",role:"button","aria-label":n?Object(u.qb)("Hide"):Object(u.qb)("Show"),onKeyDown:this.onIconKeyDown,onClick:this.toggleAuthTokenVisible,className:"eye-icon fas ".concat(this.state.isAuthTokenVisible?"fa-eye":"fa-eye-slash")})]}),Object(p.jsx)("button",{className:"btn btn-outline-primary mt-2",onClick:this.deleteAuthToken,children:Object(u.qb)("Delete")})]}):Object(p.jsx)("button",{className:"btn btn-outline-primary",onClick:this.createAuthToken,children:Object(u.qb)("Generate")})]})})}}]),n}(r.a.Component),D=n(4),T=window.app.pageOptions,E=T.webdavSecretMinLength,A=T.webdavSecretStrengthLevel,P=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).submit=function(){return 0===s.state.password.length?(s.setState({errMsg:Object(u.qb)("Please enter a password.")}),!1):s.state.password.length<E?(s.setState({errMsg:Object(u.qb)("The password is too short.")}),!1):h.a.getStrengthLevel(s.state.password)<A?(s.setState({errMsg:Object(u.qb)("The password is too weak. It should include at least {passwordStrengthLevel} of the following: number, upper letter, lower letter and other symbols.").replace("{passwordStrengthLevel}",A)}),!1):(s.setState({btnDisabled:!0}),void s.props.updatePassword(s.state.password.trim()))},s.handleInputChange=function(e){s.setState({password:e.target.value})},s.togglePasswordVisible=function(){s.setState({isPasswordVisible:!s.state.isPasswordVisible})},s.generatePassword=function(){var e=h.a.generatePassword(E);s.setState({password:e,isPasswordVisible:!0})},s.state={password:s.props.password,isPasswordVisible:!1,btnDisabled:!1,errMsg:""},s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props.toggle,t=Object(u.qb)("(at least {passwordMinLength} characters and includes {passwordStrengthLevel} of the following: number, upper letter, lower letter and other symbols)").replace("{passwordMinLength}",E).replace("{passwordStrengthLevel}",A);return Object(p.jsxs)(D.u,{centered:!0,isOpen:!0,toggle:e,children:[Object(p.jsx)(D.x,{toggle:e,children:Object(u.qb)("WebDav Password")}),Object(p.jsxs)(D.v,{children:[Object(p.jsxs)(D.q,{children:[Object(p.jsx)(D.p,{type:this.state.isPasswordVisible?"text":"password",value:this.state.password,onChange:this.handleInputChange,autoComplete:"new-password"}),Object(p.jsxs)(D.r,{addonType:"append",children:[Object(p.jsx)(D.c,{onClick:this.togglePasswordVisible,children:Object(p.jsx)("i",{className:"fas ".concat(this.state.isPasswordVisible?"fa-eye":"fa-eye-slash")})}),Object(p.jsx)(D.c,{onClick:this.generatePassword,children:Object(p.jsx)("i",{className:"fas fa-magic"})})]})]}),Object(p.jsx)("p",{className:"form-text text-muted m-0",children:t}),this.state.errMsg&&Object(p.jsx)(D.a,{color:"danger",className:"m-0 mt-2",children:Object(u.qb)(this.state.errMsg)})]}),Object(p.jsxs)(D.w,{children:[Object(p.jsx)(D.c,{color:"secondary",onClick:e,children:Object(u.qb)("Cancel")}),Object(p.jsx)(D.c,{color:"primary",onClick:this.submit,disabled:this.state.btnDisabled,children:Object(u.qb)("Submit")})]})]})}}]),n}(o.Component),U=window.app.pageOptions.webdavPasswd,F=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).togglePasswordVisible=function(){s.setState({isPasswordVisible:!s.state.isPasswordVisible})},s.updatePassword=function(e){j.a.updateWebdavSecret(e).then((function(t){s.toggleDialog(),s.setState({password:e}),m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);s.toggleDialog(),m.a.danger(t)}))},s.toggleDialog=function(){s.setState({isDialogOpen:!s.state.isDialogOpen})},s.onIconKeyDown=function(e){"Enter"!=e.key&&"Space"!=e.key||e.target.click()},s.state={password:U,isPasswordVisible:!1,isDialogOpen:!1},s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state,t=e.password,n=e.isPasswordVisible;return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{id:"update-webdav-passwd",className:"setting-item",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("WebDav Password")}),t?Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{className:"d-flex align-items-center",children:[Object(p.jsx)("label",{className:"m-0 mr-2",htmlFor:"passwd",children:Object(u.qb)("Password:")}),Object(p.jsx)("input",{id:"passwd",className:"border-0 mr-1",type:"text",value:n?t:"**********",readOnly:!0,size:Math.max(t.length,10)}),Object(p.jsx)("span",{tabIndex:"0",role:"button","aria-label":n?Object(u.qb)("Hide"):Object(u.qb)("Show"),onClick:this.togglePasswordVisible,onKeyDown:this.onIconKeyDown,className:"eye-icon fas ".concat(this.state.isPasswordVisible?"fa-eye":"fa-eye-slash")})]}),Object(p.jsx)("button",{className:"btn btn-outline-primary mt-2",onClick:this.toggleDialog,children:Object(u.qb)("Update")})]}):Object(p.jsx)("button",{className:"btn btn-outline-primary",onClick:this.toggleDialog,children:Object(u.qb)("Set Password")})]}),this.state.isDialogOpen&&Object(p.jsx)(I.a,{children:Object(p.jsx)(P,{password:this.state.password,updatePassword:this.updatePassword,toggle:this.toggleDialog})})]})}}]),n}(r.a.Component),M=n(94),L=window.app.pageOptions,V=L.currentLang,_=L.langList,R=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).onSelectChange=function(e){location.href="".concat(u.qc,"i18n/?lang=").concat(e.value)},s}return Object(s.a)(n,[{key:"render",value:function(){var e=_.map((function(e,t){return{value:e.langCode,label:e.langName}}));return Object(p.jsxs)("div",{className:"setting-item",id:"lang-setting",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Language Setting")}),Object(p.jsx)(M.a,{className:"language-selector",defaultValue:{value:V.langCode,label:V.langName},options:e,onChange:this.onSelectChange})]})}}]),n}(r.a.Component),W=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;Object(a.a)(this,n),(s=t.call(this,e)).handleInputChange=function(e){var t=e.target.checked;s.setState({inputChecked:t}),s.props.updateUserInfo({list_in_address_book:t.toString()})};var c=s.props.userInfo.list_in_address_book;return s.state={inputChecked:c},s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state.inputChecked;return Object(p.jsxs)("div",{className:"setting-item",id:"list-in-address-book",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Global Address Book")}),Object(p.jsxs)("div",{className:"d-flex align-items-center",children:[Object(p.jsx)("input",{type:"checkbox",id:"list-in-address-book",name:"list_in_address_book",className:"mr-1",checked:e,onChange:this.handleInputChange}),Object(p.jsx)("label",{htmlFor:"list-in-address-book",className:"m-0",children:Object(u.qb)("List your account in global address book, so that others can find you by typing your name.")})]})]})}}]),n}(r.a.Component),B=window.app.pageOptions,K=B.fileUpdatesEmailInterval,z=B.collaborateEmailInterval,G=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).inputFileUpdatesEmailIntervalChange=function(e){e.target.checked&&s.setState({fileUpdatesEmailInterval:parseInt(e.target.value)})},s.inputCollaborateEmailIntervalChange=function(e){e.target.checked&&s.setState({collaborateEmailInterval:parseInt(e.target.value)})},s.formSubmit=function(e){e.preventDefault();var t=s.state,n=t.fileUpdatesEmailInterval,a=t.collaborateEmailInterval;j.a.updateEmailNotificationInterval(n,a).then((function(e){m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))},s.fileUpdatesOptions=[{interval:0,text:Object(u.qb)("Don't send emails")},{interval:3600,text:Object(u.qb)("Per hour")},{interval:14400,text:Object(u.qb)("Per 4 hours")},{interval:86400,text:Object(u.qb)("Per day")},{interval:604800,text:Object(u.qb)("Per week")}],s.collaborateOptions=[{interval:0,text:Object(u.qb)("Don't send emails")},{interval:3600,text:Object(u.qb)("Per hour")+" ("+Object(u.qb)("If notifications have not been read within one hour, they will be sent to your mailbox.")+")"}],s.state={fileUpdatesEmailInterval:K,collaborateEmailInterval:z},s}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.fileUpdatesEmailInterval,a=t.collaborateEmailInterval;return Object(p.jsxs)("div",{className:"setting-item",id:"email-notice",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Email Notification")}),Object(p.jsx)("h6",{className:"",children:Object(u.qb)("Notifications of file changes")}),Object(p.jsx)("p",{className:"mb-1",children:Object(u.qb)("The list of added, deleted and modified files will be sent to your mailbox.")}),Object(p.jsx)("form",{method:"post",action:"",id:"set-email-notice-interval-form",onSubmit:this.formSubmit,children:this.fileUpdatesOptions.map((function(t,a){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)("input",{type:"radio",name:"interval",value:t.interval,className:"align-middle",id:"file-updates-interval-option".concat(a+1),checked:n==t.interval,onChange:e.inputFileUpdatesEmailIntervalChange}),Object(p.jsx)("label",{className:"align-middle m-0 ml-2",htmlFor:"interval-option".concat(a+1),children:t.text}),Object(p.jsx)("br",{})]},"file-updates-".concat(a))}))}),Object(p.jsx)("h6",{className:"mt-4",children:Object(u.qb)("Notifications of collaboration")}),Object(p.jsx)("p",{className:"mb-1",children:Object(u.qb)("Whether the notifications of collaboration such as sharing library or joining group should be sent to your mailbox.")}),Object(p.jsx)("form",{method:"post",action:"",id:"set-email-notice-interval-form",onSubmit:this.formSubmit,children:this.collaborateOptions.map((function(t,n){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)("input",{type:"radio",name:"interval",value:t.interval,className:"align-middle",id:"collaborate-interval-option".concat(n+1),checked:a==t.interval,onChange:e.inputCollaborateEmailIntervalChange}),Object(p.jsx)("label",{className:"align-middle m-0 ml-2",htmlFor:"interval-option".concat(n+1),children:t.text}),Object(p.jsx)("br",{})]},"collaborate-".concat(n))}))}),Object(p.jsx)("button",{type:"submit",className:"btn btn-outline-primary mt-2",onClick:this.formSubmit,children:Object(u.qb)("Submit")})]})}}]),n}(r.a.Component),Y=window.app.pageOptions,J=Y.defaultDevice,H=Y.backupTokens,Q=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).renderEnabled=function(){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)("p",{className:"mb-2",children:Object(u.qb)("Status: enabled")}),Object(p.jsx)("a",{className:"btn btn-outline-primary mb-4",href:"".concat(u.qc,"profile/two_factor_authentication/disable/"),children:Object(u.qb)("Disable Two-Factor Authentication")}),Object(p.jsxs)("p",{className:"mb-2",children:[Object(u.qb)("If you don't have any device with you, you can access your account using backup codes."),1==H?Object(u.qb)("You have only one backup code remaining."):Object(u.qb)("You have {num} backup codes remaining.").replace("{num}",H)]}),Object(p.jsx)("a",{href:"".concat(u.qc,"profile/two_factor_authentication/backup/tokens/"),className:"btn btn-outline-primary",children:Object(u.qb)("Show Codes")})]})},s.renderDisabled=function(){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)("p",{className:"mb-2",children:Object(u.qb)("Two-factor authentication is not enabled for your account. Enable two-factor authentication for enhanced account security.")}),Object(p.jsx)("a",{href:"".concat(u.qc,"profile/two_factor_authentication/setup/"),className:"btn btn-outline-primary",children:Object(u.qb)("Enable Two-Factor Authentication")})]})},s}return Object(s.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"setting-item",id:"two-factor-auth",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Two-Factor Authentication")}),J?this.renderEnabled():this.renderDisabled()]})}}]),n}(r.a.Component),X=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).disconnect=function(){s.form.current.submit()},s.form=r.a.createRef(),s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props,t=e.formActionURL,n=e.csrfToken,a=e.toggle;return Object(p.jsxs)(D.u,{centered:!0,isOpen:!0,toggle:a,children:[Object(p.jsx)(D.x,{toggle:a,children:Object(u.qb)("Disconnect")}),Object(p.jsxs)(D.v,{children:[Object(p.jsx)("p",{children:Object(u.qb)("Are you sure you want to disconnect?")}),Object(p.jsx)("form",{ref:this.form,className:"d-none",method:"post",action:t,children:Object(p.jsx)("input",{type:"hidden",name:"csrfmiddlewaretoken",value:n})})]}),Object(p.jsxs)(D.w,{children:[Object(p.jsx)(D.c,{color:"secondary",onClick:a,children:Object(u.qb)("Cancel")}),Object(p.jsx)(D.c,{color:"primary",onClick:this.disconnect,children:Object(u.qb)("Disconnect")})]})]})}}]),n}(o.Component),Z=window.app.pageOptions,$=Z.csrfToken,ee=Z.langCode,te=Z.socialConnected,ne=Z.socialNextPage,ae=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).confirmDisconnect=function(){s.setState({isConfirmDialogOpen:!0})},s.toggleDialog=function(){s.setState({isConfirmDialogOpen:!s.state.isConfirmDialogOpen})},s.state={isConfirmDialogOpen:!1},s}return Object(s.a)(n,[{key:"render",value:function(){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{className:"setting-item",id:"social-auth",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Social Login")}),Object(p.jsx)("p",{className:"mb-2",children:"zh-cn"==ee?"\u4f01\u4e1a\u5fae\u4fe1":"WeChat Work"}),te?Object(p.jsx)("button",{className:"btn btn-outline-primary",onClick:this.confirmDisconnect,children:Object(u.qb)("Disconnect")}):Object(p.jsx)("a",{href:"".concat(u.qc,"work-weixin/oauth-connect/?next=").concat(encodeURIComponent(ne)),className:"btn btn-outline-primary",children:Object(u.qb)("Connect")})]}),this.state.isConfirmDialogOpen&&Object(p.jsx)(I.a,{children:Object(p.jsx)(X,{formActionURL:"".concat(u.qc,"work-weixin/oauth-disconnect/?next=").concat(encodeURIComponent(ne)),csrfToken:$,toggle:this.toggleDialog})})]})}}]),n}(r.a.Component),se=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).disconnect=function(){s.form.current.submit()},s.form=r.a.createRef(),s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props,t=e.formActionURL,n=e.csrfToken,a=e.toggle;return Object(p.jsxs)(D.u,{centered:!0,isOpen:!0,toggle:a,children:[Object(p.jsx)(D.x,{toggle:a,children:Object(u.qb)("Disconnect")}),Object(p.jsxs)(D.v,{children:[Object(p.jsx)("p",{children:Object(u.qb)("Are you sure you want to disconnect?")}),Object(p.jsx)("form",{ref:this.form,className:"d-none",method:"post",action:t,children:Object(p.jsx)("input",{type:"hidden",name:"csrfmiddlewaretoken",value:n})})]}),Object(p.jsxs)(D.w,{children:[Object(p.jsx)(D.c,{color:"secondary",onClick:a,children:Object(u.qb)("Cancel")}),Object(p.jsx)(D.c,{color:"primary",onClick:this.disconnect,children:Object(u.qb)("Disconnect")})]})]})}}]),n}(o.Component),ce=window.app.pageOptions,ie=ce.csrfToken,oe=ce.langCode,re=ce.socialConnectedDingtalk,le=ce.socialNextPage,be=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).confirmDisconnect=function(){s.setState({isConfirmDialogOpen:!0})},s.toggleDialog=function(){s.setState({isConfirmDialogOpen:!s.state.isConfirmDialogOpen})},s.state={isConfirmDialogOpen:!1},s}return Object(s.a)(n,[{key:"render",value:function(){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{className:"setting-item",id:"social-auth",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Social Login")}),Object(p.jsx)("p",{className:"mb-2",children:"zh-cn"==oe?"\u9489\u9489":"Dingtalk"}),re?Object(p.jsx)("button",{className:"btn btn-outline-primary",onClick:this.confirmDisconnect,children:Object(u.qb)("Disconnect")}):Object(p.jsx)("a",{href:"".concat(u.qc,"dingtalk/connect/?next=").concat(encodeURIComponent(le)),className:"btn btn-outline-primary",children:Object(u.qb)("Connect")})]}),this.state.isConfirmDialogOpen&&Object(p.jsx)(I.a,{children:Object(p.jsx)(se,{formActionURL:"".concat(u.qc,"dingtalk/disconnect/?next=").concat(encodeURIComponent(le)),csrfToken:ie,toggle:this.toggleDialog})})]})}}]),n}(r.a.Component),de=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).action=function(){s.form.current.submit()},s.form=r.a.createRef(),s}return Object(s.a)(n,[{key:"render",value:function(){var e=this.props,t=e.formActionURL,n=e.csrfToken,a=e.toggle;return Object(p.jsxs)(D.u,{centered:!0,isOpen:!0,toggle:a,children:[Object(p.jsx)(D.x,{toggle:a,children:Object(u.qb)("Delete Account")}),Object(p.jsxs)(D.v,{children:[Object(p.jsx)("p",{children:Object(u.qb)("Really want to delete your account?")}),Object(p.jsx)("form",{ref:this.form,className:"d-none",method:"post",action:t,children:Object(p.jsx)("input",{type:"hidden",name:"csrfmiddlewaretoken",value:n})})]}),Object(p.jsxs)(D.w,{children:[Object(p.jsx)(D.c,{color:"secondary",onClick:a,children:Object(u.qb)("Cancel")}),Object(p.jsx)(D.c,{color:"primary",onClick:this.action,children:Object(u.qb)("Delete")})]})]})}}]),n}(o.Component),he=window.app.pageOptions.csrfToken,ue=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).confirmDelete=function(e){e.preventDefault(),s.setState({isConfirmDialogOpen:!0})},s.toggleDialog=function(){s.setState({isConfirmDialogOpen:!s.state.isConfirmDialogOpen})},s.state={isConfirmDialogOpen:!1},s}return Object(s.a)(n,[{key:"render",value:function(){return Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsxs)("div",{className:"setting-item",id:"del-account",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Delete Account")}),Object(p.jsx)("p",{className:"mb-2",children:Object(u.qb)("This operation will not be reverted. Please think twice!")}),Object(p.jsx)("button",{type:"button",className:"btn btn-outline-primary",onClick:this.confirmDelete,children:Object(u.qb)("Delete")})]}),this.state.isConfirmDialogOpen&&Object(p.jsx)(I.a,{children:Object(p.jsx)(de,{formActionURL:"".concat(u.qc,"profile/delete/"),csrfToken:he,toggle:this.toggleDialog})})]})}}]),n}(r.a.Component),je=(n(132),n(149),n(1584),window.app.pageOptions),me=je.canUpdatePassword,Oe=je.passwordOperationText,pe=je.enableGetAuthToken,fe=je.enableWebdavSecret,ge=je.enableAddressBook,xe=je.twoFactorAuthEnabled,ve=je.enableWechatWork,we=je.enableDingtalk,ke=je.enableDeleteAccount,ye=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e)).updateUserInfo=function(e){j.a.updateUserInfo(e).then((function(e){s.setState({userInfo:e.data}),m.a.success(Object(u.qb)("Success"))})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))},s.onSearchedClick=function(e){if(!0===e.is_dir){var t=u.qc+"library/"+e.repo_id+"/"+e.repo_name+e.path;Object(d.c)(t,{repalce:!0})}else{var n=u.qc+"lib/"+e.repo_id+"/file"+h.a.encodePath(e.path);window.open("about:blank").location.href=n}},s.handleContentScroll=function(e){var t=e.target.scrollTop,n=s.sideNavItems.filter((function(e,n){return e.show&&document.getElementById(e.href.substr(1)).offsetTop-45<t}));n.length&&s.setState({curItemID:n[n.length-1].href.substr(1)})},s.sideNavItems=[{show:!0,href:"#user-basic-info",text:Object(u.qb)("Profile")},{show:me,href:"#update-user-passwd",text:Object(u.qb)("Password")},{show:pe,href:"#get-auth-token",text:Object(u.qb)("Web API Auth Token")},{show:fe,href:"#update-webdav-passwd",text:Object(u.qb)("WebDav Password")},{show:ge,href:"#list-in-address-book",text:Object(u.qb)("Global Address Book")},{show:!0,href:"#lang-setting",text:Object(u.qb)("Language")},{show:u.Bb,href:"#email-notice",text:Object(u.qb)("Email Notification")},{show:xe,href:"#two-factor-auth",text:Object(u.qb)("Two-Factor Authentication")},{show:ve,href:"#social-auth",text:Object(u.qb)("Social Login")},{show:we,href:"#social-auth",text:Object(u.qb)("Social Login")},{show:ke,href:"#del-account",text:Object(u.qb)("Delete Account")}],s.state={curItemID:s.sideNavItems[0].href.substr(1)},s}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;j.a.getUserInfo().then((function(t){e.setState({userInfo:t.data})})).catch((function(e){var t=h.a.getErrorMsg(e);m.a.danger(t)}))}},{key:"render",value:function(){return Object(p.jsx)(r.a.Fragment,{children:Object(p.jsxs)("div",{className:"h-100 d-flex flex-column",children:[Object(p.jsxs)("div",{className:"top-header d-flex justify-content-between",children:[Object(p.jsx)("a",{href:u.qc,children:Object(p.jsx)("img",{src:u.Ob+u.Jb,height:u.Ib,width:u.Kb,title:u.rc,alt:"logo"})}),Object(p.jsx)(O.a,{onSearchedClick:this.onSearchedClick})]}),Object(p.jsxs)("div",{className:"flex-auto d-flex o-hidden",children:[Object(p.jsx)("div",{className:"side-panel o-auto",children:Object(p.jsx)(f,{data:this.sideNavItems,curItemID:this.state.curItemID})}),Object(p.jsxs)("div",{className:"main-panel d-flex flex-column",children:[Object(p.jsx)("h2",{className:"heading",children:Object(u.qb)("Settings")}),Object(p.jsxs)("div",{className:"content position-relative",onScroll:this.handleContentScroll,children:[Object(p.jsxs)("div",{id:"user-basic-info",className:"setting-item",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Profile Setting")}),Object(p.jsx)(w,{}),this.state.userInfo&&Object(p.jsx)(C,{userInfo:this.state.userInfo,updateUserInfo:this.updateUserInfo})]}),me&&Object(p.jsxs)("div",{id:"update-user-passwd",className:"setting-item",children:[Object(p.jsx)("h3",{className:"setting-item-heading",children:Object(u.qb)("Password")}),Object(p.jsx)("a",{href:"".concat(u.qc,"accounts/password/change/"),className:"btn btn-outline-primary",children:Oe})]}),pe&&Object(p.jsx)(S,{}),fe&&Object(p.jsx)(F,{}),ge&&this.state.userInfo&&Object(p.jsx)(W,{userInfo:this.state.userInfo,updateUserInfo:this.updateUserInfo}),Object(p.jsx)(R,{}),u.Bb&&Object(p.jsx)(G,{}),xe&&Object(p.jsx)(Q,{}),ve&&Object(p.jsx)(ae,{}),we&&Object(p.jsx)(be,{}),ke&&Object(p.jsx)(ue,{})]})]})]})]})})}}]),n}(r.a.Component);b.a.render(Object(p.jsx)(ye,{}),document.getElementById("wrapper"))}},[[1583,1,0]]]);
//# sourceMappingURL=settings.chunk.js.map