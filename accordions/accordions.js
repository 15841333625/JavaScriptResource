/**
 * Created by lenovo on 2017/4/27.
 */

//���¼�����
function bind(el, eventType, callback){
    if(typeof el.addEventListener === "function"){      //��׼������ӿ�
        el.addEventListener( eventType, callback,false);
    }else if(typeof  el.attachEvent === "function"){   //ie������ӿ�
        el.attachEvent('on' + eventType, callback);
    }
}

//�ص����� ȷ������¼���������õĺ���
function mouseoverHandler(e){
    var target = e.target || e.srcElement;    //ȷ������¼�������  ��׼������� ie ��������Բ�ͬ
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
        //���¼�����, ������¼��󶨵� li ��ǩ��
        bind(list[i], 'mouseover', mouseoverHandler);
    }
}

initList();