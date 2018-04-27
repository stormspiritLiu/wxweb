/**
 * Created by 刘柘林 on 2018/2/10.
 */
function search() {
    var post_data = {
        grade : $("#grade li[data-selected='1']").text() || '全部',
        category : $("#category li[data-selected='1']").text() || '全部'
    }
    $.ajax({
        url: '/teacher/select',
        data : post_data,
        dataType : 'json',
        type : 'post',
        success : function (res) {
            console.log(res);
            var str = "";
            $.each(res.teachers,function (index,item) {
                str +=
                    "<div class=\"col-md-4 testimonial-grid\">" +
                        "<div class=\"testimonial-grd\">" +
                            "<a href=\"/teacher/detail?tid="+ item.id +"\">" +
                                "<i>"+item.name+"</i>" +
                                item.grade + "&nbsp;"+ item.category +
                                "<br>课程数量：" + res.t_cnt[index] +
                            "</a>" +
                            "<div class=\"testimonial-grd-pos\">" +
                                "<span></span>" +
                            "</div>" +
                        "</div>" +
                     "</div>";
            })
            if(str == "") str = "暂无老师"

            $("#teachers").html(str)
        }
    })
}

var sortByMark = function(a, b) {
    return $(a).attr("data-mark") > $(b).attr("data-mark") ? -1 : 1;
}
var sortByCourseNum = function(a, b) {
    return $(a).attr("data-course-num") > $(b).attr("data-ptp") ? -1 : 1;
}
var sortById = function(a, b) {
    return $(a).attr("data-id") > $(b).attr("data-id") ? -1 : 1;
}
var sortBy = function(sortBy) {
    var sortEle = $('#teachers>div').sort(sortBy);
    $('#teachers').empty().append(sortEle);
}
$(document).ready(function () {
    $("#grade").on('click','li',function () {
        $(this).addClass("select-cur");
        $(this).attr("data-selected","1");
        $(this).siblings().removeClass();
        $(this).siblings().attr("data-selected","0");
        search();
    });
    $("#category").on('click','li',function () {
        $(this).addClass("select-cur");
        $(this).attr("data-selected","1");
        $(this).siblings().removeClass();
        $(this).siblings().attr("data-selected","0");
        search();
    });
    $("#sort").on('click','li',function () {
        $(this).addClass("select-cur");
        $(this).attr("data-selected","1");
        $(this).siblings().removeClass();
        $(this).siblings().attr("data-selected","0");
    });

    //课程按照评分排序
    $("#mark").on('click',function () {
        sortBy(sortByMark);
    })
    //课程按照课程数量排序
    $("#course_num").on('click',function () {
        sortBy(sortByCourseNum);
    })
    //课程按照默认排序
    $("#default").on('click',function () {
        sortBy(sortById);
    })
})