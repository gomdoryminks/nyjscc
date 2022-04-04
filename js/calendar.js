/**
 * @author minks
 */

var today = null;
var year = null;
var month = null;
var firstDay = null;
var lastDay = null;
var $tdDay = null;
var $tdSche = null;
var dayCount = null;
var jsonData = null;
var holidayJsonData = null;

var today2 = null;
var year2 = null;
var month2 = null;
var day2 = null;
var jsonData2 = null;

var today3 = null;
var year3 = null;
var month3 = null;
var jsonData3 = null;

$(function() {
    //달력 초기화
	initDate();
    drawCalendar();
    drawDays();
    drawSche();
    
    //이벤트 초기화
    initDate2();
    drawEvent();
    drawDays2();
    drawSche2();
    
    //부모 이벤트 초기화
    initDate3();
    drawParentEvent();
    drawDays3();
    drawSche3();
    
    $("#movePrevMonth").on("click", function() {
        movePrevMonth();
    });
    
    $("#moveNextMonth").on("click", function() {
        moveNextMonth();
    });
    
    $("#movePrevDay").on("click", function() {
        movePrevDay();
    });
    
    $("#moveNextDay").on("click", function() {
        moveNextDay();
    });
    
    $("#movePrevMonth2").on("click", function() {
        movePrevMonth2();
    });
    
    $("#moveNextMonth2").on("click", function() {
        moveNextMonth2();
    });
});

//날짜 초기화
function initDate() {
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
    
    if (month < 10) {
        month = "0" + month;
    }
    
    firstDay = new Date(year, month-1, 1);
    lastDay = new Date(year, month, 0);
}

function initDate2() {
    today2 = new Date();
    year2 = today2.getFullYear();
    month2 = today2.getMonth() + 1;
    day2 = today2.getDate();
    
    if (month2 < 10) {
        month2 = "0" + month2;
    }
    
    if (day2 < 10) {
        day2 = "0" + day2;
    }
}

function initDate3() {
    today3 = new Date();
    year3 = today3.getFullYear();
    month3 = today3.getMonth() + 1;
    
    if (month3 < 10) {
        month3 = "0" + month3;
    }
}

//달력 그리기
function drawCalendar() {
    var setTableHTML = "";
    var win_width = window.innerWidth;
    
    setTableHTML += '<table class="calendar_table">';
    
    if (($(".main_board_area .board_calendar").length > 0) || (win_width < 1081)) {
        setTableHTML += '<tr><th class="red">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>';
    } else {
        setTableHTML += '<tr><th class="red">일요일</th><th>월요일</th><th>화요일</th><th>수요일</th><th>목요일</th><th>금요일</th><th>토요일</th></tr>';
    }
    
    var tdCnt = firstDay.getDay() + lastDay.getDate();
    var trCnt = Math.ceil(tdCnt / 7);
    
    for (var i=0; i<trCnt; i++) {
        setTableHTML += '<tr>';
        
        for (var j=0; j<7; j++) {
            setTableHTML += '<td>';
            setTableHTML += '    <div class="calendar_day"></div>';
            setTableHTML += '    <div class="calendar_schedule"></div>';
            setTableHTML += '</td>';
        }
        
        setTableHTML += '</tr>';
    }
    
    setTableHTML += '</table>';
    
    $("#calendar_tab").html(setTableHTML);
}

//이벤트 그리기
function drawEvent() {
    var setListHTML = "";
    
    setListHTML += '<ul class="event_list cf">';    
    setListHTML += '</ul>';
    
    $("#event_tab").html(setListHTML);
}

//부모 이벤트 그리기
function drawParentEvent() {
    var setListHTML = "";
    
    setListHTML += '<ul class="event_list cf">';    
    setListHTML += '</ul>';
    
    $("#parent_event_tab").html(setListHTML);
}
    
//달력 날짜표시
function drawDays() {
    $("#calendar_top_year").text(year);
    $("#calendar_top_month").text(month);
    $tdDay = $("td div.calendar_day");
    $tdSche = $("td div.calendar_schedule");
    dayCount = 0;
    
    if ((year == today.getFullYear()) && (month == today.getMonth() + 1)) {
    	for (var i=firstDay.getDay(); i<firstDay.getDay()+lastDay.getDate(); i++) {
	        $tdDay.eq(i).text(++dayCount);
	        
	        if (dayCount == today.getDate()) {
	        	$("#calendar_tab tr td").removeClass("today");
    			$("#calendar_tab tr td").eq(i).addClass("today");
    		}
	    }
    } else {
    	for (var i=firstDay.getDay(); i<firstDay.getDay()+lastDay.getDate(); i++) {
	        $tdDay.eq(i).text(++dayCount);
	    }
    }
    
    for (var i=0; i<42; i+=7) {
        $tdDay.eq(i).css("color", "#f03131");
    }
}

