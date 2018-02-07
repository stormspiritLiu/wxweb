/**
 * Created by 刘柘林 on 2018/2/6.
 */
$(document).ready(function(){
    $(".top-nav").on('mouseenter','li',function(){
        $(this).addClass("select-cur");
    });
    $(".top-nav").on('mouseleave','li',function(){
        var c = $(this).attr("data-selected");
        if(c !== "1"){
            $(this).removeClass();
        }
    });
});