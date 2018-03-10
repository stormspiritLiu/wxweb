/**
 * Created by 刘柘林 on 2018/2/27.
 */
function start(tag){

    $('#myModal1').modal();

}

$(document).ready(function () {

    $("#remark_submit").click(function (event) {
        event.preventDefault();

        var searchURL = window.location.search;
        searchURL = searchURL.substring(1, searchURL.length);
        var cid = searchURL.split("&")[0].split("=")[1];
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