//이벤트 날짜표시
function drawDays2() {
    $("#event_top_year").text(year2);
    $("#event_top_month").text(month2);
    $("#event_top_day").text(day2);
}

//부모 이벤트 날짜표시
function drawDays3() {
    $("#event_top_year").text(year3);
    $("#event_top_month").text(month3);
}
    
//달력 이전달 이동
function movePrevMonth() {
    month--;
    
    if (month <= 0) {
        month = 12;
        year--;
    }
    
    if (month < 10) {
        month = String("0" + month);
    }
    
    getNewInfo();
}

//이벤트 이전일 이동
function movePrevDay() {
    today2.setDate(today2.getDate() - 1);
    year2 = today2.getFullYear();
    month2 = today2.getMonth() + 1;
    day2 = today2.getDate();
    
    if (month2 < 10) {
        month2 = "0" + month2;
    }
    
    if (day2 < 10) {
        day2 = "0" + day2;
    }
    
    getNewInfo2();
}

//부모 이벤트 이전달 이동
function movePrevMonth2() {
    month3--;
    
    if (month3 <= 0) {
        month3 = 12;
        year3--;
    }
    
    if (month3 < 10) {
        month3 = String("0" + month3);
    }
    
    getNewInfo3();
}

//달력 다음달 이동
function moveNextMonth() {
    month++;
    
    if (month > 12) {
        month = 1;
        year++;
    }
    
    if (month < 10) {
        month = String("0" + month);
    }
    
    getNewInfo();
}

//이벤트 다음일 이동
function moveNextDay() {
    today2.setDate(today2.getDate() + 1);
    year2 = today2.getFullYear();
    month2 = today2.getMonth() + 1;
    day2 = today2.getDate();
    
    if (month2 < 10) {
        month2 = "0" + month2;
    }
    
    if (day2 < 10) {
        day2 = "0" + day2;
    }
    
    getNewInfo2();
}

//부모 이벤트 다음달 이동
function moveNextMonth2() {
    month3++;
    
    if (month3 > 12) {
        month3 = 1;
        year3++;
    }
    
    if (month3 < 10) {
        month3 = String("0" + month3);
    }
    
    getNewInfo3();
}
    
//정보 갱신
function getNewInfo() {
    for (var i=0; i<42; i++) {
        $tdDay.eq(i).text("");
        $tdSche.eq(i).text("");
    }
    
    dayCount = 0;
    firstDay = new Date(year,month-1, 1);
    lastDay = new Date(year,month, 0);
    
    drawCalendar();
    drawDays();
    drawSche();
}

function getNewInfo2() {    
    drawEvent();
    drawDays2();
    drawSche2();
}

function getNewInfo3() {    
    drawParentEvent();
    drawDays3();
    drawSche3();
}
    
