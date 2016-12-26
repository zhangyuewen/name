function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=50;
    this.y=320;
    this.width=390;
    this.height=290;
    //this.zhongli=10;
    this.speedx=15;
    //this.speedy=5;
    this.status="runs";
    this.state=0;
    this.num=0;
    this.life=5;
}
person.prototype={
    draw: function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state], 0, 0, 430, 313, 0, 0, this.width, this.height);
        this.cobj.restore();
    },
    update: function () {
      xue(this.cobj,this.x+this.width/5,this.height/5);
    }
}


//障碍物
function hinder(canvas,cobj,hinderImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderImg=hinderImg;
    this.state=0;
    this.x=canvas.width;
    this.y=520;
    this.width=80;
    this.height=60;
    this.speedx=10;
}
hinder.prototype={
    draw: function () {
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hinderImg[this.state], 0, 0, 200, 200, 0, 0, this.width, this.height);
        this.cobj.restore();
    }
}


//受伤出血
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=200;
    this.r=1+3*Math.random();
    this.color="red";
    this.speedy=2*Math.random()-1;
    this.speedx=2*Math.random()-1;
    this.zhongli=0.1;
    this.speedr=0.05;
}
lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();

    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;

    }
}


//出血
function xue(cobj,x,y,color){
    var xuearr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(cobj);
        obj.x=x;
        obj.y=y;
        obj.color=color;
        xuearr.push(obj);
    }
    var xiet=setInterval(function(){
        for(var i=0;i<xuearr.length;i++){
            xuearr[i].draw();
            xuearr[i].update();
            if(xuearr[i].r<0){
                xuearr.splice(i,1);
            }
        }
        if(xuearr.length==0){
            clearInterval(xiet);
        }

    },50)
}







/*游戏的主类*/
function game(canvas,cobj,runs,jumps,hinderImg,bgA,runA,jumpA,hitA,endA){
    this.person=new person(canvas,cobj,runs,jumps);
    this.canvas=canvas;
    this.hinderImg=hinderImg;
    this.cobj=cobj;
    this.bgA=bgA;
    this.runA=runA;
    this.jumpA=jumpA;
    this.hitA=hitA;
    this.endA=endA;
    this.width=canvas.width;
    this.height=canvas.height;
    this.backx=20;
    this.backSpeed=15;
    this.hinderArr=[];
    //new hinder(canvas,cobj,hinderImg).draw();
    this.score=0;

}
game.prototype={
    play: function (start,mask,life,fenshu) {
        //幕布拉起
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        life.css("animation","life 2s ease forwards");
        fenshu.css("animation","life 2s ease forwards");
        this.run();
        this.key();

    },
    zailai: function (start,mask,life,fenshu,beginGame) {
        mask.css("animation","mask1 2s ease forwards");
        life.css("animation","life 2s ease forwards");
        beginGame.css("animation","begin1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
        location.reload();
        //this.person.life=5;
        //this.score=0;
        this.run();
        this.key();
    },
    run: function () {
        var that=this;
        that.bgA.play();
        var num=0;
        var rand=(3+Math.ceil(8*Math.random()))*1000;
        var gamet=setInterval(function () {
            num+=50;
            that.cobj.clearRect(0,0,that.width,that.height);
            //计算图片
            that.person.num++;

            if(that.person.status=="runs"){
                that.person.state=that.person.num%10;
            }else {
                that.person.state=0;
            }

            /*让人物的X发生变化*/
            that.person.x+=that.person.speedx;
            if(that.person.x>that.width/5){
                that.person.x=that.width/5;
            }else {
                that.person.speedx=8;
                that.backSpeed=8;
            }
            that.person.draw();
            //障碍物
            if(num%rand==0){
                rand=(3+Math.ceil(8*Math.random()))*1000;
                num=0;
                var obj=new hinder(that.canvas,that.cobj,that.hinderImg);
                obj.state=Math.floor(Math.random()*that.hinderImg.length);
                that.hinderArr.push(obj);

            }
            for(var i=0;i<that.hinderArr.length;i++){
                that.hinderArr[i].x-=that.hinderArr[i].speedx;
                that.hinderArr[i].draw();

                if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
                    if(!that.hinderArr[i].flag){
                        that.person.life--;
                        that.hitA.play();
                        xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2,"red");
                        //生命值
                        document.getElementById('lzhi').innerHTML=that.person.life;
                        if(that.person.life<=0){
                            clearInterval(gamet);
                            document.getElementById('begin-game').style.animation="begin 2s ease forwards";
                            document.getElementsByClassName('mask')[0].style.animation="mask 2s ease forwards";
                            that.bgA.pause();
                            that.endA.play();
                            //location.reload();
                        }
                        that.hinderArr[i].flag=true;
                    }

                }

                if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
                    if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
                        that.score++;
                        document.getElementById('fzhi').innerHTML=that.score;
                        document.getElementById('goodfenshu').innerHTML=that.score;
                        that.hinderArr[i].flag1=true;
                    }

                }
            }

            //操作背景
            that.backx-=that.backSpeed;
            that.canvas.style.backgroundPositionX=that.backx+"px";
        },50)

    },
    key: function () {
        var that=this;
        var flag=true;
        document.onkeydown= function (e) {
            if(!flag){
                return;
            }
            flag=false;
            if(e.keyCode==32){
                that.jumpA.play();
                that.person.status="jumps";
                var inita=0;
                var speeda=5;
                var r=130;
                var y=that.person.y;
                var t=setInterval(function () {
                    inita+=speeda;
                    if(inita>=180){
                        clearInterval(t);
                        flag=true;
                        that.person.status="runs";
                    }
                    var top=Math.sin(inita*Math.PI/180)*r;
                    that.person.y=y-top;

                },50)
            }
        }
    },

}
