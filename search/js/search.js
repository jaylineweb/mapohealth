/* def
 * etc  : [0:content], [1:minwon], [2:lec], [3:staff], [4:menu], [5:sns], [6:board], [7:vod], [8:photo], [9:total]
 */
var def = {
	// 운영 ip / port
	ipPort: 'http://98.14.1.230:9200',
	gatewayIpPort: 'http://98.14.1.230:8540',

	// 개발 ip / port
	//	ipPort: 'http://172.16.100.21:9200',
	//	gatewayIpPort: 'http://172.16.100.21:8540',

	// index 정의.
	indexKorArr: ['웹페이지', '민원사무편람', '교육강좌', '직원/업무', '메뉴검색', 'SNS', '게시판', '동영상', '이미지', '통합검색'],
	indexArr: ['content', 'minwon', 'lec', 'staff', 'menu', 'sns', 'board', 'vod', 'photo', 'total'],

	// [필터 - 검색정렬]default 정확도순 타겟필드 지정   [{"ba_regdate":{"order":"desc"}}] => default가 정확도순(_score desc)
	headShotSortFilter: [
		[], // content
		[], // minwon
		["lt_edu_eday"], // lec
		["parent_dep_order"], // staff
		[], // menu
		[], // sns
		[], // board
		[], // vod
		[], // photo
		[] // total
	],

	// [필터 - 검색정렬]날짜순 타겟필드 지정.
	dateSortFilter: [
		["content_last_modified"], // content
		["ba_regdate"], // minwon
		["lt_edu_eday"], // lec
		[], // staff
		[], // menu
		["sns_regdt"], // sns => 얘 date형식 db 데이터형식 변경 필요 (YYYYMMDD... => YYYY-MM-DD)
		["ba_regdate"], // board
		[], //vod
		["add_dt"], // photo
		[] // total
	],

	// [필터 - 검색정렬]제목순 타겟필드 지정.
	titleSortFilter: [
		'content_title', // content
		'ba_title', // minwon
		'lt_name', // lec
		'', // staff
		'menu_name', // menu
		'', // sns
		'ba_title', // board
		'', //vod
		'title', // photo
		'' // total
	],

	// [필터 - 검색영역]
	// => default가 전체 검색 타겟 영역 지정.
	areaTotalFilter: [
		'["content_title^100","menu_link","content_id","full_path","content^10"]', // content
		'["ba_title^100","bc_name"]', // minwon
		'["lt_name"]', // lec
		'["dep_name","parent_dep_name","admin_tel","admin_position","admin_explain","admin_explain.ko"]', // staff
		'["menu_name","full_path"]', // menu
		'["sns_desc"]', // sns
		'["ba_content_html^10","ba_title^100","bc_name","file_original_name","attach.FILE_CONTENT"]', // board
		'[""]', // vod
		'["title^100","division"]', // photo
		'[""]' // total
	],

	// [필터 - 검색영역]제목 검색 타겟 영역 지정.
	areaTitleFilter: [
		'["content_title"]', // content
		'["ba_title"]', // minwon
		'["lt_name"]', // lec
		'[""]', // staff
		'["menu_name"]', // menu
		'[""]', // sns
		'["ba_title"]', // board
		'[""]', //vod
		'["title"]', // photo
		'[""]' // total
	],

	// [필터 - 검색영역]내용 검색 타겟 영역 지정.
	areaContentFilter: [
		'["content"]', // content
		'["ba_content_html"]', // minwon
		'[""]', // lec
		'["admin_explain"]', // staff
		'["full_path"]', // menu
		'["sns_desc"]', // sns
		'["ba_content_html"]', // board
		'[""]', //vod
		'[""]', // photo
		'[""]' // total
	],

	// [필터 - 검색영역]작성자 검색 타겟 영역 지정.
	areaWriterFilter: [
		'[""]', // content
		'["ba_guest_name"]', // minwon
		'["lgt_name"]', // lec
		'[""]', // staff
		'[""]', // menu
		'[""]', // sns
		'["ba_guest_name"]', // board
		'[""]', // vod
		'[""]', // photo
		'[""]' // total
	],

	// [필터 - 검색기간] 적용 field 지정.
	dateRangeFilter: [
		[""], // content
		["ba_regdate"], // minwon
		[], // lec => 범위 date
		[], // staff
		[], // menu
		["sns_regdt"], // sns => 재 format 필요 (YYYYMMDD... => YYYY-MM-DD)
		["ba_regdate"], // board
		[], //vod
		["add_dt"], // photo
		[] // total
	],
	
	wildcardFilter: [
		[],
		[],
		[],
		["admin_explain"],
		[],
		[],
		[],
		[],
		[],
		[]
	],

	// 하이라이팅 타겟 필드 지정(전체) => 안씀
	highlightArr: ['"content_title":{},"full_path":{},"content":{}', // content
		'"ba_content_html":{},"ba_title":{},"bc_name":{}', // minwon
		'"lt_name":{}', // lec
		'"dep_name":{},"parent_dep_name":{},"admin_tel":{},"admin_position":{},"admin_explain":{},"admin_explain.ko":{}', // staff
		'"menu_name":{},"full_path":{}', // menu
		'"sns_desc":{}', // sns
		'"ba_content_html":{},"ba_title":{},"bc_name":{}', // board
		'', // vod
		'"title":{},"division":{}', // photo
		'' // total
	],

	// controller url
	url: '/site/rest',

	// elasticsearch에서 ajax시, 사용되는 contentType
	contentType: 'application/x-www-form-urlencoded;charset=UTF-8',

	// cookie
	cookieName: 'myFindKeywords', // 이름.
	cookieLimitCnt: 5, // 저장 개수.
	cookieLimitDay: 99, // 만료일.
} /// end def{}


