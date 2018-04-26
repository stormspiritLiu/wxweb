/**
 * Created by 刘柘林 on 2018/2/2.
 */

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

$(document).ready(function () {
    var tid,remain_num;
    $("td:last-of-type").on('click',function () {
        var post_data = {
            account : $(this).parents("tr").children('td:eq(1)').html(),
            state : ($(this).text() == "通过")?1:0
        }
        $.ajax({
            url: '/admin/teacher',
            data : post_data,
            dataType : 'json',
            type : 'post',
            success : function (res) {
                console.log(res.id);
                console.log($("tr[id = "+ res.id +"]").children('td:last').text());

                if($("tr[id = "+ res.id +"]").children('td:last').text() == "封禁"){
                    $("tr[id = "+ res.id +"]").children('td:eq(6)').html("未过审");
                    $("tr[id = "+ res.id +"]").children('td:last').html("<span class=\"label label-success\">通过</span>");
                }else{
                    $("tr[id = "+ res.id +"]").children('td:eq(6)').html("已过审");
                    $("tr[id = "+ res.id +"]").children('td:last').html("<span class=\"label label-danger\">封禁</span>");
                }
            }
        })
    })
    $(".label-info ").on('click',function () {
        tid = $(this).parents("tr").attr("id");
        remain_num  = $(this).parents("tr").attr('data-remain_num')
        $("#remain_num").text("剩余名额：" + remain_num)
        $("#add_num").val("")
        $("#myModal").modal()
    })
    $("#submit").on('click',function (event) {
        event.preventDefault();
        $.ajax({
            url: '/admin/authorize',
            data: {
                add_num : $("#authorize").serializeArray()[0].value,
                remain_num : remain_num,
                id : tid
            },
            dataType: 'json',
            type: 'post',

            success: function (res) {
                $("#"+tid).attr("data-remain_num",res.new_num)
                toastr.success("修改成功")
            },
            error : function() {

                toastr.warning("异常!")
            }

        })
    })
    //教师过审
    // $(".label-success").on('click',function(){
    //     var post_data = {
    //         account : $(this).parents("tr").children('td:eq(1)').html(),
    //         state : 1
    //     }
    //     $.ajax({
    //         url: '/admin/teacher',
    //         data : post_data,
    //         dataType : 'json',
    //         type : 'post',
    //         success : function (res) {
    //             console.log(res.id);
    //             $("tr[id = "+ res.id +"]").children('td:eq(5)').html("已过审");
    //             $("tr[id = "+ res.id +"]").children('td:last').html("<span class=\"label label-danger\">封禁</span>");
    //         }
    //     })
    // });
    //教师封禁
    // $(".label-danger").on('click',function(){
    //     var post_data = {
    //         account : $(this).parents("tr").children('td:eq(1)').html(),
    //         state : 0
    //     }
    //     $.ajax({
    //         url: '/admin/teacher',
    //         data : post_data,
    //         dataType : 'json',
    //         type : 'post',
    //         success : function (res) {
    //             console.log(res.id);
    //             $("tr[id = "+ res.id +"]").children('td:eq(5)').html("未过审");
    //             $("tr[id = "+ res.id +"]").children('td:last').html("<span class=\"label label-success\">通过</span>");
    //         }
    //     })
    // });
})