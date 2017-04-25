/**
 * Created by lenovo on 2017/4/24.
 */
window.onload = function(){
    var btn = document.getElementById('backBtn');
    //获取可视区的高度
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    var isTop = true;
    //滚动条滚动时触发
    window.onscroll = function(){
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(osTop >= clientHeight){
            btn.style.display = 'block';
        }else{
            btn.style.display = 'none';
        }

        if(!isTop){
            clearInterval(timer);
        }
        isTop = false;
    }

    btn.onclick = function(){
        //定时器
        timer = setInterval(function(){
            //获取滚动条距离顶部的高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;//火狐谷歌不一样
            var ispeed = Math.floor(-osTop / 7);//砍掉小数
            document.documentElement.scrollTop = osTop + ispeed; document.body.scrollTop = osTop + ispeed;
            isTop = true;
            //清除定时器
            if(osTop == 0){
                clearInterval(timer);
            }
        },30);

    }
}