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
                //window로드시 마포보건소 위치 표시
                Loadmap({
                    timestamp: "1727150519773",
                    key: "2kpwz"
                });
                $('.map_btn').on('click', function(){
                    var data = $(this).data();
                    Loadmap(data);
                    $('.map_btn').removeClass('active').removeAttr('title');
                    $(this).addClass('active').attr('title','해당 지도 열기');

                    $('.map_section').removeClass('active');
                    var target = $(this).data('target');
                    $(target).addClass('active').attr('title','지도 열림');
                });

                function Loadmap(data){
                    var mapContainerId = "daumRoughmapContainer" + data.timestamp;
                    $('#' + mapContainerId).empty();

                    // 기본 지도 높이 설정
                    var mapHeight = 500;

                    // 윈도우 크기에 따른 반응형 mapHeight 설정
                    if (window.innerWidth <= 768) {
                        //mapHeight = 220;  // 윈도우 너비가 768px 이하일 때의 높이
                        // 'calc(100vw * (220 / 360))'에 해당하는 계산
                        mapHeight = window.innerWidth * (220 / 360);
                    }

                    if (data.timestamp && data.key) {
                        new daum.roughmap.Lander({
                            "timestamp" : data.timestamp,
                            "key" : data.key,
                            "mapHeight" : mapHeight // 동적으로 결정된 mapHeight 사용
                        }).render();
                    } else {
                        console.error("지도를 로드할 수 없습니다. timestamp나 key가 누락되었습니다.");
                    }
                }
            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}