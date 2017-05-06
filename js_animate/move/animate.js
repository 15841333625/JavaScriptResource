/**
 * Created by lenovo on 2017/5/6.
 */
window.onload = function(){
    var show = document.getElementById("show");
    var hide = document.getElementById("hide");
    show.onclick = function(){
        startMove();
    }
    hide.onmouseover = function(){
        changeOpacity(100,5);
    }
    hide.onmouseout = function(){
        changeOpacity(40,-5);
    }
}

var timer = null;
var timer2 = null;

function startMove(){
    clearInterval(timer);
    var hide = document.getElementById("hide");
    if(hide.offsetLeft < 0){
        timer = setInterval(function(){
            if(hide.offsetLeft > -15){
                clearInterval(timer);
                hide.style.left = 0;
            }else{
                hide.style.left = hide.offsetLeft + 10 + "px";
            }
        },30)
    }else{
        timer = setInterval(function(){
            if(hide.offsetLeft == -200){
                clearInterval(timer);
            }else{
                hide.style.left = hide.offsetLeft - 10 + "px";
            }
        },30)
    }
}

var alpha =  40;

function changeOpacity( target , speed ){
    clearInterval(timer2);
    var hide = document.getElementById("hide");
    timer2 = setInterval(function(){
       if(alpha == target){
           clearInterval(timer2);
       } else {
           alpha += speed;
           hide.style.opacity = alpha/100;
       }
    },50)
}