window.onload = (function () {

    // var input = $("num_input");     //输入框 2
    var data_text = $("data_text");  //文本框
    var show = $("show");           //要显示的div框架
    var count = 0;                  //记录输入的个数


    function $(elem) {
        return document.getElementById(elem);
    }

    //获得input中的文本，成功返回数字，失败返回null    2
    // function getNum(elem) {
    //     if(count === 60){
    //         alert("无法继续添加！");
    //         return null;
    //     }
    //     var text = elem.value;
    //     var itext = parseInt(text);
    //     elem.value = "";
    //     elem.focus();
    //     if(!itext){
    //         alert("请输入数字！");
    //         return null;
    //     }
    //     else if(itext < 10 || itext > 100){
    //         alert("请输入10-100之间的数字！");
    //         return null;
    //     }
    //     else
    //         return itext;
    // }

    //获得文本框中内容
    function getContent(elem){
        var text = elem.value;
        var data = text.split(",");
        elem.value = "";
        elem.focus();
        return data;
    }

    //创建新节点并返回
    function creatNode(text) {
        var node = document.createElement("div");
        var nodetext = document.createTextNode(text);
        // node.style.height = text + "px";
        node.appendChild(nodetext);
        node.setAttribute("class", "num");
        node.addEventListener("click", function () {
            count --;
            alert(this.textContent);
            show.removeChild(this);
        });
        count ++;
        return node;
    }

    function creatNodes(text) {
        var arr = new Array();
        for(var i = 0; i < text.length; i ++){
            arr[i] = creatNode(text[i]);
        }
        return arr;
    }

    //左侧入
    $("leftin").addEventListener("click", function () {
        // var text = getNum(input);
        var text = getContent(data_text);
        if(text){
            var node = creatNodes(text);
            if(show.firstChild){
                node.forEach(function (t) {
                    show.insertBefore(t, show.firstChild);
                })
            }
            else{
                show.appendChild(node[0]);
                for(var i = 1; i < node.length; i ++){
                    show.insertBefore(node[i], show.firstChild);
                }
            }
        }
    });

    //右侧入
    $("rightin").addEventListener("click", function () {
        // var text = getNum(input);
        var text = getContent(data_text);
        if(text){
            var node = creatNodes(text);
            node.forEach(function (t) {
                show.appendChild(t);
            })
        }
    });

    //左侧出
    $("leftout").addEventListener("click", function () {
        alert(show.firstChild.textContent);
        count --;
        show.removeChild(show.firstChild);
    });

    //右侧出
    $("rightout").addEventListener("click", function () {
        alert(show.lastChild.textContent);
        count --;
        show.removeChild(show.lastChild);
    });

    //排序
    $("sort").addEventListener("click", function () {
       var data = new Array();
       var divs = show.children;
       var len = divs.length;
       //将数据录入数组
       for(var i = 0; i < len; i ++){
           data[i] = divs[i].textContent;
       }
       //在数组中排序
       for(var i = 0; i < len - 1; i ++){
           for(var j = 0; j < len - i - 1; j ++ ){
               if(data[j] > data[j + 1]){
                   var temp = data[j];
                   data[j] = data[j+1];
                   data[j+1] = temp;
               }
           }
       }
       //重新刷新
       for(var i = 0; i < len; i ++){
           divs[i].style.height = data[i] + "px";
           divs[i].textContent = data[i];
       }
    });

    function search(target, data) {
        var result = new Array();
        data.forEach(function (t, n) {
            if(t.indexOf(target) != -1)
                result.push(n);
        });
        return result;
    }

    //搜索
    $("search").addEventListener("click", function () {
        var target = $("ser_input").value;
        var elems = show.children;
        var data = new Array();
        for(var i = 0; i < elems.length; i ++){
            data[i] = elems[i].textContent;
        }
        var result = search(target, data);
        if(result.length > 0){
            for(var i = 0; i < result.length; i ++){
                elems[result[i]].style.backgroundColor = "#FFFFFF";
            }
        }else{
            alert("没有符合条件的选项！");
        }
    });

    $("ser_input").addEventListener("focus", function () {
        this.value = "";
        var elems = show.children;
        for(var i = 0; i < elems.length; i ++){
            elems[i].style.backgroundColor = "crimson";
        }
    })

    //随机生成10个随机数
    // for(var i = 0; i < 10; i ++){
    //     (function () {
    //         //产生10-100的随机数
    //         var temp = Math.floor(Math.random()*90 + 10);   //10-100, Math.random()产生一个 0-1 的随机数
    //         var node = creatNode(parseInt(temp));
    //         show.appendChild(node);
    //     })();
    // }
})();