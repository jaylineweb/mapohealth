/*
 * snsView(menuOpt:5) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function snsView(query, getResult) {
	let html = '';
	let lowData = false;

	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
			$('#sns_paging').hide();
		}
	} else { // 화면 뿌려주기
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				if ((getResult[i]._source.sns_type) != null || (getResult[i]._source.sns_type) != '') {
					if ((getResult[i]._source.sns_type).indexOf('fa') != -1) {
						html += '<li><div class="fa"><p><a href="'+((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
					} else if ((getResult[i]._source.sns_type).indexOf('tw') != -1) {
						html += '<li><div class="tw"><p><a href="'+((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
					} else if ((getResult[i]._source.sns_type).indexOf('bl') != -1) {
						html += '<li><div class="bl"><p><a href="'+((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
					} else {
						html += '<li><div class="fa"><p><a href="'+((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
					}
				}
				html += highlighting(query, ((getResult[i]._source.sns_desc).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></p><span class="url"><a href="'+((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
				html += ((getResult[i]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""));
				html += '</a></span></div></li>';
			}
		}
	}

	$('.snsUl').html(html);
}