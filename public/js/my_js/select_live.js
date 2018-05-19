/**
 * Created by 刘柘林 on 2018/5/18.
 */
$(document).ready(function () {
    var data = $("#lives>div")
    $("#state").on('click','li',function () {
        $(this).addClass("select-cur");
        $(this).attr("data-selected","1");
        $(this).siblings().removeClass();
        $(this).siblings().attr("data-selected","0");
    });

    //课程按照默认排序
    $("#all").on('click',function () {
        console.log("all")
        data.each(function (index,item) {
            item.setAttribute('style','display:block;')
        })
        var sortEle = data.sort(function(a, b) {
            return $(a).attr("data-id") > $(b).attr("data-id") ? -1 : 1;
        });
        $('#lives').empty().append(sortEle);
    })
    $("#start").on('click',function () {
        data.each(function (index,item) {
            if(item.getAttribute('data-state')==1){
                item.setAttribute('style','display:block;')
            }else{
                item.setAttribute('style','display:none;')
            }
        })
    })
    $("#on").on('click',function () {
        data.each(function (index,item) {
            if(item.getAttribute('data-state')==2){
                item.setAttribute('style','display:block;')
            }else{
                item.setAttribute('style','display:none;')
            }
        })
    })
    $("#end").on('click',function () {
        data.each(function (index,item) {
            if(item.getAttribute('data-state')==3){
                item.setAttribute('style','display:block;')
            }else{
                item.setAttribute('style','display:none;')
            }
        })
    })
})