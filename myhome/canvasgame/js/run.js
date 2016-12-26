window.onload= function () {
    var clientW=document.documentElement.clientWidth;
    var clientH=document.documentElement.clientHeight;
    var canvas=document.getElementsByTagName("canvas")[0];
    canvas.width=clientW;
    canvas.height=clientH;
    var cobj=canvas.getContext("2d");

    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");

    var runA=document.querySelector(".runA");
    var jumpA=document.querySelector(".jumpA");
    var hitA=document.querySelector(".hitA");
    var bgA=document.querySelector(".bgA");
    var endA=document.querySelector(".endA");

    var gameObj=new game(canvas,cobj,runs,jumps,hinderImg,bgA,runA,jumpA,hitA,endA);


    var start=$(".start");
    var mask=$(".mask");
    var startBtn=$(".kaishi");
    var lifes=$(".life");
    var fenshu=$(".fenshu");
    var beginGame=$("#begin-game");
    var zailai=$(".zailai");
    
    startBtn.one("click",function () {
        gameObj.play(start,mask,lifes,fenshu);

    })
    zailai.one("click",function () {
        gameObj.zailai(start,mask,lifes,fenshu,beginGame);
        $("#lzhi")[0].innerHTML=5;
        $("#fzhi")[0].innerHTML=0;
    })
}