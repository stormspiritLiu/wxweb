/**
 * Created by 刘柘林 on 2018/2/27.
 */

function start(tag){

    $('#myModal1').modal();

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

function tr_delete(that,type) {
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var cid = searchURL.split("&")[0].split("=")[1];

    var post_data = {
        id: that.parents("tr").attr("data-fid"),
        name: that.parents("tr").children('td:eq(1)').html(),
        cid: cid
    }
    $.ajax({
        url: '/resource/delete?type=' + type,
        data : post_data,
        dataType : 'json',
        type : 'post',
        success : function (res) {
            if(res.ret != null){
                alert(res.ret)
            }else{
                that.parents("tr").remove()
            }
        }
    })
}
$(document).ready(function () {

    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var cid = searchURL.split("&")[0].split("=")[1];

    //上传视频
    $("#input-video").fileinput({
        language: 'zh',
        //elErrorContainer: '#kartik-file-errors',
        previewFileType: ['video'],
        //html5 video允许的视频后缀
        allowedFileExtensions : ['mp4','webm','ogg'],
        enctype: 'multipart/form-data',
        maxFileCount: 5, //表示允许同时上传的最大文件个数
        uploadUrl: '/resource/video?cid=' + cid
    }).on("fileuploaded",function (event, data) {
        var res = data.response;
        console.log(res)
        if(res.type == 1){
            //视频上传成功
            var index = $("#t_video > tr").length +1;
            var str =
                "<tr data-fid='"+ res.id +"'>"+
                    "<td>"+ index +"</td>"+
                    "<td>"+ res.f_name +"</td>"+
                    "<td>"+ res.f_name +"</td>"+
                    "<td>"+
                        "<h4>"+
                            "<a href=\"/video?cid="+cid+"&vid="+res.id+"\"><span class=\"label label-success\">观看</span></a>"+
                            "&nbsp;" +
                            "<a href=\"javascript:void(0)\"><span class=\"label label-info\">编辑</span></a>"+
                            "&nbsp;" +
                            "<a href=\"javascript:void(0)\" onclick='tr_delete($(this),1)'><span class=\"label label-danger\">删除</span></a>"+
                        "</h4>"+
                    "</td>"+
                "</tr>";
            $("#t_video").append(str);
        }
        else if(res.type == 2){
            //文件更新成功,暂时什么都不干

        }
    });

    //编辑课程大纲信息
    $("#outline span.label-info").on('click',function () {
        $('#edit').modal();
        $('#old_title').html('原标题：'+ $(this).parents("tr").children('td:eq(2)').html())
        $('#new_title').attr('data-fid',$(this).parents("tr").attr('data-fid'))
    });
    //提交修改后的大纲信息
    $("#edit_submit").on('click',function () {
        var post_data = {
            id :  $('#new_title').attr('data-fid'),
            new_title : $('#new_title').val()
        }
        $.ajax({
            url: '/course/outline_update',
            data: post_data,
            dataType: 'json',
            type: 'post',

            success: function (res) {
                $('#edit').modal('hide');
                console.log(res)
                console.log($("tr[data-fid="+res.id+"] td:eq(2)").html())
                $("tr[data-fid="+res.id+"] td:eq(2)").html(res.new_title)
                toastr.success("修改成功")
            },
            error : function() {
                alert("异常！");
            }

        })
    })

    //删除视频
    $("#outline span.label-danger").on('click',function () {
        tr_delete($(this),1)
    });

    //上传课件
    $("#input-resource").fileinput({
        language: 'zh',
        previewFileType: ['image', 'html', 'text', 'video', 'audio', 'flash', 'object'],
        enctype: 'multipart/form-data',
        maxFileCount: 5, //表示允许同时上传的最大文件个数
        uploadUrl: '/resource/upload?cid=' + cid,
    }).on("fileuploaded",function (event, data) {
        var res = data.response;
        var d = data.files[0].lastModifiedDate;
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        if(res.type == 1){
            //文件上传成功
            var index = $("#t_resource > tr").length +1;
            var str =
                "<tr data-fid='"+ res.id +"'>"+
                    "<td>"+ index +"</td>"+
                    "<td>"+ res.name +"</td>"+
                    "<td>"+ d +"</td>"+
                    "<td>"+
                        "<h4>"+
                            "<a href=\"/resource?id="+res.id+"&name="+res.name+"&cid="+cid+"\"><span class=\"label label-success\">下载</span></a>"+
                            "&nbsp;" +
                            "<a href=\"javascript:void(0)\" onclick=\"tr_delete($(this),2)\"><span class=\"label label-danger\">删除</span></a>"+
                        "</h4>"+
                    "</td>"+
                "</tr>";
            $("#t_resource").append(str);
        }
        else if(res.type == 2){
            //文件更新成功
            $("tr[data-fid="+res.id+"] > td:eq(2)").html(d)
        }
    });
    //删除课件
    $("#resource span.label-danger").on('click',function () {
        tr_delete($(this),2)
    });
    //提交评论
    $("#remark_submit").on('click',function (event) {
        event.preventDefault();

        $.ajax({
            url: '/remark/course?cid='+cid ,
            data: $('#new_remark').serialize(),
            dataType: 'json',
            type: 'post',

            success: function (res) {
                console.log(res.remark)
                var index = $('.well').length + 1;
                var str = "<div class=\"well\">#" + index +
                    "评分："+res.remark.mark+ "<br>" +res.remark.information +
                    // "<div style='float: right;'>"+ res.remark.create_time.getFullYear() +
                    // "-"+res.remark.create_time.getMonth()+1 +
                    // "-"+res.remark.create_time.getDate() +"</div>"
                    "</div>"
                $(".grid_3.grid_5:last").append(str)
            },
            error : function() {
                alert("异常！");
            }

        })
    })
})