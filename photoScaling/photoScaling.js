/**
 * Created by lenovo on 2017/4/25.
 */
//ȷ����ҳ�����ʱ�������ȷ��ͼƬ��С
window.onload = function(){
    var max = document.getElementById("max");
    var img = document.getElementById("myImg");
    var timer = null;
    var maxWidth = img.width * 2;//�Ŵ���ֵ
    var minWidth = img.width * 0.5;//��С����ֵ
    //��ӷŴ�ť����¼�
    max.onclick = function(){
        maxFun();//�Ŵ���
    }
    //����Ŵ���
    function maxFun(){
        var endWidth = img.width * 1.3;//ÿ�ε����Ŀ��
        timer = setInterval(function(){
            if(img.width < endWidth) {
                if(img.width < maxWidth){
                    img.width *= 1.05;
                    img.height *= 1.05;
                }else{
                    alert("�Ѿ������ֵ��");
                    clearInterval(timer);
                }
            }else{
                clearInterval(timer);
            }
        },20)
    }
    var min = document.getElementById("min");
    //�����С��ť����¼�
    min.onclick = function(){
        minFun();//��С����
    }
    //������С����
    function minFun(){
        var endWidth = img.width * 0.8;
        timer = setInterval(function(){
            if(img.width > endWidth){
                if(img.width > minWidth){
                    img.width *= 0.95;
                    img.height *= 0.95;
                }else{
                    alert("�Ѿ�����Сֵ��");
                    clearInterval(timer);
                }
            }else{
                clearInterval(timer);
            }
        },20)
    }
}