// JavaScript Document

$(document).ready(function() {
	
		
	$(".menico").on("click" , function () {
		$(".nivå1").toggle();
		});
		
	var previousScroll = 0;
	$(window).scroll(function(event){
		var scroll = $(this).scrollTop();
		if(scroll>200){
			if (scroll > previousScroll){
			$('.global').fadeOut();
			} else {
			$('.global').fadeIn();
			}
			previousScroll = scroll;
		}
	});	
					
}); /*stänger document.redy*/



