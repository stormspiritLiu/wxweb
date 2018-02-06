/**
 * Created by 刘柘林 on 2018/2/2.
 */
$(document).ready(function () {
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
                console.log($("tr[id = "+ res.id +"]").children('td:eq(6)').text());

                if($("tr[id = "+ res.id +"]").children('td:eq(6)').text() == "封禁"){
                    $("tr[id = "+ res.id +"]").children('td:eq(5)').html("未过审");
                    $("tr[id = "+ res.id +"]").children('td:eq(6)').html("<span class=\"label label-success\">通过</span>");
                }else{
                    $("tr[id = "+ res.id +"]").children('td:eq(5)').html("已过审");
                    $("tr[id = "+ res.id +"]").children('td:eq(6)').html("<span class=\"label label-danger\">封禁</span>");
                }
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
    //             $("tr[id = "+ res.id +"]").children('td:eq(6)').html("<span class=\"label label-danger\">封禁</span>");
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
    //             $("tr[id = "+ res.id +"]").children('td:eq(6)').html("<span class=\"label label-success\">通过</span>");
    //         }
    //     })
    // });
})