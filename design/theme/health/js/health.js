$(document).ready(function(){
	$(".stairs_all > li > a").click(function(){
		$(".stairs_con").css({display:"none"});
		$(".stairs_all > li > a").removeClass("on");
		$(this).next(".stairs_con").css({display:"block"});
		$(this).addClass("on");
	});
});