;(function($){
	function Carousel($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showIndex;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.$btns = this.$elem.find('.btn-item');
		this.$control = this.$elem.find('.control');
		//初始化
		this.init();
	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){//划入划出

			}else{//淡入淡出
				//将所有图片隐藏
				this.$elem.addClass('fade');
				//默认显示
				this.$carouselItem.eq(this.now).show();
				this.$btns.eq(this.now).addClass('active');
				//将显示隐藏插件初始化
				this.$carouselItem.showHide({js:true,mode:'fade'})
				//将左右按钮显示出来(监听事件)
				this.$elem
				.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
				.on('click','.control-left',function(){
					this._fade(this.now - 1)
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.now + 1)
				}.bind(this))
			}
		},
		_fade(index){
			//让当前显示的隐藏
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			//让即将显现的出现
			$(this.$carouselItem[index]).showHide('show');
			this.$btns.eq(index).addClass('active');
			//将inde赋给this.now
			this.now = index;
		}

	}

	Carousel.DEFAULTS = {
		slide:false,
		showIndex:0
	}



	$.fn.extend({
		carousel:function(options){

			return this.each(function(){
				var $elem = $(this);
				var carousel  = $elem.data('carousel');
				if(!carousel){
					options = $.extend({},Carousel.DEFAULTS,options);
					carousel = new Carousel($elem,options);
					$elem.data('carousel',carousel)
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}

			})
		}
	})





})(jQuery);