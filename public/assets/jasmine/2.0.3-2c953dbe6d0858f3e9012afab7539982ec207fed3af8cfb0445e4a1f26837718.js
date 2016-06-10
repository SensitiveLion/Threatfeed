/*
Copyright (c) 2008-2014 Pivotal Labs

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function getJasmineRequireObj(){return"undefined"!=typeof module&&module.exports?exports:(window.jasmineRequire=window.jasmineRequire||{},window.jasmineRequire)}getJasmineRequireObj().core=function(t){var e={};return t.base(e),e.util=t.util(),e.Any=t.Any(),e.CallTracker=t.CallTracker(),e.MockDate=t.MockDate(),e.Clock=t.Clock(),e.DelayedFunctionScheduler=t.DelayedFunctionScheduler(),e.Env=t.Env(e),e.ExceptionFormatter=t.ExceptionFormatter(),e.Expectation=t.Expectation(),e.buildExpectationResult=t.buildExpectationResult(),e.JsApiReporter=t.JsApiReporter(),e.matchersUtil=t.matchersUtil(e),e.ObjectContaining=t.ObjectContaining(e),e.pp=t.pp(e),e.QueueRunner=t.QueueRunner(e),e.ReportDispatcher=t.ReportDispatcher(),e.Spec=t.Spec(e),e.SpyStrategy=t.SpyStrategy(),e.Suite=t.Suite(),e.Timer=t.Timer(),e.version=t.version(),e.matchers=t.requireMatchers(t,e),e},getJasmineRequireObj().requireMatchers=function(t,e){for(var n=["toBe","toBeCloseTo","toBeDefined","toBeFalsy","toBeGreaterThan","toBeLessThan","toBeNaN","toBeNull","toBeTruthy","toBeUndefined","toContain","toEqual","toHaveBeenCalled","toHaveBeenCalledWith","toMatch","toThrow","toThrowError"],r={},i=0;i<n.length;i++){var o=n[i];r[o]=t[o](e)}return r},getJasmineRequireObj().base=function(t){return"undefined"!=typeof module&&module.exports&&(t=global),function(e){e.unimplementedMethod_=function(){throw new Error("unimplemented method")},e.MAX_PRETTY_PRINT_DEPTH=40,e.MAX_PRETTY_PRINT_ARRAY_LENGTH=100,e.DEFAULT_TIMEOUT_INTERVAL=5e3,e.getGlobal=function(){return t},e.getEnv=function(t){var n=e.currentEnv_=e.currentEnv_||new e.Env(t);return n},e.isArray_=function(t){return e.isA_("Array",t)},e.isString_=function(t){return e.isA_("String",t)},e.isNumber_=function(t){return e.isA_("Number",t)},e.isA_=function(t,e){return Object.prototype.toString.apply(e)==="[object "+t+"]"},e.isDomNode=function(t){return t.nodeType>0},e.any=function(t){return new e.Any(t)},e.objectContaining=function(t){return new e.ObjectContaining(t)},e.createSpy=function(t,n){var r=new e.SpyStrategy({name:t,fn:n,getSpy:function(){return o}}),i=new e.CallTracker,o=function(){return i.track({object:this,args:Array.prototype.slice.apply(arguments)}),r.exec.apply(this,arguments)};for(var u in n){if("and"===u||"calls"===u)throw new Error("Jasmine spies would overwrite the 'and' and 'calls' properties on the object being spied upon");o[u]=n[u]}return o.and=r,o.calls=i,o},e.isSpy=function(t){return t?t.and instanceof e.SpyStrategy&&t.calls instanceof e.CallTracker:!1},e.createSpyObj=function(t,n){if(!e.isArray_(n)||0===n.length)throw"createSpyObj requires a non-empty array of method names to create spies for";for(var r={},i=0;i<n.length;i++)r[n[i]]=e.createSpy(t+"."+n[i]);return r}}}(this),getJasmineRequireObj().util=function(){var t={};return t.inherit=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n},t.htmlEscape=function(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):t},t.argsToArray=function(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e},t.isUndefined=function(t){return void 0===t},t.arrayContains=function(t,e){for(var n=t.length;n--;)if(t[n]==e)return!0;return!1},t},getJasmineRequireObj().Spec=function(){function t(t){this.expectationFactory=t.expectationFactory,this.resultCallback=t.resultCallback||function(){},this.id=t.id,this.description=t.description||"",this.fn=t.fn,this.beforeFns=t.beforeFns||function(){return[]},this.afterFns=t.afterFns||function(){return[]},this.onStart=t.onStart||function(){},this.exceptionFormatter=t.exceptionFormatter||function(){},this.getSpecName=t.getSpecName||function(){return""},this.expectationResultFactory=t.expectationResultFactory||function(){},this.queueRunnerFactory=t.queueRunnerFactory||function(){},this.catchingExceptions=t.catchingExceptions||function(){return!0},this.fn||this.pend(),this.result={id:this.id,description:this.description,fullName:this.getFullName(),failedExpectations:[],passedExpectations:[]}}return t.prototype.addExpectationResult=function(t,e){var n=this.expectationResultFactory(e);t?this.result.passedExpectations.push(n):this.result.failedExpectations.push(n)},t.prototype.expect=function(t){return this.expectationFactory(t,this)},t.prototype.execute=function(e){function n(e){return t.isPendingSpecException(e)?void i.pend():void i.addExpectationResult(!1,{matcherName:"",passed:!1,expected:"",actual:"",error:e})}function r(){i.result.status=i.status(),i.resultCallback(i.result),e&&e()}var i=this;if(this.onStart(this),this.markedPending||this.disabled)return void r();var o=this.beforeFns().concat(this.fn).concat(this.afterFns());this.queueRunnerFactory({fns:o,onException:n,onComplete:r,enforceTimeout:function(){return!0}})},t.prototype.disable=function(){this.disabled=!0},t.prototype.pend=function(){this.markedPending=!0},t.prototype.status=function(){return this.disabled?"disabled":this.markedPending?"pending":this.result.failedExpectations.length>0?"failed":"passed"},t.prototype.getFullName=function(){return this.getSpecName(this)},t.pendingSpecExceptionMessage="=> marked Pending",t.isPendingSpecException=function(e){return!(!e||!e.toString||-1===e.toString().indexOf(t.pendingSpecExceptionMessage))},t},void 0==typeof window&&"object"==typeof exports&&(exports.Spec=jasmineRequire.Spec),getJasmineRequireObj().Env=function(t){function e(e){function n(t){O++,O>=F?(O=0,s(t,0)):t()}e=e||{};var r=this,i=e.global||t.getGlobal(),o=0,u=!0,s=t.getGlobal().setTimeout,a=t.getGlobal().clearTimeout;this.clock=new t.Clock(i,new t.DelayedFunctionScheduler,new t.MockDate(i));var c={},p=[],l=null,f=null,h=new t.ReportDispatcher(["jasmineStarted","jasmineDone","suiteStarted","suiteDone","specStarted","specDone"]);this.specFilter=function(){return!0};var d=[];this.addCustomEqualityTester=function(t){d.push(t)},t.Expectation.addCoreMatchers(t.matchers);var m=0,g=function(){return"spec"+m++},y=0,b=function(){return"suite"+y++},v=function(e,n){function r(t,e){return n.addExpectationResult(t,e)}return t.Expectation.Factory({util:t.matchersUtil,customEqualityTesters:d,actual:e,addExpectationResult:r})},E=function(t){l=t,h.specStarted(t.result)},w=function(t){return function(){for(var e=[];t;)e=e.concat(t.beforeFns),t=t.parentSuite;return e.reverse()}},x=function(t){return function(){for(var e=[];t;)e=e.concat(t.afterFns),t=t.parentSuite;return e}},S=function(t,e){return e.getFullName()+" "+t.description},T=t.buildExpectationResult,j=new t.ExceptionFormatter,R=function(t){return t.messageFormatter=j.message,t.stackFormatter=j.stack,T(t)};this.catchExceptions=function(t){return u=!!t},this.catchingExceptions=function(){return u};var F=20,O=0,k=function(e){return t.Spec.isPendingSpecException(e)||u},q=function(e){e.catchException=k,e.clearStack=e.clearStack||n,e.timer={setTimeout:s,clearTimeout:a},new t.QueueRunner(e).execute()},C=new t.Suite({env:this,id:b(),description:"Jasmine__TopLevel__Suite",queueRunner:q,resultCallback:function(){}});c[C.id]=C,f=C,this.topSuite=function(){return C},this.execute=function(t){t=t||[C.id];for(var e=[],n=0;n<t.length;n++){var r=c[t[n]];e.push(function(t){return function(e){t.execute(e)}}(r))}h.jasmineStarted({totalSpecsDefined:o}),q({fns:e,onComplete:h.jasmineDone})},this.addReporter=function(t){h.addReporter(t)},this.addMatchers=function(e){t.Expectation.addMatchers(e)},this.spyOn=function(e,n){if(t.util.isUndefined(e))throw new Error("spyOn could not find an object to spy upon for "+n+"()");if(t.util.isUndefined(e[n]))throw new Error(n+"() method does not exist");if(e[n]&&t.isSpy(e[n]))throw new Error(n+" has already been spied upon");var r=t.createSpy(n,e[n]);return p.push({spy:r,baseObj:e,methodName:n,originalValue:e[n]}),e[n]=r,r};var A=function(e){var n=new t.Suite({env:r,id:b(),description:e,parentSuite:f,queueRunner:q,onStart:N,resultCallback:function(t){h.suiteDone(t)}});return c[n.id]=n,n};this.describe=function(t,e){var n=A(t),r=f;r.addChild(n),f=n;var i=null;try{e.call(n)}catch(o){i=o}return i&&this.it("encountered a declaration exception",function(){throw i}),f=r,n},this.xdescribe=function(t,e){var n=this.describe(t,e);return n.disable(),n};var _=function(e,n,i){function u(){for(var t=0;t<p.length;t++){var e=p[t];e.baseObj[e.methodName]=e.originalValue}p=[]}function s(e){u(),t.Expectation.resetMatchers(),d=[],l=null,h.specDone(e)}o++;var a=new t.Spec({id:g(),beforeFns:w(i),afterFns:x(i),expectationFactory:v,exceptionFormatter:j,resultCallback:s,getSpecName:function(t){return S(t,i)},onStart:E,description:e,expectationResultFactory:R,queueRunnerFactory:q,fn:n});return c[a.id]=a,r.specFilter(a)||a.disable(),a},N=function(t){h.suiteStarted(t.result)};this.it=function(t,e){var n=_(t,e,f);return f.addChild(n),n},this.xit=function(t,e){var n=this.it(t,e);return n.pend(),n},this.expect=function(t){if(!l)throw new Error("'expect' was used when there was no current spec, this could be because an asynchronous test timed out");return l.expect(t)},this.beforeEach=function(t){f.beforeEach(t)},this.afterEach=function(t){f.afterEach(t)},this.pending=function(){throw t.Spec.pendingSpecExceptionMessage}}return e},getJasmineRequireObj().JsApiReporter=function(){function t(t){function n(t){u[t.id]=t}var r=t.timer||e,i="loaded";this.started=!1,this.finished=!1,this.jasmineStarted=function(){this.started=!0,i="started",r.start()};var o;this.jasmineDone=function(){this.finished=!0,o=r.elapsed(),i="done"},this.status=function(){return i};var u={};this.suiteStarted=function(t){n(t)},this.suiteDone=function(t){n(t)},this.suites=function(){return u};var s=[];this.specStarted=function(){},this.specDone=function(t){s.push(t)},this.specResults=function(t,e){return s.slice(t,t+e)},this.specs=function(){return s},this.executionTime=function(){return o}}var e={start:function(){},elapsed:function(){return 0}};return t},getJasmineRequireObj().Any=function(){function t(t){this.expectedObject=t}return t.prototype.jasmineMatches=function(t){return this.expectedObject==String?"string"==typeof t||t instanceof String:this.expectedObject==Number?"number"==typeof t||t instanceof Number:this.expectedObject==Function?"function"==typeof t||t instanceof Function:this.expectedObject==Object?"object"==typeof t:this.expectedObject==Boolean?"boolean"==typeof t:t instanceof this.expectedObject},t.prototype.jasmineToString=function(){return"<jasmine.any("+this.expectedObject+")>"},t},getJasmineRequireObj().CallTracker=function(){function t(){var t=[];this.track=function(e){t.push(e)},this.any=function(){return!!t.length},this.count=function(){return t.length},this.argsFor=function(e){var n=t[e];return n?n.args:[]},this.all=function(){return t},this.allArgs=function(){for(var e=[],n=0;n<t.length;n++)e.push(t[n].args);return e},this.first=function(){return t[0]},this.mostRecent=function(){return t[t.length-1]},this.reset=function(){t=[]}}return t},getJasmineRequireObj().Clock=function(){function t(t,e,n){function r(){return!(f.setTimeout||f.setInterval).apply}function i(t,e){for(var n in e)t[n]=e[n]}function o(t,n){return e.scheduleFunction(t,n,c(arguments,2))}function u(t){return e.removeFunctionWithId(t)}function s(t,n){return e.scheduleFunction(t,n,c(arguments,2),!0)}function a(t){return e.removeFunctionWithId(t)}function c(t,e){return Array.prototype.slice.call(t,e)}var p,l=this,f={setTimeout:t.setTimeout,clearTimeout:t.clearTimeout,setInterval:t.setInterval,clearInterval:t.clearInterval},h={setTimeout:o,clearTimeout:u,setInterval:s,clearInterval:a},d=!1;return l.install=function(){return i(t,h),p=h,d=!0,l},l.uninstall=function(){e.reset(),n.uninstall(),i(t,f),p=f,d=!1},l.mockDate=function(t){n.install(t)},l.setTimeout=function(e,n){if(r()){if(arguments.length>2)throw new Error("IE < 9 cannot support extra params to setTimeout without a polyfill");return p.setTimeout(e,n)}return Function.prototype.apply.apply(p.setTimeout,[t,arguments])},l.setInterval=function(e,n){if(r()){if(arguments.length>2)throw new Error("IE < 9 cannot support extra params to setInterval without a polyfill");return p.setInterval(e,n)}return Function.prototype.apply.apply(p.setInterval,[t,arguments])},l.clearTimeout=function(e){return Function.prototype.call.apply(p.clearTimeout,[t,e])},l.clearInterval=function(e){return Function.prototype.call.apply(p.clearInterval,[t,e])},l.tick=function(t){if(!d)throw new Error("Mock clock is not installed, use jasmine.clock().install()");n.tick(t),e.tick(t)},l}return t},getJasmineRequireObj().DelayedFunctionScheduler=function(){function DelayedFunctionScheduler(){function indexOfFirstToPass(t,e){for(var n=-1,r=0;r<t.length;++r)if(e(t[r])){n=r;break}return n}function deleteFromLookup(t){var e=Number(t),n=indexOfFirstToPass(scheduledLookup,function(t){return t===e});n>-1&&scheduledLookup.splice(n,1)}function reschedule(t){self.scheduleFunction(t.funcToCall,t.millis,t.params,!0,t.timeoutKey,t.runAtMillis+t.millis)}function runScheduledFunctions(t){if(!(0===scheduledLookup.length||scheduledLookup[0]>t))do{currentTime=scheduledLookup.shift();var e=scheduledFunctions[currentTime];delete scheduledFunctions[currentTime];for(var n=0;n<e.length;++n){var r=e[n];r.funcToCall.apply(null,r.params||[]),r.recurring&&reschedule(r)}}while(scheduledLookup.length>0&&currentTime!==t&&scheduledLookup[0]<=t)}var self=this,scheduledLookup=[],scheduledFunctions={},currentTime=0,delayedFnCount=0;return self.tick=function(t){t=t||0;var e=currentTime+t;runScheduledFunctions(e),currentTime=e},self.scheduleFunction=function(funcToCall,millis,params,recurring,timeoutKey,runAtMillis){var f;f="string"==typeof funcToCall?function(){return eval(funcToCall)}:funcToCall,millis=millis||0,timeoutKey=timeoutKey||++delayedFnCount,runAtMillis=runAtMillis||currentTime+millis;var funcToSchedule={runAtMillis:runAtMillis,funcToCall:f,recurring:recurring,params:params,timeoutKey:timeoutKey,millis:millis};return runAtMillis in scheduledFunctions?scheduledFunctions[runAtMillis].push(funcToSchedule):(scheduledFunctions[runAtMillis]=[funcToSchedule],scheduledLookup.push(runAtMillis),scheduledLookup.sort(function(t,e){return t-e})),timeoutKey},self.removeFunctionWithId=function(t){for(var e in scheduledFunctions){var n=scheduledFunctions[e],r=indexOfFirstToPass(n,function(e){return e.timeoutKey===t});if(r>-1){1===n.length?(delete scheduledFunctions[e],deleteFromLookup(e)):n.splice(r,1);break}}},self.reset=function(){currentTime=0,scheduledLookup=[],scheduledFunctions={},delayedFnCount=0},self}return DelayedFunctionScheduler},getJasmineRequireObj().ExceptionFormatter=function(){function t(){this.message=function(t){var e="";return e+=t.name&&t.message?t.name+": "+t.message:t.toString()+" thrown",(t.fileName||t.sourceURL)&&(e+=" in "+(t.fileName||t.sourceURL)),(t.line||t.lineNumber)&&(e+=" (line "+(t.line||t.lineNumber)+")"),e},this.stack=function(t){return t?t.stack:null}}return t},getJasmineRequireObj().Expectation=function(){function t(t){this.util=t.util||{buildFailureMessage:function(){}},this.customEqualityTesters=t.customEqualityTesters||[],this.actual=t.actual,this.addExpectationResult=t.addExpectationResult||function(){},this.isNot=t.isNot;for(var n in e)this[n]=e[n]}var e={};return t.prototype.wrapCompare=function(t,e){return function(){function n(){var t=u.compare.apply(null,r);return t.pass=!t.pass,t}var r=Array.prototype.slice.call(arguments,0),i=r.slice(0),o="";r.unshift(this.actual);var u=e(this.util,this.customEqualityTesters),s=u.compare;this.isNot&&(s=u.negativeCompare||n);var a=s.apply(null,r);a.pass||(a.message?o="[object Function]"===Object.prototype.toString.apply(a.message)?a.message():a.message:(r.unshift(this.isNot),r.unshift(t),o=this.util.buildFailureMessage.apply(null,r))),1==i.length&&(i=i[0]),this.addExpectationResult(a.pass,{matcherName:t,passed:a.pass,message:o,actual:this.actual,expected:i})}},t.addCoreMatchers=function(e){var n=t.prototype;for(var r in e){var i=e[r];n[r]=n.wrapCompare(r,i)}},t.addMatchers=function(n){for(var r in n){var i=n[r];e[r]=t.prototype.wrapCompare(r,i)}},t.resetMatchers=function(){for(var t in e)delete e[t]},t.Factory=function(e){e=e||{};var n=new t(e);return e.isNot=!0,n.not=new t(e),n},t},getJasmineRequireObj().buildExpectationResult=function(){function t(t){function e(){return t.passed?"Passed.":t.message?t.message:t.error?r(t.error):""}function n(){if(t.passed)return"";var n=t.error;if(!n)try{throw new Error(e())}catch(r){n=r}return i(n)}var r=t.messageFormatter||function(){},i=t.stackFormatter||function(){};return{matcherName:t.matcherName,expected:t.expected,actual:t.actual,message:e(),stack:n(),passed:t.passed}}return t},getJasmineRequireObj().MockDate=function(){function t(t){function e(){switch(arguments.length){case 0:return new o(i);case 1:return new o(arguments[0]);case 2:return new o(arguments[0],arguments[1]);case 3:return new o(arguments[0],arguments[1],arguments[2]);case 4:return new o(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return new o(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);case 6:return new o(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return new o(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6])}}function n(){e.now=function(){if(o.now)return i;throw new Error("Browser does not support Date.now()")},e.toSource=o.toSource,e.toString=o.toString,e.parse=o.parse,e.UTC=o.UTC}var r=this,i=0;if(!t||!t.Date)return r.install=function(){},r.tick=function(){},r.uninstall=function(){},r;var o=t.Date;return r.install=function(n){i=n instanceof o?n.getTime():(new o).getTime(),t.Date=e},r.tick=function(t){t=t||0,i+=t},r.uninstall=function(){i=0,t.Date=o},n(),r}return t},getJasmineRequireObj().ObjectContaining=function(t){function e(t){this.sample=t}return e.prototype.jasmineMatches=function(e,n,r){if("object"!=typeof this.sample)throw new Error("You must provide an object to objectContaining, not '"+this.sample+"'.");n=n||[],r=r||[];var i=function(e,n){return null!==e&&!t.util.isUndefined(e[n])};for(var o in this.sample)!i(e,o)&&i(this.sample,o)?n.push("expected has key '"+o+"', but missing from actual."):t.matchersUtil.equals(e[o],this.sample[o])||r.push("'"+o+"' was '"+(e[o]?t.util.htmlEscape(e[o].toString()):e[o])+"' in actual, but was '"+(this.sample[o]?t.util.htmlEscape(this.sample[o].toString()):this.sample[o])+"' in expected.");return 0===n.length&&0===r.length},e.prototype.jasmineToString=function(){return"<jasmine.objectContaining("+t.pp(this.sample)+")>"},e},getJasmineRequireObj().pp=function(t){function e(){this.ppNestLevel_=0,this.seen=[]}function n(){e.call(this),this.string=""}return e.prototype.format=function(e){this.ppNestLevel_++;try{t.util.isUndefined(e)?this.emitScalar("undefined"):null===e?this.emitScalar("null"):0===e&&1/e===-(1/0)?this.emitScalar("-0"):e===t.getGlobal()?this.emitScalar("<global>"):e.jasmineToString?this.emitScalar(e.jasmineToString()):"string"==typeof e?this.emitString(e):t.isSpy(e)?this.emitScalar("spy on "+e.and.identity()):e instanceof RegExp?this.emitScalar(e.toString()):"function"==typeof e?this.emitScalar("Function"):"number"==typeof e.nodeType?this.emitScalar("HTMLNode"):e instanceof Date?this.emitScalar("Date("+e+")"):t.util.arrayContains(this.seen,e)?this.emitScalar("<circular reference: "+(t.isArray_(e)?"Array":"Object")+">"):t.isArray_(e)||t.isA_("Object",e)?(this.seen.push(e),t.isArray_(e)?this.emitArray(e):this.emitObject(e),this.seen.pop()):this.emitScalar(e.toString())}finally{this.ppNestLevel_--}},e.prototype.iterateObject=function(e,n){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n(r,e.__lookupGetter__?!t.util.isUndefined(e.__lookupGetter__(r))&&null!==e.__lookupGetter__(r):!1)},e.prototype.emitArray=t.unimplementedMethod_,e.prototype.emitObject=t.unimplementedMethod_,e.prototype.emitScalar=t.unimplementedMethod_,e.prototype.emitString=t.unimplementedMethod_,t.util.inherit(n,e),n.prototype.emitScalar=function(t){this.append(t)},n.prototype.emitString=function(t){this.append("'"+t+"'")},n.prototype.emitArray=function(e){if(this.ppNestLevel_>t.MAX_PRETTY_PRINT_DEPTH)return void this.append("Array");var n=Math.min(e.length,t.MAX_PRETTY_PRINT_ARRAY_LENGTH);this.append("[ ");for(var r=0;n>r;r++)r>0&&this.append(", "),this.format(e[r]);e.length>n&&this.append(", ..."),this.append(" ]")},n.prototype.emitObject=function(e){if(this.ppNestLevel_>t.MAX_PRETTY_PRINT_DEPTH)return void this.append("Object");var n=this;this.append("{ ");var r=!0;this.iterateObject(e,function(t,i){r?r=!1:n.append(", "),n.append(t),n.append(": "),i?n.append("<getter>"):n.format(e[t])}),this.append(" }")},n.prototype.append=function(t){this.string+=t},function(t){var e=new n;return e.format(t),e.string}},getJasmineRequireObj().QueueRunner=function(t){function e(t){var e=!1;return function(){e||(e=!0,t())}}function n(t){this.fns=t.fns||[],this.onComplete=t.onComplete||function(){},this.clearStack=t.clearStack||function(t){t()},this.onException=t.onException||function(){},this.catchException=t.catchException||function(){return!0},this.enforceTimeout=t.enforceTimeout||function(){return!1},this.userContext={},this.timer=t.timeout||{setTimeout:setTimeout,clearTimeout:clearTimeout}}return n.prototype.execute=function(){this.run(this.fns,0)},n.prototype.run=function(n,r){function i(t){try{t.call(c.userContext)}catch(e){u(e)}}function o(r){var i,o=function(){Function.prototype.apply.apply(c.timer.clearTimeout,[t.getGlobal(),[i]])},a=e(function(){o(i),c.run(n,s+1)});c.enforceTimeout()&&(i=Function.prototype.apply.apply(c.timer.setTimeout,[t.getGlobal(),[function(){c.onException(new Error("Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.")),a()},t.DEFAULT_TIMEOUT_INTERVAL]]));try{r.call(c.userContext,a)}catch(p){u(p),a()}}function u(t){if(c.onException(t),!c.catchException(t))throw t}var s,a=n.length,c=this;for(s=r;a>s;s++){var p=n[s];if(p.length>0)return o(p);i(p)}var l=s>=a;l&&this.clearStack(this.onComplete)},n},getJasmineRequireObj().ReportDispatcher=function(){function t(t){function e(t,e){for(var n=0;n<o.length;n++){var r=o[n];r[t]&&r[t].apply(r,e)}}for(var n=t||[],r=0;r<n.length;r++){var i=n[r];this[i]=function(t){return function(){e(t,arguments)}}(i)}var o=[];return this.addReporter=function(t){o.push(t)},this}return t},getJasmineRequireObj().SpyStrategy=function(){function t(t){t=t||{};var e=t.name||"unknown",n=t.fn||function(){},r=t.getSpy||function(){},i=function(){};this.identity=function(){return e},this.exec=function(){return i.apply(this,arguments)},this.callThrough=function(){return i=n,r()},this.returnValue=function(t){return i=function(){return t},r()},this.throwError=function(t){var e=t instanceof Error?t:new Error(t);return i=function(){throw e},r()},this.callFake=function(t){return i=t,r()},this.stub=function(){return i=function(){},r()}}return t},getJasmineRequireObj().Suite=function(){function t(t){this.env=t.env,this.id=t.id,this.parentSuite=t.parentSuite,this.description=t.description,this.onStart=t.onStart||function(){},this.resultCallback=t.resultCallback||function(){},this.clearStack=t.clearStack||function(t){t()},this.beforeFns=[],this.afterFns=[],this.queueRunner=t.queueRunner||function(){},this.disabled=!1,this.children=[],this.result={id:this.id,status:this.disabled?"disabled":"",description:this.description,fullName:this.getFullName()}}return t.prototype.getFullName=function(){for(var t=this.description,e=this.parentSuite;e;e=e.parentSuite)e.parentSuite&&(t=e.description+" "+t);return t},t.prototype.disable=function(){this.disabled=!0,this.result.status="disabled"},t.prototype.beforeEach=function(t){this.beforeFns.unshift(t)},t.prototype.afterEach=function(t){this.afterFns.unshift(t)},t.prototype.addChild=function(t){this.children.push(t)},t.prototype.execute=function(t){function e(){r.resultCallback(r.result),t&&t()}function n(t){return function(e){t.execute(e)}}var r=this;if(this.onStart(this),this.disabled)return void e();for(var i=[],o=0;o<this.children.length;o++)i.push(n(this.children[o]));this.queueRunner({fns:i,onComplete:e})},t},void 0==typeof window&&"object"==typeof exports&&(exports.Suite=jasmineRequire.Suite),getJasmineRequireObj().Timer=function(){function t(t){t=t||{};var n,r=t.now||e;this.start=function(){n=r()},this.elapsed=function(){return r()-n}}var e=function(t){return function(){return(new t).getTime()}}(Date);return t},getJasmineRequireObj().matchersUtil=function(t){function e(n,r,i,o,u){function s(t,e){return t.hasOwnProperty(e)}function a(t){return"function"==typeof t}for(var c=!0,p=0;p<u.length;p++){var l=u[p](n,r);if(!t.util.isUndefined(l))return l}if(n instanceof t.Any&&(c=n.jasmineMatches(r)))return!0;if(r instanceof t.Any&&(c=r.jasmineMatches(n)))return!0;if(r instanceof t.ObjectContaining&&(c=r.jasmineMatches(n)))return!0;if(n instanceof Error&&r instanceof Error)return n.message==r.message;if(n===r)return 0!==n||1/n==1/r;if(null===n||null===r)return n===r;var f=Object.prototype.toString.call(n);if(f!=Object.prototype.toString.call(r))return!1;switch(f){case"[object String]":return n==String(r);case"[object Number]":return n!=+n?r!=+r:0===n?1/n==1/r:n==+r;case"[object Date]":case"[object Boolean]":return+n==+r;case"[object RegExp]":return n.source==r.source&&n.global==r.global&&n.multiline==r.multiline&&n.ignoreCase==r.ignoreCase}if("object"!=typeof n||"object"!=typeof r)return!1;for(var h=i.length;h--;)if(i[h]==n)return o[h]==r;i.push(n),o.push(r);var d=0;if("[object Array]"==f){if(d=n.length,c=d==r.length)for(;d--&&(c=e(n[d],r[d],i,o,u)););}else{var m=n.constructor,g=r.constructor;if(m!==g&&!(a(m)&&m instanceof m&&a(g)&&g instanceof g))return!1;for(var y in n)if(s(n,y)&&(d++,!(c=s(r,y)&&e(n[y],r[y],i,o,u))))break;if(c){for(y in r)if(s(r,y)&&!d--)break;c=!d}}return i.pop(),o.pop(),c}return{equals:function(t,n,r){return r=r||[],e(t,n,[],[],r)},contains:function(t,n,r){if(r=r||[],"[object Array]"===Object.prototype.toString.apply(t)){for(var i=0;i<t.length;i++)if(e(t[i],n,[],[],r))return!0;return!1}return!!t&&t.indexOf(n)>=0},buildFailureMessage:function(){var e=Array.prototype.slice.call(arguments,0),n=e[0],r=e[1],i=e[2],o=e.slice(3),u=n.replace(/[A-Z]/g,function(t){return" "+t.toLowerCase()}),s="Expected "+t.pp(i)+(r?" not ":" ")+u;if(o.length>0)for(var a=0;a<o.length;a++)a>0&&(s+=","),s+=" "+t.pp(o[a]);return s+"."}}},getJasmineRequireObj().toBe=function(){function t(){return{compare:function(t,e){return{pass:t===e}}}}return t},getJasmineRequireObj().toBeCloseTo=function(){function t(){return{compare:function(t,e,n){return 0!==n&&(n=n||2),{pass:Math.abs(e-t)<Math.pow(10,-n)/2}}}}return t},getJasmineRequireObj().toBeDefined=function(){function t(){return{compare:function(t){return{pass:void 0!==t}}}}return t},getJasmineRequireObj().toBeFalsy=function(){function t(){return{compare:function(t){return{pass:!t}}}}return t},getJasmineRequireObj().toBeGreaterThan=function(){function t(){return{compare:function(t,e){return{pass:t>e}}}}return t},getJasmineRequireObj().toBeLessThan=function(){function t(){return{compare:function(t,e){return{pass:e>t}}}}return t},getJasmineRequireObj().toBeNaN=function(t){function e(){return{compare:function(e){var n={pass:e!==e};return n.pass?n.message="Expected actual not to be NaN.":n.message=function(){return"Expected "+t.pp(e)+" to be NaN."},n}}}return e},getJasmineRequireObj().toBeNull=function(){function t(){return{compare:function(t){return{pass:null===t}}}}return t},getJasmineRequireObj().toBeTruthy=function(){function t(){return{compare:function(t){return{pass:!!t}}}}return t},getJasmineRequireObj().toBeUndefined=function(){function t(){return{compare:function(t){return{pass:void 0===t}}}}return t},getJasmineRequireObj().toContain=function(){function t(t,e){return e=e||[],{compare:function(n,r){return{pass:t.contains(n,r,e)}}}}return t},getJasmineRequireObj().toEqual=function(){function t(t,e){return e=e||[],{compare:function(n,r){var i={pass:!1};return i.pass=t.equals(n,r,e),i}}}return t},getJasmineRequireObj().toHaveBeenCalled=function(t){function e(){return{compare:function(e){var n={};if(!t.isSpy(e))throw new Error("Expected a spy, but got "+t.pp(e)+".");if(arguments.length>1)throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");return n.pass=e.calls.any(),n.message=n.pass?"Expected spy "+e.and.identity()+" not to have been called.":"Expected spy "+e.and.identity()+" to have been called.",n}}}return e},getJasmineRequireObj().toHaveBeenCalledWith=function(t){function e(e,n){return{compare:function(){var r=Array.prototype.slice.call(arguments,0),i=r[0],o=r.slice(1),u={pass:!1};if(!t.isSpy(i))throw new Error("Expected a spy, but got "+t.pp(i)+".");return i.calls.any()?(e.contains(i.calls.allArgs(),o,n)?(u.pass=!0,u.message=function(){return"Expected spy "+i.and.identity()+" not to have been called with "+t.pp(o)+" but it was."}):u.message=function(){return"Expected spy "+i.and.identity()+" to have been called with "+t.pp(o)+" but actual calls were "+t.pp(i.calls.allArgs()).replace(/^\[ | \]$/g,"")+"."},u):(u.message=function(){return"Expected spy "+i.and.identity()+" to have been called with "+t.pp(o)+" but it was never called."},u)}}}return e},getJasmineRequireObj().toMatch=function(){function t(){return{compare:function(t,e){var n=new RegExp(e);return{pass:n.test(t)}}}}return t},getJasmineRequireObj().toThrow=function(t){function e(e){return{compare:function(n,r){var i,o={pass:!1},u=!1;if("function"!=typeof n)throw new Error("Actual is not a Function");try{n()}catch(s){u=!0,i=s}return u?1==arguments.length?(o.pass=!0,o.message=function(){return"Expected function not to throw, but it threw "+t.pp(i)+"."},o):(e.equals(i,r)?(o.pass=!0,o.message=function(){return"Expected function not to throw "+t.pp(r)+"."}):o.message=function(){return"Expected function to throw "+t.pp(r)+", but it threw "+t.pp(i)+"."},o):(o.message="Expected function to throw an exception.",o)}}}return e},getJasmineRequireObj().toThrowError=function(t){function e(e){return{compare:function(n){function r(t){return t.name||t.toString().match(/^\s*function\s*(\w*)\s*\(/)[1]}function i(){if(1!=arguments.length)if(2==arguments.length){var t=arguments[1];if(t instanceof RegExp?c=t:"string"==typeof t?a=t:o(t)&&(s=t),!(s||a||c))throw new Error("Expected is not an Error, string, or RegExp.")}else{if(!o(arguments[1]))throw new Error("Expected error type is not an Error.");if(s=arguments[1],arguments[2]instanceof RegExp)c=arguments[2];else{if("string"!=typeof arguments[2])throw new Error("Expected error message is not a string or RegExp.");a=arguments[2]}}}function o(t){if("function"!=typeof t)return!1;var e=function(){};return e.prototype=t.prototype,new e instanceof Error}var u,s,a,c,p,l,f=!1,h={pass:!0},d={pass:!1};if("function"!=typeof n)throw new Error("Actual is not a Function");i.apply(null,arguments);try{n()}catch(m){f=!0,u=m}return f?u instanceof Error?1==arguments.length?(h.message="Expected function not to throw an Error, but it threw "+r(u)+".",h):(s&&(p=r(s),l=r(u.constructor)),s&&a?u.constructor==s&&e.equals(u.message,a)?(h.message=function(){return"Expected function not to throw "+p+" with message "+t.pp(a)+"."},h):(d.message=function(){return"Expected function to throw "+p+" with message "+t.pp(a)+", but it threw "+l+" with message "+t.pp(u.message)+"."},d):s&&c?u.constructor==s&&c.test(u.message)?(h.message=function(){return"Expected function not to throw "+p+" with message matching "+t.pp(c)+"."},h):(d.message=function(){return"Expected function to throw "+p+" with message matching "+t.pp(c)+", but it threw "+l+" with message "+t.pp(u.message)+"."},d):s?u.constructor==s?(h.message="Expected function not to throw "+p+".",h):(d.message="Expected function to throw "+p+", but it threw "+l+".",d):a?u.message==a?(h.message=function(){return"Expected function not to throw an exception with message "+t.pp(a)+"."},h):(d.message=function(){return"Expected function to throw an exception with message "+t.pp(a)+", but it threw an exception with message "+t.pp(u.message)+"."},d):c?c.test(u.message)?(h.message=function(){return"Expected function not to throw an exception with a message matching "+t.pp(c)+"."},h):(d.message=function(){return"Expected function to throw an exception with a message matching "+t.pp(c)+", but it threw an exception with message "+t.pp(u.message)+"."},d):void 0):(d.message=function(){return"Expected function to throw an Error, but it threw "+t.pp(u)+"."},d):(d.message="Expected function to throw an Error.",d)}}}return e},getJasmineRequireObj()["interface"]=function(t,e){var n={describe:function(t,n){return e.describe(t,n)},xdescribe:function(t,n){return e.xdescribe(t,n)},it:function(t,n){return e.it(t,n)},xit:function(t,n){return e.xit(t,n)},beforeEach:function(t){return e.beforeEach(t)},afterEach:function(t){
return e.afterEach(t)},expect:function(t){return e.expect(t)},pending:function(){return e.pending()},spyOn:function(t,n){return e.spyOn(t,n)},jsApiReporter:new t.JsApiReporter({timer:new t.Timer}),jasmine:t};return t.addCustomEqualityTester=function(t){e.addCustomEqualityTester(t)},t.addMatchers=function(t){return e.addMatchers(t)},t.clock=function(){return e.clock},n},getJasmineRequireObj().version=function(){return"2.0.3"};