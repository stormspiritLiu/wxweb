/**
 * Created by 刘柘林 on 2018/2/6.
 */
function search() {
    var post_data = {
        grade : $("#grade li[data-selected='1']").text() || '全部',
        category : $("#category li[data-selected='1']").text() || '全部'
    }
    $.ajax({
        url: '/course',
        data : post_data,
        dataType : 'json',
        type : 'post',
        success : function (res) {
            console.log(res);
            var str = "";
            $.each(res.courses,function (index,item) {
                str += "<div class=\"col-md-4 testimonial-grid\">" +
                    "<div class=\"testimonial-grd\">" +
                    "<a href=\"/course/detail?cid="+ item.id +"\">" +
                    "<i>"+item.title+"</i>" +
                    item.grade + "&nbsp;"+ item.category +
                    "<br>参与人数：" + item.participants +
                    "<br>教师:&nbsp;<span>"+res.t_name[index]+"</span>" +
                    "</a>" +
                    "<div class=\"testimonial-grd-pos\"><span></span></div></div></div>";
            })
            if(str == "") str = "暂无课程"

            $("#courses").html(str)
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