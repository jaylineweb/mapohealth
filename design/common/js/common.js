var $window = $(window),
	$document = $($document);
var GLOBAL = GLOBAL || {};

//날씨 가져오기
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}
function getWeather() {

$.ajax({
	  url:"/site/getDistrict",
	  dataType:'json',
	  success:function(data) {
	    
//		  $('#environment1').html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\">" + data.environment1 + "</a>");
//		  $('#environment2').html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\">" + data.environment2 + "</a>");
//		  $("#divTemp").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><strong>"+ data.obsrValue1 +"˚C</strong></a>");

		  $('#environment1').html(data.environment1);
		  $('#environment2').html(data.environment2);
		  $("#divTemp").html("<strong>"+ data.obsrValue1 +"˚C</strong>");

		  $('.level').html(data.environment2);
		  $('.degree').html(data.pm10+"㎍/㎥");
		  $(".temperatures").html(data.obsrValue1 +"<em>℃</em>");
		  
		  rainVal = data.rainVal;
		    skyVal = data.skyVal;
		 //   console.log(data);
/*		    if(rainVal == 0){
		      if(skyVal == 1){
//		        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_sun.png\" alt=\"맑음\"> <img src=\"/design/common/images/common/ico_weather_cloud.png\" alt=\"구름\" class=\"on\"> <img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"비\"> <img src=\"/design/common/images/common/ico_weather_thunder.png\" alt=\"번개\">);
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_sun.png\" alt=\"맑음\" class=\"on\"></a>");
		      }else if(skyVal == 3){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_cloud_and_clear.png\" alt=\"구름\" class=\"on\"></a>");
		      }else if(skyVal == 4){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_cloud.png\" alt=\"흐림\" class=\"on\"></a>");
		      }
		    }else{
		      if(rainVal == 1){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"비\" class=\"on\"></a>");
		      }else if(rainVal == 2){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"비\" class=\"on\"></a>");
		      }else if(rainVal == 3){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_snow.png\" alt=\"눈\" class=\"on\"></a>");
		      }else if(rainVal == 4){
		        $("#divSun").html("<a href=\"/site/main/weather/weather_view\" target=\"_blank\"><img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"소나기\" class=\"on\"></a>");
		      }
		    }
*/
		    	if(rainVal == 0){
			      if(skyVal == 1){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_sun.png\" alt=\"맑음\" class=\"on\">맑음");
					 $(".weather_stat").attr('data-weather', '1');
					//$("#divTemp").html("<strong>맑음&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
			      }else if(skyVal == 2){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_cloud_and_clear.png\" alt=\"구름많음\" class=\"on\">구름많음");
					//$("#divTemp").html("<strong>구름많음&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '2');
			      }else if(skyVal == 3){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_cloud_and_clear.png\" alt=\"구름많음\" class=\"on\">구름많음");
					//$("#divTemp").html("<strong>구름많음&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '3');
			      }else if(skyVal == 4){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_cloud.png\" alt=\"흐림\" class=\"on\">흐림");
					//$("#divTemp").html("<strong>흐림&nbsp;&nbsp;&nbsp;"+ data.obsrValue1 +"˚C</strong>");
					$(".weather_stat").attr('data-weather', '3');
			      }
			    }else{
			      if(rainVal == 1){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"비\" class=\"on\">비");
			      //  $("#divTemp").html("<strong>비&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '5');
			      }else if(rainVal == 2){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"진눈개비\" class=\"on\">진눈개비");
			     //   $("#divTemp").html("<strong>진눈개비&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '7');
			      }else if(rainVal == 3){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_snow.png\" alt=\"눈\" class=\"on\">눈");
			      //  $("#divTemp").html("<strong>눈&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '8');
			      }else if(rainVal == 4){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"소나기\" class=\"on\">소나기");
			      //  $("#divTemp").html("<strong>소나기&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '5');
			      }else if(rainVal == 5){
			        $("#divSun").html("<img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"빗방울\" class=\"on\">빗방울");
			      //  $("#divTemp").html("<strong>빗방울&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					 $(".weather_stat").attr('data-weather', '5');
	  			  }else if(rainVal == 6){
	  				$("#divSun").html("<img src=\"/design/common/images/common/ico_weather_rain.png\" alt=\"빗방울,눈날림\" class=\"on\">빗방울/눈날림");
	  				//$("#divTemp").html("<strong>빗방울,눈날림&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					$(".weather_stat").attr('data-weather', '8');
	  			  }else if(rainVal == 7){
	  				$("#divSun").html("<img src=\"/design/common/images/common/ico_weather_snow.png\" alt=\"눈날림\" class=\"on\">눈날림");
	  			//	$("#divTemp").html("<strong>눈날림&nbsp;&nbsp;&nbsp; "+ data.obsrValue1 +"˚C</strong>");
					$(".weather_stat").attr('data-weather', '9');
	  			  }
			    }
	  },
	  error: function(xhr, status, error) {
	  }
	});

}
	
