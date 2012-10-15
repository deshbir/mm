
//********************END Self executing independent block*****************


(function(){
	var namespace = com.compro.ppt;
	var EventTarget = namespace.EventTarget;
	namespace.Utils = {
			getById : function (id){
				return $("#" + id).get(0);
				//return document.getElementById(id);
			},
			attachEvent : function(el, type, func, useCapture){
				$(el).bind(type,function(event) {
					func.apply(el, [event.originalEvent]);
					}
				);
				//el.addEventListener(event, func, useCapture||false);
			},
			removeEvent : function(el, type){
				$(el).unbind(type);
			},
			createElement : function(type){
				return $("<"+type+">").get(0);
				//return document.createElement(type);
			},
			appendChild : function(parent, el){
				$(parent).append(el);
				//parent.appendChild(el);
			},
			insertBefore : function(parent, el, appendBeforeElement){
				$(appendBeforeElement).before(el);
				//parent.insertBefore(el,appendBeforeElement);
			},
			aspectRatio : function(el) {

				var computedWidth = parseFloat(this.getCssComputedProperty(el, 'width'));
				var computedHeight = parseFloat(this.getCssComputedProperty(el, 'height'));

				var paddingLeft = parseFloat(this.getCssComputedProperty(el, 'padding-left'));
				var paddingRight = parseFloat(this.getCssComputedProperty(el, 'padding-right'));
				var paddingTop = parseFloat(this.getCssComputedProperty(el, 'padding-top'));
				var paddingBottom = parseFloat(this.getCssComputedProperty(el, 'padding-bottom'));
				
				var workspaceParentDivWhiteWidth  = computedWidth + paddingLeft + paddingRight;
				var workspaceParentDivWhiteHeight  = computedHeight + paddingBottom + paddingTop;
				
				var aspectRationWorkspaceParent = workspaceParentDivWhiteWidth/workspaceParentDivWhiteHeight;				
				
				//return $(el).width()/$(el).height();
				return aspectRationWorkspaceParent;
			},
			hasClass: function(el, name) {
				return $(el).hasClass(name);
			   //return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
			},
			addClass: function (el, name) {
				 $(el).addClass(name);
			  /* if (!this.hasClass(el, name)) { 
			   	el.className += (el.className ? ' ' : '') +name; 
			   }*/
			},
			removeClass: function (el, name){
				 $(el).removeClass(name);
			  /* if (this.hasClass(el, name)) {
			      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
				}*/
			},
			scrollToBottom: function(el){
				$(el).animate({ scrollTop:  el.scrollHeight }, 100);
				//el.scrollTop = el.scrollHeight;
			},
			registerObjectForEvent:function(obj){
				//obj.eventObj = new EventTarget();
			},
			fireEvent: function(obj,type){
				/*var event = {
					target:obj,
					type:type
				};
				obj.eventObj.fire(event,obj);*/
				$(obj).triggerHandler(type);
			},
			addCustomEventListener: function(obj,type,fn){
				//obj.eventObj.addListener(type,fn);
				$(obj).bind(type,fn);
			},
			removeFromDOM : function(el){
				$(el).remove();
				//el.parentNode.removeChild(el);
			},
			merge_JSON: function (json1, json2){
				return $.extend(true,{},json1, json2);
			   /* var json = {};
			    for (var attrname in json1) { json[attrname] = json1[attrname]; }
			    for (var attrname in json2) { json[attrname] = json2[attrname]; }
			    return json;*/
			},
			getHeight: function(el){
				$(el).height();
			},
			getWidth: function(el){
				$(el).width();
			},
			proxy: function(func,obj){
				return function() {
					var args = new Array();
					args.push(obj);
				    for (var i = 0; i < arguments.length; i++)
				        args.push(arguments[i]);
					func.apply(this,args);
				}
			},
			proxyChangeContext: function(func,obj){
				return function() {
					var args = new Array();
				    for (var i = 0; i < arguments.length; i++)
				        args.push(arguments[i]);
				    args.push(this);
					func.apply(obj,args);
				}
			},
			getCssComputedProperty: function(el, prop){
				return $(el).css(prop);
			}
		};
})();