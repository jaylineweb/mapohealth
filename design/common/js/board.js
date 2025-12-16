/**
 * 
 * 게시판 글쓰기 유효성 체크
 * 
 * @returns {Boolean}
 */
function validation() {
  var reqs = $(".required");
  var emptyCnt = 0;
  if (reqs.length > 0) {
    $(reqs).each(function(idx) {
      var obj_type = $(reqs[idx]); // 필수 항목의 속성들 체크를 위해서
      var obj_name = $(reqs[idx]).attr("title");
      if ($(obj_type).is("input")) {
        //체크 박스 확인
        /*if ($(obj_type).attr('type') == 'checkbox') {
          if ($(":checkbox[name=" + $(obj_type).attr('name') + "]:checked").length < 1) {
            alert(obj_name + " 항목은(는) 필수 체크 항목입니다.");
            $(reqs[idx]).focus();
            emptyCnt++;
            return false;
          }
        } else*/ 
        if ($(obj_type).attr('type') == 'radio') {
          if (!$("input:radio[name=" + $(obj_type).attr('name') + "]").is(':checked')) {
            alert(obj_name + " 항목은(는) 필수 체크 항목입니다.");
            $(reqs[idx]).focus();
            emptyCnt++;
            return false;
          }
        } else {
          var data = $(obj_type).val().trim();
          var len = data.length;
          if (len < 1) {
            alert(obj_name + " 은(는) 필수 항목입니다.");
            $(reqs[idx]).focus();
            emptyCnt++;
            return false;
          }
        }
      } else if ($(obj_type).is("select")) {
        var s_index = $(this).find('option:selected').index();
        if (s_index == 0) {
          alert(obj_name + " 은(는) 필수 선택 항목입니다.");
          $(reqs[idx]).focus();
          emptyCnt++;
          return false;
        }
      } else {
        var data = $(obj_type).val().trim();
        var len = data.length;
        if (len < 1) {
          alert(obj_name + " 은(는) 필수 항목입니다.");
          $(reqs[idx]).focus();
          emptyCnt++;
          return false;
        }
      }
    });
  }
  if (emptyCnt == 0) {
    return true;
  }
}

/**
 * 
 * 팝업창 띄우기
 * 
 * @returns 팝업창
 */
function openPopup (sURL, width, height) {
  var sWidth, sHeight;
  var sFeatures;
  var oWindow;
  var SP2 = false;
  var POPUP_WIDTH     = 400;
  var POPUP_HEIGHT    = 300;
  var B_MAIN_PAGE     = true;
  var LeftPosition = 0;
  var TopPosition  = 0;
  
  sHeight = POPUP_HEIGHT;
  sWidth  = POPUP_WIDTH;
  sTitle = "PopupWindow";

  try {
    SP2 = (window.navigator.userAgent.indexOf("SV1") != -1);
    if (arguments[1] != null && arguments[1] != "") sWidth = arguments[1] ;
    if (arguments[2] != null && arguments[2] != "") sHeight = arguments[2] ;
    if (arguments[3] != null && arguments[3] != "") sTitle = arguments[3] ;
    if (SP2)     {   // XP SP2 브라우저임..
      sHeight = Number(sHeight)+10;
    }else{  //그외 브라우저
    }
  } catch(e) {}
  
  if(sURL.indexOf("printPopup") > 0) {
    sWidth = 980;
  }
  sFeatures =  "width=" + sWidth + ",height=" + sHeight ;    
  sFeatures += ",left=0,top=0" ;
  LeftPosition = (screen.width)?(screen.width-sWidth)/2:100;
TopPosition  = (screen.height)?(screen.height-sHeight)/2:100;
  if(sURL.indexOf("printPopup") > 0) {
    sFeatures += ",directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=no,toolbar=no, top="+TopPosition+", left="+LeftPosition;
  } else {
    sFeatures += ",directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,toolbar=no";
  }
  
  if(sURL!=null && sURL.length > 0) {
    if(sURL.indexOf("?") > 0) {
      sURL += "&thref="+location.href;
    } else {
      sURL += "?thref="+location.href;
    }
  }
  oWindow = window.open(sURL, sTitle, sFeatures);
  oWindow.focus();

  // move to screen center
 // oWindow.moveTo( (window.screen.availWidth - sWidth) / 2, (window.screen.availHeight - sHeight) / 2);

  return oWindow;  
}