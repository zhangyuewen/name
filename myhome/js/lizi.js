window.onload= function () {
    //鼠标粒子
    var canvas=document.querySelector("canvas");
    var ch=document.documentElement.clientHeight;
    var cw=document.documentElement.clientWidth;
    canvas.width=cw;
    canvas.height=ch;
    var context=canvas.getContext("2d");

    var balls=[];
    var colors=["#fff"];

    function draw(ball){
        context.beginPath();
        context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
        context.fillStyle=ball.color;
        context.fill();

    }
    function random(min,max){
        return Math.round(Math.random()*(max-min)+min)
    }
    canvas.onmousemove=function(ev){
        for(var i=0;i<2;i++){
            var ball={
                x:random(-5,5)+ev.clientX,
                y:random(-5,5)+ev.clientY+window.pageYOffset,
                r:random(2,5),
                vx:Math.random()-0.5,
                vy:Math.random()-0.5,
                color:colors[random(0,colors.length-1)]
            };
            balls.push(ball);
            if(balls.length>300){
                balls.shift()
            }

        }
        if(on){
            clearInterval(timer);
            var timer=setInterval(drallBall,30);
            on=false;
        }
    };
    drallBall();
    var on=true;

    function drallBall(){
        context.clearRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<balls.length;i++){
            balls[i].x+=balls[i].vx*8;
            balls[i].y+=balls[i].vy*8;
            balls[i].r=balls[i].r*0.94;
            balls[i].index=i;
            if(balls[i].r<1){
                balls.splice(balls[i].index,1);
                continue;
            }
            draw(balls[i]);
            if(!balls.length){
                clearInterval(timer);
                on=true;
            }
        }
    }
}