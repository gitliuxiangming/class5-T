;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn')
		this.$searchInput = $elem.find('.search-input')
		this.$searchForm = $elem.find('.search-form')
		this.$searchLayer = $elem.find('.search-layer')
		this.isLoaded = false;
	
		
		//2.初始化
		this.init();
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			this.$searchBtn.on('click',$.proxy(this.submit,this))
		},
		submit:function(){
			var val = this.getValue();
			if(val == ''){
				return false;
			}

			this.$searchForm.trigger('submit');
		},
		getValue:function(){
			return $.trim(this.$searchInput.val());
		},
		autocomplete:function(){
			//1.将显示隐藏插件初始化
			this.$searchLayer.showHide(this.options);
			//2.监听输入框的oninput事件
			this.$searchInput.on('input',$.proxy(this.getData,this))
			//3.当点击页面其他地方时，让下拉层消失
			$(document).on('click',$.proxy(this.hideLayer,this))
			//4.当输入框再次获取焦点时，让下拉层再次显示出来
			this.$searchInput.on('focus',$.proxy(this.showLayer,this))
			//5.阻止输入框点击时的冒泡事件
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			
		},
		getData:function(){
			//判断输入框的值不能时空格
			if(this.getValue() == ''){
				//如果输入框内容为空，则下拉层不显示
				this.addHtml('');
				this.hideLayer();
				 return;
			}
			$.ajax({
				url:this.options.url+this.getValue(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				/*
				// console.log(data)
				//1.将数据包装成html代码
				var html = '';
				for(var i=0;i<data.result.length;i++){
					html += '<li class="search-item">'+data.result[i][0]+'</li>'
				}
				//2.将html代码放入到下拉层中
				this.addHtml(html);
				//3.将下拉层展示出来
				this.showLayer()
				*/
				this.$elem.trigger('getData',[data]);
			}.bind(this))
			.fail(function(err){
				/*
				this.addHtml('');
				this.hideLayer();
				*/
				this.$elem.trigger('getNoData');
			}.bind(this))
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		showLayer:function(){
			if(!this.isLoaded) return;
			this.$searchLayer.showHide('show');
		},
		addHtml:function(html){
			console.log(html)
			this.isLoaded = !!html;
			this.$searchLayer.html(html)
		}
	}
	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slideDownUp'
	}
	$.fn.extend({
		search:function(options,val){

			return this.each(function(){
				var $elem = $(this);
				var search  = $elem.data('search');
				if(!search){
					options = $.extend({},Search.DEFAULTS,options);
					search = new Search($elem,options);
					$elem.data('search',search)
				}
				if(typeof search[options] == 'function'){
					search[options](val);
				}

			})
		}
	})





})(jQuery);