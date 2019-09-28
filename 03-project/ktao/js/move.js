;(function($){
	function init($elem){
		this.$elem = $elem
		this.$elem.removeClass('transition');
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));
	}
	function to(x,y,cb){
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		if(this.currentX == x && this.currentY == y) return;
		this.$elem.trigger('move');
		typeof cb == 'function' && cb();
		this.currentX = x;
		this.currentY = y;
	}

	function Slient($elem){
		init.call(this,$elem);
	}
	Slient.prototype = {
		constructor:Slient,
		to:function(x,y){
			to(x,y,function(){
				this.$elem.css({
					left:x,
					top:y
				})
				this.$elem.trigger('moved');
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}

	function Js($elem){
		init.call(this,$elem);
	}
	Js.prototype = {
		constructor:Js,
		to:function(x,y){
			to(x,y,function(){
				this.$elem
				.stop()
				.animate({
					left:x,
					top:y
				},function(){
					this.$elem.trigger('moved')
				}.bind(this))
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y);
		}
	}

	function getmove($elem,options){
		var move = null;
		if(options.js){
			move = new Js($elem);
		}else{
			move = new Slient($elem);
		}
		// console.log(move)
		// return move;
		/*
		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
		*/
		return {
			to:$.proxy(move.to,move),
			x:$.proxy(move.x,move),
			y:$.proxy(move.y,move)
		}
	}

	var DEFAULTS = {
		js:true
	}

	//1.注册插件
	$.fn.extend({
		move:function(options,x,y){
			return this.each(function(){
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!$elem.data('moveObj')){//进行初始化的
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj)
				}

				//调用方法的
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y);
				}
			})

		}
	})
})(jQuery);