//스케줄 데이터 (ajax 호출)
function setScheData() {
	jsonData = {};
    holidayJsonData = {};
	
    if ($(".main_board_area .board_calendar").length > 0) {
        jsonData = 
	    {
            /*
                메인 > 교육신청
                
                <ul class='calendar_tit_list cf'>
                    <li></li>
                </ul>        
            */
	        "2020":{
	            "04":{
	                "2":"<ul class='calendar_tit_list cf'><li></li></ul>",
	                "6":"<ul class='calendar_tit_list cf'><li></li></ul>",
                    "7":"<ul class='calendar_tit_list cf'><li></li></ul>"
	            }
	        }
	    };
    } else if ($(".interview_area").length > 0) {
	    jsonData = 
	    {
            /*
                보육교직원 상담 > 대면 상담
                
                <div class='calendar_time_area'>
                    <p class='tit_item'></p>
                    <div class='calendar_con_popup'>
                        <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                        <div class='con_popup_body'>
                            <ul class='calendar_time_list cf'>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='1' id='calendar_radio1_1' checked>
                                        <label for='calendar_radio1_1'>09:00 ~ 09:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='2' id='calendar_radio1_2'>
                                        <label for='calendar_radio1_2'>10:00 ~ 10:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='3' id='calendar_radio1_3'>
                                        <label for='calendar_radio1_3'>11:00 ~ 11:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='4' id='calendar_radio1_4'>
                                        <label for='calendar_radio1_4'>13:00 ~ 13:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='5' id='calendar_radio1_5'>
                                        <label for='calendar_radio1_5'>14:00 ~ 14:50</label>
                                    </div>
                                </li>
                            </ul>
                            <div class='calendar_btn_area'>
                                <a href='javascript:void(0);' class='calendar_btn blue_btn'>예약완료</a>
                            </div>
                        </div>
                    </div>
                </div>      
            */
	        "2020":{
	            "04":{
                    "14":"<div class='calendar_time_area'><p class='tit_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='1' id='calendar_radio1_1' checked><label for='calendar_radio1_1'>09:00 ~ 09:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='2' id='calendar_radio1_2'><label for='calendar_radio1_2'>10:00 ~ 10:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='3' id='calendar_radio1_3'><label for='calendar_radio1_3'>11:00 ~ 11:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='4' id='calendar_radio1_4'><label for='calendar_radio1_4'>13:00 ~ 13:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='5' id='calendar_radio1_5'><label for='calendar_radio1_5'>14:00 ~ 14:50</label></div></li></ul><div class='calendar_btn_area'><a href='javascript:void(0);' class='calendar_btn blue_btn'>예약완료</a></div></div></div></div>",
	                "16":"<div class='calendar_time_area'><p class='tit_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='1' id='calendar_radio2_1'><label for='calendar_radio2_1'>09:00 ~ 09:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='2' id='calendar_radio2_2'><label for='calendar_radio2_2'>10:00 ~ 10:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='3' id='calendar_radio2_3'><label for='calendar_radio2_3'>11:00 ~ 11:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='4' id='calendar_radio2_4'><label for='calendar_radio2_4'>13:00 ~ 13:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='5' id='calendar_radio2_5'><label for='calendar_radio2_5'>14:00 ~ 14:50</label></div></li></ul><div class='calendar_btn_area'><a href='javascript:void(0);' class='calendar_btn red_btn'>예약하기</a></div></div></div></div>"
	            }
	        }
	    };
    } else if ($(".event_application_area").length > 0) {
    	jsonData = 
	    {
            /*
                교육/행사신청 > 교육/행사신청 > 교육/행사 신청
                
                <ul class='calendar_tit_list cf'>
                    <li>
                        <p class='tit_item orange_item'>
                            어린이 놀이시설 안전교육 <span class='cnt'>(12/12명)</span>
                        </p>
                        <div class='calendar_con_popup'>
                            <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                            <div class='con_popup_body'>
                                <div class='tit'>
                                    <a href='javascript:void(0);' onclick=\"openLayer('event_application_layer');\">8차 응급처치 및 심폐소생술(CPR)교육</a>
                                </div>
                                <div class='con'>
                                    <p class='text_indent'>
                                        - 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 인원 <span>신청:12명 / 정원:12명</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 장소 <span>놀이터</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 강사 <span>강사 선생님</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            */
	        "2020":{
	            "04":{
	                "1":"<ul class='calendar_tit_list cf'><li><p class='tit_item orange_item'>어린이 놀이시설 안전교육 <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('event_application_layer');\">8차 응급처치 및 심폐소생술(CPR)교육</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>",
	                "9":"<ul class='calendar_tit_list cf'><li><p class='tit_item green_item'>G-응급처치 및 심폐소생술... <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('event_application_layer');\">8차 응급처치 및 심폐소생술(CPR)교육</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>",
	                "14":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'>전문가와 알아보는 긍정양육... <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('event_application_layer');\">8차 응급처치 및 심폐소생술(CPR)교육</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>",
	                "22":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'>8차 응급처치 및 심폐소생술 <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('event_application_layer');\">8차 응급처치 및 심폐소생술(CPR)교육</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>"
	            }
	        }
	    };
    } else if ($(".support_application_area").length > 0) {
    	jsonData = 
	    {
            /*
                교육/행사신청 > 어린이집영유아지원 > 교육/행사 신청
                
                <ul class='calendar_tit_list cf'>
                    <li>
                        <p class='tit_item blue_item'>
                            <span class='black'>[놀이프로그램]</span><br>
                            노리야 놀자 프로그램 <span class='cnt'>(12/12명)</span>
                        </p>
                        <div class='calendar_con_popup'>
                            <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                            <div class='con_popup_body'>
                                <div class='tit'>
                                    <a href='javascript:void(0);' onclick=\"openLayer('support_application_layer');\">[놀이프로그램] 노리야 놀자 프로그램</a>
                                </div>
                                <div class='con'>
                                    <p class='text_indent'>
                                        - 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 인원 <span>신청:12명 / 정원:12명</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 장소 <span>놀이터</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 강사 <span>강사 선생님</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <p class='tit_item orange_item'>
                            <span class='black'>[부모교육행사]</span><br>
                            기쁨 두배 슬픔 반 (유아)<span class='cnt'>(12/12명)</span>
                        </p>
                        <div class='calendar_con_popup'>
                            <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                            <div class='con_popup_body'>
                                <div class='tit'>
                                    <a href='javascript:void(0);' onclick=\"openLayer('support_application_layer');\">[부모교육행사] 기쁨 두배 슬픔 반 (유아)</a>
                                </div>
                                <div class='con'>
                                    <p class='text_indent'>
                                        - 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 인원 <span>신청:12명 / 정원:12명</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 장소 <span>놀이터</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 강사 <span>강사 선생님</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            */
	        "2020":{
	            "04":{
	                "1":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'><span class='black'>[놀이프로그램]</span><br>노리야 놀자 프로그램 <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('support_application_layer');\">[놀이프로그램] 노리야 놀자 프로그램</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li><li><p class='tit_item orange_item'><span class='black'>[부모교육행사]</span><br>기쁨 두배 슬픔 반 (유아)<span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('support_application_layer');\">[부모교육행사] 기쁨 두배 슬픔 반 (유아)</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>",
	                "2":"<ul class='calendar_tit_list cf'><li><p class='tit_item green_item'><span class='black'>[부모교육행사]</span><br>기쁨 두배 슬픔 반 (유아) <span class='cnt'>(12/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('support_application_layer');\">[부모교육행사] 기쁨 두배 슬픔 반 (유아)</a></div><div class='con'><p class='text_indent'>- 시간 <span>YYYY.MM.DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>신청:12명 / 정원:12명</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p><p class='text_indent'>- 강사 <span>강사 선생님</span></p></div></div></div></li></ul>"
	            }
	        }
	    };
    } else if ($(".library_view_area").length > 0) {
    	jsonData = 
	    {
            /*
                어린이집 지원사업 > 기관 장난감도서관 대여 > 대여용품 (상세페이지)
                
                <ul class='calendar_tit_list cf'>
                    <li>
                        <p class='tit_item gray_item'>NTE00000033-191107-01</p>
                    </li>
                    <li>
                        <p class='tit_item gray_item'>NTE00000033-191107-01</p>
                    </li>
                </ul>
            */
	        "2020":{
	            "04":{
	                "1":"<ul class='calendar_tit_list cf'><li><p class='tit_item gray_item'>NTE00000033-191107-01</p></li><li><p class='tit_item gray_item'>NTE00000033-191107-01</p></li></ul>",
	                "2":"<ul class='calendar_tit_list cf'><li><p class='tit_item gray_item'>NTE00000033-191107-01</p></li><li><p class='tit_item gray_item'>NTE00000033-191107-01</p></li></ul>",
	                "8":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'>NTE00000033-191107-01</p></li><li><p class='tit_item green_item'>NTE00000033-191107-02</p></li></ul>",
	                "9":"<ul class='calendar_tit_list cf'><li><p class='tit_item orange_item'>NTE00000033-191107-01</p></li><li><p class='tit_item purple_item'>NTE00000033-191107-02</p></li></ul>",
	                "10":"<ul class='calendar_tit_list cf'><li><p class='tit_item pink_item'>NTE00000033-191107-01</p></li><li><p class='tit_item red_item'>NTE00000033-191107-02</p></li></ul>"
	            }
	        }
	    };
    } else if ($(".parent_event_application_area").length > 0) {
    	jsonData = 
	    {
            /*
                교육/행사신청 > 부모교육/행사
                
                <ul class='calendar_tit_list cf'>
                    <li>
                        <p class='tit_item blue_item'>
                            [부모교육행사] 탈무드 아카데미 '엄마학교' 10월 플라워클래스 <span class='cnt'>(100/12명)</span>
                        </p>
                        <div class='calendar_con_popup'>
                            <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                            <div class='con_popup_body'>
                                <div class='tit'>
                                    <a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a>
                                </div>
                                <div class='con'>
                                    <p class='text_indent'>
                                        - 교육일시 <span>2019.09.05</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 인원 <span>정원:100명 / 신청 : 12</span>
                                    </p>
                                    <p class='text_indent'>
                                        - 장소 <span>놀이터</span>
                                    </p>
                                </div>
                                <ul class='link'>
                                    <li>
                                        <a href='#'>상세보기</a>
                                    </li>
                                    <li>
                                        <a href='#'>참가자명단</a>
                                    </li>
                                    <li>
                                        <a href='#'>입금관리</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            */
	        "2020":{
	            "04":{
	                "7":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'>[부모교육행사] 탈무드 아카데미 '엄마학교' 10월 플라워클래스 <span class='cnt'>(100/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a></div><div class='con'><p class='text_indent'>- 교육일시 <span>2019.09.05</span></p><p class='text_indent'>- 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>정원:100명 / 신청 : 12</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p></div><ul class='link'><li><a href='#'>상세보기</a></li><li><a href='#'>참가자명단</a></li><li><a href='#'>입금관리</a></li></ul></div></div></li></ul>",
	                "8":"<ul class='calendar_tit_list cf'><li><p class='tit_item orange_item'>[부모교육행사] 기쁨 두배 슬픔 반(유아) <span class='cnt'>(100/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a></div><div class='con'><p class='text_indent'>- 교육일시 <span>2019.09.05</span></p><p class='text_indent'>- 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>정원:100명 / 신청 : 12</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p></div><ul class='link'><li><a href='#'>상세보기</a></li><li><a href='#'>참가자명단</a></li><li><a href='#'>입금관리</a></li></ul></div></div></li></ul>",
	                "10":"<ul class='calendar_tit_list cf'><li><p class='tit_item gray_item'>[부모교육행사] 탈무드 아카데미 '엄마학교' 10월 플라워클래스 <span class='cnt'>(100/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a></div><div class='con'><p class='text_indent'>- 교육일시 <span>2019.09.05</span></p><p class='text_indent'>- 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>정원:100명 / 신청 : 12</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p></div><ul class='link'><li><a href='#'>상세보기</a></li><li><a href='#'>참가자명단</a></li><li><a href='#'>입금관리</a></li></ul></div></div></li></ul>",
	                "16":"<ul class='calendar_tit_list cf'><li><p class='tit_item green_item'>[부모교육행사] 탈무드 아카데미 '엄마학교' 10월 플라워클래스 <span class='cnt'>(100/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a></div><div class='con'><p class='text_indent'>- 교육일시 <span>2019.09.05</span></p><p class='text_indent'>- 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>정원:100명 / 신청 : 12</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p></div><ul class='link'><li><a href='#'>상세보기</a></li><li><a href='#'>참가자명단</a></li><li><a href='#'>입금관리</a></li></ul></div></div></li></ul>",
                    "29":"<ul class='calendar_tit_list cf'><li><p class='tit_item blue_item'>[부모교육행사] 탈무드 아카데미 '엄마학교' 10월 플라워클래스 <span class='cnt'>(100/12명)</span></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><div class='tit'><a href='javascript:void(0);' onclick=\"openLayer('parent_event_application_layer');\">[부모교육행사탈무드 아카데미 '엄마학교' 10월 플라워클래스</a></div><div class='con'><p class='text_indent'>- 교육일시 <span>2019.09.05</span></p><p class='text_indent'>- 접수기간 <span>YYYY.MM DD HH:MM~HH:MM</span></p><p class='text_indent'>- 인원 <span>정원:100명 / 신청 : 12</span></p><p class='text_indent'>- 장소 <span>놀이터</span></p></div><ul class='link'><li><a href='#'>상세보기</a></li><li><a href='#'>참가자명단</a></li><li><a href='#'>입금관리</a></li></ul></div></div></li></ul>"
	            }
	        }
	    };
    } else if (($(".play_therapy_area").length > 0) || ($(".speech_therapy_area").length > 0)) {
	    jsonData = 
	    {
            /*
                상담 > 놀이치료·부모상담, 언어치료
                
                <div class='calendar_time_area'>
                    <p class='tit_item'></p>
                    <div class='calendar_con_popup'>
                        <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                        <div class='con_popup_body'>
                            <ul class='calendar_time_list cf'>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='1' id='calendar_radio1_1' checked>
                                        <label for='calendar_radio1_1'>09:00 ~ 09:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='2' id='calendar_radio1_2'>
                                        <label for='calendar_radio1_2'>10:00 ~ 10:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='3' id='calendar_radio1_3'>
                                        <label for='calendar_radio1_3'>11:00 ~ 11:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='4' id='calendar_radio1_4'>
                                        <label for='calendar_radio1_4'>13:00 ~ 13:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='5' id='calendar_radio1_5'>
                                        <label for='calendar_radio1_5'>14:00 ~ 14:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='6' id='calendar_radio1_6'>
                                        <label for='calendar_radio1_6'>15:00 ~ 15:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='7' id='calendar_radio1_7'>
                                        <label for='calendar_radio1_7'>16:00 ~ 16:50</label>
                                    </div>
                                </li>
                                <li>
                                    <div class='content_radio_area'>
                                        <input type='radio' name='calendar_radio1' value='8' id='calendar_radio1_8'>
                                        <label for='calendar_radio1_8'>17:00 ~ 17:50</label>
                                    </div>
                                </li>
                            </ul>
                            <div class='calendar_btn_area'>
                                <a href='javascript:void(0);' class='calendar_btn blue_btn'>예약완료</a>
                            </div>
                        </div>
                    </div>
                </div>
            */
	        "2020":{
	            "04":{
                    "8":"<div class='calendar_time_area'><p class='tit_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='1' id='calendar_radio1_1' checked><label for='calendar_radio1_1'>09:00 ~ 09:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='2' id='calendar_radio1_2'><label for='calendar_radio1_2'>10:00 ~ 10:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='3' id='calendar_radio1_3'><label for='calendar_radio1_3'>11:00 ~ 11:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='4' id='calendar_radio1_4'><label for='calendar_radio1_4'>13:00 ~ 13:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='5' id='calendar_radio1_5'><label for='calendar_radio1_5'>14:00 ~ 14:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='6' id='calendar_radio1_6'><label for='calendar_radio1_6'>15:00 ~ 15:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='7' id='calendar_radio1_7'><label for='calendar_radio1_7'>16:00 ~ 16:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='8' id='calendar_radio1_8'><label for='calendar_radio1_8'>17:00 ~ 17:50</label></div></li></ul><div class='calendar_btn_area'><a href='javascript:void(0);' class='calendar_btn blue_btn'>예약완료</a></div></div></div></div>",
	                "10":"<div class='calendar_time_area'><p class='tit_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='1' id='calendar_radio2_1'><label for='calendar_radio2_1'>09:00 ~ 09:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='2' id='calendar_radio2_2'><label for='calendar_radio2_2'>10:00 ~ 10:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='3' id='calendar_radio2_3'><label for='calendar_radio2_3'>11:00 ~ 11:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='4' id='calendar_radio2_4'><label for='calendar_radio2_4'>13:00 ~ 13:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='5' id='calendar_radio2_5'><label for='calendar_radio2_5'>14:00 ~ 14:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='6' id='calendar_radio2_6'><label for='calendar_radio2_6'>15:00 ~ 15:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='7' id='calendar_radio2_7'><label for='calendar_radio2_7'>16:00 ~ 16:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio2' value='8' id='calendar_radio2_8'><label for='calendar_radio2_8'>17:00 ~ 17:50</label></div></li></ul><div class='calendar_btn_area'><a href='javascript:void(0);' class='calendar_btn red_btn'>예약하기</a></div></div></div></div>",
                    "11":"<div class='calendar_time_area'><p class='tit_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><div class='content_radio_area'><input type='radio' name='calendar_radio3' value='1' id='calendar_radio3_1'><label for='calendar_radio3_1'>09:00 ~ 09:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio3' value='2' id='calendar_radio3_2'><label for='calendar_radio3_2'>10:00 ~ 10:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio3' value='3' id='calendar_radio3_3'><label for='calendar_radio3_3'>11:00 ~ 11:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio3' value='4' id='calendar_radio3_4'><label for='calendar_radio3_4'>13:00 ~ 13:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio3' value='5' id='calendar_radio3_5'><label for='calendar_radio3_5'>14:00 ~ 14:50</label></div></li><li><div class='content_radio_area'><input type='radio' name='calendar_radio1' value='6' id='calendar_radio1_6'><label for='calendar_radio1_6'>15:00 ~ 15:50</label></div></li></ul></div></div></div>"
	            }
	        }
	    };
    } else if ($(".ha_playground_organization_area").length > 0) {
	    jsonData = 
	    {
            /*
                육아 지원사업 > 놀이터 > 호평아이맘놀이터 (기관신청)
                
                <div class='calendar_time_area'>
                    <p class='tit_item orange_item'></p>
                    <div class='calendar_con_popup'>
                        <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                        <div class='con_popup_body'>
                            <ul class='calendar_time_list cf'>
                                <li>
                                    <a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)
                                </li>
                                <li>
                                    <a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)
                                </li>
                                <li>
                                    <a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>      
            */
	        "2020":{
	            "04":{
                    "14":"<div class='calendar_time_area'><p class='tit_item orange_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
	                "16":"<div class='calendar_time_area'><p class='tit_item green_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
                    "17":"<div class='calendar_time_area'><p class='tit_item blue_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
	                "21":"<div class='calendar_time_area'><p class='tit_item blue_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
                    "23":"<div class='calendar_time_area'><p class='tit_item orange_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_organization2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_organization2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>"
	            }
	        }
	    };
    } else if ($(".ha_playground_individual_area").length > 0) {
	    jsonData = 
	    {
            /*
                육아 지원사업 > 놀이터 > 호평아이맘놀이터 (개인신청)
                
                <div class='calendar_time_area'>
                    <p class='tit_item orange_item'></p>
                    <div class='calendar_con_popup'>
                        <img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'>
                        <div class='con_popup_body'>
                            <ul class='calendar_time_list cf'>
                                <li>
                                    <a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)
                                </li>
                                <li>
                                    <a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)
                                </li>
                                <li>
                                    <a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>      
            */
	        "2020":{
	            "04":{
                    "14":"<div class='calendar_time_area'><p class='tit_item orange_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
	                "16":"<div class='calendar_time_area'><p class='tit_item green_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
                    "17":"<div class='calendar_time_area'><p class='tit_item blue_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
	                "21":"<div class='calendar_time_area'><p class='tit_item blue_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>",
                    "23":"<div class='calendar_time_area'><p class='tit_item orange_item'></p><div class='calendar_con_popup'><img src='../img/calendar_tooltip_head.png' alt='calendar_tooltip_head' class='con_popup_head'><div class='con_popup_body'><ul class='calendar_time_list cf'><li><a href='../support/ha_playground_individual2_fc.html'>1회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>2회</a> (0/25)</li><li><a href='../support/ha_playground_individual2_fc.html'>3회</a> (0/25)</li></ul></div></div></div>"
	            }
	        }
	    };
    }
    
    holidayJsonData = {
        /*
            공휴일 설정 (매년 공휴일인 경우 년도를 0000으로 설정)
            
            <p>신정</p>
        */
        "0000":{
            "01":{
                "1":"<p>신정</p>"
            },
            "03":{
                "1":"<p>삼일절</p>"
            },
            "04":{
                "30":"<p>부처님오신날</p>"
            },
            "05":{
                "5":"<p>어린이날</p>"
            },
            "06":{
                "6":"<p>현충일</p>"
            },
            "08":{
                "15":"<p>광복절</p>"
            },
            "10":{
                "3":"<p>개천절</p>",
                "9":"<p>한글날</p>"
            },
            "12":{
                "25":"<p>크리스마스</p>"
            }
        },
        "2020":{
            "04":{
                "6":"<p>휴관</p>",
                "13":"<p>휴관</p>",
                "20":"<p>휴관</p>"
            }
        }
    };
}

