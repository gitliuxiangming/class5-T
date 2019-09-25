;(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = $elem.find('.dropdown-layer');
		this.activeClass = $elem.data('active') + '-active';
		this.timer = 0;
		//2.初始化
		this.init();
	}
	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			//1.初始化显示隐藏插件
			this.$layer.showHide(this.options);
			//2.绑定显示隐藏事件
			this.$elem.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this))
			//3.绑定事件
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
		},
		show:function(){
			if(this.options.delay){
				console.log(this.options.delay)
				this.timer = setTimeout(function(){
					this.$elem.addClass(this.activeClass);
					this.$layer.showHide('show');
				}.bind(this),this.options.delay)
			}else{
				this.$elem.addClass(this.activeClass);
				this.$layer.showHide('show');
			}
		},
		hide:function(){
			clearTimeout(this.timer);
			this.$elem.removeClass(this.activeClass); 
			this.$layer.showHide('hide');
		}
	}

	Dropdown.DEFAULTS = {
		js:true,
		mode:'slideDownUp',
		delay:''
	}



	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				options = $.extend({},Dropdown.DEFAULTS,options);
				new Dropdown($elem,options);
			})
		}
	})





})(jQuery);