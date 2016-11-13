/*
$(function () {

        var cw=document.documentElement.clientWidth;
        $(".banner .pic li").css("left",cw+"px").eq(0).css("left","0");
        var t=setInterval(move,4000);
        var next=0;
        var now=0;
        function originalfn(cw){
            $(".banner .pic li").eq(next).css("left",cw+"px");
            $(".banner .pic li").eq(now).css("left","0");
            $(".banner .pic li").eq(next).animate({left:"0"});
            $(".banner .pic li").eq(now).animate({left:-cw+"px"});
            $(".banner .cycle li").removeClass().eq(next).addClass("active");
            now=next;
        }
        function move(type,speed){
            type=type||"right";
            if (type=="left") {
                next--;
                if (next<=0) {
                    next=$(".banner .pic li").length-1
                }
                originalfn(-cw);
            }else if (type=="right") {
                next++;
                if (next>=$(".banner .pic li").length) {
                    next=0;
                }
                originalfn(cw);
            }
        }
        $(".banner").mouseover(function(){
            clearInterval(t)
        });
        $(".banner").mouseout(function(){
            t=setInterval(move,4000);
        });
        $(".banner .cycle li").each(function(index,obj){
            $(obj).click(function(){
                if (index<now) {
                    next=index;
                    originalfn(-cw);
                }else{
                    next=index;
                    originalfn(cw);
                }
            })
        });
        $(".banner .btn_l").click(function(){
            move("left");
        });
        $(".banner .btn_r").click(function(){
            move("right");
        })

});*/

$(function () {
    var currentNum=0;
    var currentTime=0;
    var nextNum=0;
    var flag=false;
    function wheel() {
            nextNum++;
            if (nextNum>=3){
                nextNum=0;
                flag=true;
            }
            $("main .pic li").eq(currentNum).animate({
                width:"100%",
                height:"100%"
            },1000,"swing",function () {
                $(this).css({"left":"120%","width":"120%","height":"120%","zIndex":"1"})
            });
            $("main .pic li").eq(nextNum).animate({
                left:"0"
            },1000,"swing",function () {
                $(this).css({"zIndex":"0"});
                currentNum=nextNum;
                currentTime=0;
                flag=false
            });

    }
    //下方进度条
    function progress() {
        currentTime+=50;
        var W=currentTime/2000;
        if (W>1){
            W=1;
        }
        $("main .cycle .progress").eq(currentNum).css("width",W*100+"%");
        if (flag){
            $("main .cycle .progress").css("width",0)
        }
    }
    var  t1=setInterval(wheel,3000);
    var  t2=setInterval(progress,50);
    $(window).blur(function() {
        clearInterval(t1);
        clearInterval(t2);
    });
    $(window).focus(function() {
        t1=setInterval(wheel,3000);
        t2=setInterval(progress,50);
    });

    function stop(type) {
        clearInterval(t1);
        clearInterval(t2);


        $("main .cycle li").find(".progress").css("width",0);
        $("main .cycle .progress").eq(nextNum).css("width","120%");
        if (type=="right"){
            $("main .pic li").eq(currentNum).animate({
                width:"100%",
                height:"100%"
            },1000,"swing",function () {
                $(this).css({"left":"100%","width":"100%","height":"120%","zIndex":"1"})
            });
            $("main .pic li").eq(nextNum).animate({
                left:"0"
            },1000,"swing",function () {
                $(this).css({"zIndex":"0"});
                currentNum=nextNum;
            });
        }

        if(type=="left"){
            $("main .pic li").eq(currentNum).animate({
               "left":"100%"
            },1000,"swing").css("zIndex",1);
            $("main .pic li").eq(nextNum).css({
                width:"100%",height:"100%",left:0,zIndex:0
            }).animate({width:"100%",height:"120%"},1000,"swing",function(){
                currentNum=nextNum;
            });
        }
    }
    $("main .cycle li").click(function () {

        nextNum=$(this).index();
        if (currentNum<nextNum){

            stop("right");
        }else if(currentNum==nextNum){
            return false
        }else {
            stop("left")
        }

    });


    $(".banner .btn_l").click(function(){
        nextNum--;
        if(nextNum<=-1){
            nextNum=2;
        }
        stop("left");
    });
    $(".banner .btn_r").click(function(){
        nextNum++;
        if(nextNum>=3){
            nextNum=0;
        }
        stop("right");
    });


    //下拉菜单

$("header").click(function () {
    var attr=$("header .list").css("display");
    if (attr=="none"){
        $("body").css({
            overflowY:"hidden"
        });
        $(".top-bar").css("display","none");
        $("header nav").css("top",0);
        $("header nav .menu span:eq(0)").css({
            "top": "20px",
        "transform": "rotate(45deg)"
        });
        $("header nav .menu span:eq(1)").css({
            "top": "20px",
            "transform": "rotate(-45deg)"
        });
    }
    if (attr=="block"){
        $("body").css({
            overflowY:"scroll"
        });
        $(".top-bar").css("display","block");
        $("header nav").css("top","40px");

        $("header nav .menu span:eq(0)").css({
            "top": "15px",
            "transform": "rotate(0deg)"
        });
        $("header nav .menu span:eq(1)").css({
            "top": "24px",
            "transform": "rotate(0deg)"
        });
    }
    var clientW=$(window).width();
    var clientH=$(window).height();
    $(window).resize(function () {
        clientW=$(window).width();
        clientH=$(window).height();
        $("header .list").innerWidth(clientW);
        $("header .list").innerHeight(clientH);
        if (clientW>735){
            $("header .list").css("display","none");
            $("body").css({
                overflowY:"scroll"
            });
        }
    });
    
    $("header .list").innerWidth(clientW);
    $("header .list").innerHeight(clientH);
    $("header .list").slideToggle(600,"swing");
    $("header nav .list a").toggleClass("list-an");
    $("header nav .list p").toggleClass("list-an");


});



    // 底部下拉菜单
    $("footer .directory .block-inner h1").click(function () {
        $(this).next(".nav-son").slideToggle(1000,"swing");
        $(this).toggleClass("cha");

    })
});