function setScheData2() {
	jsonData2 = {};
	
    jsonData2 = 
    {
        /*
            메인 > 교육/행사
            
            <li>
                <p class='tit'>
                    <a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a>
                </p>
                <p class='time'>시간 : 11:00 ~ 11:50</p>
                <p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p>
            </li>
        */
        "2020":{
            "04":{
                "10":"<li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li>",
                "15":"<li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li><li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li>",
                "25":"<li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li><li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li><li><p class='tit'><a href='#'>행사명 : (영아)영유아 안전교육뮤지컬 '첫째도 안전, 둘째도 안전'</a></p><p class='time'>시간 : 11:00 ~ 11:50</p><p class='place'>장소 : 진접푸른숲도서관 3층 푸른숲 공연장</p></li>"
            }
        }
    };
}

function setScheData3() {
	jsonData3 = {};
	
    jsonData3 = 
    {
        /*
            메인 > 부모교육/행사
            
            <li>
                <p class='date'>04.20</p>
                <p class='tit'>
                    <a href='#'>[클로버부모-자녀체험 프로그램] 하늘무지개(영아)</a>
                </p>
            </li>
        */
        "2020":{
            "04":{
                "20":"<li><p class='date'>04.20</p><p class='tit'><a href='#'>[클로버부모-자녀체험 프로그램] 하늘무지개(영아)</a></p></li>",
                "14":"<li><p class='date'>04.14</p><p class='tit'><a href='#'>[클로버부모-자녀체험 프로그램]기쁨 두배 슬픔 반(유아)</a></p></li>",
                "01":"<li><p class='date'>04.01</p><p class='tit'><a href='#'>[클로버부모-자녀체험 프로그램]기쁨 두배 슬픔 반(유아)</a></p></li><li><p class='date'>04.01</p><p class='tit'><a href='#'>[클로버부모-자녀체험 프로그램]기쁨 두배 슬픔 반(유아)</a></p></li>"
            }
        }
    };
}
    
