;(function($){
	$('.dropdown').dropdown({js:true,mode:"slideDownUp"}); 
	$('.dropdown').on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		console.log('!::::',ev.type)
	})
})(jQuery);