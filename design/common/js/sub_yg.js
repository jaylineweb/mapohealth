// 연길에서 사용할 js입니다.


$(document).ready(function(){

/* ■■■■■■■■■■■■ S: yg ■■■■■■■■■■■■  */
	// 주석으로 스크립트작업 내용 설명 부탁드립니다.
	$('.year-tab > li').click(function(){
		var index =  $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.y-tab-cont').eq(index).addClass('on').siblings().removeClass('on');
		return false;
	});

	$('.addr_btnBox ul li a').click(function(){
		$('.addr_btnBox ul li a').removeClass('on');
		$(this).addClass('on');
	});
	$(".departs > li").click(function(){
		$(".departs > li").removeClass("on");
		$(this).addClass("on");
	})



	// 마포구 행정서비스 헌장 보기   드랍다운 내용
	function htx_bk_close(){
		$('.hidden-text-block').slideUp(200);
		$('.tx-block-sw').removeClass('on');
		$('.tx-block-sw').children('i').text("보기");
	}
	$('.tx-block-sw').click(function(){
		if ($(this).hasClass('on')){
			htx_bk_close();
		}else{
			$(this).addClass('on');
			$(this).children('i').text("닫기");
			$('.hidden-text-block').slideDown(200);
		}
	});
	$('.tx-block-close').click(function(){
		htx_bk_close();
	});

/* ■■■■■■■■■■■■ E: yg ■■■■■■■■■■■■  */	


/* ■■■■■■■■■■■■ S: yg2 ■■■■■■■■■■■■  */
	/*select-S 년도선택 탭1*/
		$(".select-option > li > a").click(function(){
			$(this).parents(".select-option").css({"display":"none"}); 
			$(this).parents(".select-option").siblings(".select-text").removeClass("on");
			$(this).parents(".select-option").siblings(".select-text").text($(this).text());
		});

		$(".select-text").click(function(){
			if($(this).hasClass("on")){ 
				$(".select-option").css({"display":"none"}); 
				$(".select-text").removeClass("on");
			}else{
				$(".select-text").removeClass("on");
				$(this).addClass("on");
				$(".select-option").css("display","none");
				$(this).next(".select-option").css("display","block");
					}
		});
		$("body").click(function(e) {
			var target = $(e.target);
			if(!target.is(".select-text") && !target.is(".select-option")) {
				if ( $(".select-option").is(":visible") ) {
					$(".select-text").removeClass("on");
					$(".select-option").hide(); 
				}
			}
		});

		$('.year-select > li').click(function(){
			var index =  $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$(this).parents(".select-outBox").children(".y-select-cont").eq(index).addClass('on').siblings('.y-select-cont').removeClass('on');
			return false;
		});



	/*select-E 년도선택 탭1*/


	/*팝업 관련S*/
		$('.button-question01').click(function(){ 
			$('.popup-bg').css({"display":"block"});
			$('.popup01.disp01').css({"display":"block"});
		});
		$('.popup01 .top-b .close').click(function(){ 
			$('.popup-bg').css({"display":"none"});
			$('.popup01.disp01').css({"display":"none"});
		});
		$('.nextBtn01').click(function(){ 
			$('.popup-bg').css({"display":"block"});
			$('.popup02.disp02').css({"display":"block"});
		});
		$('.nextBtn01-close').click(function(){ 
			$('.popup-bg').css({"display":"none"});
			$('.popup02.disp02').css({"display":"none"});
		});
		$(".button01").click(function(){
			if($(this).hasClass("on")){ 
				$("#memLayout").css({"display":"none"}); 
				$(this).removeClass("on");
			}else{
				$("#memLayout").css({"display":"block"}); 
				$(this).addClass("on");
					}
		});
			$('.tab-case01 > ul > li').click(function(){
				var index =  $(this).index();
				$(this).addClass('on').siblings().removeClass('on');
				$('.tab-case01-cont').eq(index).addClass('on').siblings().removeClass('on');
				return false;
			});
	/*팝업 관련E*/

	/*물음표 버튼S*/
		$(".question-mark01-btn").click(function(){
			if($(this).hasClass("on")){ 
				$(".question-mark01-div").css({"display":"none"}); 
				$(".question-mark01-btn").removeClass("on");
			}else{
				$(".question-mark01-div").css({"display":"none"}); 
				$(this).next(".question-mark01-div").css({"display":"block"}); 
				$(".question-mark01-btn").removeClass("on");
				$(this).addClass("on");
					}
		});
	/*물음표 버튼E*/


	/*동별주민자치위원 현황 동선택버튼S*/
		$('.dong-select ul li').click(function(){
			var index =  $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$(this).parents(".dong-box").children(".dong-tb").eq(index).addClass('on').siblings('.dong-tb').removeClass('on');
			return false;
		});
	/*동별주민자치위원 현황 동선택버튼E*/
/* ■■■■■■■■■■■■ E: yg2 ■■■■■■■■■■■■  */
});

