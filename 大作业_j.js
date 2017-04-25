/**
 * Created by lenovo on 2016/12/19.
 */
function menuFixed(id){
    var obj = document.getElementById(id);
    var _getHeight = obj.offsetTop;

    window.onscroll = function(){
        changePos(id,_getHeight);
    }
}
function changePos(id,height) {
    var obj = document.getElementById(id);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < height) {
        obj.style.position = 'relative';
        obj.style.boxShadow = '0 0 0 0';
    } else {
        obj.style.position = 'fixed';
        obj.style.boxShadow = ' 0 0 8px 2px #cccccc'
        obj.style.top = '0'
    }
}