/* 검색 main function
 * param : N/A
 * return : N/A
 */
function doSearch() {
	//let _sToken = $('input[name=_sToken]').val();

	// 페이징을 진행한 이후, 같은 index면 페이징이 1로 가지 않음을 방지
	let isViaSearch = $('#isViaSearch').val();

	// 자동완성 관련.
	$('.srchp_result').slideUp('fast'); // 창 닫기.
	$("#autoStartNum").val(0); // 자동완성 키보드 이동 관련 데이터 초기화.

	// 질의어.
	let query = $(".searchQuery").val();
	query = query.trim();

	// 이전에 검색한 query
	let querySave = $('#querySave').val();

	// query null check
	if (query == '' || query == null || query == undefined ||
		(query != null && typeof query == "object" && !Object.keys(query).length)) {
		$('a').unbind('click'); // a태그 실행 취소.
		//alert("검색어를 입력해 주세요.");
		$('input[name=query]').focus(); // 검색창에 입력 커서 위치시킴.

		return false;
	}

	let tempQuery = query;

	query = query.replace(/%/gi, '');
	query = query.replace(/\\/gi, '&bsol;');
	query = query.replace(/</gi, '');
	query = query.replace(/>/gi, '');
	query = query.replace(/\"/gi, '&quot;');
	query = query.replace(/\?/gi, '&quest;');

	// 검색어 20자 제한.
	if (query.length > 20) {
		query = query.substring(0, 20);
		alert("검색어는 20자까지만 인식하여, 결과를 가져옵니다.");
	}

	$('.searchQuery').val(tempQuery);

	// 결과내 재검색 query 설정.
	if ($('input:checkbox[id=reChk]').is(':checked')) {
		query = querySave + ' ' + query; // and(공백) 검색.
		$('#reChk').prop('checked', false);
		$('#query').val(query);
	}

	// 이전 query 저장.
	$('#querySave').val(tempQuery);

	// 검색에 필터 설정.
	let filter = searchFilter();

	// index명 지정.
	// [0:content], [1:minwon], [2:lec], [3:staff], [4:menu], [5:sns], [6:board], [7:vod], [8:photo], [9:total]
	let indexKorArr = def.indexKorArr;
	let indexArr = def.indexArr;

	// 검색 타겟 필드 지정.
	let fieldArr = def.areaTotalFilter;

	// 하이라이팅 타겟 필드 지정.
	let highlightArr = def.highlightArr;

	// menu selectbox
	let menuOpt = Number($("#menuOpt option:selected").val());

	if (menuOpt == undefined || menuOpt == null || isNaN(menuOpt)) {
		menuOpt = 9;
	}

	// tab menu 선택되게 현행화.
	let menuList = "menu" + menuOpt;
	$(".pc li").attr('class', '');
	$("#" + menuList).attr('class', 'on');

	// === 페이징 처리 영역 ===
	let pastMenuOpt = $('#pastMenuOpt').val(); // 이전에 menuOpt
	let cPage = 1;

	$('#pastMenuOpt').val(menuOpt); // 현재 menuOpt는 다음 검색을 위해 저장.

	// 통합검색에서는 페이징 처리가 없음.
	if (def.indexKorArr[menuOpt] != '통합검색') {
		if ($('#nowPage').val() == null || $('#nowPage').val() == 0 || $('#nowPage').val() == undefined) {
			cPage = 1;
		}

		cPage = Number($('#nowPage').val());

		if (cPage == 0) {
			cPage = 1;
		}

		// 다른 인덱스에서 검색하거나, doSearch()만 하게 되면 1페이지부터 시작.
		if (pastMenuOpt != menuOpt || isViaSearch == 'false') {
			$('#nowPage').val(1);
			cPage = 1;
		}
	}

	// 결과 화면 출력
	resultView(query, filter, cPage, menuOpt);

	// 내가 찾은 검색어 설정.
	getMyFindKeyword(query);

	// 추천검색어 출력.
	recommend();

	// 연관검색어 출력.
	related();

	// 테마검색 출력.
	theme();

	// 페이징을 진행한 이후, 같은 index면 페이징이 1로 가지 않음을 방지
	$('#isViaSearch').val('false');

}


/* 페이징 검색.
 * param : nowPage(number)
 * return : N/A
 */
function doPaging(nowPage) {
	$('#isViaSearch').val('true');

	if (nowPage == 0) {
		nowPage = 1;
	}

	$('#nowPage').val(nowPage);

	doSearch();
}


/* 탭 검색.
 * param : tabNumber(number)
 * return : N/A
 */
function tabSearch(tabNumber) {
	$('#isViaSearch').val('true');

	let query = $("#query").val();

	// query null check
	if (query == '' || query == null || query == undefined ||
		(query != null && typeof query == "object" && !Object.keys(query).length)) {
		// a태그 실행 취소.
		$('a').unbind('click');
		//alert("검색어를 입력해 주세요.");
		$('input[name=query]').focus();

		return false;
	}

	// selectbox index명대로 현행화.
	$("#menuOpt").val(tabNumber).prop("selected", true);
	//	$("#mobileMenuOpt").val(tabNumber).prop("selected", true);

	doSearch();
}


/* 자동완성 / 추천검색어 검색.
 * param : acQuery(String)
 * return : N/A
 */
function acSearch(acQuery) {
	$('#isViaSearch').val('true');
	$("#query").val(acQuery);

	$('.srchp_result').slideUp('fast');

	doSearch();
}


/* 페이징 처리.
 * param : cCnt(number), tCnt(number), menuOpt(number)
 * return : N/A
 * etc : jquery.paging.js
 */
function pagingTech(cCnt, tCnt, menuOpt) {
	let curCnt = cCnt;
	let target = '#' + def.indexArr[menuOpt] + '_paging';
	let totalCnt = (tCnt % 10 == 0) ? parseInt(tCnt / 10) : parseInt(tCnt / 10) + 1;

	// 동영상 또는 이미지 또는 교육강좌 일때에는 9건씩 보여지도록 수정
	if (menuOpt == 7 || menuOpt == 8 || menuOpt == 2) {
		totalCnt = (tCnt % 9 == 0) ? parseInt(tCnt / 9) : parseInt(tCnt / 9) + 1;
	}

	if (target.indexOf('total') != -1) {
		return false;
	}

	// current : 현재 페이지 번호 | max : 최대 표현할 페이지 개수.
	$(target).paging({
		current: curCnt,
		max: totalCnt
	});
}


/* 검색 필터.
 * param : N/A
 * return : resultArr(Array) {정렬, 영역, 기간}
 */
function searchFilter() {
	let searchSort = $('input[name="searchSort"]:checked').val();
	let searchArea = $('input[name="searchArea"]:checked').val();
	let searchSortVal = '';
	let searchAreaVal = '';
	let searchRangeVal = '';
	let wildcardVal = ''
	let resultArr = new Array();

	// 검색정렬 필터 지정.
	switch (searchSort) {
		case 'headShotSortFilter':
			searchSortVal = def.headShotSortFilter;
			break;
		case 'dateSortFilter':
			searchSortVal = def.dateSortFilter;
			break;
		case 'titleSortFilter':
			searchSortVal = def.titleSortFilter;
			break;
		default:
			searchSortVal = def.headShotSortFilter;
			break;
	}

	resultArr.push(searchSortVal);

	// 검색영역 필터 지정.
	switch (searchArea) {
		case 'areaTotalFilter':
			searchAreaVal = def.areaTotalFilter;
			break;
		case 'areaTitleFilter':
			searchAreaVal = def.areaTitleFilter;
			break;
		case 'areaContentFilter':
			searchAreaVal = def.areaContentFilter;
			break;
		case 'areaWriterFilter':
			searchAreaVal = def.areaWriterFilter;
			break;
		default:
			searchAreaVal = def.areaTotalFilter;
			break;
	}

	resultArr.push(searchAreaVal);

	// 검색기간 필터 지정.
	searchRangeVal = def.dateRangeFilter;
	resultArr.push(searchRangeVal);
	wildcardVal = def.wildcardFilter;
	resultArr.push(wildcardVal);

	return resultArr;
}


/*
 * 결과 없음 출력.
 * param : index(String), query(String)
 * return : N/A
 */
function notResult(index, query) {
  console.error(index + " 인덱스의 '" + query + "' 검색 결과가 없습니다.");

  // XSS 방지용 간단 이스케이프
  var safeQuery = String(query)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

//  var msg = '<div class="no-result" role="status" aria-live="polite">'; 
//  msg += '<h3> '+safeQuery+'에 대한 검색 결과가 없습니다.</h3>'; 
var msg = '<p style="font-size:14px; margin:10px 0 12px 0; line-height:1.5;">';
msg += '단어의 철자가 정확한지 확인해 주시기 바랍니다.<br>검색어의 단어 수를 줄이거나, 다른 검색어(유사어)로 검색해 보시기 바랍니다.</p>';
  msg += '<ul>'; 
  msg += '<li>① 검색어의 철자를 확인해 보세요.</li>'; 
  msg += '<li>② 다른 검색어나 유사어를 시도해 보세요.</li>'; 
  msg += '<li>③ 더 일반적인 단어로 검색해 보세요.</li>'; 
  msg += '</ul>'; 
  msg += '<div class="btn-area">'; 
  msg += '<a href="/" class="btn-home-sm">홈으로 이동</a>'; 
  msg += '</div>';
//  msg += '</div>';

  const $target = $('#' + index + 'Search');
  if ($target.length > 0) {
    $target.html(msg).show();
  } else {
    console.warn('notResult(): ${index}Search 영역 없음 → #searchResultArea 로 대체');
    $('#searchResultArea').html(msg).show();
  }
}



/*
 * 오늘 날짜 구하기.
 * param : N/A
 * return : '2019-06-24'(String)
 */
function getNowDate() {
	let dt = new Date();
	let recentYear = dt.getFullYear();
	let recentMonth = dt.getMonth() + 1;
	let recentDay = dt.getDate();

	if (recentMonth < 10) {
		recentMonth = "0" + recentMonth;
	}

	if (recentDay < 10) {
		recentDay = "0" + recentDay;
	}

	return recentYear + "-" + recentMonth + "-" + recentDay;
}


/*
 * 오늘 날짜 구하기2.
 * param : N/A
 * return : '201907'(String)
 */
function getNowYM() {
	let dt = new Date();
	let recentYear = dt.getFullYear();
	let recentMonth = dt.getMonth() + 1;

	if (recentMonth < 10) {
		recentMonth = "0" + recentMonth;
	}

	return recentYear + recentMonth;
}


/*
 * 이전기준 날짜 구하기.
 * param : N/A
 * return : '2019-06-24'(String)
 */
function getPastDate() {
    let dt = new Date();
    let period = $('input[name="searchRange"]:checked').val();

    switch (period) {
        case "dateRangeTFilter":
            dt.setFullYear(dt.getFullYear() - 3);
            break;
        case "dateRangeWFilter":
            dt.setDate(dt.getDate() - 7);
            break;
        case "dateRangeMFilter":
            dt.setMonth(dt.getMonth() - 1);
            break;
        case "dateRangeYFilter":
            dt.setFullYear(dt.getFullYear() - 1);
            break;
        default:
            dt.setFullYear(dt.getFullYear() - 3);
            break;
    }

    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}


/* 통합화면에서 검색화면으로의 main function
 * param : N/A
 * return : N/A
 */
function doTotalSearch() {
	//let _sToken = $('input[name=_sToken]').val();

	// 페이징을 진행한 이후, 같은 index면 페이징이 1로 가지 않음을 방지
	let isViaSearch = $('#isViaSearch').val();

	// 자동완성 관련.
	$('.srchp_result').slideUp('fast'); // 창 닫기.
	$("#autoStartNum").val(0); // 자동완성 키보드 이동 관련 데이터 초기화.

	// 질의어.
	let query = $('#totalQuery').val();

	if (query == null) {
		return false;
	}
	query = query.trim();

	// 이전에 검색한 query
	let querySave = $('#querySave').val();

	// query null check
	if (query == '' || query == null || query == undefined ||
		(query != null && typeof query == "object" && !Object.keys(query).length)) {
		$('a').unbind('click'); // a태그 실행 취소.
		//alert("검색어를 입력해 주세요.");
		$('input[name=query]').focus(); // 검색창에 입력 커서 위치시킴.

		return false;
	}

	let tempQuery = query;

	query = query.replace(/%/gi, '');
	query = query.replace(/\\/gi, '&bsol;');
	query = query.replace(/</gi, '');
	query = query.replace(/>/gi, '');
	query = query.replace(/\"/gi, '&quot;');
	query = query.replace(/\?/gi, '&quest;');

	// 검색어 20자 제한.
	if (query.length > 20) {
		query = query.substring(0, 20);
		alert("검색어는 20자까지만 인식하여, 결과를 가져옵니다.");
	}

	$('.totalQuery').val(tempQuery);
	$('.searchQuery').val(tempQuery);

	// 이전 query 저장.
	$('#querySave').val(tempQuery);

	// 검색에 필터 설정.
	let filter = searchFilter();

	// index명 지정.
	// [0:content], [1:minwon], [2:lec], [3:staff], [4:menu], [5:sns], [6:board], [7:vod], [8:photo], [9:total]
	let indexKorArr = def.indexKorArr;
	let indexArr = def.indexArr;

	// 검색 타겟 필드 지정.
	let fieldArr = def.areaTotalFilter;

	// 하이라이팅 타겟 필드 지정.
	let highlightArr = def.highlightArr;

	// menu selectbox
	let menuOpt = Number($("#menuOpt option:selected").val());

	if (menuOpt == undefined || menuOpt == null || isNaN(menuOpt)) {
		menuOpt = 9;
	}

	// tab menu 선택되게 현행화.
	let menuList = "menu" + menuOpt;
	$(".pc li").attr('class', '');
	$("#" + menuList).attr('class', 'on');

	/* === 페이징 처리 영역 === */
	let pastMenuOpt = $('#pastMenuOpt').val(); // 이전에 menuOpt
	let cPage = 1;

	$('#pastMenuOpt').val(menuOpt); // 현재 menuOpt는 다음 검색을 위해 저장.

	// 통합검색에서는 페이징 처리가 없음.
	if (def.indexKorArr[menuOpt] != '통합검색') {
		if ($('#nowPage').val() == null || $('#nowPage').val() == 0 || $('#nowPage').val() == undefined) {
			cPage = 1;
		}

		cPage = Number($('#nowPage').val());

		if (cPage == 0) {
			cPage = 1;
		}

		// 다른 인덱스에서 검색하거나, doSearch()만 하게 되면 1페이지부터 시작.
		if (pastMenuOpt != menuOpt || isViaSearch == 'false') {
			$('#nowPage').val(1);
			cPage = 1;
		}
	}

	// 결과 화면 출력
	resultView(query, filter, cPage, menuOpt);

	// 내가 찾은 검색어 설정.
	getMyFindKeyword(query);

	// 추천검색어 출력.
	recommend();

	// 연관검색어 출력.
	related();

	// 테마검색 출력.
	theme();

	// 실시간(급상승)검색어 출력.
	hotQuery();

	// 인기검색어 출력.
	popQuery();

	// 통합추천검색어
	//totalRecommend();

	// 페이징을 진행한 이후, 같은 index면 페이징이 1로 가지 않음을 방지
	$('#isViaSearch').val('false');
}


/*
 * highlighting
 * param :
 * return :
 */
function highlighting(query, data) {
	if (data == undefined) {
		return data;
	}

	let result = data;

	if (data.indexOf(query) != -1) {
		result = data.replace(new RegExp(query, 'gi'), "<em>" + query + "</em>");
	}

	return result;
}

/*
 * highlighting
 * param :
 * return :
 */
function highlightingLec(query, data) {
	if (data == undefined) {
		return data;
	}

	let result = data;

	if (data.indexOf(query) != -1) {
		result = data.replace(new RegExp(query, 'gi'), "<em style='font-size: 14pt;'>" + query + "</em>");
	}

	return result;
}


function resultView(query, filter, cPage, menuOpt) {
	const url = def.url;
	const contentType = def.contentType;
	const esUrl = def.ipPort + '/_msearch';

	let resultAjax = new Array();
	let getResultCnt = new Array();
	let objData = '';
	let uriQuery = encodeURI(query);
	let result = '';
	let isTotal = false;

	for(i = 0; i < def.indexArr.length; i ++) {
		if(i == 9) {
			isTotal = true;
		}

		// def.indexArr: ['content', 'minwon', 'lec', 'staff', 'menu', 'sns', 'board', 'vod', 'photo', 'total']
		objData += '{"index":"mapo_'+def.indexArr[i]+'"}' + '\n';
		objData += '{"query":{"function_score":{"query":{"bool":{"should":[{"multi_match":{"query":"#query#","fields":';

		// [검색영역] 필터
		//filter = {정렬, 영역, 기간}
		let filterFieldArr = filter[1];
		if ($('#areaTotalFilter').prop('checked', false)) {
			objData += filterFieldArr[i]; // 제목/내용/작성자.
		} else {
			objData += def.areaTotalFilter[i]; // 전체 def.areaTotalFilter
		}

		//objData += ',"default_operator": "AND"}}' ;
		objData += '}}' ;
		
		let wildcardFilter = filter[3];
		if(wildcardFilter[i].length > 0) {
			objData += ',{"wildcard" : {"admin_explain" : {"value" : "#query#", "boost": 100} }}';
		}

		// [검색기간] 필터
		let filterRangeGte = getPastDate();
		let filterRangeLte = getNowDate();
		let filterRangeField = filter[2];
		if (filterRangeField[i] == null || filterRangeField[i] == '' || filterRangeField[i] == undefined) {
			//console.log("------ 날짜 필드 없음");
			objData += ''; // 날짜 필드 없음.
		} else {
			//console.log("------ 날짜 필드 있음");
			//console.log("------ filterRangeField["+i+"] : " + filterRangeField[i]);
			filterRangeGte += 'T00:00:00Z';
			filterRangeLte += 'T23:59:59Z';
			objData += ',{"range":{"' + filterRangeField[i] + '":{"gte":"' + filterRangeGte + '","lte":"' + filterRangeLte + '"}}}';
		}

		// 동영상 또는 이미지 또는 교육강좌 일 때에는 한 페이지당 9건씩, 통합검색은 3건씩, 그외에는 10건씩
		let size = 0;
		if (i == 7 || i == 8 || i == 2) {
			size = 9;
		} else if(i == 9) {
			size = 3;
		} else {
			size = 10;
		}

		if(filterRangeField[i] == null || filterRangeField[i] == '' || filterRangeField[i] == undefined) {
			objData +=  ']}}}},"size":'+size+',"highlight":{"fields":{' + def.highlightArr[i] + '}}';
		} else if(def.indexArr[i] === 'content'){
			objData +=  '],"minimum_should_match": 1}},"gauss":{"'+filterRangeField[i]+'":{"origin":"now","scale":"365d","offset":"1d","decay":0.9}}}},"size":'+size+',"highlight":{"fields":{' + def.highlightArr[i] + '}}';
}
		else {
			objData +=  '],"minimum_should_match": 2}},"gauss":{"'+filterRangeField[i]+'":{"origin":"now","scale":"365d","offset":"1d","decay":0.9}}}},"size":'+size+',"highlight":{"fields":{' + def.highlightArr[i] + '}}';
		}

		// [검색정렬] 필터
		let filterSortArr = filter[0];
		let filterSortOrder = 'desc';

		if (filterSortArr[i] == null || filterSortArr[i] == '' || filterSortArr[i] == undefined || filterSortArr[i] == "undefined") { // 정렬 필드 없음
			if(filterRangeField[i] == null || filterRangeField[i] == '' || filterRangeField[i] == "undefined") {
				objData += ',"sort": [{"_score": {"order": "desc"}}]';
			} else {
				objData += ',"sort": [{"_score": {"order": "desc"}},{"' + filterRangeField[i] + '": {"order": "desc"}}]';
			}
		} else {
			//console.log("2. 정렬 필드 있음");
			// 정렬 필드 존재, 정렬(sort) 지정.
			if ($('input:radio[name="searchSort"]:checked').val() == 'dateSortFilter') { // 최신 날짜순일 때
				objData += ',"sort": [{"' + filterSortArr[i] + '": {"order": "' + filterSortOrder + '"}}]';
			} else if ($('input:radio[name="searchSort"]:checked').val() == 'titleSortFilter') { // 제목순 일 때 .exact 추가
				filterSortOrder = 'asc';

				if (i == 7) { // VOD 일 때, (수집 할 수가 없어서, mapping을 변경할 수 없기 때문에 keyword를 사용)
					objData += ',"sort": [{"' + filterSortArr[i] + '.keyword": {"order": "' + filterSortOrder + '"}}]';
				} else { // 그 외
					objData += ',"sort": [{"' + filterSortArr[i] + '.exact": {"order": "' + filterSortOrder + '"}}]';
				}
			} else { // 정확도순 일 때(default)
				if(i == 2) { //lec일 경우, default 정렬은 최신날짜 기준으로 한다(LT_EDU_EDAY). 21-07-14 추가.  
					objData += ',"sort": [{"' + filterSortArr[i] + '": {"order": "desc"}}, {"_score": {"order": "desc"}}]';
				}else if(i == 3) {
					objData += ',"sort": [{"' + filterSortArr[i] + '": {"order": "asc"}}, {"_score": {"order": "desc"}}]';
				}else {
					objData += ',"sort": [{"_score": {"order": "desc"}},{"' + filterRangeField[i] + '": {"order": "desc"}}]';
				}
			}
		}

		// 동영상 또는 이미지 또는 교육강좌 일 때에는 한 페이지당 9건씩 나와야 함
		if (i == 7 || i == 8 || i == 2) {
			objData += ', "from":' + (cPage - 1) * 9;  // 동영상 / 이미지 / 교육강좌 페이징처리.
		} else {
			objData += ', "from":' + (cPage - 1) * 10; // 그 외 페이징처리.
		}

		objData += '}\n';
	}

	//console.log("=== [[objData]] ===");
	//console.log(objData);
	//console.log("===================");

	// 검색결과 가져오기.
	$.ajax({
		url: url,
		type: 'POST',
		data: {
			requestMethod: 'GET',
			esUrl: esUrl,
			objData: objData,
			uriQuery: uriQuery
		},
		contentType: contentType,
		async: false,
		success: function(data) {
			let result = JSON.parse(data);
// 결과 없음 안내문 초기화
$('#searchResultArea').hide().empty();
$('.no-result').remove(); // 혹시 남아 있는 안내 블록 삭제
			//console.log("==================");
			//console.log("== data : " + JSON.stringify(data,null,2));
			//console.log("==================");
			let commaNumber = '';
			let sumTotalCount = 0;
			let getTotalCnt = 0;
			let limitCnt = 3;
			let getResult = new Array();

console.log("DEBUG :: resultView() 진입");
console.log(result);
			// 검색 개수 출력
			for(var i = 0; i < def.indexArr.length; i++) {
					if(i == 9) {
						getResultCnt.push(sumTotalCount);

						commaNumber = String(sumTotalCount);
						commaNumber = commaNumber.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
					} else {
						if(result == undefined || result.responses[i] == undefined || result.responses[i].hits == undefined || result.responses[i].hits == null || result.responses[i].hits == 0) {
							getTotalCnt = 0;
						} else {
							getTotalCnt = result.responses[i].hits.total;
						}
						commaNumber = String(getTotalCnt);
						commaNumber = commaNumber.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

						sumTotalCount += getTotalCnt;
						getResultCnt.push(getTotalCnt);
					}

					$('.tab' + i).html(def.indexKorArr[i] + '(' + commaNumber + ')');
					$('#'+def.indexArr[i]+'Cnt').html(commaNumber);
			}
			// main page 에 출력 될 query & count ('마포'에 대한 검색결과는 총 xxx건 입니다.)
			commaNumber = String(sumTotalCount);
			commaNumber = commaNumber.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			if( query == "폐기물" ){
				$('#pageQuery').html(query);
				$('#pagelink').remove();
				$('.relate').after("<div class='relate' id='pagelink'><div class='l'><span class='arr'>관련 사이트</span></div><div class='r'><a href='https://www.mapo.go.kr/CmsWeb/bigclean/index.jsp' target='_blank'>https://www.mapo.go.kr/CmsWeb/bigclean/index.jsp</a></div></div>				");
			}else if( query == "대형폐기물" ){
				$('#pageQuery').html(query);
				$('#pagelink').remove();
				$('.relate').after("<div class='relate' id='pagelink'><div class='l'><span class='arr'>관련 사이트</span></div><div class='r'><a href='https://www.mapo.go.kr/CmsWeb/bigclean/index.jsp' target='_blank'>https://www.mapo.go.kr/CmsWeb/bigclean/index.jsp</a></div></div>				");
			}else if( query == "지구단위계획" ){
				$('#pageQuery').html(query );
				$('#pagelink').remove();
				$('.relate').after("<div class='relate' id='pagelink'><div class='l'><span class='arr'>관련 사이트</span></div><div class='r'><a href='https://isystem.mapo.go.kr/view/main.html' target='_blank'>https://isystem.mapo.go.kr/view/main.html</a></div></div>				");
			}else {
				$('#pageQuery').html(query);
				$('#pagelink').remove();
			}
			
			
			$('#pageCnt').html(commaNumber);

			if(menuOpt == 9) { // 통합검색
				for(var i = 0; i < def.indexArr.length-1; i++) {
					getResult = new Array();

					// 결과 arr 담기
					for(j = 0; j < limitCnt; j++) {
						if(result == undefined || result.responses[i] == undefined || result.responses[i].hits == undefined || result.responses[i].hits == null) {
							getResult.push('');
						} else {
							getResult.push(result.responses[i].hits.hits[j]);
						}
					}

					// 화면 출력
					viewAllHidden();
					totalView(query, def.indexArr[i], getResult); // 쿼리 / 인덱스 / 결과Arr
				}
			} else { // index 상세 검색
				if (menuOpt == 7 || menuOpt == 8 || menuOpt == 2) {
					limitCnt = 9;
				} else {
					limitCnt = 10;
				}
				// 결과 arr 담기
				for(j = 0; j < limitCnt; j++) {
					if(result == undefined || result.responses[j] == undefined || result.responses[j].hits == undefined || result.responses[j].hits == null) {
					} else {
						getResult.push(result.responses[menuOpt].hits.hits[j]);
					}
				}

				viewAllHidden();
				switch (menuOpt) {
				case 0: // content
					$('#contentSearch').show();
					$('#content_paging').show();
					contentView(query, getResult);
				break;
				case 1: // minwon
					$('#minwonSearch').show();
					$('#minwon_paging').show();
					minwonView(query, getResult);
				break;
				case 2: // lec
					$('#lecSearch').show();
					$('#lec_paging').show();
					lecView(query, getResult);
				break;
				case 3: // staff
					$('#staffSearch').show();
					$('#staff_paging').show();
					staffView(query, getResult);
				break;
				case 4: // menu
					$('#menuSearch').show();
					$('#menu_paging').show();
					menuView(query, getResult);
				break;
				case 5: // sns
					$('#snsSearch').show();
					$('#sns_paging').show();
					snsView(query, getResult);
				break;
				case 6: // board
					$('#boardSearch').show();
					$('#board_paging').show();
					boardView(query, getResult);
				break;
				case 7: // vod
					$('#vodSearch').show();
					$('#vod_paging').show();
					vodView(query, getResult);
				break;
				case 8: // photo
					$('#photoSearch').show();
					$('#photo_paging').show();
					photoView(query, getResult);
				break;
				}
					if (getResultCnt[menuOpt] === 0 || getResultCnt[menuOpt] == null) {
					  console.log("DEBUG :: notResult 호출 - " + def.indexArr[menuOpt]);
					  notResult(def.indexArr[menuOpt], query);
					  $('#searchResultArea').show(); // 혹시 숨겨져 있을 경우 강제로 표시
					  return;
					}
			}

			// === 검색결과 없을 때 notResult() 호출 ===
			if (getResultCnt[menuOpt] === 0 || getResultCnt[menuOpt] === undefined) {
			  console.log("결과 없음 처리: " + def.indexArr[menuOpt]);
			  notResult(def.indexArr[menuOpt], query);
			  return;
			}

			// 페이징 처리
			pagingTech(cPage, getResultCnt[menuOpt], menuOpt);

			// 쿼리로그에 적재.
			querylogStack(query, def.indexArr[menuOpt], getResultCnt[menuOpt]);

		},
		error: function(err) {
			console.error("err : " + err);
		}
	});
}

function viewAllHidden() {
	$('#themeSearch').hide();$('#menuSearch').hide();$('#staffSearch').hide();$('#boardSearch').hide();$('#contentSearch').hide();
	$('#minwonSearch').hide();$('#photoSearch').hide();$('#vodSearch').hide();$('#lecSearch').hide();$('#snsSearch').hide();
	$('.more').hide();$('#menu_paging').hide();$('#staff_paging').hide();$('#board_paging').hide();$('#content_paging').hide();
	$('#minwon_paging').hide();$('#photo_paging').hide();$('#vod_paging').hide();$('#lec_paging').hide();$('#sns_paging').hide();
}
