window.onload=function(){
    //小banner
    var boxs=document.querySelector(".imgbox");
    var heights=parseInt(getComputedStyle(boxs,null).height);
    var widths=parseInt(getComputedStyle(boxs,null).width);
    var nums=5;
    var arr=[];
    for (var i=0;i<nums;i++){
        //创建场景
        var scene=document.createElement("div");
        scene.style.cssText="width:100%;height:"+heights/nums+"px;position:absolute;left:0;top:"+(i*(heights/nums))+"px;";

        //创建盒子
        var box=document.createElement("div");
        box.style.cssText="width:100%;height:100%;position:absolute;left:0;top:0;transform-style:preserve-3d;transition:transform 2s ease "+(i*0.3)+"s;transform-origin:center center -155px";
        for(var j=0;j<6;j++){
            var panel=document.createElement("div");
            panel.style.cssText="position:absolute;top:0;left:0;background:#ccc;";
            if (j==0){
                panel.style.width=widths+"px";
                panel.style.height=widths+"px";
                panel.style.transformOrigin="top";
                panel.style.transform="rotateX(-90deg)";
            }else if(j==1){
                panel.style.width="100%";
                panel.style.height=heights/nums+"px";
                panel.style.transformOrigin="left";
                panel.style.transform=" translateX(310px) rotateY(90deg)";
                panel.style.background="url(img/slider-img-1.png) no-repeat 0 "+(-i*(heights/nums))+"px";
            }else if(j==2){
                panel.style.width="100%";
                panel.style.height=heights/nums+"px";
                panel.style.background="url(img/menu-bg-home.png) no-repeat 0 "+(-i*(heights/nums))+"px";
            }else if(j==3){
                panel.style.width="100%";
                panel.style.height=heights/nums+"px";
                panel.style.transformOrigin="right";
                panel.style.transform=" translateX(-310px) rotateY(-90deg)";
                panel.style.background="url(img/slider-img-1.png) no-repeat 0 "+(-i*(heights/nums))+"px";
            }else if(j==4){
                panel.style.width="100%";
                panel.style.height=heights/nums+"px";
                panel.style.transform="translateZ(-310px)";
                panel.style.background="url(img/menu-bg-home.png) no-repeat 0 "+(-i*(heights/nums))+"px";
            }else if(j==5){
                panel.style.width=widths+"px";
                panel.style.height=widths+"px";
                panel.style.transformOrigin="bottom";
                panel.style.transform="rotateX(90deg)";
                panel.style.top=-(widths-(heights/nums))+"px";
            }

            box.appendChild(panel);
        }

        boxs.appendChild(scene);
        scene.appendChild(box);
        arr.push(box);
    }

    var init=0;
    function move() {
        init+=90;
        for(var i=0;i<arr.length;i++){
            arr[i].style.transform="rotateY("+init+"deg)";
        }
    }
    var t=setInterval(move,6000)

    window.onblur=function(){
        clearInterval(t);
    }
    window.onfocus=function(){
        t=setInterval(move,6000);
    }
}