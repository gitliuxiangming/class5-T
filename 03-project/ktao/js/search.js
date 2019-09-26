;(function($){
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.$searchBtn = $elem.find('.search-btn')
		this.$searchInput = $elem.find('.search-input')
	
		
		//2.初始化
		this.init();
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
		},
		getValue:function(){
			return this.$searchInput.val();
		}
	}

	Search.DEFAULTS = {
		
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