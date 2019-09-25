;(function($){
	$('.nav-side .dropdown').dropdown({delay:200}); 
	$('.nav-side .dropdown').on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		console.log('!::::',ev.type)
	})
})(jQuery);