/**
 * @author minks
 */

$(function() {
    //리사이즈
    $(window).resize(function() {
        var win_width = window.innerWidth;
        
        if ($(".layer_area_mask:visible").length > 0) {
            var layer_id = $(".layer_area_mask:visible").attr("id");
            openLayer(layer_id);
        }
        
        if ($('.content_top .content_top_menu>li.content_top_menu_last').length > 0) {
            if (win_width > 1080) {
                $('.content_top .content_top_menu>li.content_top_menu_last .content_top_menu_tit').removeClass("on");
                $('.content_top .content_top_menu>li.content_top_menu_last .content_top_menu_list').css("display","none");
            } else {
                $('.content_top .content_top_menu>li.content_top_menu_last .content_top_menu_list').css("display","block");
            }
        }
        
        if ($('.interview_area #calendar_tab .calendar_table').length > 0) {
            if (win_width > 1080) {
                $('.interview_area #calendar_tab .calendar_table .calendar_schedule .calendar_con_popup').css("display","block");
            } else {
                $('.interview_area #calendar_tab .calendar_table .calendar_schedule .calendar_con_popup').css("display","none");
            }
        }
        
        $(".member_find_area .member_find_type>li.active").trigger("click");
        
        mainSlideBg();
        hdPopupSlideBg();
    });
    
    //header 각 메뉴의 하위 메뉴 보이기&숨기기
	$('nav.nav .nav_menu>li .nav_menu_tit').on("mouseover", function(evt) {
		evt.preventDefault();
        if ($('aside.aside').css("display") == "none") {
            $('nav.nav .nav_menu>li .nav_sub_menu').css("display","none");
            $(this).next('.nav_sub_menu').stop(true,true).slideDown(200);
        }
	});
	
	$('nav.nav .nav_menu>li').on("mouseleave", function(evt) {
		evt.preventDefault();
        if ($('aside.aside').css("display") == "none") {
            $(this).children('.nav_sub_menu').stop(true,true).slideUp(200);
        }
	});
    
    //header 모든 메뉴의 하위 메뉴 보이기&숨기기
    $('header.header .header_main .sitemap_btn').on("mouseover", function(evt) {
		evt.preventDefault();
        var win_width = window.innerWidth;
        
        $('header.header .header_main').css("background-color","#ffffff");
        $('header.header .header_main .sitemap_btn .sitemap_line2').css("width","100%");
        $('header.header .header_top').not('header.header .main_header_top').css("background-color","#ffffff");
        
        if (win_width > 1800) {
            $('nav.nav .nav_menu>li .nav_menu_tit').css("line-height","4.842em").css("margin","0");
        } else if (win_width > 1400) {
            $('nav.nav .nav_menu>li .nav_menu_tit').css("line-height","5.111em").css("margin","0");
        } else {
            $('nav.nav .nav_menu>li .nav_menu_tit').css("line-height","5.412em").css("margin","0");
        }
        
        $('aside.aside').stop(true,true).slideDown(200);
	});
	
	$('header.header .header_main').on("mouseleave", function(evt) {
		evt.preventDefault();
        $('header.header .header_main').css("background-color","transparent");
        $('header.header .header_main .sitemap_btn .sitemap_line2').css("width","70%");
        $('header.header .header_top').not('header.header .main_header_top').css("background-color","transparent");
        $('nav.nav .nav_menu>li .nav_menu_tit').css("line-height","1.684em").css("margin","1.632em 0");
        $('aside.aside').stop(true,true).slideUp(200);
	});
    
    //header 하위 메뉴의 하위 메뉴 보이기&숨기기
    $('.nav_menu>li .nav_sub_menu>li .nav_sub_menu_tit').on("click", function(evt) {
        evt.preventDefault();
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(this).next('.nav_sub_sub_menu').stop(true,true).slideUp(200);
        } else {
            $(this).addClass("on");
            $(this).next('.nav_sub_sub_menu').stop(true,true).slideDown(200);
        }
    });
    
    //모바일 슬라이드 메뉴 보이기&숨기기
	$('.mb_area .mb_btn').click(function() {
        $('.mb_area .mb_menu').css('display','block');
        $('.mb_area .mb_menu').css('z-index','999');
        $('.mb_area .mb_box').css('right','0px');
        //$('body').css('overflow','hidden');
	});
    
    $('.mb_area .mb_close_btn').click(function() {
        $('.mb_area .mb_menu').css('display','none');
        $('.mb_area .mb_menu').css('z-index','-1');
        $('.mb_area .mb_box').css('right','-80%');
        //$('body').css('overflow','scroll');
    });
    
    //모바일 메뉴 밑의 하위 메뉴 보이기&숨기기
    $('.mb_area .nav_menu>li .nav_menu_tit').click(function() {
		if ($(this).next('ul').css("display") == "block") {
			$(this).parent().children('.nav_sub_menu').slideUp();
			$(this).removeClass('rotate');
			return false;
		} else {
            $('.nav_sub_menu').slideUp();
            $('.mb_area .nav_menu li .nav_menu_tit').removeClass('rotate');
            $(this).parent().children('.nav_sub_menu').slideDown();
            $(this).addClass('rotate');
			return false;
		}
	});
    
    //footer 각 셀렉트박스의 하위 메뉴 보이기&숨기기
    $('footer.footer .footer_top_select .footer_top_select_tit').on("click", function(evt) {
        evt.preventDefault();
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(this).next('.footer_top_select_list').stop(true,true).slideUp(200);
        } else {
            $('footer.footer .footer_top_select .footer_top_select_tit').removeClass("on");
            $('footer.footer .footer_top_select .footer_top_select_list').css("display","none");
            $(this).addClass("on");
            $(this).next('.footer_top_select_list').stop(true,true).slideDown(200);
        }
    });
    
    //content_top 서브 상단 메뉴의 하위 메뉴 보이기&숨기기
    $('.content_top .content_top_menu>li .content_top_menu_tit').on("click", function(evt) {
        evt.preventDefault();
        var win_width = window.innerWidth;
        
        if ($(this).prev('.content_top_menu_list').length > 0) {
            if ($(this).hasClass("on")) {
                $(this).removeClass("on");
                $(this).prev('.content_top_menu_list').stop(true,true).slideUp(200);
            } else {
                if (win_width > 1080) {
                    $('.content_top .content_top_menu>li .content_top_menu_tit').removeClass("on");
                    $('.content_top .content_top_menu>li .content_top_menu_list').css("display","none");
                } else {
                    $('.content_top .content_top_menu>li:not(.content_top_menu_last) .content_top_menu_tit').removeClass("on");
                    $('.content_top .content_top_menu>li:not(.content_top_menu_last) .content_top_menu_list').css("display","none");
                }
                
                $(this).addClass("on");
                $(this).prev('.content_top_menu_list').stop(true,true).slideDown(200);
            }
        }
    });
    
    //content_top 서브 상단 메뉴에 텍스트 출력
    $('.content_top .content_top_menu>li .content_top_menu_list').each(function() {
        var menu_tit = $(this).children(".active").text();
        
        $(this).next().text(menu_tit);
    });
    
    //헤더 팝업 닫기
    $("#hd_popup .hd_popup_close_area .hd_popup_close_btn").click(function() {
        $("#hd_popup").slideUp(400);
    });
    
    //bxslider 슬라이드
    var main_slide = $(".main_slide").bxSlider({
        mode: 'fade',
        controls: false,
        autoControls: true,
        autoControlsCombine: true,
        auto: true,
        stopAutoOnClick: true,
        touchEnabled: (navigator.maxTouchPoints > 0),
    });
    
    //중지버튼 눌렀을 때
    $(".bx-stop").click(function() {
        main_slide.stopAuto();
        $(".bx-stop").hide();
        $(".bx-start").show();
        return false;
    });
    
    //시작버튼 눌렀을 때
    $(".bx-start").click(function() {
        main_slide.startAuto();
        $(".bx-start").hide();
        $(".bx-stop").show();
        return false;
    });
    
    //로드시 시작버튼 숨김
    $(".bx-start").hide();
    
    //액션 후 자동 슬라이드 되도록 설정
    $(document).on("click", ".bx-pager", function() {
        main_slide.stopAuto();
        main_slide.startAuto();
    });
    
    var main_slide2 = $(".board_slide").bxSlider({
        auto: true,
        stopAutoOnClick: true,
        pagerType: 'short',
        pagerSelector: ".board_slide_pager",
        prevSelector: ".board_slide_prev_arrow",
        nextSelector: ".board_slide_next_arrow",
        prevText: "Prev",
        nextText: "Next",
        touchEnabled: (navigator.maxTouchPoints > 0),
    });
    
    $(document).on("click", ".board_slide_prev_arrow, .board_slide_next_arrow", function() {
        main_slide2.stopAuto();
        main_slide2.startAuto();
    });
    
    if ($(".gallery_slide").length > 0) {
        bxMainSlide3.init();
    }
    
    var main_slide4 = $(".hd_popup_slide").bxSlider({
        auto: true,
        stopAutoOnClick: true,
        pager: false,
        prevSelector: ".hd_popup_slide_prev_arrow",
        nextSelector: ".hd_popup_slide_next_arrow",
        prevText: "Prev",
        nextText: "Next",
        touchEnabled: (navigator.maxTouchPoints > 0),
    });
    
    $(document).on("click", ".hd_popup_slide_prev_arrow, .hd_popup_slide_next_arrow", function() {
        main_slide4.stopAuto();
        main_slide4.startAuto();
    });
    
    //아이디/비밀번호 찾기 내용 변경
    $(".member_find_area .member_find_type>li").bind("click", function() {
        var win_width = window.innerWidth;
        var data_type = $(this).attr("data-type");
        
        if (win_width > 1080) {
            $(".member_find_area .content_main_tit").text("아이디/비밀번호 찾기");
            $(".member_find_area .content_main_tit").css("margin-top","0");
        } else {
            if (data_type == "id") {
                $(".member_find_area .content_main_tit").text("아이디 찾기");
            } else if (data_type == "pw") {
                $(".member_find_area .content_main_tit").text("비밀번호 찾기");
            } else {
                $(".member_find_area .content_main_tit").text("아이디/비밀번호 찾기");
            }
            
            $(".member_find_area .content_main_tit").css("margin-top","2.286em");
        }
        
        $(".member_find_area .member_find_type>li").removeClass("active");
        $(".member_find_area .member_find_con").css("display","none");
        $(this).addClass("active");
        $(".member_find_area #member_find_" + data_type).css("display","block");
    });
    
    $(".member_find_area .member_find_type>li").eq(0).trigger("click");
    
    //카테고리에 따라 내용 변경
    $(".content_main .content_category>li").bind("click", function() {
        var data_type = $(this).attr("data-type");
        $(".content_main .content_category>li").removeClass("active");
        $(".content_main .content_category_con").css("display","none");
        $(this).addClass("active");
        $(".content_main #content_category_" + data_type).css("display","block");
    });
    
    if ($(".content_main .content_category>li.active").length > 0) {
        var li_index = $(".content_main .content_category>li.active").index();
        $(".content_main .content_category>li").eq(li_index).trigger("click");
    } else {
        $(".content_main .content_category>li").eq(0).trigger("click");
    }
    
    //메인 공지사항 내용 변경
    $(".main_board_area .board_notice_type>li").bind("click", function() {
        var data_type = $(this).attr("data-type");
        $(".main_board_area .board_notice_type>li").removeClass("active");
        $(".main_board_area .board_notice_con").css("display","none");
        $(this).addClass("active");
        $(".main_board_area #board_notice_" + data_type).css("display","block");
    });
    
    $(".main_board_area .board_notice_type>li").eq(0).trigger("click");
    
    //체크박스 전체체크
    $("#all_chk").click(function() {
        var data_id = $(this).attr("data-id");
        
        if ($("#all_chk").is(":checked")) {
            $("input[id^='" + data_id + "']").prop("checked", true);
        } else {
            $("input[id^='" + data_id + "']").prop("checked", false);
        }
    });
    
    //datepicker 설정
    $(".content_calendar").each(function() {
        $(this).datepicker();
    });
    
    //레이어 팝업 닫기
    $(".layer_close").click(function() {
        $(this).closest(".layer_area_mask").css("display","none");
    });
    
    //파일 업로드시 파일명 추출
    $(".content_main .content_file_area input[type='file']").on("change", function() {
        var filename = "";
        
        if (window.FileReader) {
            //기본 브라우저
            filename = $(this)[0].files[0].name;
        } else {
            //old IE
            filename = $(this).val().split('/').pop().split('\\').pop();
        }
        
        $(this).siblings(".content_file_name").val(filename);
    });
    
    $(".content_main .content_text_limit").each(function() {
        setTextLength(this);
    });

    $(".content_main .content_text_limit").on("keyup", function() {
        setTextLength(this);
    });
    
    //날짜 출력
    var date = new Date();
	var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    $(".content_main .input_year").val(year);
    $(".content_main .input_month").val(month);
    $(".content_main .input_day").val(day);
    
    getCalendarYear(year);
    getCalendarMonth(month);
    getCalendarDay(day);
    
    mainSlideBg();
    hdPopupSlideBg();
});

