c$.namespace("com.cengage.mm.drag");
com.cengage.mm.drag.DragHandler = (function () {

    /** Private Functions * */
    /*
     * event Handler for the dragstart event on the elements inside Tools
     */
    var Utils = com.compro.ppt.Utils;
    var myeltApp = com.compro.ppt.GLOBAL;
    var elementDragged, gElementDraggedX, gElementDraggedY;
    var blankDiv;
    var nextElementTop;
    var previousElementTop;
    var pos = {};
    
    var SlideThumbConstructor = function(el){
    	this.el = el;
    	this.addTouchEvents();
    	this.addMouseEvents();
    }
    
    var slideThumbProto = SlideThumbConstructor.prototype;
    
    slideThumbProto.addTouchEvents = function() {
    	var self = this;
    	Utils.attachEvent(this.el, 'touchstart', function (event) {
    		self.dragStart(event.changedTouches[0]);
            event.stopPropagation();
        }, false);

        Utils.attachEvent(this.el, 'touchmove', function (event) {
            event.preventDefault();
            self.continueDragging(event.changedTouches[0]);
        }, false);

        Utils.attachEvent(this.el, 'touchend', function (event) {
            event.preventDefault();
            self.droppedOnBody(event.changedTouches[0]);
        }, false);
    }
    
    slideThumbProto.addMouseEvents = function(){
    	var self = this;
    	Utils.attachEvent(this.el, 'mousedown', function (event) {
            event.preventDefault();
            self.dragStart(event);
            Utils.attachEvent(document.body, 'mouseup.thumb-drag', function(event){
            	mouseUpHandler(event,self);
            });
            Utils.attachEvent(document.body, 'mousemove.thumb-drag', function(event){
            	mouseMoveHandler(event,self);
            });
        }, false);
        Utils.attachEvent(this.el, 'dragstart', function (event) {
            event.preventDefault();
        }, false);
    }

    slideThumbProto.dragStart = function(event) {
        var elementDragged = this.el;
        //elementDragged.click();
        this.oldPosition =  $(elementDragged).index();
        var elementSibling = $(elementDragged).next();
        var elementParent = $(elementDragged).parent();
        var height = $(elementDragged).height();
        var width = $(elementDragged).width();
        var offset = $(elementDragged).offset();
        var posLeft = elementDragged.offsetLeft;
        var parentPosLeft = elementDragged.parentNode.offsetLeft;
        var posTop = elementDragged.offsetTop;
        var parentPosTop = elementDragged.parentNode.offsetTop;

        var blankDiv = this.blankDiv = Utils.createElement("div");

        blankDiv.style.visibility = "hidden";
        $(blankDiv).addClass($(elementDragged).attr('class'));
        $(blankDiv).insertAfter(elementDragged);
        blankDiv.style.height = elementDragged.offsetHeight + "px";
        elementDragged.style.position = "absolute";
        elementDragged.style.zIndex = "999";
        elementDragged.style.left = (posLeft-parentPosLeft) + "px";
        elementDragged.style.top = (posTop-parentPosTop) + "px";
        if ($(blankDiv).next().length > 0) {
            this.nextElementTop = ($(blankDiv).next())[0].offsetTop;
        } else this.nextElementTop = null;

        if ($(elementDragged).prev().length > 0) {
            this.previousElementTop = ($(elementDragged).prev())[0].offsetTop;
        } else this.previousElementTop = null;

        this.pos = {
            x: event.pageX,
            y: event.pageY
        }
        elementDragged.style.cursor = "move";
        document.body.style.cursor = "move";
    }

    mouseUpHandler = function (event,obj) {
        event.preventDefault();
        obj.droppedOnBody(event);
        Utils.removeEvent(document.body, 'mouseup.thumb-drag');
        Utils.removeEvent(document.body, 'mousemove.thumb-drag');
        document.body.style.cursor = "default";
    };

    var mouseMoveHandler = function (event,obj) {
        obj.continueDragging(event);
    }

    slideThumbProto.continueDragging = function(event) {
    		var elementDragged = this.el;
            if (elementDragged == null) {
                return;
            }
            var newPos = {
                x: event.pageX,
                y: event.pageY
            }
            elementDragged.style.left = (parseFloat(elementDragged.style.left) + (newPos.x - this.pos.x)) + "px";
            elementDragged.style.top = (parseFloat(elementDragged.style.top) + (newPos.y - this.pos.y)) + "px";
            if (this.nextElementTop != null && elementDragged.offsetTop > this.nextElementTop) {
                this.moveDown();
            } else if (this.previousElementTop != null && elementDragged.offsetTop < this.previousElementTop) {
                this.moveUp();
            }
            this.pos = newPos;
        }

    slideThumbProto.moveDown = function() {
        	var el = this.blankDiv;
        	var elementDragged = this.el;
            el = this.blankDiv = $(el).insertAfter($(el).next());
            $(elementDragged).insertBefore(el);
            if ($(el).next().length > 0) {
                this.nextElementTop = ($(el).next())[0].offsetTop;
            } else this.nextElementTop = null;

            if ($(elementDragged).prev().length > 0) {
                this.previousElementTop = ($(elementDragged).prev())[0].offsetTop;
            } else this.previousElementTop = null;
        }

    slideThumbProto.moveUp = function(el) {
	    	var el = this.blankDiv;
	    	var elementDragged = this.el;
	    	el = this.blankDiv = $(el).insertBefore($(elementDragged).prev());
            $(elementDragged).insertBefore(el);
            if ($(el).next().length > 0) {
                this.nextElementTop = ($(el).next())[0].offsetTop;
            } else this.nextElementTop = null;

            if ($(elementDragged).prev().length > 0) {
                this.previousElementTop = ($(elementDragged).prev())[0].offsetTop;
            } else this.previousElementTop = null;
        }

    slideThumbProto.droppedOnBody  = function() {
    		var elementDragged = this.el;
            elementDragged.style.position = "";
            elementDragged.style.left = "";
            elementDragged.style.top = "";
            elementDragged.style.zIndex = "";
            $(this.blankDiv).remove();
            this.newPosition = $(elementDragged).index();
            myeltApp.moveSlide(this.oldPosition, this.newPosition);
            
        }

        function drag(classname) {
            var elemsArray = $("." + classname).not(".thumbmove");
            for (var i = 0; i < elemsArray.length; i++) {
                var el = $(elemsArray[i])[0];
                applyDragonElement(el);
            }
        }
        
        function applyDragonElement(el) {
            Utils.addClass(el, "thumbmove");
            new SlideThumbConstructor(el);  
        }
        
        

    return {
        "drag": drag,
        "applyDragonElement":applyDragonElement
    }

})();