;(function($){

	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		$dropdown.dropdown({delay:200}); 
		$dropdown.on('dropdown-show',function(ev){
			// console.log(this)
			var $elem = $(this);
			var dataUrl = $elem .data('url');
			// console.log(dataUrl)
			if(!dataUrl) return;
			if($elem.data('isLoaded')) return;
			$.getJSON(dataUrl,function(data){
				$elem.data('isLoaded',true);
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}

				//.模仿数据加载
				setTimeout(function(){
					$dropdown.find('.dropdown-layer').html(html);
				},1000)
				
			})

			
			
		})
		/*
		$('.nav-side button').on('click',function(ev){
			// ev.stopPropagation();
			$('.nav-side .dropdown').dropdown('show');
		})
		*/
	}
	handleDropDown();
	function handleSearch(){
		$('.search').search();
		$('.search').on('getData',function(ev,data){
			//1.将数据包装成html代码
			var html = createLayerHtml(data,5);
			//2.将html代码放入到下拉层中
			// this.addHtml(html);
			$('.search').search('addHtml',html);
			//3.将下拉层展示出来
			// this.showLayer()
			$('.search').search('showLayer');

		})
		$('.search').on('getNoData',function(){
			/*
			this.addHtml('');
			this.hideLayer();
			*/
			$('.search').search('addHtml','');
			$('.search').search('hideLayer');

		})
		function createLayerHtml(data,itenNum){
			var html = '';
			for(var i=0;i<data.result.length;i++){
				if(i >= itenNum) break;
				html += '<li class="search-item">'+data.result[i][0]+'</li>'
			}
			return html;
		}
	}
	handleSearch();


})(jQuery);