////bxslider 슬라이드 반응형
bxMainSlide3 = {
    'init': function() {
        this.action();
    },
    'action': function() {
        var $g_slide = {
            'gallery_slide': $(".gallery_slide"),
        }
        
        var opts = function() {
            var win_width = window.innerWidth;
            
            if (win_width > 1080) {
                var vars = {
                    slideWidth: 280,
                    slideMargin : 20,
                    maxSlides: 5,
                    minSlides: 4,
                    moveSlides: 1,
                    auto: true,
                    stopAutoOnClick: true,
                    pager: false,
                    prevSelector: ".gallery_slide_prev_arrow",
                    nextSelector: ".gallery_slide_next_arrow",
                    prevText: "Prev",
                    nextText: "Next",
                    touchEnabled: (navigator.maxTouchPoints > 0),
                }
            } else {
                var vars = {
                    slideWidth: 280,
                    slideMargin : 30,
                    maxSlides: 4,
                    minSlides: 3,
                    moveSlides: 1,
                    auto: true,
                    stopAutoOnClick: true,
                    pager: false,
                    controls: false,
                    touchEnabled: (navigator.maxTouchPoints > 0),
                }
            }
            
            return vars;
        }
        
        var main_slide3 = function() {
            gallery_slide = $g_slide.gallery_slide.bxSlider(opts());
        }
        
        main_slide3();
        
        $(window).on({
            'load resize': function() {
                gallery_slide.reloadSlider(opts());
            }
        });
        
        $(document).on("click", ".gallery_slide_prev_arrow, .gallery_slide_next_arrow", function() {
            gallery_slide.stopAuto();
            gallery_slide.startAuto();
        });
    }
}

