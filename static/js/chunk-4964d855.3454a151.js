(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4964d855"],{1760:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"reply-container"},[n("div",{staticClass:"left"},[n("el-avatar",{attrs:{size:30,src:e.imgUrl}})],1),n("div",{staticClass:"right"},[n("div",{staticClass:"name"},[e._t("nickName",[e._v("Neko")])],2),n("p",[e._t("reply-content",[e._v("你好啊")])],2),n("div",{staticClass:"reply-bottom"},[n("span",{staticClass:"time"},[e._t("time",[e._v("17:00:00")])],2),n("span",[e._t("reply",[e._v("回复")])],2)])])])},s=[],r={name:"ReplyItem",props:{test:!0},data:function(){return{imgUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}}},i=r,c=(n("40a2"),n("2877")),o=Object(c["a"])(i,a,s,!1,null,"c3c95fa0",null);t["a"]=o.exports},"1dde":function(e,t,n){var a=n("d039"),s=n("b622"),r=n("2d00"),i=s("species");e.exports=function(e){return r>=51||!a((function(){var t=[],n=t.constructor={};return n[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"3cb5":function(e,t,n){},"40a2":function(e,t,n){"use strict";var a=n("f2a4"),s=n.n(a);s.a},"4f5e":function(e,t,n){"use strict";var a=n("74e0"),s=n.n(a);s.a},"65f0":function(e,t,n){var a=n("861d"),s=n("e8b5"),r=n("b622"),i=r("species");e.exports=function(e,t){var n;return s(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!s(n.prototype)?a(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"6fd3":function(e,t,n){"use strict";var a=n("3cb5"),s=n.n(a);s.a},"74e0":function(e,t,n){},"766c":function(e,t,n){},8418:function(e,t,n){"use strict";var a=n("c04e"),s=n("9bf2"),r=n("5c6c");e.exports=function(e,t,n){var i=a(t);i in e?s.f(e,i,r(0,n)):e[i]=n}},"99af":function(e,t,n){"use strict";var a=n("23e7"),s=n("d039"),r=n("e8b5"),i=n("861d"),c=n("7b0b"),o=n("50c4"),u=n("8418"),l=n("65f0"),f=n("1dde"),g=n("b622"),d=n("2d00"),h=g("isConcatSpreadable"),p=9007199254740991,m="Maximum allowed index exceeded",v=d>=51||!s((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),_=f("concat"),b=function(e){if(!i(e))return!1;var t=e[h];return void 0!==t?!!t:r(e)},S=!v||!_;a({target:"Array",proto:!0,forced:S},{concat:function(e){var t,n,a,s,r,i=c(this),f=l(i,0),g=0;for(t=-1,a=arguments.length;t<a;t++)if(r=-1===t?i:arguments[t],b(r)){if(s=o(r.length),g+s>p)throw TypeError(m);for(n=0;n<s;n++,g++)n in r&&u(f,g,r[n])}else{if(g>=p)throw TypeError(m);u(f,g++,r)}return f.length=g,f}})},ae40:function(e,t,n){var a=n("83ab"),s=n("d039"),r=n("5135"),i=Object.defineProperty,c={},o=function(e){throw e};e.exports=function(e,t){if(r(c,e))return c[e];t||(t={});var n=[][e],u=!!r(t,"ACCESSORS")&&t.ACCESSORS,l=r(t,0)?t[0]:o,f=r(t,1)?t[1]:void 0;return c[e]=!!n&&!s((function(){if(u&&!a)return!0;var e={length:-1};u?i(e,1,{enumerable:!0,get:o}):e[1]=1,n.call(e,l,f)}))}},b727:function(e,t,n){var a=n("0366"),s=n("44ad"),r=n("7b0b"),i=n("50c4"),c=n("65f0"),o=[].push,u=function(e){var t=1==e,n=2==e,u=3==e,l=4==e,f=6==e,g=5==e||f;return function(d,h,p,m){for(var v,_,b=r(d),S=s(b),C=a(h,p,3),x=i(S.length),y=0,k=m||c,I=t?k(d,x):n?k(d,0):void 0;x>y;y++)if((g||y in S)&&(v=S[y],_=C(v,y,b),e))if(t)I[y]=_;else if(_)switch(e){case 3:return!0;case 5:return v;case 6:return y;case 2:o.call(I,v)}else if(l)return!1;return f?-1:u||l?l:I}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},bb51:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("home-page")},s=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"homePage"},[e._l(e.pageNote,(function(t,a){return n("div",{key:t.id,staticClass:"article"},[n("div",{staticClass:"article-item"},[n("div",[n("h1",{staticClass:"head"},[e._v(e._s(t.articleName))]),n("div",{staticClass:"name"},[e._v("作者："+e._s(t.name))]),n("div",{staticClass:"content",class:e.pageNote[a].fold?"fold":"unfold",domProps:{innerHTML:e._s(t.content)}},[e._v(e._s(t.content))]),e.isShow(a)?n("div",{staticClass:"show",on:{click:function(t){return e.changeShow(a)}}},[e._v(e._s(e.pageNote[a].fold?"展开":"收起"))]):e._e()]),n("div",{staticClass:"communicate"},[n("div",{staticClass:"info"},[e._e(),n("div",{staticClass:"opinion"},[n("i",{staticClass:"el-icon-chat-dot-round"}),n("span",[e._v("评论")]),n("span",[e._v(e._s(0))])]),e.pageNote[a].show?n("div",{staticClass:"more2",on:{click:function(t){return e.readRemark(a)}}},[e._v("全部评论")]):n("div",{staticClass:"more",on:{click:function(t){return e.readRemark(a)}}},[e._v("全部评论")])]),e.pageNote[a].show?n("div",{staticClass:"show-area"},[n("el-avatar",{attrs:{size:50,src:e.imgUrl}}),n("el-input",{attrs:{type:"textarea",placeholder:"请输入内容",autosize:{minRows:2,maxRows:4}},model:{value:t.text,callback:function(n){e.$set(t,"text",n)},expression:"items.text"}}),n("el-button",{staticClass:"send",attrs:{type:"primary"},on:{click:function(t){return e.sendMessage(a)}}},[e._v("发送内容")])],1):e._e(),n("div",e._l(e.user[e.userIndex+a],(function(t,s){return n("div",{key:t.id},[n("remark-item",[n("div",{attrs:{slot:"nickName"},slot:"nickName"},[e._v(e._s(e.name))]),n("p",{attrs:{slot:"remark-content"},slot:"remark-content"},[e._v(e._s(e.user[e.userIndex+a][s].content))]),n("span",{staticClass:"date",attrs:{slot:"time"},slot:"time"},[e._v(e._s(e.user[e.userIndex+a][s].time))]),n("span",{attrs:{slot:"reply"},on:{click:function(t){return e.remarkEvent()}},slot:"reply"},[e._v("回复")])]),e._e()],1)})),0)])])])})),n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pageTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],2)},i=[],c=(n("99af"),n("d81d"),n("fb6a"),n("b0c0"),n("1760")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"remark-container"},[n("div",{staticClass:"left"},[n("el-avatar",{attrs:{size:50,src:e.imgUrl}})],1),n("div",{staticClass:"right"},[n("div",{staticClass:"name"},[e._t("nickName",[e._v("Neko")])],2),n("p",[e._t("remark-content",[e._v("你好啊")])],2),n("div",{staticClass:"remark-bottom"},[n("span",{staticClass:"time"},[e._t("time",[e._v("17:00:00")])],2),n("span",[e._t("reply",[e._v(" 回复")])],2)])])])},u=[],l={name:"RemarkItem",data:function(){return{imgUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}}},f=l,g=(n("dc1f"),n("2877")),d=Object(g["a"])(f,o,u,!1,null,"4f9e812f",null),h=d.exports,p={name:"HomePage",created:function(){this.message&&this.curIndex||(this.message=this.$store.state.data,this.curIndex=[]),this.user||(this.user=[])},mounted:function(){this.curIndex.length||this.sortDate(this.message,"date"),this.pageTotal=this.message.length,this.getList(this.message,this.pageSize);this.message.map((function(e){return e.fold=!0,e.show=!1,e.name=JSON.parse(localStorage.getItem("user")).nickName,e}))},updated:function(){this.userIndex=(this.currentPage-1)*this.pageSize,console.log(this.userIndex),localStorage.setItem("userInfo",JSON.stringify(this.user))},data:function(){return{currentPage:1,pageSize:5,pageNote:[],pageAll:[],pageTotal:0,userIndex:0,views:"",user:JSON.parse(localStorage.getItem("userInfo")),currentName:"",currentTime:[],currentContent:[],name:JSON.parse(localStorage.getItem("user")).nickName,message:JSON.parse(localStorage.getItem("data")),curIndex:JSON.parse(localStorage.getItem("index")),topIndex:JSON.parse(localStorage.getItem("top")),index:0,aIndex:this.$route.query.index,agree:0,remark:0,imgUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}},methods:{isShow:function(e){var t=(this.currentPage-1)*this.pageSize+e;return this.message[t].content.length>200},changeShow:function(e){var t=(this.currentPage-1)*this.pageSize+e;this.message[t].fold=!this.message[t].fold,this.getList(this.message,this.pageSize)},getList:function(e,t){var n=[],a=0,s=Math.ceil(e.length/t*1);while(a<s)n.push(e.slice(a*this.pageSize,(a+1)*this.pageSize)),a++;this.pageNote=n[this.currentPage-1],this.pageAll=n},sortDate:function(e,t){return e.sort((function(e,n){var a=[e[t],n[t]],s=a[0],r=a[1];return s>r?-1:s<r?1:0}))},handleSizeChange:function(e){this.pageSize=e,this.getList(this.message,this.pageSize)},handleCurrentChange:function(e){this.currentPage=e,this.pageNote=this.pageAll[e-1]},readRemark:function(e){var t=(this.currentPage-1)*this.pageSize+e;this.message[t].show=!this.message[t].show,this.getList(this.message,this.pageSize)},sendMessage:function(e){this.clickIndex=e;var t=new Date,n=t.getFullYear(),a=t.getMonth()+1,s=t.getDate(),r=t.getHours(),i=t.getMinutes(),c=t.getSeconds(),o=[a,r,i,c];for(var u in o)o[u]<10&&(o[u]="0"+o[u]);if(a=o[0],r=o[1],i=o[2],c=o[3],t="".concat(n,"-").concat(a,"-").concat(s," ").concat(r,":").concat(i,":").concat(c),this.currentTime=t,this.currentContent=this.pageNote[e].text,this.pageNote[e].text="",this.currentContent){var l={time:this.currentTime,content:this.currentContent},f=JSON.parse(localStorage.getItem("userInfo"));if(0==f.length)for(var g in this.message)f[g]=[];var d=[f.length,this.message.length],h=d[0],p=d[1];if(h<p)for(var m=h-1;m<p;m++)f[m]=[];f[this.userIndex+e].push(l),this.user=f,localStorage.setItem("userInfo",JSON.stringify(this.user))}},remarkEvent:function(){console.log("回复评论")},replyEvent:function(){console.log("回复消息")}},components:{RemarkItem:h,ReplyItem:c["a"]}},m=p,v=(n("6fd3"),n("4f5e"),Object(g["a"])(m,r,i,!1,null,"10e00384",null)),_=v.exports,b={name:"Home",components:{HomePage:_}},S=b,C=Object(g["a"])(S,a,s,!1,null,null,null);t["default"]=C.exports},d81d:function(e,t,n){"use strict";var a=n("23e7"),s=n("b727").map,r=n("1dde"),i=n("ae40"),c=r("map"),o=i("map");a({target:"Array",proto:!0,forced:!c||!o},{map:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}})},dc1f:function(e,t,n){"use strict";var a=n("766c"),s=n.n(a);s.a},e8b5:function(e,t,n){var a=n("c6b6");e.exports=Array.isArray||function(e){return"Array"==a(e)}},f2a4:function(e,t,n){},fb6a:function(e,t,n){"use strict";var a=n("23e7"),s=n("861d"),r=n("e8b5"),i=n("23cb"),c=n("50c4"),o=n("fc6a"),u=n("8418"),l=n("b622"),f=n("1dde"),g=n("ae40"),d=f("slice"),h=g("slice",{ACCESSORS:!0,0:0,1:2}),p=l("species"),m=[].slice,v=Math.max;a({target:"Array",proto:!0,forced:!d||!h},{slice:function(e,t){var n,a,l,f=o(this),g=c(f.length),d=i(e,g),h=i(void 0===t?g:t,g);if(r(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!r(n.prototype)?s(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return m.call(f,d,h);for(a=new(void 0===n?Array:n)(v(h-d,0)),l=0;d<h;d++,l++)d in f&&u(a,l,f[d]);return a.length=l,a}})}}]);
//# sourceMappingURL=chunk-4964d855.3454a151.js.map