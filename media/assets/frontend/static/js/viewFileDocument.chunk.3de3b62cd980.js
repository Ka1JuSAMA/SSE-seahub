(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[31],{1238:function(e,t,n){e.exports=n(1239)},1239:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(6),c=n(8),o=n(7),i=n(0),s=n.n(i),u=n(23),l=n.n(u),p=n(9),d=n(1),f=n(130),m=n(103),b=n(15),v=n(115),h=(n(240),window.app.pageOptions),g=h.repoID,O=h.filePath,j=h.err,E=h.commitID,w=h.fileType,k=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return s.a.createElement(f.a,{content:s.a.createElement(y,null)})}}]),n}(s.a.Component),y=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).state={isLoading:!j,errorMsg:""},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;if(!j){!function t(){p.a.queryOfficeFileConvertStatus(g,E,O,w.toLowerCase()).then((function(n){switch(n.data.status){case"PROCESSING":e.setState({isLoading:!0}),setTimeout(t,2e3);break;case"ERROR":e.setState({isLoading:!1,errorMsg:Object(d.mb)("Document convertion failed.")});break;case"DONE":e.setState({isLoading:!1,errorMsg:""});var a=document.createElement("script");a.type="text/javascript",a.src="".concat(d.Jb,"js/pdf/viewer.js"),document.body.append(a)}})).catch((function(t){t.response?e.setState({isLoading:!1,errorMsg:Object(d.mb)("Document convertion failed.")}):e.setState({isLoading:!1,errorMsg:Object(d.mb)("Please check the network.")})}))}()}}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.errorMsg;return j?s.a.createElement(m.a,null):t?s.a.createElement(b.a,null):n?s.a.createElement(m.a,{errorMsg:n}):s.a.createElement("div",{className:"file-view-content flex-1 pdf-file-view"},s.a.createElement(v.a,null))}}]),n}(s.a.Component);l.a.render(s.a.createElement(k,null),document.getElementById("wrapper"))}},[[1238,1,0]]]);
//# sourceMappingURL=viewFileDocument.chunk.js.map