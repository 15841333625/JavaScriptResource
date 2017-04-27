/**
 * Created by lenovo on 2017/4/27.
 */

//绑定事件函数
function bind(el, eventType, callback){
    if(typeof el.addEventListener === "function"){      //标准浏览器接口
        el.addEventListener( eventType, callback,false);
    }else if(typeof  el.attachEvent === "function"){   //ie浏览器接口
        el.attachEvent('on' + eventType, callback);
    }
}

//回调函数 确定点击事件发生后调用的函数
function mouseoverHandler(e){
    var target = e.target || e.srcElement;    //确定点击事件触发者  标准浏览器和 ie 浏览器属性不同
    var outer = document.getElementById('subject');
    var list = outer.getElementsByTagName('li');

    for(var j = 0; j<list.length; j++){
        list[j].className = " ";
    }

    while(target.tagName != "LI" && target.tagName != "BODY"){
        target = target.parentNode;
    }

    target.className = "big";
}

function initList(){
    var outer = document.getElementById('subject');
    var list = outer.getElementsByTagName('li');
    for(var i = 0; i<list.length; i++){
        //绑定事件函数, 将点击事件绑定到 li 标签上
        bind(list[i], 'mouseover', mouseoverHandler);
    }
}

initList();