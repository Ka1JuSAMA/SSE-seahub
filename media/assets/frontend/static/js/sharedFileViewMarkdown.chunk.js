(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[21],{1162:function(e,t,n){e.exports=n(1163)},1163:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n(6),o=n(8),i=n(7),c=n(0),s=n.n(c),u=n(23),d=n.n(u),l=n(9),h=n(4),f=n(1),m=n(66),b=n(61),g=n(15),p=n(88),v=n(10),w=window.shared.pageOptions,k=w.repoID,O=w.sharedToken,j=w.rawPath,E=w.err,y=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return s.a.createElement(m.a,{content:s.a.createElement(C,null)})}}]),n}(s.a.Component),C=function(e){Object(o.a)(n,e);var t=Object(i.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).changeImageURL=function(e){if("image"==e.type){var t=e.data.src;if(!new RegExp(f.Zb+"/lib/"+k+"/file.*raw=1").test(t))return;var n=t.substring(f.Zb.length),a=n.indexOf("/file"),r=n.indexOf("?");n=n.substring(a+5,r),e.data.src=f.Zb+"/view-image-via-share-link/?token="+O+"&path="+h.a.encodePath(n)}return e},r.modifyValueBeforeRender=function(e){return h.a.changeMarkdownNodes(e,r.changeImageURL)},r.state={markdownContent:"",loading:!E},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;l.a.getFileContent(j).then((function(t){e.setState({markdownContent:t.data,loading:!1})})).catch((function(e){var t=h.a.getErrorMsg(e);v.a.danger(t)}))}},{key:"render",value:function(){return E?s.a.createElement(b.a,null):this.state.loading?s.a.createElement(g.a,null):s.a.createElement("div",{className:"shared-file-view-body"},s.a.createElement("div",{className:"md-view"},s.a.createElement(p.a,{scriptSource:f.Jb+"js/mathjax/tex-svg.js",markdownContent:this.state.markdownContent,showTOC:!1,serviceURL:f.Zb,sharedToken:O,repoID:k,modifyValueBeforeRender:this.modifyValueBeforeRender})))}}]),n}(s.a.Component);d.a.render(s.a.createElement(y,null),document.getElementById("wrapper"))}},[[1162,1,0]]]);
//# sourceMappingURL=sharedFileViewMarkdown.chunk.js.map