/*
 * staff(menuOpt:3) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function staffView(query, getResult) {
	let html = '';
	let lowData = false;
	
	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<tr><td colspan="5" style="text-align:center">검색 결과가 없습니다.</td></tr>';
			$('#staff_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<tr><td>';
				html += highlighting(query, ((getResult[i]._source.parent_dep_name).replace(/(<([^>]+)>)/ig, "")));
				html += ' ';
				html += highlighting(query, ((getResult[i]._source.dep_name).replace(/(<([^>]+)>)/ig, "")));
				html += '</td><td>';
				html += highlighting(query, ((getResult[i]._source.admin_position).replace(/(<([^>]+)>)/ig, "")));
				html += '</td><td>';
				if(getResult[i].highlight.admin_explain == undefined) { 
					html += highlighting(query, ((getResult[i]._source.admin_explain).replace(/\n/ig, "<br>")));
				} else {
					html += getResult[i].highlight.admin_explain;
				}
				html += '</td><td>';
				if (getResult[i]._source.admin_tel == "02-3153-9510") {
					html += '';
				} else {
					html += highlighting(query, ((getResult[i]._source.admin_tel).replace(/(<([^>]+)>)/ig, "")));
				}
				//html += highlighting(query, ((getResult[i]._source.admin_tel).replace(/(<([^>]+)>)/ig, "")));
				html += '</td></tr>';
			}
		}
	}

	$('.staffUl').html(html);
}