$(document).ready(function($window){
	var gnb = function(responsive){
		var $gnb = $(".gnb"),
			$gnb_pr = $(".gnb_pr"),
			$gnbChild = $gnb.find(">ul>li"),
			$gnbTarget = $gnbChild.find(">a"),
			$gnbOpenArea = $(".gnb_bg"),
			_height;

		window.addEventListener('touchstart', function() {
			$gnbTarget.click(function(e){
				e.preventDefault();
			})
		});
		
		$gnbTarget.bind("mouseover focus", function(){
			//alert($gnbTarget.className);
			//$gnb.attr('class','gnb');
			$gnb.removeClass(function(index, className) {
				return (className.match(/(^|\s)gnb_bg\S+/g) || []).join(' ');
			});
			$gnb.addClass('gnb_bg'+($(this).parent().index()+1));
			$gnbTarget.removeClass("on");
			$(this).addClass("on");
			$gnbChild.find(">ul").hide();
			$(this).next().show();

			if (!$gnb.closest("#header").is(".app"))
			{
				if($(this).parent().index() == 4){_height = "332px";}
				else{_height = "650px";}

				if($('.header_health').length){
					if($(this).parent().index() == 3){_height = "900px";}
					else if($(this).parent().index() == 4){_height = "600px";}
					else{_height = "400px";}					
				}
				if($('.header_dong').length){_height = "300px";}
				if($('.header_pr').length){_height = "400px";}
				if($('.naru').length){_height = "312px";}
				if($('.header_culture').length){_height = "400px";}
				if($('.header_mll').length){
					if($(this).parent().index() == 4){_height = "58px";}
					else{_height = "460px";}
				}
				if($('.header_sch').length){
					_height = "332px";
					//alert(11);
				}
				if($('.header_en').length){
					if($(this).parent().index() == 3){
						_height = "500px";
					}
					else{
						_height = "400px";
					}
				}
			}else{
				_height = "532px";
			}
			$gnbOpenArea.show();
			$(this).closest($gnb).stop(true,false).animate({
				height : _height
			},400,"easeOutExpo");	
			if(!$('.dmm').length) $(".container_pr").append('<div class="dmm"></div>');
		});
		
		$("#header .gnb > ul > li > ul > li > ul > li").last().find("a").blur(function(){
			$gnbTarget.removeClass("on");
			//$gnb.css("border-bottom","1px solid #e6e6e6");

			if($('.gnb_pr').length) {
				$(this).closest($gnb).stop(true,false).animate({
					height : "80px"
				},300,"easeOutExpo",function(){
					$gnbOpenArea.hide();
					$gnbChild.find(">ul").hide();
				});
			}else {
				$(this).closest($gnb).stop(true,false).animate({
					height : "58px"
				},300,"easeOutExpo",function(){
					$gnbOpenArea.hide();
					$gnbChild.find(">ul").hide();
				});
			}

			
		});

		// gnb 2뎁스메뉴 txt 2줄 방지
		$('.gnb > ul > li > ul > li').each(function(){
			if( $(this).children('a').text().length > 13 ){						
				$(this).children().css('font-size','15px');
			}
		});
		// gnb 3뎁스메뉴 txt 2줄 방지
		$('.gnb > ul > li > ul > li > ul > li').each(function(){
			if( $(this).children('a').text().length > 12 && !$('.header_en').length ){						
				$(this).children().css({'font-size':'14px','letter-spacing':'-2px'});
			}
		});
		// gnb 2뎁스 li 개행작업
		if( $('.header_main').length ){
			//대표
			for(var k=1; k <= $gnbChild.length - 1; k++){
				if( !$('ul.l_list_' + k +' > li').eq(5).hasClass('blankline') ){$('ul.l_list_' + k + ' > li').eq(4).after('<li class="blankline"></li>')}
				if( !$('ul.l_list_' + k +' > li').eq(11).hasClass('blankline') ){$('ul.l_list_' + k + ' > li').eq(10).after('<li class="blankline"></li>')}
			}
		}else{
			//나머지
			for(var k=1; k <= $gnbChild.length; k++){
				if( !$('ul.l_list_' + k +' > li').eq(4).hasClass('blankline') ){$('ul.l_list_' + k + ' > li').eq(3).after('<li class="blankline"></li>')}
				if( !$('ul.l_list_' + k +' > li').eq(9).hasClass('blankline') ){$('ul.l_list_' + k + ' > li').eq(8).after('<li class="blankline"></li>')}
			}
		}

		// gnb 접근성		
		$("#header .gnb > ul > li > ul.l_list_5 > li.gnbIntro").prev().find('a').blur(function(){
			$gnb.stop(true,false).animate({
				height : "58px"
			},300,"easeOutExpo",function(){
				$gnbOpenArea.hide();
				$gnbChild.find(">ul").hide();
			});
		});


		// 사이트맵 2뎁스메뉴 2줄 방지
		$('.allMenuList > li > ul > li').each(function(){
			if( $(this).children('a').text().length > 9 ){						
				$(this).children().css('font-size','15px');
			}
		});
		// 사이트맵 2뎁스 개행작업
		for(var t=1; t <= $gnbChild.length; t++){
			if( !$('.allMenuList > li').eq(t).children().next().children().eq(4).hasClass('blankline') ){
				$('.allMenuList > li').eq(t).children().next().children().eq(5).after('<li class="blankline"></li>');
			}			
		}
		



		
		
		$gnb.bind({
			mouseleave: function(){
				$gnbTarget.removeClass("on");
				//$gnb.css("border-bottom","1px solid #e6e6e6");
				
				if($('.gnb_pr').length) {
					$('.dmm').remove();
					$(this).closest($gnb).stop(true,false).animate({
						height : "80px"
					},300,"easeOutExpo",function(){
						$gnbOpenArea.hide();
						$gnbChild.find(">ul").hide();
					});
				}else {
					$(this).closest($gnb).stop(true,false).animate({
						height : "58px"
					},300,"easeOutExpo",function(){
						$gnbOpenArea.hide();
						$gnbChild.find(">ul").hide();
					});
				}
			}
		});
	};

	// gnb2
	if($('.gnb2').length){
		var $gnb2 = $('.gnb2');
		var $gnb2Ul = $('.gnb2 > ul');
		$('.gnb2 > ul > li > a').on('click',function(){		
			if($gnb2.hasClass('on')){
				$gnb2Ul.css('height','auto');
				$gnb2.removeClass('on');
			}else {
				$gnb2Ul.css('height',393);
				$gnb2.addClass('on');
			}
		});
		$gnb2Ul.on('mouseenter',function(){					
			$gnb2Ul.css('height',393);
			$gnb2.addClass('on');
		});
		$('#container').on('mouseenter',function(){
			$gnb2Ul.css('height','auto');
			$gnb2.removeClass('on');
		});
		$('.global_bot_wrap').on('mouseenter',function(){
			$gnb2Ul.css('height','auto');
			$gnb2.removeClass('on');
		});
	}

	// 모바일 검색버튼
	$('.global_bot .srch_btn a').on('click',function(){
		if( $('#header .global_bot .global_srch').is(':visible') ){
			$('#header .global_bot .global_srch').hide();
			$(this).removeClass('on');
		}else{
			$('#header .global_bot .global_srch').show();
			$(this).addClass('on');
		}
		
	});

	// 글로벌 검색 펼침기능
	$('.srch_wrap a.down_btn').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('펼침');
			$('.srchp_result_wrap').hide();
		}else{
			$(this).addClass('on').text('닫기');
			$('.srchp_result_wrap').slideDown('fast');
		}
	});
	$('.srchp_result .closing_area .r a').on('click',function(){
		$('.srch_wrap a.down_btn').removeClass('on').text('펼침');
		$('.srchp_result_wrap').hide();
	});


	// 전체메뉴 보기 버튼 이벤트
	var $allMenuToggle = $(".allMenuToggle"),
		$allMenuClose = $(".allMenuClose");
		$allMenuToggle.click(function(e){
			e.preventDefault();
			if ($(this).next().is(".on"))
			{
				$(this).next().hide().removeClass("on").next().hide();
				$(".dim").remove();
				$(".allMenuClose").removeAttr("style");
			}else{
				$(this).next().show().addClass("on").next().show();
				$("body").append("<div class='dim'></div");
				$(".allMenuClose").css("z-index","10001");
			}
		});
		$allMenuClose.click(function(e){
			e.preventDefault();
			$(this).hide().prev().hide().removeClass("on");
			$(".dim").remove();
			$(".allMenuClose").removeAttr("style");
		});
	// sub navi(location)
	var nQick = function(){
		$('.sub_nav > div.snav > a').on('click',function(){		
			if($(this).hasClass('notouch')) return false;
			if($(this).hasClass('on')){
				$('.link_list').hide();
				$(this).removeClass('on');
			}else {
				$('.link_list').hide();
				$(this).next().slideDown('fast');
				$('.sub_nav > div.snav > a').removeClass('on');
				$(this).addClass('on');
			}			
		});
		$('.share_tog').click(function(){
			if($(this).hasClass('on')){
				$('.share_wrap').hide();
				$(this).removeClass('on');
			}else {
				$('.share_wrap').fadeIn();
				$(this).addClass('on');
			}
		});
	}
	
	// 푸터 바로가기
	var fQick = function(){
		$('.f_top > ul > li > a').on('click',function(){		
			if($(this).hasClass('on')){
				$('.link_list').hide();
				$(this).removeClass('on');
			}else {
				$('.link_list').hide();
				$(this).next().slideDown('fast');
				$('.f_top > ul > li > a').removeClass('on');
				$(this).addClass('on');
			}			
		});
	}

	// 상단 배너 액션
	var quick_area_top_on = '311px'; //우측 퀵메뉴 높이(상단배너 활성화)
	var quick_area_top_off = '191px'; // 171 우측 퀵메뉴 높이(상단배너 비활성화)
	var quick_area_top_off_main = '191px'; // 191 우측 퀵메뉴 높이(상단배너 비활성화)
	var popBannerMove = function(){
		$('.today_close').click(function(){
			$('.pop_toggle_btn').trigger('click');
			if ($('#today').prop("checked")) {
				setCookie('popToggle','click',1);
			}
		});
		$('.pop_toggle_btn').click(function(){
			if($('.toppop_wrap').hasClass('on') && true){
				popClose();
			}else {
				if($('.toppop_wrap').length){
					popOpen();
				}	
			}		
		});
	}
	function popOpen() {
		if($(window).width() > 768){
			$('.toppop_wrap').show().addClass('on');
			$('.pop_toggle_btn').addClass('on').find('.poptxt').text('닫기');
			if($('.header_street').length){				
			}else if($('.header_pr').length){
			}else{
				$('#header').css('height',quick_area_top_on);
				//console.log('popOpen #header+quick_area_top_on 실행');
			}
			$('.quick_area').css('top',quick_area_top_on);
		}	
		//console.log(getCookie('popToggle'));
	}
	function popClose() {
		$('.toppop_wrap').hide().removeClass('on');
		$('.pop_toggle_btn').removeClass('on').find('.poptxt').text('열기');
		//$('#header').css('height',quick_area_top_off);
		if($('.header_street').length){				
		}else if($('.header_pr').length){		
		}else if($('.header_en').length){
		}else{
			$('#header').css('height',quick_area_top_off);
			if($(window).width() > 768) $('.quick_area').css('top',quick_area_top_off);
			/*if($('.header_main').length) {
				$('#header').css('height',quick_area_top_off_main);
			}else{
				$('#header').css('height',quick_area_top_off);
			}*/			
		}	
		//console.log(getCookie('popToggle'));
	}
	var popToggleVal = getCookie('popToggle');
	if( popToggleVal == 'click' || !$('.toppop_wrap').length ){
		popClose();
	}else {
		popOpen();
	}
	

	// 우측 퀵메뉴 높이
	var rightQuick = function(){
		if($('.toppop_wrap').hasClass('on')){			
			$('.quick_area').css('top',quick_area_top_on);
			//console.log('rightQuick() ...  toppop_wrap has on');
		}else {
			if($(window).width() > 768) $('.quick_area').css('top',quick_area_top_off);
				
			/*if($('.header_main').length) {
				$('.quick_area').css('top',quick_area_top_off_main);
			}else{
				$('.quick_area').css('top',quick_area_top_off);
			}*/				
			//console.log('rightQuick() ...  toppop_wrap DOSE NOT have on');
		}
	}

	//tab
	var tabInit = function(){
		var tabLi = $('.tab_wrap > ul > li');
		var tabIndex = tabLi.length;
		if(tabIndex <= 7){
			tabLi.css('width', 100/tabIndex + '%');
		}else if (tabIndex == 8){
			tabLi.css('width', '25%');
			//$(window).width() < 768
			tabMaking(4);
			
		}else if (tabIndex == 9 || tabIndex == 10){
			tabLi.css('width', '20%');
			tabMaking(5);
		}else {
			tabLi.css('width', 100/6 + '%');
			tabMaking(6);
		}
		function tabMaking(tabNum){
			tabLi.eq(tabNum).children().css('border-left','1px solid #d5d5d5');
			tabLi.each(function(index){
				if(index >= tabIndex/2){
					$(this).children().css('border-top','0');
				}
			});
			$('.tab_wrap > ul > li.on').prev().children().css('border-right','0');
			$('.tab_wrap > ul > li.on').children().css('border','1px solid #2c82ea');
		}
	}

		
	// bbs 아코디언 게시판
	var bbsAcodian = function(){
		$('.bbs_acodian ul li .top, .bbs_acodian ul li.on .top .top_r a').click(function(event){
			if($(this).parent().hasClass('acodian_link')) {return false;}
			if($(this).parent().hasClass('on')){
				event.preventDefault();
				event.stopPropagation();
				$(this).next('.bot').slideUp('fast');
				$(this).find('.top_r a').html('내용보기');
				$(this).parent().removeClass('on');
			}else{
				event.preventDefault();
				event.stopPropagation();
				$('.bbs_acodian ul li').removeClass('on').children('.bot').slideUp('fast');
				$('.bbs_acodian ul li').find('.top_r a').html('내용보기');
				$(this).next('.bot').slideDown('fast');
				$(this).find('.top_r a').html('내용닫기');
				$(this).parent().addClass('on');
			}
		});
	}
	


	gnb();
	nQick();
	fQick();			
	popBannerMove();	
	tabInit();
	bbsAcodian();
	rightQuick();






	

	



	// drawer menu show hide
	var hamWidth = $(".ham").outerWidth();
	$(".ham").css('right', -1000).hide();

	function hamClose() {
	//	$('.ham').removeClass('open').css('top',0).find('>ul').addBack().css('height',$(window).height()); //221219
		$("html, body").css({'overflow':'inherit'});
		$(window).css({'overflow':'auto'});
		$("#body_wrap").css({'height':'auto', 'overflow':'inherit'}).stop().animate({"right": 0}, 200);
		$(".ham").css('top',0).stop().animate({'top':0, "right": -1000}, 200,function(){$(this).hide();});
		$(".dmm").remove();
	}


	function hamOpen() {
		//$('.ham').css('top',0).find('>ul').addBack().css('height',$(window).height());
		$('.ham').css('top',0).css('height',$(window).height()); //221219
		//$('.ham').css('top',0);
		$(window).css({'overflow':'hidden'});
		$("body").append('<div class="dmm"></div>');
		$("#body_wrap").css({'height':$(window).height(), 'overflow':'hidden'}).stop().animate({"right": hamWidth}, 200);
		$(".ham").addClass('open').css('top',0).show().stop().animate({'top':0, "right": 0}, 200);
		$('.dmm').click(function(){
		   hamClose();
		   $("body").removeClass("ast");
		});
		$('.ham_close').click(function(){
		   hamClose();
		   $("body").removeClass("ast");
		});
		
		$('.ham a').on('click',function(){
		   var hamHeight = $('.ham > ul').outerHeight();
		   console.log(hamHeight);
		   //$('.ham > ul').css('height',hamHeight);
		});

	}

	$(window).resize(function(){
		if($('.ham').hasClass('open')){
			$('.ham').css({'top':0, 'right':0});//.find('>ul').addBack().css('height',$(window).height());
		} else {
			$('.ham').css({'top':0, 'right':-1000})//.find('>ul').addBack().css('height',$(window).height());
		}
	});
	$(".ham_btn").on('click',function() {
		hamOpen();
		$("body").css({"overflow-y":"hidden"});
		$("body").addClass("ast");
	});
	$(".ham .close").click(function() {
		hamClose();
		$("body").css({"overflow-y":"auto"});
		$("body").removeClass("ast");
	});

	$(window).on("load resize", function(){ 
		$("body").css({"overflow-y":"auto"});
		$("body").removeClass("ast");
		$(".ham").css({"right":"-1000px"});
		$(".ham").css({"display":"none"});
		$(".dmm").css({"display":"none"});
	});

	// mobile gnb = ham
	var $hamUl = $(".ham > ul"),
		$hamUl2 = $(".ham > ul > li > ul");

	$hamUl.find("li:not(:has(ul))").each(function(i){
		$(this).find("a").addClass("notToggle").end()
			.addClass("noUrl");
	});
	
	$(".ham > ul > li:first-child > a").addClass("on");
	$(".ham > ul > li:first-child > ul").css({"display":"block"});
	$(".ham > ul > li > a").click(function (e){
		if ($(window).width() <= 768 ){
			if($(this).siblings().length > 0){
				e.preventDefault();
			}
			if ( $(this).hasClass('on') )
			{
				$(".ham > ul > li > a").removeClass("on");
				$(".ham > ul > li > ul").hide();
			}else{
				$(".ham > ul > li > a").removeClass("on");
				$(".ham > ul > li > ul").hide();
				$(this).next(".ham > ul > li > ul").show();
				$(this).addClass("on");
			}
		}
	});

	$(".ham > ul > li > ul > li > a").click(function (e){
		if ($(window).width() <= 768 ){
			if($(this).siblings().length > 0){
				e.preventDefault();
			}
			if ( $(this).hasClass('on') )
			{
				$(".ham > ul > li > ul > li > a").removeClass("on");
				$(".ham > ul > li > ul > li > ul").slideUp("fast");
			}else{
				$(".ham > ul > li > ul > li > a").removeClass("on");
				$(".ham > ul > li > ul > li > ul").slideUp("fast");
				$(this).next(".ham > ul > li > ul > li > ul").slideDown("fast");
				$(this).addClass("on");
			}
		}
	});


	/*
	$hamUl.find("a:not('.notToggle')").bind("click", function(e){
		e.preventDefault();
		var $this = $(this);
		
		$this.closest("li").siblings("li").removeClass("on");
		if ($this.closest("li").has("ul")){
			e.preventDefault();
			$this.closest("li").addClass("on");
			
		}
		if ($this.next().css("display") == "block"){
			//$this.closest("li").removeClass("on");
			//$this.next().css('background','red');
			console.log(11);
			return false;
		}
	});
	*/
	
	$hamUl.find("a:not('.notToggle')").bind("click", function(e){
		e.preventDefault();
		var $this = $(this);
		if($this.closest("li").hasClass('on')){
			$this.closest("li").removeClass('on');
		}else{
			$this.closest("li").addClass('on');
		};
		/*
		$this.closest("li").siblings("li").removeClass("on");
		if ($this.closest("li").has("ul")){
			e.preventDefault();
			$this.closest("li").addClass("on");
		}
		if ($this.closest("ul").is(".menuCtg")){

			if ($this.parent().next().css("display") == "block"){
				$this.closest("li").removeClass("on");
				$this.closest("li").find("ul").removeClass("on").slideUp('fast');
				return false;
			}
			$this.closest("li").siblings("li").find("> ul").slideUp('fast');
			$hamUl2.find("> li").removeClass("on");
			$hamUl2.find("> li > ul").removeClass("on").slideUp('fast');
		}else{
			if ($this.closest("li").find("> ul").css("display") == "block"){
				$this.closest("li").removeClass("on");
				$this.closest("li").find("ul").removeClass("on").slideUp('fast');
				return false;
			}
			$this.closest("li").siblings("li").find("ul").slideUp('fast');
		}
		$this.closest("li").find("> ul").addClass("on").slideDown('fast');
		*/
	});
	

	// 레이어팝업
	$('#layerPopBtn').click(function(){
		$("body").append("<div class='dim'></div");
		$(".layer_popup").addClass('on').css("z-index","10001");
	});
	$('.layer_close, .layerCloseBtn').click(function(){
		$(".dim").remove();
		$(".layer_popup").removeClass('on');
	});

	// 퀵토글
	var quickToggleVal = getCookie('quickToggle');
	//setCookie('quickToggle','',-1);
	//console.log(getCookie('quickToggle'));
	if(quickToggleVal == 'closed'){	
		$('.quick_toggle').removeClass('on').text('퀵메뉴 열기');
		$('.quick_area').css('right','-80px');
	}else{
		$('.quick_toggle').addClass('on').text('퀵메뉴 닫기');
		$('.quick_area').css('right','0');
	}
	$('.quick_toggle').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('퀵메뉴 열기');
			if($(window).width() > 768){
				$('.quick_area').animate({
					right : '-80px'
					//right : '-212px'
				},400,"easeOutExpo");				
			}else{
				$('.quick_area').animate({
					bottom : '-100px'
				},400,"easeOutExpo");	
			}
			setCookie('quickToggle','closed',1);
		}else {
			$(this).addClass('on').text('퀵메뉴 닫기');
			if($(window).width() > 768){
				$('.quick_area').animate({
					right : '0'
				},400,"easeOutExpo");			
			}else{
				$('.quick_area').animate({
					bottom : 0
				},400,"easeOutExpo");	
			}
			setCookie('quickToggle','',-1);
		}
		console.log(getCookie('quickToggle'));
	});

	//go_top 버튼 작업
	$(window).scroll(function() { if ($(this).scrollTop()) { $(".go_top").fadeIn(); } else { $(".go_top").fadeOut(); }});
	$(".go_top").click(function() {	$("html, body").animate({scrollTop: 0}, 1000);});

	//global 동주민 펼침
	$('.global_do').on('click',function(){
		if($(this).parent().find('ul').is(':visible')){
			$(this).parent().find('ul').hide();
		}else{
			$(this).parent().find('ul').show();
		}		
	});
	$('.global_do').next().children().last().keydown(function(event) {
    	var keycode = event.keyCode;
		if (keycode === 9) {
			if(event.shiftKey){
			}else{
				event.stopPropagation();
				$(this).closest('ul').hide();
			}	        	
		}
	});
	
	// 소셜댓글 탭
	$('.order_wrap a').on('click',function(){
		if( !$(this).hasClass('on') ){
			$('.order_wrap a').removeClass('on');
			$(this).addClass('on');
		}
	});

	// 외국어사이트이동
	$('#languageGo').click(function(e){
		var url = $("#languageSelect").val();
		if( url != ""){
		  window.open(url,'language','');
		}else{
		  return false;
		}
	});

	// 글로벌검색 접근성