//날짜 설정 (년)
function getCalendarYear(year) {
	var optionHtml = "";
    
    for (var i=year-70; i<=year; i++) {
        if (i == year) {
            optionHtml += "<option value='" + i + "' selected>" + i + "</option>";
        } else {
            optionHtml += "<option value='" + i + "'>" + i + "</option>";
        }
        
        $(".calendar_year").html(optionHtml);
	}
}

//날짜 설정 (월)
function getCalendarMonth(month) {
    var optionHtml = "";
    
    for (var i=1; i<=12; i++) {
        if (i == month) {
            optionHtml += "<option value='" + i + "' selected>" + i + "</option>";
        } else {
            optionHtml += "<option value='" + i + "'>" + i + "</option>";
        }
        
        $(".calendar_month").html(optionHtml);                        
	}
}

//날짜 설정 (일)
function getCalendarDay(day) {
    var optionHtml = "";
    
    for (var i=1; i<=31; i++) {
        if (i == day) {
            optionHtml += "<option value='" + i + "' selected>" + i + "</option>";
        } else {
            optionHtml += "<option value='" + i + "'>" + i + "</option>";
        }
        
        $(".calendar_day").html(optionHtml);                    
	}
}

//테이블 아이템 정보 추가
function addMemberItemInfo(obj) {
    var html = $(".member_add_info_item").html();
    //radio의 name, id 변경시 수정해야 함
    var num = Number($(".member_info_article .member_add_info .tbody tr:not(.member_add_info_item)").last().attr("num")) + 1;
    
    html = html.replace( /{gender_radio}/gi, 'gender_radio[' + num + ']').replace( /{gender_radio_man}/gi, 'gender_radio_man_' + num).replace( /{gender_radio_woman}/gi, 'gender_radio_woman_' + num);
    
    $(obj).closest(".member_info_article .member_add_info").append("<tr num='" + num + "'>" + html + "</tr>");
}

