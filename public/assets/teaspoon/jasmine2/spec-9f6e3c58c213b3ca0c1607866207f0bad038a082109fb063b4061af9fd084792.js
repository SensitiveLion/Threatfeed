(function(){var t=function(t,e){function i(){this.constructor=t}for(var n in e)s.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},s={}.hasOwnProperty;Teaspoon.Jasmine2.Spec=function(s){function e(t){this.spec=t,this.fullDescription=this.spec.fullName,this.description=this.spec.description,this.link=this.filterUrl(this.fullDescription),this.parent=this.spec.parent,this.parent&&(this.suiteName=this.parent.fullName),this.viewId=this.spec.id,this.pending="pending"===this.spec.status}return t(e,s),e.prototype.errors=function(){var t,s,e,i,n;if(!this.spec.failedExpectations.length)return[];for(i=this.spec.failedExpectations,n=[],t=0,e=i.length;e>t;t++)s=i[t],n.push({message:s.message,stack:s.stack});return n},e.prototype.getParents=function(){var t;if(this.parents)return this.parents;for(this.parents||(this.parents=[]),t=this.parent;t;)t=new Teaspoon.Jasmine2.Suite(t),this.parents.unshift(t),t=t.parent;return this.parents},e.prototype.result=function(){return{status:this.status(),skipped:"disabled"===this.spec.status||this.pending}},e.prototype.status=function(){return"disabled"===this.spec.status?"passed":this.spec.status},e}(Teaspoon.Spec)}).call(this);