/*
 * minwonView(menuOpt:1) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function minwonView(query, getResult) {
	let html = '';
	let lowData = false;
	
	 // 검색결과 개수
	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<tr><td colspan="4" style="text-aling:center">검색결과가 없습니다.</td></tr>';
			$('#minwon_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<tr><td><a href="'+((getResult[i]._source.link_url).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
				html += highlighting(query, ((getResult[i]._source.ba_title).replace(/(<([^>]+)>)/ig, "")));
				html += '</a></td><td>';
				html += highlighting(query, ((getResult[i]._source.dep_name).replace(/(<([^>]+)>)/ig, "")));
				html += '</td><td><div text-align="left">';
				
				let getDate = getNowYM();
				let tempFileInfo = (getResult[i]._source.file_info).substring(0, (getResult[i]._source.file_info).lastIndexOf("#a#"));
				let tempFileInfoArr = tempFileInfo.split('#a#'); // {"abcd#b#1234", "ndgs#b#3847", ...}
				 
				for(var k in tempFileInfoArr) {
					let tempFileName = tempFileInfoArr[k].substring(0, tempFileInfoArr[k].lastIndexOf('#b#'));
					let tempFileUUID = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#b#')+3, tempFileInfoArr[k].indexOf('#c#'));
					let tempFilePath = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#c#')+3, tempFileInfoArr[k].indexOf('#d#'));
					let tempFilePrefix = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#d#')+3, tempFileInfoArr[k].length);

					if(tempFileUUID == null || tempFileUUID == undefined || tempFileUUID == '') {
						continue;
					}
				
					if(tempFilePrefix == 'ASA') {
						tempFilePrefix = 'MAIN';
					}
					
					tempFilePrefix = tempFilePrefix.toLowerCase();

					html += '<a href="https://www.mapo.go.kr/site/'+tempFilePrefix+'/file/download/uu/';
					html += tempFileUUID;
					html += '" target="_blank"><img src="/design/theme/mapo/images/sub/ico_bbs_file.png" alt="첨부파일" > ';
					html += highlighting(query, tempFileName) + '</a><br>';
				}
				
				html += '</div></td><td>';
				html += highlighting(query, ((getResult[i]._source.ba_regdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</td></tr>';
			}
		}
	}

	$('.minwonUl').html(html);
}