;(function($){
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
})(jQuery);