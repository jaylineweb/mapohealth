/*
 * photoView(menuOpt:8) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function photoView(query, getResult) {
	let html = '';
	let lowData = false;

	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
			$('#photo_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<li><div class="thumb"><a href="';
				html += highlighting(query, ((getResult[i]._source.link).replace(/(<([^>]+)>)/ig, "")));
				html += '" target="_blank"><img src="';
				html += highlighting(query, ((getResult[i]._source.image_org).replace(/(<([^>]+)>)/ig, "")));
				html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'"></a></div><div class="tit1"><h3><a href="';
				html += highlighting(query, ((getResult[i]._source.link).replace(/(<([^>]+)>)/ig, "")));
				html += '">';
				html += highlighting(query, ((getResult[i]._source.title).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></h3></div><div class="footer1"><div class="l"><span>';
				html += highlighting(query, ((getResult[i]._source.add_dt).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</span></div><div class="r"><span>';
				html += highlighting(query, ((getResult[i]._source.division).replace(/(<([^>]+)>)/ig, "")));
				html += '</span></div></div></li>';
			}
		}
	}
	
	$('.photoUl').html(html);
}