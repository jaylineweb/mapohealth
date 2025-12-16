
$(document).ready(function(){

	//프로세스그래프 사이 화살표 생성
	if($('.process_type1').length){
		$('<div class="arr"></div>').insertAfter('.process_type1 li .txt');
	}

	//서브 상단 박스1 버튼 중앙정렬
	var topBoxBtnWidth = $('.box_btn').outerWidth()/2;
	$('.box_btn').css('margin-left', -(topBoxBtnWidth));

	//로케이션 마지막놈 오른쪽라인 그리기
	if(!$('.container_pr').length) $('.snav_etc').prev().css('border-right','1px solid #e5e5e5');

	//table 스와이프
	$('<div class="tbl_swipe_notice"><span>좌우로 스와이프 할 수 있습니다.</span><img src="/design/common/images/common/ico_finger.png" alt="좌우스와이프"></div>').insertBefore('.tbl_swipe');
	$('<div class="tbl_swipe_notice"><span>좌우로 스와이프 할 수 있습니다.</span><img src="/design/common/images/common/ico_finger.png" alt="좌우스와이프"></div>').insertBefore('.tbl_swipe_inlayer');

	//탭메뉴(모바일) 셀렉트메뉴 이벤트	
	 $('.mobile select').on('change', function () {
		 if(!$('.ajax_select').length){ // - 부서안내 ajax 때문에 분기 추가 190719
			 if ($(this).val()) { window.location = $(this).val();}
		 }		
		return false;
	});

	//입력 테이블 파일첨부
	if($('.file_add_btn').length){
		$('body').on('click','.file_add_btn',function(){
			$('<p class="newline mgt5"><input type="text" class="input_midium wx300" title="성명"> <a href="" class="btn_silver btn_midium btn_file_bg_add">첨부파일</a> <a href="" class="btn_silver_soft btn_midium btn_file_bg_del">파일삭제</a></p>').insertAfter('.file_del_btn');
		});
		$('body').on('click','.file_del_btn',function(){
			$('.newline:last-child').remove();		
		});
	}

	//1전자민원 동반찾기 MA-MU-03-03
	$('.dongban .toggle').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('열기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('닫기');
		}
	});

	//3열린행정 부서안내 MA-IN-03-02
	$('.scroll_tab li a').click(function(){
		$('.scroll_tab li').removeClass('on').find('a').removeAttr('title');
		$(this).parent().addClass('on');
		$(this).attr('title', '선택됨');
		$('.scroll_tab_target li').hide();
		$('.scroll_tab_target li').eq($(this).parent().index()).show();
	});
	
	$(".yt-menu > li").click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".tb-tab-cont2 > div").eq(index).addClass("on").siblings().removeClass("on");
	})

	//080 마포 안심콜s
	$(".btn_go_blue_btn.b1").click(function(){ 
		if($(this).hasClass("on")){ 
			$(this).removeClass("on");
			$(".btn_go_blue_con.c1").css({"display":"none"}); 
		}else{
			$(this).addClass("on");
			$(".btn_go_blue_con.c1").css({"display":"block"}); 
		}
	});
	$(".btn_go_blue_btn.b2").click(function(){ 
		if($(this).hasClass("on")){ 
			$(this).removeClass("on");
			$(".btn_go_blue_con.c2").css({"display":"none"}); 
		}else{
			$(this).addClass("on");
			$(".btn_go_blue_con.c2").css({"display":"block"}); 
		}
	});
	//080 마포 안심콜e

  /*개인정보처리방침 s*/
		$(".go1").click(function(){ 
			$('html,body').animate({scrollTop:$('#go1').offset().top}, 100);
		});
		$(".go2").click(function(){ 
			$('html,body').animate({scrollTop:$('#go2').offset().top}, 100);
		});
		$(".go3").click(function(){ 
			$('html,body').animate({scrollTop:$('#go3').offset().top}, 100);
		});
		$(".go4").click(function(){ 
			$('html,body').animate({scrollTop:$('#go4').offset().top}, 100);
		});
		$(".go5").click(function(){ 
			$('html,body').animate({scrollTop:$('#go5').offset().top}, 100);
		});
		$(".go6").click(function(){ 
			$('html,body').animate({scrollTop:$('#go6').offset().top}, 100);
		});
		$(".go7").click(function(){ 
			$('html,body').animate({scrollTop:$('#go7').offset().top}, 100);
		});
		$(".go8").click(function(){ 
			$('html,body').animate({scrollTop:$('#go8').offset().top}, 100);
		});
		$(".go9").click(function(){ 
			$('html,body').animate({scrollTop:$('#go9').offset().top}, 100);
		});
		$(".go10").click(function(){ 
			$('html,body').animate({scrollTop:$('#go10').offset().top}, 100);
		});
		$(".go11").click(function(){ 
			$('html,body').animate({scrollTop:$('#go11').offset().top}, 100);
		});
		$(".go12").click(function(){ 
			$('html,body').animate({scrollTop:$('#go12').offset().top}, 100);
		});
		$(".go13").click(function(){ 
			$('html,body').animate({scrollTop:$('#go13').offset().top}, 100);
		});
		$(".go14").click(function(){ 
			$('html,body').animate({scrollTop:$('#go14').offset().top}, 100);
		});
		$(".go15").click(function(){ 
			$('html,body').animate({scrollTop:$('#go15').offset().top}, 100);
		});
	/*개인정보처리방침 e*/

});

$(window).load(function(){

	$(window).resize(function(){




	}).resize();
});

		








