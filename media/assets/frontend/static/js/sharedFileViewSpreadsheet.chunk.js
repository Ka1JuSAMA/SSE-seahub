(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[24],{1559:function(e,t,n){n(54),e.exports=n(1560)},1560:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(7),c=n(9),o=n(8),s=n(2),i=n.n(s),u=n(25),d=n.n(u),f=n(10),b=n(1),h=n(89),j=n(81),O=n(16),l=(n(520),n(0)),g=window.shared.pageOptions,p=g.repoID,m=g.filePath,v=g.err,k=g.commitID,w=g.fileType,x=g.fileName,y=g.sharedToken,L=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(l.jsx)(h.a,{content:Object(l.jsx)(D,{})})}}]),n}(i.a.Component),D=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).setIframeHeight=function(e){var t=e.currentTarget;t.height=t.contentDocument.body.scrollHeight},r.state={isLoading:!v,errorMsg:""},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;if(!v){!function t(){f.a.queryOfficeFileConvertStatus(p,k,m,w.toLowerCase(),y).then((function(n){switch(n.data.status){case"QUEUED":case"PROCESSING":e.setState({isLoading:!0}),setTimeout(t,2e3);break;case"ERROR":e.setState({isLoading:!1,errorMsg:Object(b.nb)("Document convertion failed.")});break;case"DONE":e.setState({isLoading:!1,errorMsg:""})}})).catch((function(t){t.response?e.setState({isLoading:!1,errorMsg:Object(b.nb)("Document convertion failed.")}):e.setState({isLoading:!1,errorMsg:Object(b.nb)("Please check the network.")})}))}()}}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.errorMsg;return v?Object(l.jsx)(j.a,{}):t?Object(l.jsx)(O.a,{}):n?Object(l.jsx)(j.a,{errorMsg:n}):Object(l.jsx)("div",{className:"shared-file-view-body spreadsheet-file-view",children:Object(l.jsx)("iframe",{id:"spreadsheet-container",title:x,src:"".concat(b.kc,"office-convert/static/").concat(p,"/").concat(k).concat(encodeURIComponent(m),"/index.html?token=").concat(y),onLoad:this.setIframeHeight})})}}]),n}(i.a.Component);d.a.render(Object(l.jsx)(L,{}),document.getElementById("wrapper"))},520:function(e,t,n){}},[[1559,1,0]]]);
//# sourceMappingURL=sharedFileViewSpreadsheet.chunk.js.map