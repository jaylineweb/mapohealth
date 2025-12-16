try {
    //제이쿼리가 있으면--
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            //태그객체
            var $window = $(window),
                $html = $('html');
            $(function() {
                var $visualBox = $('.visual_wrap .visual_box'),
                $visualSlide = $visualBox.find('.visual_list'),
                $visualList = $visualSlide.clone(),
                $visualMore = $visualBox.find('.slide_button_wrap .state_box .button_box.more .btn'),
                $visualButtonWrap = $visualBox.find('.slide_button_wrap'),
                $visualPrev = $visualButtonWrap.find('.move_box .button_box.prev .btn'),
                $visualNext = $visualButtonWrap.find('.move_box .button_box.next .btn'),
                $visualCurrent = $visualButtonWrap.find('.state_box .count_box .count.current'),
                $visualTotal = $visualButtonWrap.find('.state_box .count_box .count.total'),
                $visualPlay = $visualButtonWrap.find('.state_box .button_box.play .btn');
                $visualSlide.slick({
                    accessibility: true,
                    rows: 1, //여러줄
                    slidesPerRow: 1, //여러줄일 때 한줄의 출력 개수
                    slidesToShow: 1, //화면에 출력할 개수
                    slidesToScroll: 1, //넘어갈 때 넘어갈 개수
                    speed: 600, //속도
                    infinite: true, //무한반복
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true, //마우스 오버 했을 때 자동 일시정지 유무
                    pauseOnFocus: true, //포커스 갔을때 일시정지 유무
                    pauseOnDotsHover: true, //썸네일 마우스 올렸을 때 일시정지 유무
                    pauseOnArrowClick: true,
                    pauseOnDirectionKeyPush: true,
                    pauseOnSwipe: true,
                    pauseOnDotsClick: true,
                    arrows: true, //컨트롤러 사용 유무
                    prevArrow: $visualPrev,
                    nextArrow: $visualNext,
                    autoArrow: $visualPlay,
                    pauseText: '정지',
                    playText: '재생',
                    total: $visualTotal,
                    current: $visualCurrent,
                });

                // 동주민센터
                let $dong = $('.header_top .site_link_item.dong'),
                $dongBtn = $dong.find('.dong_btn'),
                $dongCloseBtn = $dong.find('.dong_close');

                $dongBtn.on('click',function(){
                    let $this = $(this),
                        $dong = $this.closest('.site_link_item.dong'),
                        isActive = $dong.is('.active');
                    if (!isActive) {
                        $dong.addClass('active');
                        $this.attr('title','목록닫기');
                    } else {
                        $dong.removeClass('active');
                        $this.attr('title','목록열기');
                    }
                });
                $dongCloseBtn.on('click',function(){
                    $(this).closest('.site_link_item.dong').removeClass('active');
                    $dongBtn.attr('title','목록열기').focus();
                });

                //공지사항
                const $board = $('.board'),
                $boardTabButton = $board.find('.tab_button'),
                $boardTabPanel = $board.find('.board_panel');

                $boardTabButton.on('click', function () {
                    let $this = $(this),
                        $parent = $this.parents('.tab_item'),
                        parentIndex = $parent.index();

                    $parent.addClass('active').siblings().removeClass('active');
                    $this.attr('title', '선택됨');
                    $parent.siblings().children('.tab_button').removeAttr('title');
                    $boardTabPanel.eq(parentIndex).addClass('active').attr('title', '선택됨').siblings().removeClass('active').removeAttr('title');
                });

                //var $category = $('.category'),
                //      $category_closeBtn = $('.category').find('.category_button');
                //var $category = $('.category'),
                //    $category_closeBtn = $('.category').find('.category_button');

                //$category.on('mouseover', function() {
                //    $(this).addClass('active');
                //});

                //$category_closeBtn.on('click', function(e) {
                //    e.preventDefault();
                //    $(this).closest('.category').removeClass('active');
                //});

                var $category = $('.category'),
                    $category_closeBtn = $('.category').find('.category_button');

                if ($(window).width() >= 769) {
                    $category.on('mouseover', function() {
                        $(this).addClass('active');
                    });

                    $category_closeBtn.on('click', function(e) {
                        e.preventDefault();
                        $(this).closest('.category').removeClass('active');
                    });
                }

                $(window).on('resize', function() {
                    if ($(window).width() >= 769) {
                        $category.on('mouseover', function() {
                            $(this).addClass('active');
                        });

                        $category_closeBtn.on('click', function(e) {
                            e.preventDefault();
                            $(this).closest('.category').removeClass('active');
                        });
                    } else {
                        $category.off('mouseover');
                        $category_closeBtn.off('click');
                        $category.removeClass('active');
                    }
                });

                //푸터 패밀리 사이트 시작
                var $familyItem=$('.family_item'),
                $familyBtn = $familyItem.find('button');

				$familyBtn.on('click', function(){
					var $this = $(this),
						$FamilyList = $this.siblings('.family_list'),
						IsActive = $this.is('.active');
					if(!IsActive){
						$this.attr('title', '목록 닫기');
						$this.addClass('active');
						$FamilyList.addClass('active').slideDown(200);
					}
					else{
						$this.attr('title', '목록 열기');
						$this.removeClass('active');
						$FamilyList.removeClass('active').slideUp(200);
					}
				});

                // 검색 활성화(모바일)
                let searchBtn = $('.search_btn_wrap .search_btn');
                let $searchboxMobile = $('.searchbox_mobile');
                searchBtn.on('click', function() {
                    var $this = $(this),
                        IsActive = $searchboxMobile.is('.active');
                    $html.addClass('search_open');
                    $('.searchbox_curtain').fadeIn();
                    $searchboxMobile.addClass('active').fadeIn();
                    $('.searchbox_mobile .total_search').focus();
                });

                $('.searchbox_curtain').on('click', function() {
                    var $this = $(this),
                        $search_btn = $('.search_btn_wrap .search_btn');
                    $html.removeClass('search_open');
                    $this.fadeOut();
                    $searchboxMobile.removeClass('active').fadeOut();
                    $search_btn.focus();
                });

                $('.searchbox_mobile .search_close').on('click', function() {
                    var $this = $(this),
                        $search_btn = $('.search_btn_wrap .search_btn');
                    $html.removeClass('search_open');
                    $('.searchbox_curtain').fadeOut();
                    $searchboxMobile.removeClass('active').fadeOut();
                    $search_btn.focus();
                });

                $(window).on('resize', function() {
                    if ($(window).width() >= 769) {
                        if ($searchboxMobile.is('.active')) {
                            $searchboxMobile.removeClass('active').fadeOut(); // fadeOut 추가
                            $('.searchbox_curtain').fadeOut();
                        }
                    }
                });

                $('.lnb_curtain').on('click',function(){
                    var $this = $(this),
                    $lnb_open = $('.header_box .menuopenbox .lnb_open')

                    $html.removeClass('menu_open');
                    $lnb_open.focus();
                });

                //전체보기 메뉴
                $('.allMenu_btn').on('click', function() {
                    var $this = $(this),
                        $allMenu_layer = $('.allMenu_layer'),
                        $allMenu_close_btn = $('.allMenu_close_btn'),
                        $firstSubTitle = $('.allMenu_layer .list .item .sub_title').first(),
                        $firstSubList = $firstSubTitle.next('div'),
                        $lastAnchor = $('.list a').last();

                    if ($allMenu_layer.hasClass('on')) {
                        $allMenu_layer.removeClass('on');  // 클래스 제거
                    } else {
                        $this.attr('title','선택됨');
                        $allMenu_layer.addClass('on');  // 클래스 추가
                        $allMenu_close_btn.focus();
                        $firstSubTitle.addClass('on');
                        $firstSubTitle.attr('title', '하위 메뉴 닫기');
                        $firstSubList.css('display','block');
                    }
                    $allMenu_close_btn.on('click',function(){
                        $('.allMenu_btn').removeAttr('title');
                        $('.allMenu_layer .list .item .sub_title').removeClass('on');
                        $('.allMenu_layer .list .item .sub_title + .sub_layer').removeAttr('style');
                        $allMenu_layer.removeClass('on')
                        $this.focus();
                    })
                    $lastAnchor.on('focusout', function() { //마지막 지점에서 focus벗어날 시 close버튼으로 focus이동
                        $('.allMenu_close_btn').focus();
                    });
                });

                $('.allMenu_layer .list .item .sub_title').each(function() {
                    var $this = $(this);
                    $this.attr('title','하위메뉴 열기');
                    $this.on('click', function() {
                        var $subList = $this.next('div'),
                            isActive = $this.hasClass('on');

                        if (isActive) {
                            $this.removeClass('on');
                            $subList.stop(true, true).slideUp(300);
                            $this.attr('title', '하위 메뉴 열기');
                        } else {
                            $this.addClass('on');
                            $subList.stop(true, true).slideDown(300);
                            $this.attr('title', '하위 메뉴 닫기');
                        }
                    });
                });

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}