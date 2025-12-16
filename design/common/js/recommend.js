/**
 * 게시물 추천
 * 
 */
jQuery(function($){
	
	//게시판 게시물 추천하기 버튼 클릭
	$('.ba-recommend').click(function(e){
		e.preventDefault();
		var bcId = null;
		var baId = null;
		
		if( $(this).data('bcid') ){
			bcId = $(this).data('bcid');
		}
		if( $(this).data('baid') ){
			baId = $(this).data('baid');
		}
		
		if( !bcId || !baId ){
			console.log('recommend : bcId & baId is required!');
		} else {
			//쿠키 체크
			if( $.cookie('ba_reco_' + GLOBAL.siteId + '_' + baId) ){
				alert('이미 추천하셨습니다.');
			} else {
				$.post(
					GLOBAL.APP_PATH + '/board/' + bcId + GLOBAL.API_PATH + '/recommend'
					, {
						baId : baId
					}
					, function(data){
						alert(data.text);
						if(data.success){
							location.reload();
						}
					}
				);
			}
		}
	});
	
});