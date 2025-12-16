/*
 * menu(menuView:4) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function menuView(query, getResult) {
	let html = '';
	let lowData = false;
	
	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
			$('#menu_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<li><a href="';
				html += highlighting(query, ((getResult[i]._source.menu_link).replace(/(<([^>]+)>)/ig, "")));
				html += '" target="_blank">';
				html += highlighting(query, ((getResult[i]._source.full_path).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></li>';
			}
		}
	}

	$('.menuUl').html(html);
}