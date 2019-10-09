;(function($){
	//共通只加载一次html
	function loadHtmlOnce($elem,cb){

		var $layer = $elem.find('.dropdown-layer');
		var dataUrl = $elem .data('url');
		if(!dataUrl) return;
		if($elem.data('isLoaded')) return;
		$.getJSON(dataUrl,function(data){
			$elem.data('isLoaded',true);
			/*
			var html = '';
			
			for(var i=0;i<data.length;i++){
				html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
			}
			//.模仿数据加载
			setTimeout(function(){
				$layer.html(html);
			},1000)
			*/
			typeof cb == 'function' && cb(data,$layer);
			
			
		})
	}
	//封装加载图片的函数
	function loadImage(imgUrl,success,error){
		var image = new Image();//得到一个实力
		image.onload = function(){//成功时的回调
			typeof success == 'function' &&	success();
		}
		image.onerror = function(){//失败的回调
			typeof error == 'function' &&	error();
		}
		//模仿网络延迟
		setTimeout(function(){
			image.src = imgUrl;//表明去哪个地址请求图片
		},500)
		
	}


	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			/*
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var dataUrl = $elem .data('url');
			if(!dataUrl) return;
			if($elem.data('isLoaded')) return;
			$.getJSON(dataUrl,function(data){
				$elem.data('isLoaded',true);
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				
				
			})
			*/
			loadHtmlOnce($(this),createMenuHtml)
			function createMenuHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		})
		$dropdown.dropdown({delay:200}); 
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
				html += '<li class="search-item">'+data.result[i][0]+'</li>';
			}
			return html;
		}
	}
	handleSearch();

	function handleCategory(){
		var $dropdown = $('.category .dropdown');
		
		$dropdown.on('dropdown-show',function(ev){
			/*
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var dataUrl = $elem .data('url');
			if(!dataUrl) return;
			if($elem.data('isLoaded')) return;
			$.getJSON(dataUrl,function(data){
				$elem.data('isLoaded',true);
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
				//.模仿数据加载
				setTimeout(function(){
					 $layer.html(html);
				},1000)
				
			})
			*/
			loadHtmlOnce($(this),createCategoryHtml)
			function createCategoryHtml(data,$layer){
				var html = '';
				for(var i=0;i<data.length;i++){
					html += '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
					for(var j=0;j<data[i].items.length;j++){
						html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
					}
					html += '</dd></dl>'
				}
				//.模仿数据加载
				setTimeout(function(){
					$layer.html(html);
				},1000)
			}
		})
		$dropdown.dropdown({delay:200,js:true,mode:"fade"});
	}
	handleCategory();

	function handleCarousel(){
		var $carousel = $('.carousel-wrap');
		var item = {};//0:loaded,1:loaded
		var loadItemNum =  $carousel.find('.carousel-item').length;
		var loadedItemNum = 0;//表示已经加载过几张图片
		var fnload = null;
		$carousel.on('carousel-show',fnload = function(ev,index,elem){
			console.log('carousel-show')
			if(item[index] != 'loaded'){
				console.log('load',index)
				//加载图片

				
				//找到图片标签
				var $img = $(elem).find('.carousel-img');
				//拿到真正的图片地址
				var imgUrl = $img.data('src');
				/*
				//获取图片
				$img.attr('src',imgUrl)
				*/
				//1.如果网络卡顿的话，影响图片加载
				//2.如果失败的话，不容易处理

				/*
				var image = new Image();//得到一个实例
				image.onload = function(){//成功时的回调
					$img.attr('src',imgUrl)
				}
				image.onerror = function(){//失败的回调
					$img.attr('src',"images/focus-carousel/placeholder.png")
				}
				image.src = imgUrl;//表明去哪个地址请求图片
				*/
				loadImage(imgUrl,function(){
					$img.attr('src',imgUrl)
				},function(){
					$img.attr('src',"images/focus-carousel/placeholder.png")
				});


				item[index] = 'loaded';
				loadedItemNum++;
				if(loadedItemNum == loadItemNum){
					$carousel.off('carousel-show',fnload);
				}
			}
			
		})

		$carousel.carousel({});
	}
	handleCarousel();
})(jQuery);