//XTVID 쿠키 존재여부를 확인하여 없을 경우 쿠키를 생성한다.
var vid = 'XTVID';
var sid = 'XTSID';
var lid = 'XTLID';

//XTVID쿠키 확인
function makeXTVIDCookie() {
	if (!existCookie(vid)) {
		setXTVIDCookie(vid);
	}
}

//XTSID쿠키 확인
function makeSESSIONIDCookie() {
	var xtsidExpire = 30;
	var xtrTodayDate = new Date();
	xtrTodayDate.setMinutes(xtrTodayDate.getMinutes() + xtsidExpire);
	var expiresInfo = xtrTodayDate.toUTCString();
	if (!existCookie(sid)) {
		var randomid = Math.floor(Math.random() * 1000);
		var xtsid = "A" + makeXTVIDValue() + randomid;
		document.cookie = sid + "=" + xtsid + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	} else {
		document.cookie = sid + "=" + getXTCookie(sid) + ";" + "path=/;domain=" + getXDomain() + ";expires=" + expiresInfo;
	}

}

//XTSID쿠키 확인
function makeXTLIDCookie(value) {
	if (!existCookie(lid)) {
		setXTLIDCookie(lid, value);
	}

}

//쿠키가 존재하는지 확인한다.
function existCookie(name) {
	var vid = getXTCookie(name);
	if (vid != null && vid != "") {
		return true;
	}
	return false;
}

//주어진 이름의 쿠키값을 얻는다.
function getXTCookie(name) {
	var cookies = document.cookie.split("; ");
	for ( var i = 0; i < cookies.length; i++) {
		var cPos = cookies[i].indexOf("=");
		var cName = cookies[i].substring(0, cPos);
		if (cName == name) {
			return unescape(cookies[i].substring(cPos + 1));
		}
	}
	// a cookie with the requested name does not exist
	return "";
}

//XTVID 쿠키를 생성한다.
function setXTVIDCookie(name) {
	// 3자리 난수 발생
	var randomid = Math.floor(Math.random() * 1000);

	// XTVID =  웹서버 식별문자 (A...Z ) 한자리  + yymmdd (쿠키생성일자)  + hhmmss (쿠키생성시각)  
	//       +  MMM (쿠키 생성시각 1/1000 초) + RRR (난수)
	var xtvid = "A" + makeXTVIDValue() + randomid;
	//var xtvid = makeXTVIDValue() + randomid;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);

	setXTCookie(name, xtvid, 365 * 10, "/", getXDomain());
}

//XTSID 쿠키를 생성한다.
function setXTSIDCookie(name) {
	// 3자리 난수 발생
	var randomid = Math.floor(Math.random() * 1000);

	// XTVID =  웹서버 식별문자 (A...Z ) 한자리  + yymmdd (쿠키생성일자)  + hhmmss (쿠키생성시각)  
	//       +  MMM (쿠키 생성시각 1/1000 초) + RRR (난수)
	var xtvid = "A" + makeXTVIDValue() + randomid;
	//var xtvid = makeXTVIDValue() + randomid;
	expireDate = new Date();
	expireDate.setYear(expireDate.getYear() + 10);

	setXTCookie(name, xtvid, -1, "/", getXDomain());
}

//XTLID 쿠키를 생성한다.
function setXTLIDCookie(name, value) {
	setXTCookie(name, value, -1, "/", getXDomain());
}

//XTLID 쿠키를 삭제한다.
function removeXTCookie(name) {
	setXTCookie(name, "", 0, "/", getXDomain());
}

//주어진 조건으로 쿠키를 생성한다.
function setXTCookie(name, value, expires, path, domain) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expires);
	var expiresInfo = (expires < 0) ? '' : todayDate.toGMTString();
	document.cookie = name + "=" + escape(value) + ";" + "path=" + path
			+ ";domain=" + domain + ";expires=" + expiresInfo;
}

//쿠키생성을 위한 도메인을 얻는다.
function getXDomain() {
	var host = document.domain;
	var tokens = host.split('.');
	var xdomain = tokens[tokens.length - 2] + '.' + tokens[tokens.length - 1];
	return (tokens[tokens.length - 1].length == 2) ? tokens[tokens.length - 3]
			+ '.' + xdomain : xdomain;
}

//XTVID 값을 생성한다.
function makeXTVIDValue() {
	var str = '';
	nowdate = new Date();
	digit = nowdate.getFullYear();
	if (digit < 2000) {
		digit = digit - 1900;
	} else {
		digit = digit - 2000;
	}
	str += paddingNo(digit);

	digit = nowdate.getMonth() + 1;
	str += paddingNo(digit);

	digit = nowdate.getDate();
	str += paddingNo(digit);

	digit = nowdate.getHours();
	str += paddingNo(digit);

	digit = nowdate.getMinutes();
	str += paddingNo(digit);

	digit = nowdate.getSeconds();
	str += paddingNo(digit);

	digit = nowdate.getMilliseconds();
	if ((digit <= 99) && (digit > 9)) {
		str += '0' + digit;
	} else if (digit <= 9) {
		str += '00' + digit;
	} else {
		str += '' + digit;
	}
	return str;
}

//10보다 작은 숫자에 '0'을 채워 리턴한다.
function paddingNo(val) {
	var st = '';
	if (val <= 9) {
		st += '0' + val;
	} else {
		st = '' + val;
	}
	return st;
}

//XTVID 쿠키생성 호출
makeXTVIDCookie();

try {
	var pcX = screen.width;
	var pcY = screen.height;
	var xloc = pcX+"X";
	xloc += pcY;
	setXTCookie("xloc", xloc, 365 * 10, "/", getXDomain());
} catch (e) {
}