/* 웹접근성 211029 
 * 	$('.global_srch').keyup(function(event) {
    	var keycode = event.keyCode;
		if (keycode == 9) {
			if(document.activeElement == document.getElementsByClassName('close_srch_btn')[0]){
				$('.close_srch_btn').attr('tabindex','1');
				$('.down_btn').attr('tabindex','2');
				$('.srch_go').attr('tabindex','-1');
			}else{
				$('.close_srch_btn').attr('tabindex','0');
				$('.down_btn').attr('tabindex','0');
			}       	
		}
	});*/
	$('.close_srch_btn').on('click',function(){		
		$('.close_srch_btn').removeAttr('tabindex');
		$('.down_btn').removeAttr('tabindex');
		$('.srch_go').removeAttr('tabindex');
		$('.srch_wrap input').focus();
	});

	/*0416s*/
	$('.LocalTaxCalendar').bxSlider({ 
		infiniteLoop: false,
		hideControlOnEnd: true,
		slideMargin: 10
	});
	/*0416e*/
});



//쿠키 공통
function setCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐 방지 escape(cValue)
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	/*cookies.setHttpOnly(true);*/
	document.cookie = cookies;
}
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if(end == -1)end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}


$(window).load(function(){


	$window.resize(function(){
		var screenWidth = $window.width(),
			screenHeight = $document.outerHeight();

		if(screenWidth < 768){
			mFlag = true;
			$('.toppop_wrap').removeClass('on').hide();
			$('.pop_toggle_btn').removeClass('on');
			$('#header').css('height','auto');
			//퀵메뉴토글
			if($('.quick_toggle').hasClass('on')){
				$('.quick_area').css({'right':'auto','bottom':'0','top':'auto'});
			}else{
				$('.quick_area').css({'right':'auto','bottom':'-100px','top':'auto'});
			}
			
		}else{
			mFlag = false;
			//퀵메뉴토글
			if($('.quick_toggle').hasClass('on')){
				$('.quick_area').css({'right':'0','top':'311px'});
			}else{
				$('.quick_area').css({'right':'-80px','top':'311px'});
			}
			
		}

		// 메인페이지 뉴스 카드 높이 반응형으로
		if($('.nsCnt').length){
			if(mFlag){
				if($('.nsCnt').find('.no_img').length !== 0){
					$('.nsCnt').each(function(){
						$(this).css('height','auto');
					});
				}
			}else{
				$('.news_l_area > ul > li').each(function(){
					if($(this).index() < 3) {
						$(this).children('div').css('height','355px');
					} else if($(this).index() < 6) {
						$(this).children('div').css('height','183px');
					} else {
						$(this).children('div').css('height','240px');
					}
				});
				/*if($('.nsCnt').find('.no_img').length !== 0){
					$('.nsCnt').each(function(){
						//$(this).css('height','270px');
					});
					$('.news_l_area > ul > li:nth-child(1) > div').css('height','374px');
					$('.news_l_area > ul > li:nth-child(2) > div').css('height','374px');
					$('.news_l_area > ul > li:nth-child(3) > div').css('height','374px');
				}*/
			}
		}
		



	}).resize();

		// table
	$('<div class="tbl_topline"></div>').insertBefore('.tbl_wrap > table');
	$('<div class="tbl_botline"></div>').insertAfter('.tbl_wrap > table');
	$('<div class="tbl_topline"></div>').insertBefore('.bbs_list > table');
	$('<div class="tbl_botline"></div>').insertAfter('.bbs_list > table');
	/*
	var $bbsNum = $('.bbs_num');
	if($bbsNum.length && !mFlag){				
		$bbsNum.closest('table').find('tr').each(function(){
			$(this).children().eq($bbsNum.index()).css('text-align','center')
		});		
	}
	*/
});