//테이블 아이템 정보 삭제
function delMemberItemInfo(obj) {
    var length = $(".member_info_article .member_add_info .tbody tr:not(.member_add_info_item)").length;
    
    if (length > 1) {
        $(obj).closest(".member_info_article .member_add_info .tbody tr").remove();
    }
}
//입력한 글자수 출력
function setTextLength(obj) {
	var input_text = $(obj).val();
	var limit = Number($(obj).next(".content_text_size").children(".limit_size").text());
	
	if (limit > 0) {
		if (input_text.length > limit) {
			$(obj).val(input_text.substr(0, limit));
			input_text = $(obj).val();
			return;
		}
	}
	
	$(obj).next(".content_text_size").children(".input_size").text(getTextLength(input_text));
}

//입력한 글자수 가져오기
function getTextLength(str) {
    var len = 0;
    
    for (var i=0; i<str.length; i++) {
        /*if (escape(str.charAt(i)).length == 6) {
            len++;
        }*/
        
        len++;
    }
    
    return len;
}

//댓글 수정
function setCommentForm(num, obj) {
	if ($(obj).closest(".board_comment_info").siblings(".board_comment_form").css("display") == "block") {
		$(obj).closest(".board_comment_info").siblings(".board_comment_form").css("display","none");
		$(obj).closest(".board_comment_info").siblings(".board_comment_con").css("display","block");
	} else {
		$(".board_article .board_comment_list>li .board_comment_con").css("display","block");
		$(".board_article .board_comment_list>li .board_comment_form").css("display","none")
		$(obj).closest(".board_comment_info").siblings(".board_comment_con").css("display","none");
		$(obj).closest(".board_comment_info").siblings(".board_comment_form").css("display","block");
	}
}

