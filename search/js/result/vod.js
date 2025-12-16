/*
 * vodView(menuOpt:7) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function vodView(query, getResult) {
	let html = '';
	let lowData = false;
	
	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
			$('#vod_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<li><div class="thumb"><a href="';
			//	html += ((getResult[i]._source.).replace(/(<([^>]+)>)/ig,""));
			html += 'A TAG URL!!!';
				html += '" target="_blank"><div class="filter"><span class="play"></span></div><img src="';
				html += highlighting(query, ((getResult[i]._source.thumb).replace(/(<([^>]+)>)/ig, "")));
				html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'"></a></div><div class="tit1"><h3><a href="';
			//	html += ((getResult[i]._source.).replace(/(<([^>]+)>)/ig,""));
			html += 'A TAG URL!!!';
				html += '" target="_blank">';
				html += highlighting(query, ((getResult[i]._source.title).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></h3></div><div class="footer1"><div class="l"><span>';
				html += highlighting(query, ((getResult[i]._source.pubdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</span></div><div class="r"><span>';
				html += highlighting(query, ((getResult[i]._source.category).replace(/(<([^>]+)>)/ig, "")));
				//				html += 'DEPT_NAME!!!!';
				html += '</span></div></div></li>';
			}
		}
	}
	
	$('.vodUl').html(html);
}