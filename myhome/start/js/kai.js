$(function () {
    var pw=$(window).width();
    var ph=$(window).height();
    $("canvas").width(pw+"px");
    $("canvas").height(ph*0.75+"px");
    $(window).resize(function () {
        var pw=$(window).width();
        var ph=$(window).height();
        $("canvas").width(pw+"px");
        $("canvas").height(ph*0.75+"px");
    })

    //var cobj=canvas.getContext("2d");



    //菜单转换
    var num=120;
    $(".nav li").mouseover(function () {
        $(".nav-bg").stop();
        var index=$(this).index(".nav li");
        var num1=index*num+"px";
        $(".nav-bg").animate({left:num1})
    })
    $(".nav li").mouseout(function () {
        $(".nav-bg").stop();
        $(".nav-bg").animate({
            left:0
        })
    })



    //轮播

    var now=0;
    function move(type){
        type=type||"right";
        if(type=="right"){
            now++;
            if(now>=$(".content>ul>li").length){
                now=0;
            }
            $(".content>ul").animate({marginLeft:"-1000px"},500,function(){
                $(".content>ul>li").eq(0).appendTo($(".content>ul"));
                $(".content>ul").css("marginLeft","0px");
            });
        }
        if(type=="left"){
            now--;
            if(now<=-1){
                now=$(".content>ul>li").length-1;
            }
            $(".content>ul").css("marginLeft","-1000px");
            $(".content>ul>li").eq(2).prependTo($(".content>ul"));
            $(".content>ul").animate({marginLeft:"0px"},500);
        }
    }
    var t=setInterval(move,1500);
})