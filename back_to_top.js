/**
 * Created by lenovo on 2017/4/24.
 */
window.onload = function(){
    var btn = document.getElementById('backBtn');
    //��ȡ�������ĸ߶�
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    var isTop = true;
    //����������ʱ����
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
        //��ʱ��
        timer = setInterval(function(){
            //��ȡ���������붥���ĸ߶�
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;//����ȸ費һ��
            var ispeed = Math.floor(-osTop / 7);//����С��
            document.documentElement.scrollTop = osTop + ispeed; document.body.scrollTop = osTop + ispeed;
            isTop = true;
            //�����ʱ��
            if(osTop == 0){
                clearInterval(timer);
            }
        },30);

    }
}