(function(){var n=[].slice;Teaspoon.Fixture=function(){function t(){window.fixture.load.apply(window,arguments)}var e,r,o,u,i,c,l,a,f,s,p;return t.cache={},t.el=null,t.$el=null,t.json=[],t.preload=function(){var t,e,r,o,u;for(u=1<=arguments.length?n.call(arguments,0):[],r=[],t=0,e=u.length;e>t;t++)o=u[t],r.push(l(o));return r},t.load=function(){var t,e,r,o,u,c,l,a;for(a=2<=arguments.length?n.call(arguments,0,r=arguments.length-1):(r=0,[]),t=arguments[r++],null==t&&(t=!1),"boolean"!=typeof t&&(a.push(t),t=!1),c=[],e=o=0,u=a.length;u>o;e=++o)l=a[e],c.push(i(l,t||e>0));return c},t.set=function(){var t,e,r,o,u,i,c,l;for(r=2<=arguments.length?n.call(arguments,0,u=arguments.length-1):(u=0,[]),t=arguments[u++],null==t&&(t=!1),"boolean"!=typeof t&&(r.push(t),t=!1),l=[],o=i=0,c=r.length;c>i;o=++i)e=r[o],l.push(f(e,t||o>0));return l},t.cleanup=function(){return r()},s=null,l=function(n){return i(n,!1,!0)},i=function(n,t,e){var r,o;return null==e&&(e=!1),(r=window.fixture.cache[n])?c(n,r.type,r.content,t,e):(o=null,p(n,function(){if(4===s.readyState){if(200!==s.status)throw'Unable to load fixture "'+n+'".';return o=c(n,s.getResponseHeader("content-type"),s.responseText,t,e)}}),o)},c=function(n,r,o,u,i){return window.fixture.cache[n]={type:r,content:o},r.match(/application\/json;/)?t.json[t.json.push(JSON.parse(o))-1]:i?o:(u?e(o):a(o),window.fixture.el)},f=function(n,t){return t?e(n):a(n)},a=function(n){return r(),e(n)},e=function(n){var t,e,r,i,c;if(window.fixture.el||o(),u()){for(r=jQuery(jQuery.parseHTML(n,document,!0)),c=[],t=e=0,i=r.length;i>=0?i>e:e>i;t=i>=0?++e:--e)c.push(window.fixture.el.appendChild(r[t]));return c}return window.fixture.el.innerHTML+=n},o=function(){var n;return window.fixture.el=document.createElement("div"),u()&&(window.fixture.$el=jQuery(window.fixture.el)),window.fixture.el.id="teaspoon-fixtures",null!=(n=document.body)?n.appendChild(window.fixture.el):void 0},r=function(){var n,t,e;return(n=window.fixture).el||(n.el=document.getElementById("teaspoon-fixtures")),null!=(t=window.fixture.el)&&null!=(e=t.parentNode)&&e.removeChild(window.fixture.el),window.fixture.el=null},p=function(n,t){var e,r,o;if(window.XMLHttpRequest)s=new XMLHttpRequest;else if(window.ActiveXObject)try{s=new ActiveXObject("Msxml2.XMLHTTP")}catch(r){e=r;try{s=new ActiveXObject("Microsoft.XMLHTTP")}catch(o){e=o}}if(!s)throw"Unable to make Ajax Request";return s.onreadystatechange=t,s.open("GET",Teaspoon.root+"/fixtures/"+n,!1),s.send()},u=function(){return"function"==typeof window.jQuery},t}()}).call(this),function(){var n=function(n,e){function r(){this.constructor=n}for(var o in e)t.call(e,o)&&(n[o]=e[o]);return r.prototype=e.prototype,n.prototype=new r,n.__super__=e.prototype,n},t={}.hasOwnProperty;Teaspoon.Jasmine2.Fixture=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return n(e,t),e.load=function(){var n;return n=arguments,this.env().beforeEach(function(t){return function(){return fixture.__super__.constructor.load.apply(t,n)}}(this)),this.env().afterEach(function(n){return function(){return n.cleanup()}}(this)),e.__super__.constructor.load.apply(this,arguments)},e.set=function(){var n;return n=arguments,this.env().beforeEach(function(t){return function(){return fixture.__super__.constructor.set.apply(t,n)}}(this)),this.env().afterEach(function(n){return function(){return n.cleanup()}}(this)),e.__super__.constructor.set.apply(this,arguments)},e.env=function(){return window.jasmine.getEnv()},e}(Teaspoon.Fixture)}.call(this);