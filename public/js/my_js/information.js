/**
 * Created by 刘柘林 on 2018/3/3.
 */
var Url = "";
function start(tag){
    if(tag == 'myModal'){
        Url = "/course/add_course";
        $('#myModalLabel').text("新建课程");
        $('#title').val('')
        $("#grade > option[selected='selected']").removeAttr('selected');
        $("#grade > option:eq(0)").prop('selected','selected');
        $("#category > option[selected='selected']").removeAttr('selected');
        $("#category > option:eq(0)").prop('selected','selected');
        $('#_information').val('')
        $('#myModal').modal();
    }else {
        $('#'+tag).modal();
    }
}
//编辑课程
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

//设置通知栏消息显示方式
$(function() {
    toastr.options = {
        "closeButton": false, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "showDuration": "300",//显示的动画时间
        "hideDuration": "1000",//消失的动画时间
        "timeOut": "3000", //展现时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "fadeIn",//显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
    };
})

//按url更新密码
function update_password(url) {
    $.ajax({
        url: url,
        data: $('#update_password').serialize(),
        dataType: 'json',
        type: 'post',

        success: function (res) {
            if(res.type == 1){
                toastr.success("修改成功")
            }else if(res.type == 2){
                toastr.error("原密码不正确");
            }else if(res.type == 3){
                toastr.warning("新密码前后不一致")
            }
        },
        error : function() {
            toastr.error("异常!")
        }

    })
}

$(document).ready(function () {
    //设置时间控件
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 'hour',
        forceParse: 0
    });
    //新建、更新课程
    $("#submit").click(function (event) {
        event.preventDefault();
        var data =  $('#new_course').serialize();
        var type = data.split("&")[3].split("=")[1]
        console.log("xxxx" + data)
        if(data.split("&")[0].split("=")[1] == ""){
            toastr.warning("课程名不能为空")
        }else if(type == "2" && data.split("&")[4].split("=")[1] == ""){
            toastr.warning("推流密码不能为空")
        }else {
            $.ajax({
                url: Url ,
                data: data,
                dataType: 'json',
                type: 'post',

                success: function (res) {
                    if(type == 2) location.reload();
                    else if(res.code == 200 && res.order == 'add') {
                        var index = parseInt($('#course_list > tr:last > td:first').html()) + 1;
                        var str =
                            "<tr id='"+res.course.id+"'>" +
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
                            "<a href=\"javascript:void(0)\" onclick=\"edit(" + res.course.id + ")\">" +
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
        }

    })
    //切换课程类型
    $("#type").change(function (event) {
        console.log( $("#type").val() )
        if($("#type").val() == 1){
            //一般课程
            $("#live").attr("style","display:none;")
        }else{
            //直播课程
            $("#live").attr("style","display:inline;")
        }
    })
    //新建评论
    $("#remark_submit").click(function (event) {
        event.preventDefault();

        var searchURL = window.location.search;
        searchURL = searchURL.substring(1, searchURL.length);
        var tid = searchURL.split("&")[0].split("=")[1];
        $.ajax({
            url: '/remark/teacher?tid='+tid ,
            data: $('#new_remark').serialize(),
            dataType: 'json',
            type: 'post',

            success: function (res) {
                toastr.success("评论成功")
            },
            error : function() {
                toastr.warning("异常!")
            }

        })
    })
    //更新学生个人信息
    $("#update_info_submit_s").click(function (event) {
        event.preventDefault();

        $.ajax({
            url: '/information/update_info_stu',
            data: $('#update_info').serialize(),
            dataType: 'json',
            type: 'post',

            success: function (res) {
                toastr.success("修改成功")
                $("#t_name").html(res.name)
                $("#t_grade").html(res.grade)
                $("#p_name").html("姓名:&emsp;" +res.name)
                $("#p_school").html("学校:&emsp;" +res.school)
                $("#p_grade").html("年级:&emsp;" +res.grade)
                $("#p_information").html("个人描述:&emsp;" +res.information)
            },
            error : function() {
                toastr.warning("异常!")
            }

        })
    })
    //更新学生密码
    $("#update_password_submit_s").click(function (event) {
        event.preventDefault();
        update_password('/information/update_password_stu')
    })
    //更新教师个人信息
    $("#update_info_submit_t").click(function (event) {
        event.preventDefault();

        $.ajax({
            url: '/information/update_info_tea',
            data: $('#update_info').serialize(),
            dataType: 'json',
            type: 'post',

            success: function (res) {
                console.log(res)
                toastr.success("修改成功")
                $("#t_name").html(res.name)
                $("#t_grade").html(res.grade)
                $("#t_category").html(res.category)
                $("#p_name").html("姓名:&emsp;" +res.name)
                $("#p_teaching_age").html("姓名:&emsp;" +res.teaching_age+"年")
                $("#p_information").html("个人描述:&emsp;" +res.information)
            },
            error : function() {
                toastr.warning("异常!")
            }

        })
    })
    //更新教师密码
    $("#update_password_submit_t").click(function (event) {
        event.preventDefault();
        update_password('/information/update_password_tea')
    })
    //教师对学生进行审核
    $(".label.my_label-success ").click(function () {
        var num = $("#p_num").text().replace(/[^0-9]/ig,"")
        $.ajax({
            url: '/teacher/authorize',
            data: {
                id : $(this).parents("tr").attr("id"),
                num : num
            },
            dataType: 'json',
            type: 'post',

            success: function (res) {
                console.log(res)
                $("tr[id = "+ res.id +"]").children('td:eq(6)').html("已过审");
                $("tr[id = "+ res.id +"]").children('td:last').html("无");
                $("#p_num").text("你还剩余"+(num-1)+"个审核名额")
                toastr.success("修改成功")
            },
            error : function() {
                toastr.warning("异常!")
            }

        })
    })
})