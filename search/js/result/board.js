/*
 * baordView(menuOpt:6) 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 */
function boardView(query, getResult) {
	let html = '';
	let lowData = false;
	let extArr = ['hwp', 'doc', 'docx', 'txt', 'rtf', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'jpg', 'jpeg', 'gif', 'png', 'bmp'];
	
	if (getResult == null || getResult == '') {
		if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
			return false;
		} else {
			html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
			$('#board_paging').hide();
		}
	} else {
		lowData = true;
		for (var i in getResult) {
			if(getResult[i] == null || getResult[i] == '' || getResult[i] == 0 || getResult[i] == undefined) {
				break;
			} else {
				html += '<li><div class="top"><a href="';
				html += ((getResult[i]._source.link_url).replace(/(<([^>]+)>)/ig, ""));
				html += '" class="main_url" target="_blank">';
				html += highlighting(query, ((getResult[i]._source.ba_title).replace(/(<([^>]+)>)/ig, "")));
				html += '</a><span class="subtxt_wrap"><span class="subtxt">';
				html += highlighting(query, ((getResult[i]._source.ba_regdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
				html += '</span><span class="subtxt">작성 : ';
				html += highlighting(query, ((getResult[i]._source.ba_guest_name).replace(/(<([^>]+)>)/ig, "")));
				
				html += '</span></span></div><p class="ptxt text_reduce'+i+'" id="text_reduce">';
				
				// 2줄 이상이 넘어가게 되면 ... 보이지 않게 처리 
				let getStr = getByteLength(getResult[i]._source.ba_content_html);
				if(getStr >= 290) {
					$('head').append("<style>.text_reduce"+i+"::before{ color : black }</style>");
				} else {
					$('head').append("<style>.text_reduce"+i+"::before{ color : white }</style>");
				}
				
				html += highlighting(query, ((getResult[i]._source.ba_content_html).replace(/(<([^>]+)>)/ig, "")));
				html += '</p>';
				
				let getDate = getNowYM();
				let tempFileInfo = (getResult[i]._source.file_info).substring(0, (getResult[i]._source.file_info).lastIndexOf("#a#"));
				let tempFileInfoArr = tempFileInfo.split('#a#'); // {"abcd#b#1234#c#xxxx#d#1234", "ascx#b#gsdx#c#d23s#d#gs56", ...}
				
				// 아사달에서 지원하는 문서view를 보기 위해서 필요한 처리 
				// 문서뷰 방식 변경으로 ajax 호출 불필요
				/*$.ajax({
					url: '/site/viewFile',
					type: 'GET',
					data: {
						tempFileInfo: tempFileInfo
					},
					async: false,
					error: function(err) {
						consol.error(err);
					}
				 });*/
				 
				if(tempFileInfo == undefined || tempFileInfo == null || tempFileInfo == '') {
				} else {
					 for(var k in tempFileInfoArr) {
						let tempFileName = tempFileInfoArr[k].substring(0, tempFileInfoArr[k].lastIndexOf('#b#'));
						let tempFileUUID = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#b#')+3, tempFileInfoArr[k].indexOf('#c#'));
						let tempFilePath = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#c#')+3, tempFileInfoArr[k].indexOf('#d#'));
						let modifiedTempFilePath = tempFilePath.substring(0, tempFilePath.lastIndexOf('/'));
						let tempFilePrefix = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#d#')+3, tempFileInfoArr[k].length);
						//2020.02.13
						let sitePrefix = getResult[i]._source.site_prefix;
						let bc_id = getResult[i]._source.bc_id;
						//if(sitePrefix == 'YONGGANG') {
						if(sitePrefix == 'YONGGANG' || sitePrefix == 'YEONNAM' || sitePrefix == 'YEOMNI'  || sitePrefix == 'SINSU'  || 
								sitePrefix == 'SEONGSAN2' || sitePrefix == 'SEONGSAN1' || sitePrefix == 'SEOGYO' || sitePrefix == 'SEOGANG' ||
								sitePrefix == 'SANGAM' || sitePrefix == 'MANGWON2' || sitePrefix == 'MANGWON1' || sitePrefix == 'HAPJEONG' || 
								sitePrefix == 'GONGDEOK' || sitePrefix == 'DOHWA' || sitePrefix == 'DAEHEUNG' || sitePrefix == 'AHYEON'  ) {
							html += '<div class="file_wrap"><a href="https://www.mapo.go.kr/site/' + sitePrefix + '/file/download/uu/'
							html += tempFileUUID;
							html += '" class="down">';
							html += highlighting(query, tempFileName);
							html += '</a>';
						} else if (bc_id === 'nPortal' || bc_id === 'nPortalr') {
							html += '<div class="file_wrap"><a href="https://eminwon.mapo.go.kr/emwp/jsp/ofr/FileDown.jsp?user_file_nm=' + tempFileName + '&sys_file_nm=' + tempFileUUID + '&file_path=' + modifiedTempFilePath
							html += '" class="down">';
							html += highlighting(query, tempFileName);
							html += '</a>';
						} else {
							html += '<div class="file_wrap"><a href="https://www.mapo.go.kr/site/main/file/download/uu/'
							html += tempFileUUID;
							html += '" class="down">';
							html += highlighting(query, tempFileName);
							html += '</a>';
						}
						
						
						
						// 특정 확장자가 아니면 버튼 나오지 않게 처리
						// hwp, doc, docx, txt, rtf, ppt, pptx, xls, xlsx, pdf, jpg, jpeg, gif, png, bmp
						let isExtExist = false;
						let ext = tempFileName.substring(tempFileName.lastIndexOf('.')+1, tempFileName.length);
						for(var a in extArr) {
							if(extArr[a] == ext) {
								isExtExist = true;
							}
						}
						if(isExtExist) {
							//if(sitePrefix == 'YONGGANG') {
							if(sitePrefix == 'YONGGANG' || sitePrefix == 'YEONNAM' || sitePrefix == 'YEOMNI'  || sitePrefix == 'SINSU'  || 
									sitePrefix == 'SEONGSAN2' || sitePrefix == 'SEONGSAN1' || sitePrefix == 'SEOGYO' || sitePrefix == 'SEOGANG' ||
									sitePrefix == 'SANGAM' || sitePrefix == 'MANGWON2' || sitePrefix == 'MANGWON1' || sitePrefix == 'HAPJEONG' || 
									sitePrefix == 'GONGDEOK' || sitePrefix == 'DOHWA' || sitePrefix == 'DAEHEUNG' || sitePrefix == 'AHYEON'  ) {
								html += '<a href="http://www.mapo.go.kr/site/'+ sitePrefix +'/preview/';
							}else {
								html += '<a href="http://www.mapo.go.kr/site/main/preview/';
							}
							html += tempFileUUID;
						/*	html += '&rs=/html/synap/result/'
							html += getDate;*/
							html += '/" class="view" target="_blank">바로보기</a>';
						}
						
						html +='</div>';
		
					 }
				}
				 
				html += '</li>';
			}
		}
	}

	$('.boardUl').html(html);
}