//레이어 팝업 열기
function openLayer(layer_id) {
    $("#" + layer_id).css("display","block").css("opacity","0");
    $("#" + layer_id).children(".layer_area_box").children(".content_area").css("height","auto");
    
    var win_height = $(window).height();
    var layer_header_height = $("#" + layer_id).children(".layer_area_box").children(".layer_header").height();
    var layer_content_height = $("#" + layer_id).children(".layer_area_box").children(".content_area").height();
    var layer_top = (win_height - layer_header_height - layer_content_height) / 2;
    
    if (layer_content_height > ((win_height - layer_header_height) * 0.94)) {
        layer_content_height = (win_height - layer_header_height) * 0.94;
        layer_top = (win_height - layer_header_height) * 0.03;
    }
    
    $("#" + layer_id).children(".layer_area_box").children(".content_area").css("height",layer_content_height + "px");
    $("#" + layer_id).children(".layer_area_box").css("top",layer_top+"px");
    $("#" + layer_id).css("opacity","1");
}

//프린트 팝업 열기
function openPrint(print_id) {
    alert("ie인 경우 파일>페이지 설정>배경색 및 이미지 인쇄를 체크한 후 인쇄해 주시기 바랍니다.");
    
    var printWindow = window.open('', '_blank', 'width=720,height=955');
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write($("#" + print_id).html());
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus(); 
    
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 500);
}

//메인 슬라이드 배경 이미지 설정
function mainSlideBg() {
    var win_width = window.innerWidth;
    
    if (win_width > 1080) {
        $(".main_slide_area .main_slide .main_slide_item").each(function() {
            var data_pc = $(this).attr("data-pc");
            var data_mobile = $(this).attr("data-mobile");
            data_pc = (data_pc) ? data_pc : data_mobile;
            
            if (data_pc) {
                $(this).css("background-image", "url('" + data_pc + "')");
            }
        });
    } else {
        $(".main_slide_area .main_slide .main_slide_item").each(function() {
            var data_pc = $(this).attr("data-pc");
            var data_mobile = $(this).attr("data-mobile");
            data_mobile = (data_mobile) ? data_mobile : data_pc;
            
            if (data_mobile) {
                $(this).css("background-image", "url('" + data_mobile + "')");
            }
        });
    }
}

//헤더 팝업 슬라이드 배경 이미지 설정
function hdPopupSlideBg() {
    var win_width = window.innerWidth;
    
    if (win_width > 1080) {
        $("#hd_popup .hd_popup_slide .hd_popup_slide_item").each(function() {
            var data_pc = $(this).attr("data-pc");
            var data_mobile = $(this).attr("data-mobile");
            data_pc = (data_pc) ? data_pc : data_mobile;
            
            if (data_pc) {
                $(this).css("background-image", "url('" + data_pc + "')");
            }
        });
    } else {
        $("#hd_popup .hd_popup_slide .hd_popup_slide_item").each(function() {
            var data_pc = $(this).attr("data-pc");
            var data_mobile = $(this).attr("data-mobile");
            data_mobile = (data_mobile) ? data_mobile : data_pc;
            
            if (data_mobile) {
                $(this).css("background-image", "url('" + data_mobile + "')");
            }
        });
    }
}

//쿠키 저장
function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    
    todayDate.setData(todayDate.getData() + expiredays);
    document.cookie = name + "=" + excape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
}

