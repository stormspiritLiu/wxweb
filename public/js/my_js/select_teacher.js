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
})