$(function(){
    var canvasBox=document.querySelector(".canvas-box");
    var canvasBoxW=canvasBox.offsetWidth;
    var canvasBoxH=canvasBox.offsetHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    canvas.width=canvasBoxW;
    canvas.height=canvasBoxH;



    var drawObj=new shape(canvas,copy,cobj);
    /*菜单选项*/
    $(".menu-list").click(function(){
        var index=$(this).index(".menu-list");
        $(".aside-menu-list").hide().eq(index).slideToggle();
        $(".xp").css({display:"none"});
        drawObj.isshowxp=false;

    })

    /*画图*/
    $(".aside-menu-list:eq(1) li").click(function(){
        var fn=$(this).attr("data-role");
        if(fn=="bian"){
            drawObj.bianNum=prompt("请输入边数",drawObj.bianNum);
        }
        if(fn=="jiao"){
            drawObj.jiaoNum=prompt("请输入角数",drawObj.jiaoNum);
        }
        if(fn!=="pen") {
            drawObj.type = fn;
            drawObj.draw();
        }else{
            drawObj.pen();
        }
    })


    /*颜色*/
    $(".aside-menu-list:eq(2) li input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })

    /*画图方式*/
    $(".aside-menu-list:eq(3) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.style=fn;
        drawObj.draw();
    })


    /*线条宽度*/
    $(".aside-menu-list:eq(4) li").click(function(){
        var num=$(this).attr("data-role");
        if(num!=="null"){
            drawObj.linew=num;
            drawObj.draw();
        }
    })
    $(".aside-menu-list:eq(4) li input").change(function(){
        var num=$(this).val();
        drawObj.linew =num
        drawObj.draw();

    })


    /*文件*/
    $(".aside-menu-list:eq(0) li").click(function(){
        var index=$(".aside-menu-list:eq(0) li").index(this);
        if(index==0){
            if(drawObj.historys.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet")
                    location.href=newurl;
                }
                cobj.clearRect(0,0,canvas.width,canvas.height);
                drawObj.historys=[];
            }
        }else if(index==1){
            if(drawObj.historys.length==0){
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("已经没有图像了，不能撤销了");
                },50)
            }else if(drawObj.isback){
                if(drawObj.historys.length==1){
                    drawObj.historys.pop();
                    cobj.putImageData(0,0,canvas.width,canvas.height);
                }else{
                    drawObj.historys.pop();
                    cobj.putImageData(drawObj.historys[drawObj.historys.length-1], 0, 0);
                }
            }else{
                cobj.putImageData(drawObj.historys.pop(), 0, 0);
            }
            drawObj.isback=false;
        }else if(index==2){
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet");
            location.href=newurl;
        }
    })


    /*擦除*/
    $(".menu-list:eq(5)").click(function(){
        var xpObj=$(".xp");
        drawObj.clear(xpObj);
        drawObj.isshowxp=true;
    })
    /*橡皮大小*/
    $(".aside-menu-list:eq(5) li input").change(function(){
        drawObj.xpsize=$(this).val();
        $(".xp").css({
            width:$(this).val()+"px",
            height:$(this).val()+"px"
        })
    })







    /*马赛克*/
    function m(dataobj,num,x,y) {
        var width = dataobj.width, height = dataobj.height;
        var num = num;
        var w = width / num;
        var h = height / num;
        for (var i = 0; i < num; i++) {//行
            for (var j = 0; j < num; j++) {//列  x
                var dataObj = cobj.getImageData(j * w, i * h, w, h);
                var r = 0, g = 0, b = 0;
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                //console.log(r + "--" + g + "--" + b);
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    dataObj.data[k * 4 + 0] = r;
                    dataObj.data[k * 4 + 1] = g;
                    dataObj.data[k * 4 + 2] = b;
                }
                cobj.putImageData(dataObj, x + j * w, y+i * h);
            }
        }
    }
    /*模糊*/
    function blur(dataobj,num,x,y) {
        var width = dataobj.width, height = dataobj.height;
        var arr=[];
        var num = num;
        for (var i = 0; i < height; i++) {//行
            for (var j = 0; j < width; j++) {//列
                var x1=j+num>width?j-num:j;
                var y1=i+num>height?i-num:i;
                var dataObj = cobj.getImageData(x1, y1,num, num);
                var r = 0, g = 0, b = 0;
                for (var k = 0; k < dataObj.width * dataObj.height; k++) {
                    r += dataObj.data[k * 4 + 0];
                    g += dataObj.data[k * 4 + 1];
                    b += dataObj.data[k * 4 + 2];
                }
                r = parseInt(r / (dataObj.width * dataObj.height));
                g = parseInt(g / (dataObj.width * dataObj.height));
                b = parseInt(b / (dataObj.width * dataObj.height));
                arr.push(r,g,b,255);
            }
        }
        for(var i=0;i<dataobj.data.length;i++){
            dataobj.data[i]=arr[i]
        }
        cobj.putImageData(dataobj,x,y);
    }
    //反向
    function fx(dataobj,x,y){
        for(var i=0;i<dataobj.width*dataobj.height;i++){
            dataobj.data[i*4+0]=255-dataobj.data[i*4+0];
            dataobj.data[i*4+1]=255-dataobj.data[i*4+1];
            dataobj.data[i*4+2]=255-dataobj.data[i*4+2];
            dataobj.data[i*4+3]=255
        }
        cobj.putImageData(dataobj,x,y);
    }
    var  file=document.querySelector("input[type=file]");
    var img=document.querySelector("img");
    file.onchange=function(){
        var fileObj=this.files[0];
        var reader=new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload=function(e){
            img.src= e.target.result;
            cobj.drawImage(img,0,0,500,450)
            dataobj=cobj.getImageData(0,0,500,450);
        }
    }
    var lis=$(".aside-menu-list:last-child li");
    for(var i=0;i<lis.length;i++){
        lis[i].onclick=function(){
            var attr=this.getAttribute("data-role")
            if(attr=="blur"){
                blur(dataobj,5,0,0)
            }else if(attr=="fx"){
                fx(dataobj,0,0)
            }else if(attr=="m"){
                m(dataobj,50,0,0)
            }
        }

    }







})