/*
 * lecView(menuOpt:2) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function lecView(query, getResult) {
	let html = '';
	let lowData = false;

	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
			$('#lec_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				lowData = true;
				
				html += '<li>';
				
				// 교육 상태값에 따른 구분(교육완료/접수중/접수예정/오늘마감)
				if ((getResult[i]._source.lecstate_nm).indexOf('교육완료') != -1) {
					html += '<div class="top"><div class="l"><span class="deadline4">';
				} else if((getResult[i]._source.lecstate_nm).indexOf('접수예정') != -1) {
					html += '<div class="top"><div class="l"><span class="deadline3">';
				} else if((getResult[i]._source.lecstate_nm).indexOf('오늘마감') != -1) {
					html += '<div class="top"><div class="l"><span class="deadline2">';
				} else if((getResult[i]._source.lecstate_nm).indexOf('접수중') != -1) {
					html += '<div class="top"><div class="l"><span class="deadline1">';
				} else if((getResult[i]._source.lecstate_nm).indexOf('교육중') != -1) {
					html += '<div class="top"><div class="l"><span class="deadline1">';
				}
				
				html += ((getResult[i]._source.lecstate_nm).replace(/(<([^>]+)>)/ig, ""));
				html += '</span><span class="price">';
				
				// 결제 타입별 출력 구분(무료/유료현장결제/유료)
				if (((getResult[i]._source.mcd_nm) != null || (getResult[i]._source.mcd_nm) != '')) {
					if ((getResult[i]._source.mcd_nm).indexOf('무료') != -1 ||
							(getResult[i]._source.mcd_nm).indexOf('유료현장결제') != -1) { // 무료 혹은 유료현장결제 일 때
						html += ((getResult[i]._source.mcd_nm).replace(/(<([^>]+)>)/ig, ""));
					} else { // 유료 일 때
						html += ((getResult[i]._source.lt_money).replace(/(<([^>]+)>)/ig, ""));
					}
				}
				
				html += '</span></div><div class="r">';
				
				// 신청 방법 구분(인터넷/방문/전화/별도사이트?)
				if ((getResult[i]._source.lt_names) != null || (getResult[i]._source.lt_names) != '') {
					if ((getResult[i]._source.lt_names).indexOf('인터넷') != -1) { // 인터넷
						html += '<span class="online"></span>';
					}
					if ((getResult[i]._source.lt_names).indexOf('방문') != -1) { // 방문
						html += '<span class="visit"></span>';
					}
					if ((getResult[i]._source.lt_names).indexOf('전화') != -1) { // 전화
						html += '<span class="phone"></span>';
					} 
					if ((getResult[i]._source.lt_names).indexOf('별도사이트') != -1) { // 별도사이트
						html += '<span class="site"></span>';
					}
				}
				html += '</div></div><div class="thumb"><a href="';
				html += highlighting(query, ((getResult[i]._source.lt_link).replace(/(<([^>]+)>)/ig, "")));
				html += '" target="_blank"><img src="';
				html += ((getResult[i]._source.lt_link).replace(/(<([^>]+)>)/ig,""));
				html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'"></a></div><div class="tit2"><h3><a href="';
				html += highlighting(query, ((getResult[i]._source.lt_link).replace(/(<([^>]+)>)/ig, "")));
				html += '" target="_blank">';
				html += highlightingLec(query, ((getResult[i]._source.lt_name).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></h3><span class="fc_sky">';
				html += highlighting(query, ((getResult[i]._source.lgt_name).replace(/(<([^>]+)>)/ig, "")));
				html += '</span></div><div class="footer2"><p>교육기간 : ';
				html += highlighting(query, ((getResult[i]._source.lt_edu_sday).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += ' ~ ';
				html += highlighting(query, ((getResult[i]._source.lt_edu_eday).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</p></div></li>';
			}
		}
	}
	
	$('.lecUl').html(html);
}