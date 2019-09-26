;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn')
		this.$searchInput = $elem.find('.search-input')
		this.$searchForm = $elem.find('.search-form')
		this.$searchLayer = $elem.find('.search-layer')
	
		
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
			
		},
		getData:function(){
			//判断输入框的值不能时空格
			if(this.getValue() == '') return;
			$.ajax({
				url:this.options.url+this.getValue(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				// console.log(data)
				//1.将数据包装成html代码
				var html = '';
				for(var i=0;i<data.result.length;i++){
					html += '<li class="search-item">'+data.result[i][0]+'</li>'
				}
				// console.log(html)

				//2.将html代码放入到下拉层中
				this.$searchLayer.html(html)

				//3.将下拉层展示出来
				this.$searchLayer.showHide('show')



			}.bind(this))
			.fail(function(err){
				console.log(err)
			})
		}
	}
	//https://suggest.taobao.com/sug?code=utf-8&q=a&_ksTS=1569493529438_1927&callback=jsonp1928&k=1&area=c2c&bucketid=16
	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slideDownUp'
	}



	$.fn.extend({
		search:function(options){

			return this.each(function(){
				var $elem = $(this);
				var search  = $elem.data('search');
				if(!search){
					options = $.extend({},Search.DEFAULTS,options);
					search = new Search($elem,options);
					$elem.data('search',search)
				}
				if(typeof search[options] == 'function'){
					search[options]();
				}

			})
		}
	})





})(jQuery);