$(window).load(function(){

	$window.resize(function(){



	}).resize();
});



/* 代码整理：大头网 www.datouwang.com */
/*6图切换*/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function Focus() {
	function byid(id) {
		return document.getElementById(id);
	}
	function bytag(tag, obj) {
		return (typeof obj == 'object' ? obj: byid(obj)).getElementsByTagName(tag);
	}
	var timer = null;
	var oFocus = byid('tFocus');
	var oPic = byid('tFocus-pic');
	var oPicLis = bytag('li', oPic);
	var oBtn = byid('tFocus-btn');
	var oBtnLis = bytag('li', oBtn);
	var iActive = 0;
	function inlize() {
		oPicLis[0].style.filter = 'alpha(opacity:100)';
		oPicLis[0].style.opacity = 100;
		oPicLis[0].style.zIndex = 5;
	};
	for (var i = 0; i < oPicLis.length; i++) {
		oBtnLis[i].sIndex = i;
		oBtnLis[i].onclick = function() {
			if (this.sIndex == iActive) return;
			iActive = this.sIndex;
			changePic();
		}
	};
	byid('tFocus-leftbtn').onclick = byid('prev').onclick = function() {
		iActive--;
		if (iActive == -1) {
			iActive = oPicLis.length - 1;
		}
		changePic();
	};
	byid('tFocus-rightbtn').onclick = byid('next').onclick = function() {
		iActive++;
		if (iActive == oPicLis.length) {
			iActive = 0;
		}
		changePic();
	};
	
	function changePic() {
		for (var i = 0; i < oPicLis.length; i++) {
			doMove(oPicLis[i], 'opacity', 0);
			oPicLis[i].style.zIndex = 0;
			oBtnLis[i].className = '';
		};
		doMove(oPicLis[iActive], 'opacity', 100);
		oPicLis[iActive].style.zIndex = 5;
		oBtnLis[iActive].className = 'active';
		if (iActive == 0) {
			doMove(bytag('ul', oBtn)[0], 'left', 0);
		//} else if (iActive >= oPicLis.length - 2) {
		//	doMove(bytag('ul', oBtn)[0], 'left', -(oPicLis.length - 3) * (oBtnLis[0].offsetWidth + 4));
		} else if (iActive >= oPicLis.length) {
			doMove(bytag('ul', oBtn)[0], 'left', -(oPicLis.length - 1) * (oBtnLis[0].offsetWidth + 4));
		} else {
			doMove(bytag('ul', oBtn)[0], 'left', -(iActive - 1) * (oBtnLis[0].offsetWidth + 4));
		}
	};
	function autoplay() {
		if (iActive >= oPicLis.length - 1) {
			iActive = 0;
		} else {
			iActive++;
		}
		changePic();
	};
	aTimer = setInterval(autoplay, 2000);
	inlize();
	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	};
	function doMove(obj, attr, iTarget) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (iTarget - iCur) / 6;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if (iCur == iTarget) {
				clearInterval(obj.timer);
			} else {
				if (attr == 'opacity') {
					obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
					obj.style.opacity = (iCur + iSpeed) / 100;
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		},
		30)
	};
	byid('tFocus').onmouseover = function() {
		clearInterval(aTimer);
	}
	byid('tFocus').onmouseout = function() {
		//aTimer = setInterval(autoplay, 2000);
	}
}
/* ■■■■■■■■■■■■ S: yg3 ■■■■■■■■■■■■  */	
$(document).ready(function(){
	$(".top-btns-line > div > a.table").click(function(){
		$(".ygcard-img-list").css({"display":"none"});
		$(".ygcardtable-list").css({"display":"block"});
		$(this).addClass('on').siblings().removeClass('on');
	});
	$(".top-btns-line > div > a.img").click(function(){
		$(".ygcard-img-list").css({"display":"block"});
		$(".ygcardtable-list").css({"display":"none"});
		$(this).addClass('on').siblings().removeClass('on');
	});
	/*2019/6/21 s*/
	$(".watchexp-calendar .layerPopBtn").click(function(){
		$(this).siblings(".layer_popup").addClass("on");
		$(".blackbg").addClass("on");
	});
	$(".watchexp-calendar .layer_close").click(function(){
		$(".watchexp-calendar .layer_popup").removeClass("on");
		$(".blackbg").removeClass("on");
	});
	/*2019/6/21 e*/

	/*$(".village-tab > ul > li > a").click(function(){
		if($(window).width() < 768){
			$(this).parents(".village-tab > ul").css({"display":"none"}); 
			$(this).parents(".village-tab > ul").siblings(".village-tab > a").removeClass("on");
			$(this).parents(".village-tab > ul").siblings(".village-tab > a").text($(this).text());
		}
	});
	$(".village-tab > a").click(function(){
		if($(this).hasClass("on")){ 
			$(".village-tab > ul").css({"display":"none"}); 
			$(".village-tab > a").removeClass("on");
		}else{
			$(".village-tab > a").removeClass("on");
			$(this).addClass("on");
			$(".village-tab > ul").css("display","none");
			$(this).next(".village-tab > ul").css("display","block");
				}
	});
	$('.village-tab > ul > li').click(function(){
		var index =  $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(".village-con-list").find(".village-con").eq(index).addClass('on').siblings('.village-con').removeClass('on');
		return false;
	});*/
	$(".bld-tabmenu > ul > li > a").click(function(){
		if($(window).width() < 768){
			$(this).parents(".bld-tabmenu > ul").css({"display":"none"}); 
			$(this).parents(".bld-tabmenu > ul").siblings(".bld-tabmenu > a").removeClass("on");
			$(this).parents(".bld-tabmenu > ul").siblings(".bld-tabmenu > a").text($(this).text());
		}
		if($(this).parent().index() > 4){
			$('.gu').hide();
		}else {
			$('.gu').show();
		}
	});
	$(".bld-tabmenu > a").click(function(){
		if($(this).hasClass("on")){ 
			$(".bld-tabmenu > ul").css({"display":"none"}); 
			$(".bld-tabmenu > a").removeClass("on");
		}else{
			$(".bld-tabmenu > a").removeClass("on");
			$(this).addClass("on");
			$(".bld-tabmenu > ul").css("display","none");
			$(this).next(".bld-tabmenu > ul").css("display","block");
		}
		if($(this).index() > 4){
			$('.gu').hide();
		}else {
			$('.gu').show();
		}
	});
	$('.bld-tabmenu > ul > li').click(function(){
		var index =  $(this).index();
		$(this).addClass('on').siblings().removeClass('on').find('a').removeAttr('title');
		$(this).find('a').attr('title', '선택됨');
		$(".bld-con").find(".bld-consub").eq(index).addClass('on').siblings('.bld-consub').removeClass('on');
		return false;
	});

})
$(window).on('load resize', function () {
	if ($(window).width() > 768){
		/*$(".village-tab > ul").css({"display":"block"}); */
		$(".bld-tabmenu > ul").css({"display":"table"});
		$(".bld-tabmenu > a").removeClass("on");
	}else if($(window).width() < 769){
		/*$(".village-tab > ul").css({"display":"none"}); */
		$(".bld-tabmenu > ul").css({"display":"none"});
	}
});

