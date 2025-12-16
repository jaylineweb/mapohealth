/*
 * 통합검색 view 그리기 
 * param : query(String), menuOpt(number), getResult(Array), getResultCnt(Array), isTotal(boolean)
 * return : N/A
 * etc  : [0:content], [1:minwon], [2:lec], [3:staff], [4:menu], [5:sns], [6:board], [7:vod], [8:photo], [9:total]
 */
 
// 쿼리 / 인덱스 / 결과Arr(3개) / 총개수
function totalView(query, indexName, getResult) {
  let html = '';
  let lowData = false;
  let extArr = ['hwp', 'doc', 'docx', 'txt', 'rtf', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'jpg', 'jpeg', 'gif', 'png', 'bmp'];
  
  $('#themeSearch').show();$('#menuSearch').show();$('#staffSearch').show();$('#boardSearch').show();
  $('#contentSearch').show();$('#minwonSearch').show();$('#photoSearch').show();$('#vodSearch').show();
  $('#lecSearch').show();$('#snsSearch').show();$('.more').show();

  switch(indexName) {
    case 'content':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
            $('#content_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<li><div class="top"><a href="';
          html += highlighting(query, ((getResult[j]._source.menu_link).replace(/(<([^>]+)>)/ig, "")));
          html += '" class="main_url" target="_blank">';
          html += highlighting(query, ((getResult[j]._source.content_title).replace(/(<([^>]+)>)/ig, "")));
          html += '</a><span class="subtxt_wrap"><span class="subtxt">';
          html += highlighting(query, ((getResult[j]._source.content_last_modified).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += '</span></span></div><p class="ptxt text_reduceC'+j+'" id="text_reduce">';

          let getStr = getByteLength(getResult[j]._source.content);
          if(getStr >= 290) {
            $('head').append("<style>.text_reduceC"+j+"::before{ color : black }</style>");
          } else {
            $('head').append("<style>.text_reduceC"+j+"::before{ color : white }</style>");
          }
          
          html += highlighting(query, ((getResult[j]._source.content).replace(/(<([^>]+)>)/ig, "")));
          html += '</p><p class="loc">';
          html += highlighting(query, ((getResult[j]._source.full_path).replace(/(<([^>]+)>)/ig, "")));
          html += '</p></li>';
        }
      }
      $('.contentUl').html(html);
    break;
      
    case 'minwon':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<tr><td colspan="4" style="text-aling:center">검색결과가 없습니다.</td></tr>';
            $('#minwon_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<tr><td><a href="'+((getResult[j]._source.link_url).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
          html += highlighting(query, ((getResult[j]._source.ba_title).replace(/(<([^>]+)>)/ig, "")));
          html += '</a></td><td>';
          html += highlighting(query, ((getResult[j]._source.dep_name).replace(/(<([^>]+)>)/ig, "")));
          html += '</td><td><div text-align="left">';
          
          let getDate = getNowYM();
          let tempFileInfo = (getResult[j]._source.file_info).substring(0, (getResult[j]._source.file_info).lastIndexOf("#a#"));
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
              tempFilePrefix = 'main';
            }
            
            tempFilePrefix = tempFilePrefix.toLowerCase();

            html += '<a href="https://www.mapo.go.kr/site/'+tempFilePrefix+'/file/download/uu/';
            html += tempFileUUID;
            html += '" target="_blank"><img src="/design/theme/mapo/images/sub/ico_bbs_file.png" alt="첨부파일" > ';
            html += highlighting(query, tempFileName) + '</a><br>';
          }
          
          html += '</div></td><td>';
          html += ((getResult[j]._source.ba_regdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10);
          html += '</td></tr>';
        }
      }
      $('.minwonUl').html(html);
    break;
      
    case 'lec':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
            $('#lec_paging').hide();
            break;
          }
        } else {
          lowData = true;
          
          html += '<li>';
          
          // 교육 상태값에 따른 구분(교육완료/접수중/접수예정/오늘마감)
          if ((getResult[j]._source.lecstate_nm).indexOf('교육완료') != -1) {
            html += '<div class="top"><div class="l"><span class="deadline4">';
          } else if((getResult[j]._source.lecstate_nm).indexOf('접수예정') != -1) {
            html += '<div class="top"><div class="l"><span class="deadline3">';
          } else if((getResult[j]._source.lecstate_nm).indexOf('오늘마감') != -1) {
            html += '<div class="top"><div class="l"><span class="deadline2">';
          } else if((getResult[j]._source.lecstate_nm).indexOf('접수중') != -1) {
            html += '<div class="top"><div class="l"><span class="deadline1">';
          } else if((getResult[j]._source.lecstate_nm).indexOf('교육중') != -1) {
            html += '<div class="top"><div class="l"><span class="deadline5">';
          }
          
          html += ((getResult[j]._source.lecstate_nm).replace(/(<([^>]+)>)/ig, ""));
          html += '</span><span class="price">';
          
          // 결제 타입별 출력 구분(무료/유료현장결제/유료)
          if (((getResult[j]._source.mcd_nm) != null || (getResult[j]._source.mcd_nm) != '')) {
            if ((getResult[j]._source.mcd_nm).indexOf('무료') != -1 ||
                (getResult[j]._source.mcd_nm).indexOf('유료현장결제') != -1) { // 무료 혹은 유료현장결제 일 때
              html += ((getResult[j]._source.mcd_nm).replace(/(<([^>]+)>)/ig, ""));
            } else { // 유료 일 때
              html += ((getResult[j]._source.lt_money).replace(/(<([^>]+)>)/ig, ""));
            }
          }
          
          html += '</span></div><div class="r">';
          
          // 신청 방법 구분(인터넷/방문/전화/별도사이트?)
          if ((getResult[j]._source.lt_names) != null || (getResult[j]._source.lt_names) != '') {
            if ((getResult[j]._source.lt_names).indexOf('인터넷') != -1) { // 인터넷
              html += '<span class="online"></span>';
            }
            if ((getResult[j]._source.lt_names).indexOf('방문') != -1) { // 방문
              html += '<span class="visit"></span>';
            }
            if ((getResult[j]._source.lt_names).indexOf('전화') != -1) { // 전화
              html += '<span class="phone"></span>';
            } 
            if ((getResult[j]._source.lt_names).indexOf('별도사이트') != -1) { // 별도사이트
              html += '<span class="site"></span>';
            }
          }
          html += '</div></div><div class="thumb"><a href="';
          html += highlighting(query, ((getResult[j]._source.lt_link).replace(/(<([^>]+)>)/ig, "")));
          html += '" target="_blank"><img src="';
          html += ((getResult[j]._source.lt_link).replace(/(<([^>]+)>)/ig,""));
          //html += 'NOT IMG!!!!'
          html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'" ></a></div><div class="tit2"><h3><a href="';
          html += highlighting(query, ((getResult[j]._source.lt_link).replace(/(<([^>]+)>)/ig, "")));
          html += '" target="_blank">';
          html += highlightingLec(query, ((getResult[j]._source.lt_name).replace(/(<([^>]+)>)/ig, "")));
          html += '</a></h3><span class="fc_sky">';
          html += highlighting(query, ((getResult[j]._source.lgt_name).replace(/(<([^>]+)>)/ig, "")));
          html += '</span></div><div class="footer2"><p>교육기간 : ';
          html += highlighting(query, ((getResult[j]._source.lt_edu_sday).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += ' ~ ';
          html += highlighting(query, ((getResult[j]._source.lt_edu_eday).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += '</p></div></li>';
        }
      }
      $('.lecUl').html(html);
    break;
      
    case 'staff':
      for (var j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<tr><td colspan="5" style="text-align:center">검색 결과가 없습니다.</td></tr>';
            $('#staff_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<tr><td>';
          html += highlighting(query, ((getResult[j]._source.parent_dep_name).replace(/(<([^>]+)>)/ig, "")));
          html += ' ';
          html += highlighting(query, ((getResult[j]._source.dep_name).replace(/(<([^>]+)>)/ig, "")));
          html += '</td><td>';
          html += highlighting(query, ((getResult[j]._source.admin_position).replace(/(<([^>]+)>)/ig, "")));
          html += '</td><td>';
	  if(getResult[j].highlight.admin_explain == undefined) { 
          	
		  html += highlighting(query, ((getResult[j]._source.admin_explain).replace(/\n/ig, "<br>")));
	  } else {
	  	
		  html += getResult[j].highlight.admin_explain;
	  
	  }

		  html += '</td><td>';
		  if (getResult[j]._source.admin_tel == "02-3153-9510") {
				html += '';
		  } else {
				html += highlighting(query, ((getResult[j]._source.admin_tel).replace(/(<([^>]+)>)/ig, "")));
		  }          
          html += '</td></tr>';
        }
      }
      $('.staffUl').html(html);
    break;
      
    case 'menu':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
            $('#menu_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<li><a href="';
          html += highlighting(query, ((getResult[j]._source.menu_link).replace(/(<([^>]+)>)/ig, "")));
          html += '" target="_blank">';
          html += highlighting(query, ((getResult[j]._source.full_path).replace(/(<([^>]+)>)/ig, "")));
          html += '</a></li>';
        }
      }
      $('.menuUl').html(html);
    break;
      
    case 'sns':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
            $('#sns_paging').hide();
            break;
          }
        } else { // 통합검색 화면 뿌려주기
          lowData = true;
            if ((getResult[j]._source.sns_type) != null || (getResult[j]._source.sns_type) != '') {
              if ((getResult[j]._source.sns_type).indexOf('fa') != -1) {
                html += '<li><div class="fa"><p><a href="'+((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
              } else if ((getResult[j]._source.sns_type).indexOf('tw') != -1) {
                html += '<li><div class="tw"><p><a href="'+((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
              } else if ((getResult[j]._source.sns_type).indexOf('bl') != -1) {
                html += '<li><div class="bl"><p><a href="'+((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
              } else {
                html += '<li><div class="fa"><p><a href="'+((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
              }
            }
            html += highlighting(query, ((getResult[j]._source.sns_desc).replace(/(<([^>]+)>)/ig, "")));
            html += '</a></p><span class="url"><a href="'+((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""))+'" target="_blank">';
            html += ((getResult[j]._source.sns_linkurl).replace(/(<([^>]+)>)/ig, ""));
            html += '</a></span></div></li>';
        }
      }
      $('.snsUl').html(html);
    break;
      
    case 'board':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<li style="text-aling:center">검색결과가 없습니다.</li>';
            $('#board_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<li><div class="top"><a href="';
          html += ((getResult[j]._source.link_url).replace(/(<([^>]+)>)/ig, ""));
          html += '" class="main_url" target="_blank">';
          html += highlighting(query, ((getResult[j]._source.ba_title).replace(/(<([^>]+)>)/ig, "")));
          html += '</a><span class="subtxt_wrap"><span class="subtxt">';
          html += highlighting(query, ((getResult[j]._source.ba_regdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += '</span><span class="subtxt">작성 : ';
          html += highlighting(query, ((getResult[j]._source.ba_guest_name).replace(/(<([^>]+)>)/ig, "")));
          html += '</span></span></div><p class="ptxt text_reduce'+j+'" id="text_reduce">';
          
          // 2줄 이상이 넘어가게 되면 ... 보이지 않게 처리
          let getStr = getByteLength(getResult[j]._source.ba_content_html);
          if(getStr >= 290) {
            $('head').append("<style>.text_reduce"+j+"::before{ color : black }</style>");
          } else {
            $('head').append("<style>.text_reduce"+j+"::before{ color : white }</style>");
          }
          
          html += highlighting(query, (getResult[j]._source.ba_content_html));
          html += '</p>';
          
          let getDate = getNowYM();
          let tempFileInfo = (getResult[j]._source.file_info).substring(0, (getResult[j]._source.file_info).lastIndexOf("#a#"));
          let tempFileInfoArr = tempFileInfo.split('#a#'); // {"abcd#b#1234#c#xxxx#d#1234", "ascx#b#gsdx#c#d23s#d#gs56", ...}
          
           
          if(tempFileInfo == undefined || tempFileInfo == null || tempFileInfo == '') {
          } else {
             for(var k in tempFileInfoArr) {
              let tempFileName = tempFileInfoArr[k].substring(0, tempFileInfoArr[k].lastIndexOf('#b#'));
              let tempFileUUID = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#b#')+3, tempFileInfoArr[k].indexOf('#c#'));
              let tempFilePath = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#c#')+3, tempFileInfoArr[k].indexOf('#d#'));
              let tempFilePrefix = tempFileInfoArr[k].substring(tempFileInfoArr[k].indexOf('#d#')+3, tempFileInfoArr[k].length);
              //2020.02.13
              let sitePrefix = getResult[j]._source.site_prefix;
			 // if(sitePrefix == 'YONGGANG') {
		      if(sitePrefix == 'YONGGANG' || sitePrefix == 'YEONNAM' || sitePrefix == 'YEOMNI'  || sitePrefix == 'SINSU'  || 
					sitePrefix == 'SEONGSAN2' || sitePrefix == 'SEONGSAN1' || sitePrefix == 'SEOGYO' || sitePrefix == 'SEOGANG' ||
					sitePrefix == 'SANGAM' || sitePrefix == 'MANGWON2' || sitePrefix == 'MANGWON1' || sitePrefix == 'HAPJEONG' || 
					sitePrefix == 'GONGDEOK' || sitePrefix == 'DOHWA' || sitePrefix == 'DAEHEUNG' || sitePrefix == 'AHYEON'  ) {

				  html += '<div class="file_wrap"><a href="https://www.mapo.go.kr/site/'+ sitePrefix +'/file/download/uu/';
			  }else {
				  html += '<div class="file_wrap"><a href="https://www.mapo.go.kr/site/main/file/download/uu/'
			  }
              html += tempFileUUID;
              html += '" class="down">';
              html += highlighting(query, tempFileName);
              html += '</a>';
              
              // 특정 확장자가 아니면 버튼 나오지 않게 처리
              // hwp, doc, docx, txt, rtf, ppt, pptx, xls, xlsx, pdf, jpg, jpeg, gif, png, bmp
              let isExtExist = false;
              let ext = tempFileName.substring(tempFileName.lastIndexOf('.')+1, tempFileName.length);
              for(var i in extArr) {
                if(extArr[i] == ext) {
                  isExtExist = true;
                }
              }
              if(isExtExist) {
            	//  if(sitePrefix == 'YONGGANG') {
				if(sitePrefix == 'YONGGANG' || sitePrefix == 'YEONNAM' || sitePrefix == 'YEOMNI'  || sitePrefix == 'SINSU'  || 
						sitePrefix == 'SEONGSAN2' || sitePrefix == 'SEONGSAN1' || sitePrefix == 'SEOGYO' || sitePrefix == 'SEOGANG' ||
						sitePrefix == 'SANGAM' || sitePrefix == 'MANGWON2' || sitePrefix == 'MANGWON1' || sitePrefix == 'HAPJEONG' || 
						sitePrefix == 'GONGDEOK' || sitePrefix == 'DOHWA' || sitePrefix == 'DAEHEUNG' || sitePrefix == 'AHYEON'  ) {
	  
            		  html += '<a href="https://www.mapo.go.kr/site/'+ sitePrefix +'/preview/';
            	  }else {
            		  html += '<a href="https://www.mapo.go.kr/site/main/preview/';
            	  }
                html += tempFileUUID;
                html += '/" class="view" target="_blank">바로보기</a>';
              }
              
              html += '</div>';
             }
          }
           
           html += '</li>';
        }
      }
      $('.boardUl').html(html);
    break;
      
    case 'vod':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
            $('#vod_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<li><div class="thumb"><a href="';
        //  html += ((getResult[j]._source.).replace(/(<([^>]+)>)/ig,""));
        html += 'A TAG URL!!!';
          html += '" target="_blank"><div class="filter"><span class="play"></span></div><img src="';
          html += highlighting(query, ((getResult[j]._source.thumb).replace(/(<([^>]+)>)/ig, "")));
          html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'" ></a></div><div class="tit1"><h3><a href="';
        //  html += ((getResult[j]._source.).replace(/(<([^>]+)>)/ig,""));
        html += 'A TAG URL!!!';
          html += '" target="_blank">';
          html += highlighting(query, ((getResult[j]._source.title).replace(/(<([^>]+)>)/ig, "")));
          html += '</a></h3></div><div class="footer1"><div class="l"><span>';
          html += highlighting(query, ((getResult[j]._source.pubdate).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += '</span></div><div class="r"><span>';
          html += highlighting(query, ((getResult[j]._source.category).replace(/(<([^>]+)>)/ig, "")));
          html += '</span></div></div></li>';
        }
      }
      $('.vodUl').html(html);
    break;
      
    case 'photo':
      for (j = 0; j < 3; j++) {
        if (getResult[j] == null || getResult[j] == '' || getResult[j] == 0 || getResult[j] == undefined || getResult[j] == '0') {
          if (lowData) { // 검색결과 3건 이하로 나올때(1건 혹은 2건) 예외처리
            break;
          } else {
            html += '<p style="text-aling:center">검색결과가 없습니다.</p>';
            $('#photo_paging').hide();
            break;
          }
        } else {
          lowData = true;
          html += '<li><div class="thumb"><a href="';
          html += highlighting(query, ((getResult[j]._source.link).replace(/(<([^>]+)>)/ig, "")));
          html += '" target="_blank"><img src="';
          html += highlighting(query, ((getResult[j]._source.image_org).replace(/(<([^>]+)>)/ig, "")));
          html += '" alt="" onerror="this.src=\'/design/common/images/asset/noImage300x300.png\'" ></a></div><div class="tit1"><h3><a href="';
          html += highlighting(query, ((getResult[j]._source.link).replace(/(<([^>]+)>)/ig, "")));
          html += '">';
          html += highlighting(query, ((getResult[j]._source.title).replace(/(<([^>]+)>)/ig, "")));
          html += '</a></h3></div><div class="footer1"><div class="l"><span>';
          html += highlighting(query, ((getResult[j]._source.add_dt).replace(/(<([^>]+)>)/ig, "")).substring(0, 10));
          html += '</span></div><div class="r"><span>';
          html += highlighting(query, ((getResult[j]._source.division).replace(/(<([^>]+)>)/ig, "")));
          html += '</span></div></div></li>';
        }
      }
      $('.photoUl').html(html);
    break;
  }
}
