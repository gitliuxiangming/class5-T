;(function($){

	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key] = val;
			this.count++;
		},
		getData:function(key){
			return this.data[key]
		}
	}



	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn')
		this.$searchInput = $elem.find('.search-input')
		this.$searchForm = $elem.find('.search-form')
		this.$searchLayer = $elem.find('.search-layer')
		this.isLoaded = false;
		this.timer = 0;
		this.jqXHR = null;
	
		
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
			this.$searchInput.on('input',function(){
				if(this.options.getDataDelay){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataDelay)
				}else{
					this.getData();
				}
			}.bind(this))
			//3.当点击页面其他地方时，让下拉层消失
			$(document).on('click',$.proxy(this.hideLayer,this))
			//4.当输入框再次获取焦点时，让下拉层再次显示出来
			this.$searchInput.on('focus',$.proxy(this.showLayer,this))
			//5.阻止输入框点击时的冒泡事件
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//6.利用事件委托给下拉层的子元素绑定事件
			var _this = this;
			this.$searchLayer.on('click','.search-item',function(){
				$elem = $(this);
				//1.获取具体元素的值
				var val = $elem.html();
				console.log(val)
				//2.将值放入输入框中
				_this.$searchInput.val(val);
				//3.触发表单的提交事件
				_this.$searchForm.submit();
			})
			
		},
		getData:function(){
			//判断输入框的值不能时空格
			var inputVal = this.getValue();
			if(inputVal == ''){
				//如果输入框内容为空，则下拉层不显示
				this.addHtml('');
				this.hideLayer();
				 return;
			}
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			//判断缓存中有没有
			if(cache.data[inputVal]){
				this.$elem.trigger('getData',[cache.data[inputVal]]);
				return;
			}

			console.log('发送请求')
			this.jqXHR = $.ajax({
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
				var inputVal = this.getValue();
				cache.addData(inputVal,data)
			}.bind(this))
			.fail(function(err){
				/*
				this.addHtml('');
				this.hideLayer();
				*/
				this.$elem.trigger('getNoData');
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
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
			this.isLoaded = !!html;
			this.$searchLayer.html(html)
		}
	}
	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slideDownUp',
		getDataDelay:200
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