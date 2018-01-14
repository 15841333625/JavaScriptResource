window.onload = (function () {
    function $(elem) {
        return document.getElementById(elem);
    }

   function display(target) {  //target为要显示的位置
       var text = $("aqi-input").value;
       target.innerText = text;
   }
   $("button").addEventListener("click",function () {
       var target = $("aqi-display");
       display(target);
   });

    function swap(data, i, j) {
        for(var k = 0; k < 2; k ++){
            var temp = data[i][k];
            data[i][k] = data[j][k];
            data[j][k] = temp;
        }
    }
    function sort(data) {
        for(var i = 0; i < data.length - 1; i ++){
            for(var j = 0; j < data.length - i - 1; j ++){
                if(data[j][1] > data[j + 1][1]){
                    swap(data, j, j+1);
                }
            }
        }
    }
    var list = document.getElementsByTagName("ul");
    function compare() {
        var aqiData = [
            ["北京", 90],
            ["上海", 50],
            ["福州", 10],
            ["广州", 50],
            ["成都", 90],
            ["西安", 100]
        ];
        sort(aqiData);
        for(var i = 0; i < aqiData.length; i ++){
            var node = document.createElement("li");
            var textnode = document.createTextNode("第 " + (i+1) + " 名：" + aqiData[i][0] + " " + aqiData[i][1]);
            node.appendChild(textnode);
            list[0].appendChild(node);
            if(aqiData[i][1] > 60){
                var node2 = node.cloneNode(true);
                list[1].appendChild(node2);
            }
        }
    }
    compare();

    function getData() {
        var data = new Array();
        var li = list[2].children;
        for(var i = 0; i < li.length; i ++){
            data[i] = new Array();
            for(var j = 0; j < 2; j ++){
                data[i][j] = "";
            }
        }
        for(var i = 0; i < li.length; i ++){
            var string = li[i].firstChild.textContent;
            var place = string.slice(0, 2);
            data[i][0] = place;
            var num = li[i].lastChild.textContent;
            data[i][1] = num;
        }
        // data.forEach(function (t) { console.log(t[0] + " " + t[1]) });
        return data;
    }
    $("sort-btn").addEventListener("click",function () {
        var data = getData();
        sort(data);
        for(var i = 0; i < data.length; i ++){
            var node = document.createElement("li");
            var textnode = document.createTextNode(data[i][0] + " " + data[i][1]);
            node.appendChild(textnode);
            list[3].appendChild(node);
        }
    })
})();