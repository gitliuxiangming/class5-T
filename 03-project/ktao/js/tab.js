;(function($){
	function Tab($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.tabItem = this.$elem.find('.tab-item');
		this.tabPanel = this.$elem.find('.tab-panel');
		this.itemNum = this.tabItem.length;
		this.now = this.getIndex(this.options.showIndex);
		this.timer = 0;
		//初始化
		this.init();
	}
	Tab.prototype = {
		constructor:Tab,
		init:function(){
			var _this = this;
			//默认加载
			_this.$elem.trigger('floor-show',[this.now,this.tabPanel[this.now]])
			//默认显示的
			this.tabPanel.eq(this.now).show();
			this.tabItem.eq(this.now).addClass('tab-item-active')
			//初始化显示隐藏插件
			this.tabPanel.on('show',function(){
				// console.log(_this.tabPanel.index(this))
				_this.$elem.trigger('floor-show',[_this.tabPanel.index(this),this])
			})
			this.tabPanel.showHide(this.options);
			//监听事件
			var eventName = this.options.eventName == 'click' ? 'click' : 'mouseenter'
			this.$elem.on(eventName,'.tab-item',function(){
				// console.log(_this.tabItem.index(this))
				_this._toggle(_this.tabItem.index(this));
			})
			if(this.options.interval){
				this.autoplay();
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}

		},
		_toggle:function(index){
			//如果当前值和即将显示的值相等的话，不执行
			if(this.now == index) return;
			//把之前的隐藏
			this.tabPanel.eq(this.now).showHide('hide');
			this.tabItem.eq(this.now).removeClass('tab-item-active')
			//把即将展示的让它显示
			this.tabPanel.eq(index).showHide('show');
			this.tabItem.eq(index).addClass('tab-item-active')

			//将inde赋给this.now
			this.now = index;
			
		},
		getIndex(index){
			if(index < 0) return this.itemNum -1;
			if(index >= this.itemNum) return 0;

			return index;
		},
		autoplay:function(){
			this.timer = setInterval(function(){
				this._toggle(this.getIndex(this.now + 1));
			}.bind(this),this.options.interval)
		},
		paused:function(){
			clearInterval(this.timer)
		}

	}

	Tab.DEFAULTS = {
		showIndex:0,
		interval:0,
		js:false,
		mode:'fade',
		eventName:''
	}



	$.fn.extend({
		tab:function(options){

			return this.each(function(){
				var $elem = $(this);
				var tab  = $elem.data('tab');
				if(!tab){
					options = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($elem,options);
					$elem.data('carousel',tab)
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}

			})
		}
	})





})(jQuery);