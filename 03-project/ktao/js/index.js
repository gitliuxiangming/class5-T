;(function($){
	$('.dropdown')
	.hover(function(){
		var activeClass = $('.dropdown').data('active') + '-active';
		$('.dropdown').addClass(activeClass);
		$('.dropdown-layer').show();
	},function(){
		var activeClass = $('.dropdown').data('active') + '-active';
		$('.dropdown').removeClass(activeClass);
		$('.dropdown-layer').hide();
	})
})(jQuery);