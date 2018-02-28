/**
 * Created by 刘柘林 on 2018/2/27.
 */
$(document).ready(function () {
    //删除课件
    $("#resource .label-danger").on('click',function () {
        var searchURL = window.location.search;
        searchURL = searchURL.substring(1, searchURL.length);
        var cid = searchURL.split("&")[0].split("=")[1];
        var post_data = {
            id: $(this).parents("tr").attr("data-fid"),
            name: $(this).parents("tr").children('td:eq(1)').html(),
            cid: cid
        }
        $.ajax({
            url: '/resource/delete',
            data : post_data,
            dataType : 'json',
            type : 'post',
            success : function (ret) {
                console.log(ret)
                window.location.reload();
            }
        })
    });
})