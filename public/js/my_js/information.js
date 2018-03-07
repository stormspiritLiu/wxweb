/**
 * Created by 刘柘林 on 2018/3/3.
 */
var Url = "";
function start(){
    Url = "/course/add_course";
    $('#title').val('')
    $("#grade > option[selected='selected']").removeAttr('selected');
    $("#grade > option:eq(0)").prop('selected','selected');
    $("#category > option[selected='selected']").removeAttr('selected');
    $("#category > option:eq(0)").prop('selected','selected');
    $('#_information').val('')
    $('#myModal').modal();
}

function edit(cid) {
    Url = "/course/update?cid="+cid;
    $('#myModalLabel').text("更改课程信息");
    $('#title').val($('#'+cid+'>td:eq(1)').html())
    $("#grade > option[selected='selected']").removeAttr('selected');
    $("#grade > option[value="+$('#'+cid+'>td:eq(2)').text().toString()+"]").prop('selected','selected');
    $("#category > option[selected='selected']").removeAttr('selected');
    $("#category > option[value="+$('#'+cid+'>td:eq(3)').text().toString()+"]").prop('selected','selected');
    $('#_information').val($('#'+cid+'>td:eq(6)').html())
    $('#myModal').modal();
}

$(document).ready(function () {
    $("#submit").click(function (event) {
        event.preventDefault();

        $.ajax({
            url: Url ,
            data: $('#new_course').serialize(),
            dataType: 'json',
            type: 'post',

            success: function (res) {
                if(res.code == 200 && res.order == 'add') {
                    var index = parseInt($('#course_list > tr:last > td:first').html()) + 1;
                    var str =
                        "<tr>" +
                        "<td>" + index + "</td>" +
                        "<td>" + res.course.title + "</td>" +
                        "<td>" + res.course.grade + "</td>" +
                        "<td>" + res.course.category + "</td>" +
                        "<td>" + res.course.mark + "</td>" +
                        "<td>" + res.course.participants + "</td>" +
                        "<td>" + res.course.information + "</td>" +
                        "<td>" +
                        "<h4>" +
                        "<a href=\"/course/detail?cid=" + res.course.id + "\">" +
                        "<span class=\"label label-primary\">进入</span>" + "&nbsp;" +
                        "</a>" +
                        "<a href=\"javascript:void(0)\" onclick=\"edit(" + res.course.id + ")\"></a>" +
                        "<span class=\"label label-success\">编辑</span>" + "&nbsp;" +
                        "</a>" +
                        "<a href=\"/course/delete?cid=" + res.course.id + "\">" +
                        "<span class=\"label label-danger\">删除</span>" +
                        "</a>" +
                        "</h4>" +
                        "</td>" +
                        "</tr>"
                    $('#course_list').append(str);
                }
                else if(res.code == 200 && res.order =='update'){
                    $('#'+res.cid+'>td:eq(1)').html(res.course.title);
                    $('#'+res.cid+'>td:eq(2)').html(res.course.grade)
                    $('#'+res.cid+'>td:eq(3)').html(res.course.category)
                    $('#'+res.cid+'>td:eq(6)').html(res.course.information)
                }
                else{
                    alert(res.message)
                }
            },
            error : function() {
                alert("异常！");
            }

        })
    })
})