//스케줄 그리기
function drawSche() {
    setScheData();
    
    var dateMatch = null;
    
    for (var i=1; i<=lastDay.getDate(); i++) {
        var holidayScheduleHtml = "";
        holidayScheduleHtml = holidayJsonData["0000"];
        
        if (holidayScheduleHtml) {
            holidayScheduleHtml = holidayJsonData["0000"][month];
            
            if (holidayScheduleHtml) {
                holidayScheduleHtml = holidayJsonData["0000"][month][i];
                dateMatch = firstDay.getDay() + i - 1;
                $tdSche.eq(dateMatch).append(holidayScheduleHtml);
                if (holidayScheduleHtml) $tdSche.eq(dateMatch).parent().addClass("holiday");
            }
        }
        
        holidayScheduleHtml = "";
        holidayScheduleHtml = holidayJsonData[year];
        
        if (holidayScheduleHtml) {
            holidayScheduleHtml = holidayJsonData[year][month];
            
            if (holidayScheduleHtml) {
                holidayScheduleHtml = holidayJsonData[year][month][i];
                dateMatch = firstDay.getDay() + i - 1;
                $tdSche.eq(dateMatch).append(holidayScheduleHtml);
                if (holidayScheduleHtml) $tdSche.eq(dateMatch).parent().addClass("holiday");
            }
        }
        
        var scheduleHtml = "";
        scheduleHtml = jsonData[year];
        
        if (scheduleHtml) {
            scheduleHtml = jsonData[year][month];
            
            if (scheduleHtml) {
                scheduleHtml = jsonData[year][month][i];
                dateMatch = firstDay.getDay() + i - 1;
                $tdSche.eq(dateMatch).append(scheduleHtml);
            }
        }
    }
    
    //달력 팝업 보이기&숨기기
    $('#calendar_tab .calendar_schedule .tit_item').on("click", function(evt) {
        evt.preventDefault();
        if ($(this).next('.calendar_con_popup').css("display") == "none") {
        	$("#calendar_tab .calendar_schedule .calendar_con_popup").css("display","none");
            $(this).next('.calendar_con_popup').css("display","block");
        } else {
            $(this).next('.calendar_con_popup').css("display","none");
        }
    });
}