//첨부파일 추가
jQuery.fn.multiSelector = function(option){

  var defaultOption = {
    multiple : false,// 기본적으로 한개만 선택가능함, true 로 바꾸면 복수 선택이 가능해지고 json은 배열형태로 줌
    max: 0,//첨부가능개수
    list_target_id:'fileList',//첨부목록을 뿌려줄 엘리먼트
    fileItemCssSelector: 'file_add',//첨부가능개수 체크할대 사용되는 파일카운트용 css셀렉터
    list_delete_fileid: 'deleteFileList',//첨부가능개수 체크할대 사용되는 파일카운트용 css셀렉터
    callback : function(){
      alert('multiSelector callback function is mandatory!');
    } 
  };
  //input의 name을 추출하고 추가시 name+index 로 name 설정에 사용한다.
  var inputFileName = $(this).attr('name').split('[')[0];
  var inputParent = $(this).parent();
  var chkValue = 0;
  var deleCnt = 0;

  option = jQuery.extend( defaultOption, option );
//  this.each(function(idx, el){
    
    if( $(this).prop('tagName') == 'INPUT' && $(this).prop('type') == 'file' ){
      
      $(inputParent).on('change','input[type=file]', function(e){
        e.preventDefault();
        
        //첨부개수 제한 추가
        if( option.max == 0 ){
          alert('첨부기능을 사용할 수 없습니다.');
          $(this).val('');
          return;         
        }
        //첨부개수 제한 추가
        if( option.max > 0 && option.fileItemCssSelector ){
          if( $('.'+option.fileItemCssSelector).size() >= option.max ){
            alert(option.max + '개까지 첨부할 수 있습니다.');
            $(this).val('');
            return;         
          }
        }
        
        // New file input 추가
        var cloneElements = $(this).clone();
        $(cloneElements).val('');
        $(inputParent).prepend(cloneElements);
        
        $(this).attr('data-chkvalue','ck'+chkValue);
        $(this).css('display', 'none');
        
        //list 추가
        var html = '<div class="' + option.fileItemCssSelector + '">';
        html += '<span>' + $(this).val() + '</span> ';
        html += '<a href="#none" class=\"deleteBtn ml-2 fa fa-times text-danger\" style=\"cursor: pointer;\" data-value=\"ck' + chkValue + '\">삭제</a> ';
        html += '</div> ';
        
        $('#'+option.list_target_id).append($(html).fadeIn(800));
        
        chkValue++;
        adjustFileIndex();
      });
      
    }
    

    //첨부제거
    $('#'+option.list_target_id).on('click','.deleteBtn', function(e){
      e.preventDefault();

      //삭제 이미지의 데이터값
      var imgValue = $(this).data('value');
      //삭제할 파일의 아이디
      var deleteFileId = $(this).data('fileid');
      
      $(e.target).closest($('.'+option.fileItemCssSelector)).remove();
      if(deleteFileId != null && deleteFileId != ''){
        $('#deleteFileList').append('<input type="hidden" name="fileInfoDeleteIds[' + deleCnt + ']" value="' + deleteFileId + '"/>');
        deleCnt++;
      }
      
      if(imgValue != null && imgValue != ''){
        $('input[type=file]', inputParent).each(function(idx, el){
          if($(this).data('chkvalue') == imgValue){
            $(this).remove();
          }
        });
      }
      
		alert("삭제되었습니다.");
		document.getElementById('baMultipartFiles0').focus();

      adjustFileIndex();
    });
    
    //인덱스 정리
    function adjustFileIndex(){

      $('input[type=file]', inputParent).each(function(idx, el){
        $(this).attr('name', inputFileName + '[' + idx + ']');
        $(this).attr('id', inputFileName + idx);
      });
    }
//  });
};

