(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[8],{1234:function(e,a,t){e.exports=t(1235)},1235:function(e,a,t){"use strict";t.r(a);var n=t(5),c=t(6),r=t(8),i=t(7),o=t(0),l=t.n(o),s=t(23),u=t.n(s),p=t(130),f=t(103),m=t(199),d=t(250),v=t(251),b=t(252),h=t(253),O=window.app.pageOptions,w=O.fileType,E=O.err,j=function(e){Object(r.a)(t,e);var a=Object(i.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){if(E)return l.a.createElement(p.a,{content:l.a.createElement(f.a,null)});var e;switch(w){case"Image":e=l.a.createElement(m.a,{tip:l.a.createElement(f.a,null),canUseThumbnail:!0});break;case"XMind":e=l.a.createElement(m.a,{tip:l.a.createElement(f.a,null)});break;case"SVG":e=l.a.createElement(d.a,null);break;case"PDF":e=l.a.createElement(v.a,null);break;case"Video":e=l.a.createElement(b.a,null);break;case"Audio":e=l.a.createElement(h.a,null)}return l.a.createElement(p.a,{content:e})}}]),t}(l.a.Component);u.a.render(l.a.createElement(j,null),document.getElementById("wrapper"))},199:function(e,a,t){"use strict";var n,c,r=t(5),i=t(6),o=t(8),l=t(7),s=t(0),u=t.n(s),p=t(4),f=t(1),m=(t(420),window.app.pageOptions),d=m.repoID,v=m.repoEncrypted,b=m.fileExt,h=m.filePath,O=m.fileName,w=m.thumbnailSizeForOriginal,E=m.previousImage,j=m.nextImage,y=m.rawPath,g=m.xmindImageSrc;E&&(n="".concat(f.ic,"lib/").concat(d,"/file").concat(p.a.encodePath(E))),j&&(c="".concat(f.ic,"lib/").concat(d,"/file").concat(p.a.encodePath(j)));var k=function(e){Object(o.a)(t,e);var a=Object(l.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).handleLoadFailure=function(){n.setState({loadFailed:!0})},n.state={loadFailed:!1},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",(function(e){E&&37==e.keyCode&&(location.href=n),j&&39==e.keyCode&&(location.href=c)}))}},{key:"render",value:function(){if(this.state.loadFailed)return this.props.tip;var e="";this.props.canUseThumbnail&&!v&&["tif","tiff","psd"].includes(b)&&(e="".concat(f.ic,"thumbnail/").concat(d,"/").concat(w).concat(p.a.encodePath(h)));var a=g?"".concat(f.ic).concat(g):"";return u.a.createElement("div",{className:"file-view-content flex-1 image-file-view"},E&&u.a.createElement("a",{href:n,id:"img-prev",title:Object(f.mb)("you can also press \u2190 ")},u.a.createElement("span",{className:"fas fa-chevron-left"})),j&&u.a.createElement("a",{href:c,id:"img-next",title:Object(f.mb)("you can also press \u2192")},u.a.createElement("span",{className:"fas fa-chevron-right"})),u.a.createElement("img",{src:a||e||y,alt:O,id:"image-view",onError:this.handleLoadFailure}))}}]),t}(u.a.Component);a.a=k},250:function(e,a,t){"use strict";var n=t(5),c=t(6),r=t(8),i=t(7),o=t(0),l=t.n(o),s=(t(425),window.app.pageOptions),u=s.fileName,p=s.rawPath,f=function(e){Object(r.a)(t,e);var a=Object(i.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"file-view-content flex-1 svg-file-view"},l.a.createElement("img",{src:p,alt:u,id:"svg-view"}))}}]),t}(l.a.Component);a.a=f},251:function(e,a,t){"use strict";var n=t(5),c=t(6),r=t(8),i=t(7),o=t(0),l=t.n(o),s=t(115),u=(t(240),function(e){Object(r.a)(t,e);var a=Object(i.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"file-view-content flex-1 pdf-file-view"},l.a.createElement(s.a,null))}}]),t}(l.a.Component));a.a=u},252:function(e,a,t){"use strict";var n=t(5),c=t(6),r=t(8),i=t(7),o=t(0),l=t.n(o),s=t(197),u=(t(424),window.app.pageOptions.rawPath),p=function(e){Object(r.a)(t,e);var a=Object(i.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){var e={autoplay:!1,controls:!0,preload:"auto",sources:[{src:u}]};return l.a.createElement("div",{className:"file-view-content flex-1 video-file-view"},l.a.createElement(s.a,e))}}]),t}(l.a.Component);a.a=p},253:function(e,a,t){"use strict";var n=t(5),c=t(6),r=t(8),i=t(7),o=t(0),l=t.n(o),s=t(198),u=(t(426),window.app.pageOptions.rawPath),p=function(e){Object(r.a)(t,e);var a=Object(i.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){var e={autoplay:!1,controls:!0,preload:"auto",sources:[{src:u}]};return l.a.createElement("div",{className:"file-view-content flex-1 audio-file-view"},l.a.createElement(s.a,e))}}]),t}(l.a.Component);a.a=p}},[[1234,1,0]]]);
//# sourceMappingURL=fileView.chunk.js.map