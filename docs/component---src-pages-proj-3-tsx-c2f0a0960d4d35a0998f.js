"use strict";(self.webpackChunklittle_survey=self.webpackChunklittle_survey||[]).push([[643],{1229:function(e,l,t){t.d(l,{Z:function(){return o}});var n=t(7294),a=t(3282),r=t(5245),s=t(1451),i=["listKey","className","isLinks","children"],c=function(e){var l,t=e.listKey,a=e.className,c=e.isLinks,u=void 0!==c&&c,o=e.children,m=(0,r.Z)(e,i),d=(0,s.Z)({className:a,conditionalClasses:(l={},l["ListItem-module--is-links--wjiDe"]=u,l)});return n.createElement("li",Object.assign({key:t,className:d},m),o)},u=function(e){var l,t=e.isOrdered,a=void 0!==t&&t,r=e.isUnstyled,i=void 0===r||r,c=e.isLinks,u=void 0!==c&&c,o=e.isIndented,m=void 0!==o&&o,d=e.className,v=e.children,f=a?"ol":"ul",N=(0,s.Z)({className:d,conditionalClasses:(l={},l["List-module--list-unstyled--OYpBm"]=i,l["List-module--item-spacing--mP5WM"]=m,l)}),E=n.Children.map(v,(function(e){return n.isValidElement(e)?n.cloneElement(e,{isLinks:u}):e}));return n.createElement(f,{className:N},E)},o=function(e){var l=e.urlList.map((function(e,l){var t=e.url?n.createElement("a",{className:"BreadcrumbNav-module--link--t8QBw",href:e.url},n.createElement(a.Z,null,e.label)):n.createElement(a.Z,{weight:"Bold"},e.label);return n.createElement(c,{key:l+"-"+e.label,listKey:l+"-"+e.label},l>0&&n.createElement(a.Z,{className:"BreadcrumbNav-module--divider--neNB6"},">"),t)}));return n.createElement(u,{className:"BreadcrumbNav-module--list--XJLwI"},l)}},4743:function(e,l,t){t.r(l),t.d(l,{default:function(){return c}});var n=t(7294),a=t(6054),r=t(8877),s=t(1229),i=function(){var e,l=(0,r.G)("proj")||{};console.log("localStorage:",l);var t=null!=l&&null!==(e=l.details)&&void 0!==e&&e.name?l.details.name:"NONAME",a=new Date;return n.createElement(n.Fragment,null,n.createElement(s.Z,{urlList:[{url:"/",label:"re-start"},{url:"/proj2",label:"re-choose survey questions"},{label:"download"}]}),n.createElement("p",null,JSON.stringify(l)),n.createElement("a",{href:"data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(l)),download:t+".csv"},'DOWNLOAD data: "'+t+"-"+a+'.csv"'))},c=function(){return n.createElement(a.Z,null,n.createElement(i,null))}}}]);
//# sourceMappingURL=component---src-pages-proj-3-tsx-c2f0a0960d4d35a0998f.js.map