/**
 * 
 * 팝업창 띄우기
 * 
 * @returns 팝업창
 */
function openPopup (sURL, width, height) {
  var sWidth, sHeight;
  var sFeatures;
  var oWindow;
  var SP2 = false;
  var POPUP_WIDTH     = 400;
  var POPUP_HEIGHT    = 300;
  var B_MAIN_PAGE     = true;
  var LeftPosition = 0;
  var TopPosition  = 0;
  
  sHeight = POPUP_HEIGHT;
  sWidth  = POPUP_WIDTH;
  sTitle = "PopupWindow";

  try {
    SP2 = (window.navigator.userAgent.indexOf("SV1") != -1);
    if (arguments[1] != null && arguments[1] != "") sWidth = arguments[1] ;
    if (arguments[2] != null && arguments[2] != "") sHeight = arguments[2] ;
    if (arguments[3] != null && arguments[3] != "") sTitle = arguments[3] ;
    if (SP2)     {   // XP SP2 브라우저임..
      sHeight = Number(sHeight)+10;
    }else{  //그외 브라우저
    }
  } catch(e) {}
  
  if(sURL.indexOf("printPopup") > 0) {
    sWidth = 980;
  }
  sFeatures =  "width=" + sWidth + ",height=" + sHeight ;    
  sFeatures += ",left=0,top=0" ;
  LeftPosition = (screen.width)?(screen.width-sWidth)/2:100;
TopPosition  = (screen.height)?(screen.height-sHeight)/2:100;
  if(sURL.indexOf("printPopup") > 0) {
    sFeatures += ",directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=no,toolbar=no, top="+TopPosition+", left="+LeftPosition;
  } else {
    sFeatures += ",directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no";
  }
  
  if(sURL!=null && sURL.length > 0) {
    if(sURL.indexOf("?") > 0) {
      sURL += "&thref="+location.href;
    } else {
      sURL += "?thref="+location.href;
    }
  }
  oWindow = window.open(sURL, sTitle, sFeatures);
  oWindow.focus();

  // move to screen center
 // oWindow.moveTo( (window.screen.availWidth - sWidth) / 2, (window.screen.availHeight - sHeight) / 2);

  return oWindow;  
}
function openPopup2 (sURL, width, height) {
  alert(" 준비중 입니다. ");
}