function drawSche2() {
    setScheData2();
    
    var scheduleHtml = "";
    
    scheduleHtml = jsonData2[year2];
    
    if (scheduleHtml) {
        scheduleHtml = jsonData2[year2][month2];
        
        if (scheduleHtml) {
            scheduleHtml = jsonData2[year2][month2][day2];
            $("#event_tab .event_list").html(scheduleHtml);
        }
    }
}

function drawSche3() {
    setScheData3();
    
    var scheduleHtml = "";
    var scheduleSubHtml = "";
    
    scheduleHtml = jsonData3[year3];
    
    if (scheduleHtml) {
        scheduleHtml = jsonData3[year3][month3];
        
        if (scheduleHtml) {
            for (key in scheduleHtml) {
                scheduleSubHtml += scheduleHtml[key];
            }
            
            scheduleHtml = scheduleSubHtml;
            $("#parent_event_tab .event_list").html(scheduleHtml);
        }
    }
}

//이달을 기준으로 달력 설정 (0 : 이달, 음수 : 이전달, 양수 : 다음달)
function setCalendar(monthGap) {
	var setday = null;
	
	setday = new Date();
	setday.setMonth(setday.getMonth() + monthGap);
	
	year = setday.getFullYear();
    month = setday.getMonth() + 1;
    
    if (month < 10) {
        month = String("0" + month);
    }
	
	getNewInfo();
}

