(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[19],{1226:function(e,t,a){e.exports=a(1227)},1227:function(e,t,a){"use strict";a.r(t);var n=a(5),r=a(6),o=a(8),c=a(7),s=a(0),i=a.n(s),u=a(23),l=a.n(u),d=a(9),f=a(1),m=a(66),p=a(61),b=a(15),h=a(115),v=(a(240),window.shared.pageOptions),g=v.repoID,O=v.filePath,j=v.err,E=v.commitID,w=v.fileType,k=v.sharedToken,y=function(e){Object(o.a)(a,e);var t=Object(c.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(m.a,{content:i.a.createElement(L,null)})}}]),a}(i.a.Component),L=function(e){Object(o.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={isLoading:!j,errorMsg:""},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(!j){!function t(){d.a.queryOfficeFileConvertStatus(g,E,O,w.toLowerCase(),k).then((function(a){switch(a.data.status){case"PROCESSING":e.setState({isLoading:!0}),setTimeout(t,2e3);break;case"ERROR":e.setState({isLoading:!1,errorMsg:Object(f.mb)("Document convertion failed.")});break;case"DONE":e.setState({isLoading:!1,errorMsg:""});var n=document.createElement("script");n.type="text/javascript",n.src="".concat(f.Jb,"js/pdf/viewer.js"),document.body.append(n)}})).catch((function(t){t.response?e.setState({isLoading:!1,errorMsg:Object(f.mb)("Document convertion failed.")}):e.setState({isLoading:!1,errorMsg:Object(f.mb)("Please check the network.")})}))}()}}},{key:"render",value:function(){var e=this.state,t=e.isLoading,a=e.errorMsg;return j?i.a.createElement(p.a,null):t?i.a.createElement(b.a,null):a?i.a.createElement(p.a,{errorMsg:a}):i.a.createElement("div",{className:"shared-file-view-body pdf-file-view"},i.a.createElement(h.a,null))}}]),a}(i.a.Component);l.a.render(i.a.createElement(y,null),document.getElementById("wrapper"))}},[[1226,1,0]]]);
//# sourceMappingURL=sharedFileViewDocument.chunk.js.map