function openPopup3 (sURL, width, height) {
  var sWidth, sHeight;
  var sFeatures;
  var oWindow;
  var SP2 = false;
  var POPUP_WIDTH     = 400;
  var POPUP_HEIGHT    = 300;
  var B_MAIN_PAGE     = true;
  var LeftPosition = 0;
  var TopPosition  = 0;
  
  sHeight = POPUP_HEIGHT;
  sWidth  = POPUP_WIDTH;
  sTitle = "PopupWindow";

  try {
    SP2 = (window.navigator.userAgent.indexOf("SV1") != -1);
    if (arguments[1] != null && arguments[1] != "") sWidth = arguments[1] ;
    if (arguments[2] != null && arguments[2] != "") sHeight = arguments[2] ;
    if (arguments[3] != null && arguments[3] != "") sTitle = arguments[3] ;
    if (SP2)     {   // XP SP2 브라우저임..
      sHeight = Number(sHeight)+10;
    }else{  //그외 브라우저
    }
  } catch(e) {}
  
  if(sURL.indexOf("printPopup") > 0) {
    sWidth = 980;
  }
  sFeatures =  "width=" + sWidth + ",height=" + sHeight ;    
  sFeatures += ",left=0,top=0" ;
  LeftPosition = (screen.width)?(screen.width-sWidth)/2:100;
TopPosition  = (screen.height)?(screen.height-sHeight)/2:100;

  sFeatures += ",directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=no,toolbar=no";
  
  if(sURL!=null && sURL.length > 0) {
    if(sURL.indexOf("?") > 0) {
      sURL += "&thref="+location.href;
    } else {
      sURL += "?thref="+location.href;
    }
  }
  oWindow = window.open(sURL, sTitle, sFeatures);
  oWindow.focus();

  // move to screen center
 // oWindow.moveTo( (window.screen.availWidth - sWidth) / 2, (window.screen.availHeight - sHeight) / 2);

  return oWindow;  
}


//statistics insert 퍼블단에서 오류나서 생략합니다.
function statisticsInsert(){
	if( !GLOBAL.menuId ){
		return;
	}
	$.ajax({
		url : GLOBAL.APP_PATH + '/statistics' + GLOBAL.API_PATH + '/insert'
		, type : 'post'
		, data : {
			menuId : GLOBAL.menuId
			
		}
	});
}		
jQuery(function($){
	//통계자동
	statisticsInsert();
	
});
