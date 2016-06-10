(function(){this.Teaspoon=function(){function t(){}return t.defer=!1,t.slow=75,t.root=window.location.pathname.replace(/\/+(index\.html)?$/,"").replace(/\/[^\/]*$/,""),t.started=!1,t.finished=!1,t.Reporters={},t.Date=Date,t.location=window.location,t.messages=[],t.execute=function(){if(!t.framework)throw"No framework registered. Expected a framework to register itself, but nothing has.";return t.defer?void(t.defer=!1):(t.started&&t.reload(),t.started=!0,new(t.resolveClass("Runner")))},t.reload=function(){return window.location.reload()},t.onWindowLoad=function(t){var e;return e=window.onload,window.onload=function(){return e&&e.call&&e(),t()}},t.resolveDependenciesFromParams=function(e){var n,s,r,o,i,p,a,u,l,c;if(null==e&&(e=[]),s=[],null===(c=t.location.search.match(/[\?&]file(\[\])?=[^&\?]*/gi)))return e;for(o=0,p=c.length;p>o;o++)if(l=c[o],u=decodeURIComponent(l.replace(/\+/g," ")).match(/\/(.+)\.(js|js.coffee|coffee)$/i),null!==u)for(r=u[1].substr(u[1].lastIndexOf("/")+1),i=0,a=e.length;a>i;i++)n=e[i],n.indexOf(r)>=0&&s.push(n);return s},t.log=function(){var e,n;t.messages.push(arguments[0]);try{return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log.apply(console,arguments):void 0}catch(n){throw e=n,new Error("Unable to use console.log for logging")}},t.getMessages=function(){var e;return e=t.messages,t.messages=[],e},t.setFramework=function(e){return t.framework=e,window.fixture=t.resolveClass("Fixture")},t.resolveClass=function(e){var n,s;if(n=t.checkNamespace(t.framework,e))return n;if(s=t.checkNamespace(t,e))return s;throw"Could not find the class you're looking for: "+e},t.checkNamespace=function(t,e){var n,s,r,o,i,p;for(i=e.split("."),p=t,n=s=0,r=i.length;r>s;n=++s)if(o=i[n],!(p=p[o]))return!1;return p},t}()}).call(this),function(){Teaspoon.Mixins||(Teaspoon.Mixins={})}.call(this),function(){Teaspoon.Mixins.FilterUrl={filterUrl:function(t){var e;return e=[],e.push("grep="+encodeURIComponent(t)),Teaspoon.params.file&&e.push("file="+Teaspoon.params.file),"?"+e.join("&")}}}.call(this),function(){Teaspoon.Utility=function(){function t(){}return t.extend=function(t,e){var n,s;for(s in e)n=e[s],t[s]=n;return t},t.include=function(t,e){return this.extend(t.prototype,e)},t}()}.call(this),function(){Teaspoon.Runner=function(){function t(){this.constructor.run||(this.constructor.run=!0,this.fixturePath=Teaspoon.root+"/fixtures",this.params=Teaspoon.params=this.getParams(),this.setup())}return t.run=!1,t.prototype.getParams=function(){var t,e,n,s,r,o,i,p;for(r={},o=Teaspoon.location.search.substring(1).split("&"),t=0,e=o.length;e>t;t++)s=o[t],i=s.split("="),n=i[0],p=i[1],r[decodeURIComponent(n)]=decodeURIComponent(p);return r},t.prototype.getReporter=function(){return this.params.reporter?this.findReporter(this.params.reporter):window.navigator.userAgent.match(/PhantomJS/)?this.findReporter("Console"):this.findReporter("HTML")},t.prototype.setup=function(){},t.prototype.findReporter=function(t){return Teaspoon.resolveClass("Reporters."+t)},t}()}.call(this),function(){var t=[].slice;Teaspoon.Fixture=function(){function e(){window.fixture.load.apply(window,arguments)}var n,s,r,o,i,p,a,u,l,c,h;return e.cache={},e.el=null,e.$el=null,e.json=[],e.preload=function(){var e,n,s,r,o;for(o=1<=arguments.length?t.call(arguments,0):[],s=[],e=0,n=o.length;n>e;e++)r=o[e],s.push(a(r));return s},e.load=function(){var e,n,s,r,o,p,a,u;for(u=2<=arguments.length?t.call(arguments,0,s=arguments.length-1):(s=0,[]),e=arguments[s++],null==e&&(e=!1),"boolean"!=typeof e&&(u.push(e),e=!1),p=[],n=r=0,o=u.length;o>r;n=++r)a=u[n],p.push(i(a,e||n>0));return p},e.set=function(){var e,n,s,r,o,i,p,a;for(s=2<=arguments.length?t.call(arguments,0,o=arguments.length-1):(o=0,[]),e=arguments[o++],null==e&&(e=!1),"boolean"!=typeof e&&(s.push(e),e=!1),a=[],r=i=0,p=s.length;p>i;r=++i)n=s[r],a.push(l(n,e||r>0));return a},e.cleanup=function(){return s()},c=null,a=function(t){return i(t,!1,!0)},i=function(t,e,n){var s,r;return null==n&&(n=!1),(s=window.fixture.cache[t])?p(t,s.type,s.content,e,n):(r=null,h(t,function(){if(4===c.readyState){if(200!==c.status)throw'Unable to load fixture "'+t+'".';return r=p(t,c.getResponseHeader("content-type"),c.responseText,e,n)}}),r)},p=function(t,s,r,o,i){return window.fixture.cache[t]={type:s,content:r},s.match(/application\/json;/)?e.json[e.json.push(JSON.parse(r))-1]:i?r:(o?n(r):u(r),window.fixture.el)},l=function(t,e){return e?n(t):u(t)},u=function(t){return s(),n(t)},n=function(t){var e,n,s,i,p;if(window.fixture.el||r(),o()){for(s=jQuery(jQuery.parseHTML(t,document,!0)),p=[],e=n=0,i=s.length;i>=0?i>n:n>i;e=i>=0?++n:--n)p.push(window.fixture.el.appendChild(s[e]));return p}return window.fixture.el.innerHTML+=t},r=function(){var t;return window.fixture.el=document.createElement("div"),o()&&(window.fixture.$el=jQuery(window.fixture.el)),window.fixture.el.id="teaspoon-fixtures",null!=(t=document.body)?t.appendChild(window.fixture.el):void 0},s=function(){var t,e,n;return(t=window.fixture).el||(t.el=document.getElementById("teaspoon-fixtures")),null!=(e=window.fixture.el)&&null!=(n=e.parentNode)&&n.removeChild(window.fixture.el),window.fixture.el=null},h=function(t,e){var n,s,r;if(window.XMLHttpRequest)c=new XMLHttpRequest;else if(window.ActiveXObject)try{c=new ActiveXObject("Msxml2.XMLHTTP")}catch(s){n=s;try{c=new ActiveXObject("Microsoft.XMLHTTP")}catch(r){n=r}}if(!c)throw"Unable to make Ajax Request";return c.onreadystatechange=e,c.open("GET",Teaspoon.root+"/fixtures/"+t,!1),c.send()},o=function(){return"function"==typeof window.jQuery},e}()}.call(this),function(){Teaspoon.hook=function(t,e){var n,s;return null==e&&(e={}),n=null,(s=function(t,e,s){var r,o,i;if(window.XMLHttpRequest)n=new XMLHttpRequest;else if(window.ActiveXObject)try{n=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){r=o;try{n=new ActiveXObject("Microsoft.XMLHTTP")}catch(i){r=i}}if(!n)throw"Unable to make Ajax Request";return n.onreadystatechange=s,n.open("POST",Teaspoon.root+"/"+t,!1),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify({args:e}))})(Teaspoon.suites.active+"/"+t,e,function(){if(4===n.readyState&&200!==n.status)throw'Unable to call hook "'+url+'".'})}}.call(this),function(){Teaspoon.Spec=function(){function t(){}return Teaspoon.Utility.include(t,Teaspoon.Mixins.FilterUrl),t}()}.call(this),function(){Teaspoon.Suite=function(){function t(){}return Teaspoon.Utility.include(t,Teaspoon.Mixins.FilterUrl),t}()}.call(this),function(){Teaspoon.Reporters.BaseView=function(){function t(){this.elements={},this.build()}return t.prototype.build=function(t){return this.el=this.createEl("li",t)},t.prototype.appendTo=function(t){return t.appendChild(this.el)},t.prototype.append=function(t){return this.el.appendChild(t)},t.prototype.createEl=function(t,e){var n;return null==e&&(e=""),n=document.createElement(t),n.className=e,n},t.prototype.findEl=function(t){var e;return this.elements||(this.elements={}),(e=this.elements)[t]||(e[t]=document.getElementById("teaspoon-"+t))},t.prototype.setText=function(t,e){var n;return n=this.findEl(t),n.innerHTML=e},t.prototype.setHtml=function(t,e,n){var s;return null==n&&(n=!1),s=this.findEl(t),n?s.innerHTML+=e:s.innerHTML=e},t.prototype.setClass=function(t,e){var n;return n=this.findEl(t),n.className=e},t.prototype.htmlSafe=function(t){var e;return e=document.createElement("div"),e.appendChild(document.createTextNode(t)),e.innerHTML},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function s(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},n={}.hasOwnProperty;Teaspoon.Reporters.HTML=function(n){function s(){this.changeSuite=t(this.changeSuite,this),this.toggleConfig=t(this.toggleConfig,this),this.reportRunnerResults=t(this.reportRunnerResults,this),this.start=(new Teaspoon.Date).getTime(),this.config={"use-catch":!0,"build-full-report":!1,"display-progress":!0},this.total={exist:0,run:0,passes:0,failures:0,skipped:0},this.views={specs:{},suites:{}},this.filters=[],this.setFilters(),this.readConfig(),s.__super__.constructor.apply(this,arguments)}return e(s,n),s.prototype.build=function(){var t;return this.buildLayout(),this.setText("env-info",this.envInfo()),this.setText("version",Teaspoon.version),this.findEl("toggles").onclick=this.toggleConfig,this.findEl("suites").innerHTML=this.buildSuiteSelect(),null!=(t=this.findEl("suite-select"))&&(t.onchange=this.changeSuite),this.el=this.findEl("report-all"),this.showConfiguration(),this.buildProgress(),this.buildFilters()},s.prototype.reportRunnerStarting=function(t){return this.total.exist=t.total||0,this.total.exist?this.setText("stats-duration","..."):void 0},s.prototype.reportRunnerResults=function(){return this.total.run?(this.setText("stats-duration",this.elapsedTime()),this.total.failures||this.setStatus("passed"),this.setText("stats-passes",this.total.passes),this.setText("stats-failures",this.total.failures),this.total.run<this.total.exist&&(this.total.skipped=this.total.exist-this.total.run+this.total.skipped,this.total.run=this.total.exist),this.setText("stats-skipped",this.total.skipped),this.updateProgress()):void 0},s.prototype.reportSuiteStarting=function(){},s.prototype.reportSuiteResults=function(){},s.prototype.reportSpecStarting=function(t){return this.config["build-full-report"]&&(this.reportView=new(Teaspoon.resolveClass("Reporters.HTML.SpecView"))(t,this)),this.specStart=(new Teaspoon.Date).getTime()},s.prototype.reportSpecResults=function(t){return this.total.run+=1,this.updateProgress(),this.updateStatus(t),delete this.reportView},s.prototype.buildLayout=function(){var t;return t=this.createEl("div"),t.id="teaspoon-interface",t.innerHTML=Teaspoon.resolveClass("Reporters.HTML").template(),document.body.appendChild(t)},s.prototype.buildSuiteSelect=function(){var t,e,n,s,r,o,i,p;if(1===Teaspoon.suites.all.length)return"";for(t="",/index\.html$/.test(window.location.pathname)&&(t="/index.html"),s=[],o=Teaspoon.suites.all,e=0,n=o.length;n>e;e++)p=o[e],r=[Teaspoon.root,p].join("/"),i=Teaspoon.suites.active===p?" selected":"",s.push("<option"+i+' value="'+r+t+'">'+p+"</option>");return'<select id="teaspoon-suite-select">'+s.join("")+"</select>"},s.prototype.buildProgress=function(){return this.progress=Teaspoon.Reporters.HTML.ProgressView.create(this.config["display-progress"]),this.progress.appendTo(this.findEl("progress"))},s.prototype.buildFilters=function(){return this.filters.length&&this.setClass("filter","teaspoon-filtered"),this.setHtml("filter-list","<li>"+this.filters.join("</li><li>"),!0)},s.prototype.elapsedTime=function(){return(((new Teaspoon.Date).getTime()-this.start)/1e3).toFixed(3)+"s"},s.prototype.updateStat=function(t,e){return this.config["display-progress"]?this.setText("stats-"+t,e):void 0},s.prototype.updateStatus=function(t){var e,n,s;return e=(new Teaspoon.Date).getTime()-this.specStart,null!=(n=this.reportView)&&n.updateState(t,e),s=t.result(),"pending"===s.status?this.updateStat("skipped",this.total.skipped+=1):"failed"===s.status?(this.updateStat("failures",this.total.failures+=1),this.config["build-full-report"]||new(Teaspoon.resolveClass("Reporters.HTML.FailureView"))(t).appendTo(this.findEl("report-failures")),this.setStatus("failed")):s.skipped?this.updateStat("skipped",this.total.skipped+=1):this.updateStat("passes",this.total.passes+=1)},s.prototype.updateProgress=function(){return this.progress.update(this.total.exist,this.total.run)},s.prototype.showConfiguration=function(){var t,e,n,s;e=this.config,n=[];for(t in e)s=e[t],n.push(this.setClass(t,s?"active":""));return n},s.prototype.setStatus=function(t){return document.body.className="teaspoon-"+t},s.prototype.setFilters=function(){return Teaspoon.params.file&&this.filters.push("by file: "+Teaspoon.params.file),Teaspoon.params.grep?this.filters.push("by match: "+Teaspoon.params.grep):void 0},s.prototype.readConfig=function(){var t;return(t=this.store("teaspoon"))?this.config=t:void 0},s.prototype.toggleConfig=function(t){var e,n;return e=t.target,"button"===e.tagName.toLowerCase()?(n=e.getAttribute("id").replace(/^teaspoon-/,""),this.config[n]=!this.config[n],this.store("teaspoon",this.config),Teaspoon.reload()):void 0},s.prototype.changeSuite=function(t){var e;return e=t.target.options,window.location.href=e[e.selectedIndex].value},s.prototype.store=function(t,e){var n;return null!=(null!=(n=window.localStorage)?n.setItem:void 0)?this.localstore(t,e):this.cookie(t,e)},s.prototype.cookie=function(t,e){var n,s;return null==e&&(e=void 0),void 0===e?(t=t.replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),s=document.cookie.match(new RegExp("(?:^|;)\\s?"+t+"=(.*?)(?:;|$)","i")),s&&JSON.parse(unescape(s[1]).split(" ")[0])):(n=new Teaspoon.Date,n.setDate(n.getDate()+365),document.cookie=t+"="+escape(JSON.stringify(e))+"; expires="+n.toUTCString()+"; path=/;")},s.prototype.localstore=function(t,e){return null==e&&(e=void 0),void 0===e?JSON.parse(unescape(localStorage.getItem(t))):localStorage.setItem(t,escape(JSON.stringify(e)))},s}(Teaspoon.Reporters.BaseView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.FailureView=function(e){function n(t){this.spec=t,n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.build=function(){var t,e,s,r,o;for(n.__super__.build.call(this,"spec"),e='<h1 class="teaspoon-clearfix"><a href="'+this.spec.link+'">'+this.htmlSafe(this.spec.fullDescription)+"</a></h1>",o=this.spec.errors(),s=0,r=o.length;r>s;s++)t=o[s],e+="<div><strong>"+this.htmlSafe(t.message)+"</strong><br/>"+this.htmlSafe(t.stack||"Stack trace unavailable")+"</div>";return this.el.innerHTML=e},n}(Teaspoon.Reporters.BaseView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.ProgressView=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.create=function(t){return null==t&&(t=!0),t?Teaspoon.Reporters.HTML.RadialProgressView.supported?new Teaspoon.Reporters.HTML.RadialProgressView:new Teaspoon.Reporters.HTML.SimpleProgressView:new Teaspoon.Reporters.HTML.ProgressView},n.prototype.build=function(){return this.el=this.createEl("div","teaspoon-indicator teaspoon-logo")},n.prototype.update=function(){},n}(Teaspoon.Reporters.BaseView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.RadialProgressView=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.supported=!!document.createElement("canvas").getContext,n.prototype.build=function(){return this.el=this.createEl("div","teaspoon-indicator radial-progress"),this.el.innerHTML='<canvas id="teaspoon-progress-canvas"></canvas>\n<em id="teaspoon-progress-percent">0%</em>'},n.prototype.appendTo=function(){var t,e,s;n.__super__.appendTo.apply(this,arguments),this.size=80;try{return t=this.findEl("progress-canvas"),t.width=t.height=t.style.width=t.style.height=this.size,this.ctx=t.getContext("2d"),this.ctx.strokeStyle="#fff",this.ctx.lineWidth=1.5}catch(s){e=s}},n.prototype.update=function(t,e){var n,s;return s=t?Math.ceil(100*e/t):0,this.setHtml("progress-percent",s+"%"),this.ctx?(n=this.size/2,this.ctx.clearRect(0,0,this.size,this.size),this.ctx.beginPath(),this.ctx.arc(n,n,n-1,0,2*Math.PI*(s/100),!1),this.ctx.stroke()):void 0},n}(Teaspoon.Reporters.HTML.ProgressView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.SimpleProgressView=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.build=function(){return this.el=this.createEl("div","simple-progress"),this.el.innerHTML='<em id="teaspoon-progress-percent">0%</em>\n<span id="teaspoon-progress-span" class="teaspoon-indicator"></span>'},n.prototype.update=function(t,e){var n;return n=t?Math.ceil(100*e/t):0,this.setHtml("progress-percent",n+"%")},n}(Teaspoon.Reporters.HTML.ProgressView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.SpecView=function(e){function n(t,e){this.spec=t,this.reporter=e,this.views=this.reporter.views,this.spec.viewId=s+=1,this.views.specs[this.spec.viewId]=this,n.__super__.constructor.apply(this,arguments)}var s;return t(n,e),s=0,n.prototype.build=function(){var t;return t=["spec"],this.spec.pending&&t.push("state-pending"),n.__super__.build.call(this,t.join(" ")),this.el.innerHTML='<a href="'+this.spec.link+'">'+this.htmlSafe(this.spec.description)+"</a>",this.parentView=this.buildParent(),this.parentView.append(this.el)},n.prototype.buildParent=function(){var t,e;return t=this.spec.parent,t?t.viewId?this.views.suites[t.viewId]:(e=new(Teaspoon.resolveClass("Reporters.HTML.SuiteView"))(t,this.reporter),this.views.suites[e.suite.viewId]=e):this.reporter},n.prototype.buildErrors=function(){var t,e,n,s,r,o;for(t=this.createEl("div"),n="",o=this.spec.errors(),s=0,r=o.length;r>s;s++)e=o[s],n+="<strong>"+this.htmlSafe(e.message)+"</strong><br/>"+this.htmlSafe(e.stack||"Stack trace unavailable");return t.innerHTML=n,this.append(t)},n.prototype.updateState=function(t,e){var n;return n=t.result(),this.clearClasses(),"pending"===n.status?this.updatePending(t,e):"failed"===n.status?this.updateFailed(t,e):n.skipped?this.updateDisabled(t,e):this.updatePassed(t,e)},n.prototype.updatePassed=function(t,e){return this.addStatusClass("passed"),e>Teaspoon.slow&&this.addClass("slow"),this.el.innerHTML+="<span>"+e+"ms</span>"},n.prototype.updateFailed=function(){var t;return this.addStatusClass("failed"),this.buildErrors(),"function"==typeof(t=this.parentView).updateState?t.updateState("failed"):void 0},n.prototype.updatePending=function(){return this.addStatusClass("pending")},n.prototype.updateDisabled=function(){},n.prototype.clearClasses=function(){return this.el.className=""},n.prototype.addStatusClass=function(t){return this.addClass("state-"+t)},n.prototype.addClass=function(t){return this.el.className+=" "+t},n}(Teaspoon.Reporters.BaseView)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Reporters.HTML.SuiteView=function(e){function n(t,e){this.suite=t,this.reporter=e,this.views=this.reporter.views,this.suite.viewId=s+=1,this.views.suites[this.suite.viewId]=this,this.suite=new(Teaspoon.resolveClass("Suite"))(this.suite),n.__super__.constructor.apply(this,arguments)}var s;return t(n,e),s=0,n.prototype.build=function(){return n.__super__.build.call(this,"suite"),this.el.innerHTML='<h1><a href="'+this.suite.link+'">'+this.htmlSafe(this.suite.description)+"</a></h1>",this.parentView=this.buildParent(),this.parentView.append(this.el)},n.prototype.buildParent=function(){var t,e;return t=this.suite.parent,t?t.viewId?this.views.suites[t.viewId]:(e=new(Teaspoon.resolveClass("Reporters.HTML.SuiteView"))(t,this.reporter),this.views.suites[e.suite.viewId]=e):this.reporter},n.prototype.append=function(t){return this.ol||n.__super__.append.call(this,this.ol=this.createEl("ol")),this.ol.appendChild(t)},n.prototype.updateState=function(t){var e;if("failed"!==this.state)return this.el.className=this.el.className.replace(/\s?state-\w+/,"")+" state-"+t,"function"==typeof(e=this.parentView).updateState&&e.updateState(t),this.state=t},n}(Teaspoon.Reporters.BaseView)}.call(this),function(){Teaspoon.Reporters.HTML.template=function(){return'<div class="teaspoon-clearfix">\n  <div id="teaspoon-title">\n    <h1><a href="'+Teaspoon.root+'" id="teaspoon-root-link">Teaspoon</a></h1>\n    <ul>\n      <li>version: <b id="teaspoon-version"></b></li>\n      <li id="teaspoon-env-info"></li>\n    </ul>\n  </div>\n  <div id="teaspoon-progress"></div>\n  <ul id="teaspoon-stats">\n    <li>passes: <b id="teaspoon-stats-passes">0</b></li>\n    <li>failures: <b id="teaspoon-stats-failures">0</b></li>\n    <li>skipped: <b id="teaspoon-stats-skipped">0</b></li>\n    <li>duration: <b id="teaspoon-stats-duration">&infin;</b></li>\n  </ul>\n</div>\n\n<div id="teaspoon-controls" class="teaspoon-clearfix">\n  <div id="teaspoon-toggles">\n    <button id="teaspoon-use-catch" title="Toggle using try/catch wrappers when possible">Try/Catch</button>\n    <button id="teaspoon-build-full-report" title="Toggle building the full report">Full Report</button>\n    <button id="teaspoon-display-progress" title="Toggle displaying progress as tests run">Progress</button>\n  </div>\n  <div id="teaspoon-suites"></div>\n</div>\n\n<hr/>\n\n<div id="teaspoon-filter">\n  <h1>Applied Filters [<a href="'+window.location.pathname+'" id="teaspoon-filter-clear">remove</a>]</h1>\n  <ul id="teaspoon-filter-list"></ul>\n</div>\n\n<div id="teaspoon-report">\n  <ol id="teaspoon-report-failures"></ol>\n  <ol id="teaspoon-report-all"></ol>\n</div>'}}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Teaspoon.Reporters.Console=function(){function e(){this.reportRunnerResults=t(this.reportRunnerResults,this),this.start=new Teaspoon.Date,this.suites={}}return e.prototype.reportRunnerStarting=function(t){return this.log({type:"runner",total:t.total||("function"==typeof t.specs?t.specs().length:void 0)||0,start:JSON.parse(JSON.stringify(this.start))})},e.prototype.reportRunnerResults=function(){return this.log({type:"result",elapsed:(((new Teaspoon.Date).getTime()-this.start.getTime())/1e3).toFixed(5),coverage:window.__coverage__}),Teaspoon.finished=!0},e.prototype.reportSuiteStarting=function(){},e.prototype.reportSuiteResults=function(){},e.prototype.reportSpecStarting=function(){},e.prototype.reportSuites=function(){var t,e,n,s,r,o;for(s=this.spec.getParents(),r=[],e=t=0,n=s.length;n>t;e=++t)o=s[e],this.suites[o.fullDescription]||(this.suites[o.fullDescription]=!0,r.push(this.log({type:"suite",label:o.description,level:e})));return r},e.prototype.reportSpecResults=function(t){var e;return this.spec=t,e=this.spec.result(),"pending"===e.status?this.trackPending(this.spec):"failed"===e.status?this.trackFailed(this.spec):e.skipped?this.trackDisabled(this.spec):this.trackPassed(this.spec)},e.prototype.trackPending=function(t){var e;return this.reportSuites(),e=t.result(),this.log({type:"spec",suite:t.suiteName,label:t.description,status:e.status,skipped:e.skipped})},e.prototype.trackFailed=function(t){var e,n,s,r,o,i;for(this.reportSuites(),o=t.result(),r=t.errors(),i=[],n=0,s=r.length;s>n;n++)e=r[n],i.push(this.log({type:"spec",suite:t.suiteName,label:t.description,status:o.status,skipped:o.skipped,link:t.fullDescription,message:e.message,trace:e.stack||e.message||"Stack Trace Unavailable"}));return i},e.prototype.trackDisabled=function(){},e.prototype.trackPassed=function(t,e){return this.reportSuites(),e=t.result(),this.log({type:"spec",suite:t.suiteName,label:t.description,status:e.status,skipped:e.skipped})},e.prototype.log=function(t){return null==t&&(t={}),t._teaspoon=!0,Teaspoon.log(JSON.stringify(t))},e}()}.call(this),function(){var t,e;if("undefined"==typeof jasmine||null===jasmine)throw new Teaspoon.Error("Jasmine 1 not found -- use `suite.use_framework :jasmine` and adjust or remove the `suite.javascripts` directive.");null==this.Teaspoon&&(this.Teaspoon={}),null==(t=this.Teaspoon).Jasmine1&&(t.Jasmine1={}),null==(e=this.Teaspoon.Jasmine1).Reporters&&(e.Reporters={})}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Jasmine1.Fixture=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.load=function(){var t;if(t=arguments,!this.env().currentSuite&&!this.env().currentSpec)throw"Teaspoon can't load fixtures outside of describe.";return this.env().currentSuite?(this.env().beforeEach(function(e){return function(){return fixture.__super__.constructor.load.apply(e,t)}}(this)),this.env().afterEach(function(t){return function(){return t.cleanup()}}(this)),n.__super__.constructor.load.apply(this,arguments)):(this.env().currentSpec.after(function(t){return function(){return t.cleanup()}}(this)),n.__super__.constructor.load.apply(this,arguments))},n.set=function(){var t;if(t=arguments,!this.env().currentSuite&&!this.env().currentSpec)throw"Teaspoon can't load fixtures outside of describe.";return this.env().currentSuite?(this.env().beforeEach(function(e){return function(){return fixture.__super__.constructor.set.apply(e,t)}}(this)),this.env().afterEach(function(t){return function(){return t.cleanup()}}(this)),n.__super__.constructor.set.apply(this,arguments)):(this.env().currentSpec.after(function(t){return function(){return t.cleanup()}}(this)),n.__super__.constructor.set.apply(this,arguments))},n.env=function(){return window.jasmine.getEnv()},n}(Teaspoon.Fixture)}.call(this),function(){Teaspoon.setFramework(Teaspoon.Jasmine1)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Jasmine1.Reporters.HTML=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return t(n,e),n.prototype.readConfig=function(){return n.__super__.readConfig.apply(this,arguments),jasmine.CATCH_EXCEPTIONS=this.config["use-catch"]},n.prototype.envInfo=function(){var t,e;return t=jasmine.getEnv().version(),e=[t.major,t.minor,t.build].join("."),"jasmine "+e+" revision "+t.revision},n}(Teaspoon.Reporters.HTML)}.call(this),function(){Teaspoon.Jasmine1.Responder=function(){function t(t){this.reporter=t}return t.prototype.reportRunnerStarting=function(t){return this.reporter.reportRunnerStarting({total:t.specs().length})},t.prototype.reportRunnerResults=function(){return this.reporter.reportRunnerResults()},t.prototype.reportSuiteResults=function(t){return this.reporter.reportSuiteResults(new Teaspoon.Jasmine1.Suite(t))},t.prototype.reportSpecStarting=function(t){return this.reporter.reportSpecStarting(new Teaspoon.Jasmine1.Spec(t))},t.prototype.reportSpecResults=function(t){return this.reporter.reportSpecResults(new Teaspoon.Jasmine1.Spec(t))},t}()}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Jasmine1.Runner=function(e){function n(){this.env=window.jasmine.getEnv(),n.__super__.constructor.apply(this,arguments),this.env.execute()}return t(n,e),n.prototype.setup=function(){var t,e,n;return this.env.updateInterval=1e3,(t=this.params.grep)&&(this.env.specFilter=function(e){return 0===e.getFullName().indexOf(t)}),e=new(this.getReporter()),n=new Teaspoon.Jasmine1.Responder(e),this.env.addReporter(n),this.addFixtureSupport()},n.prototype.addFixtureSupport=function(){return jasmine.getFixtures&&this.fixturePath?(jasmine.getFixtures().containerId="teaspoon-fixtures",jasmine.getFixtures().fixturesPath=this.fixturePath,jasmine.getStyleFixtures().fixturesPath=this.fixturePath,jasmine.getJSONFixtures().fixturesPath=this.fixturePath):void 0},n}(Teaspoon.Runner)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Jasmine1.Spec=function(e){function n(t){this.spec=t,this.fullDescription=this.spec.getFullName(),this.description=this.spec.description,this.link=this.filterUrl(this.fullDescription),this.parent=this.spec.suite,this.suiteName=this.parent.getFullName(),this.viewId=this.spec.viewId,this.pending=this.spec.pending}return t(n,e),n.prototype.errors=function(){var t,e,n,s,r;if(!this.spec.results)return[];for(s=this.spec.results().getItems(),r=[],t=0,n=s.length;n>t;t++)e=s[t],e.passed()||r.push({message:e.message,stack:e.trace.stack});return r},n.prototype.getParents=function(){var t;if(this.parents)return this.parents;for(this.parents||(this.parents=[]),t=this.parent;t;)t=new Teaspoon.Jasmine1.Suite(t),this.parents.unshift(t),t=t.parent;return this.parents},n.prototype.result=function(){var t,e;return t=this.spec.results(),e="failed",t.passed()&&(e="passed"),this.spec.pending&&(e="pending"),{status:e,skipped:t.skipped}},n}(Teaspoon.Spec)}.call(this),function(){var t=function(t,n){function s(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return s.prototype=n.prototype,t.prototype=new s,t.__super__=n.prototype,t},e={}.hasOwnProperty;Teaspoon.Jasmine1.Suite=function(e){function n(t){this.suite=t,this.fullDescription=this.suite.getFullName(),this.description=this.suite.description,this.link=this.filterUrl(this.fullDescription),this.parent=this.suite.parentSuite,this.viewId=this.suite.viewId}return t(n,e),n}(Teaspoon.Suite)}.call(this);