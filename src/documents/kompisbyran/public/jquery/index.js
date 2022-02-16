// JavaScript Document

$(document).ready(function () {
	/*if (screen.width <= 900) {
		$("#omdir").show();
	}
	if (screen.width <= 600){
    window.location = "mobile/indexm.html";
	}*/
	
	var win_h = $(window).height();
	
	$(".del1, .del1_in").css("height", win_h - 145);
	$(".del1_tit").css("height", win_h - 314);
	$(".admin").css("height", win_h);
	
	
	
	$(window).scroll(function (){
		if ($(window).scrollTop() >= 243){
		$(".menu").addClass("menu_fix");
		}
		if ($(window).scrollTop() < 243){
		$(".menu").removeClass("menu_fix");
		}	
	});
	
	
	$("select[name=barn]").change(function (){
		uppenbara ($("select[name=barn]").prop("value"), $(".barn"), "Inga barn");
	});

	$("input[name=extrapers]").change(function (){
		uppenbara ($("input[name=extrapers]").prop("checked"), $(".kompis"), false);
	});
	
	
});

function uppenbara ($aktivera, $uppenbara, $exeption){
			if ($aktivera != $exeption){
				($uppenbara).css("display" , "table-cell");
			}else{
				($uppenbara).css("display" , "none");
			};
 };