/*2019/8/21 S*/

$(window).load(function() {
/*		$('#slider001').flexslider({
			animation: "fade",
			slideDirection: "vertical",
			animationLoop: true,
			smoothHeight: false,
			slideshow: false,
			slideshowSpeed: 3000,
			animationSpeed: 600,
			controlNav: false,
			directionNav: true,
			prevText: "鞚挫爠",
			mousewheel: true,
			nextText: "雼れ潓",
			pausePlay: false
		});
*/});

$(document).ready(function(){
/*		$(".pslide2-con").bxSlider({
			auto: false,
			autoReload: true,
			infiniteLoop : true,
			hideControlOnEnd: false,
			pause: 3000,
			pager: false,
			controls: true,
			autoControls: false,
			minSlides: 2,
			maxSlides: 6,
			moveSlides: 1,
			slideWidth: 154,
			slideMargin: 20
		});

		$(".pslide3-con").bxSlider({
			auto: false,
			autoReload: true,
			infiniteLoop : true,
			hideControlOnEnd: false,
			pause: 3000,
			pager: false,
			controls: true,
			autoControls: false,
			minSlides: 2,
			maxSlides: 3,
			moveSlides: 1,
			slideWidth: 319,
			slideMargin: 35,
		});
*/
	
	$('.publicity-list-con .plc-menu li').click(function(){
		var index =  $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(".pl-rcon").find(".pl-rsub").eq(index).addClass('on').siblings('.pl-rsub').removeClass('on');
		return false;
	});
});
/*2019/8/21 E*/


/* ■■■■■■■■■■■■ E: yg3 ■■■■■■■■■■■■  */	




















