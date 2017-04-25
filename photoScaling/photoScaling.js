/**
 * Created by lenovo on 2017/4/25.
 */
//确保在页面加载时即获得正确的图片大小
window.onload = function(){
    var max = document.getElementById("max");
    var img = document.getElementById("myImg");
    var timer = null;
    var maxWidth = img.width * 2;//放大极限值
    var minWidth = img.width * 0.5;//缩小极限值
    //添加放大按钮点击事件
    max.onclick = function(){
        maxFun();//放大函数
    }
    //定义放大函数
    function maxFun(){
        var endWidth = img.width * 1.3;//每次点击后的宽度
        timer = setInterval(function(){
            if(img.width < endWidth) {
                if(img.width < maxWidth){
                    img.width *= 1.05;
                    img.height *= 1.05;
                }else{
                    alert("已经到最大值了");
                    clearInterval(timer);
                }
            }else{
                clearInterval(timer);
            }
        },20)
    }
    var min = document.getElementById("min");
    //添加缩小按钮点击事件
    min.onclick = function(){
        minFun();//缩小函数
    }
    //定义缩小函数
    function minFun(){
        var endWidth = img.width * 0.8;
        timer = setInterval(function(){
            if(img.width > endWidth){
                if(img.width > minWidth){
                    img.width *= 0.95;
                    img.height *= 0.95;
                }else{
                    alert("已经到最小值了");
                    clearInterval(timer);
                }
            }else{
                clearInterval(timer);
            }
        },20)
    }
}