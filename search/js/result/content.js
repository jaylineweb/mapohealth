/*
 * contentView(menuOpt:0) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function contentView(query, getResult) {
	let html = '';
	let lowData = false;

	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
			$('#content_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<li><div class="top"><a href="';
				html += highlighting(query, ((getResult[i]._source.menu_link).replace(/(<([^>]+)>)/ig, "")));
				html += '" class="main_url" target="_blank">';
				html += highlighting(query, ((getResult[i]._source.content_title).replace(/(<([^>]+)>)/ig, "")));
				html += '</a><span class="subtxt_wrap"><span class="subtxt">';
				html += highlighting(query, ((getResult[i]._source.content_last_modified).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</span></span></div><p class="ptxt text_reduceC'+i+'" id="text_reduce">';
				
				let getStr = getByteLength(getResult[i]._source.content);
				if(getStr >= 290) {
					$('head').append("<style>.text_reduceC"+i+"::before{ color : black }</style>");
				} else {
					$('head').append("<style>.text_reduceC"+i+"::before{ color : white }</style>");
				}
				
				html += highlighting(query, ((getResult[i]._source.content).replace(/(<([^>]+)>)/ig, "")));
				html += '</p><p class="loc">';
				html += highlighting(query, ((getResult[i]._source.full_path).replace(/(<([^>]+)>)/ig, "")));
				html += '</p></li>';
				html += '<li></li>';
			}
		}
	}

	$('.contentUl').html(html);
}