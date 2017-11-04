window.onload = function(){
	{
		//新增块级作用域，避免全局变量污染
		let test = document.getElementsByClassName('test');
		//es6
		for(let i = 0; i < test.length; i ++){
			test[i].addEventListener('click', function(){
				alert(i);
			});
		}
	}
	{
		let f1 = function() {
			let n = 5;
			if(true){
				let n = 10;
			}
			console.log(n);
		};
		f1();//5
	}
	{
		//解构变量赋值，Set内置对象
		let [x, y, z] = new Set(["a", "b", "c"]);
		console.log(typeof(x));
		let s = new Set();
		s.add(2);
		s.add(5);
		s.forEach(function(item){
			console.log(item.toString());
		});	
	}
	{
		//解构赋值用途
		//1.交换变量值
		let x = 5, 
				y = 6;
		[x,y] = [y,x];	
		console.log(x+','+y);
		//2.从函数返回多个值
		//返回数组
		let exmple = function(){
			return [1,2,3];
		};
		let [a,b,c] = example();
		//返回一个对象
		let example2 = function(){
			return {
				foo: 1,
				bar: 2
			};
		};
		let {foo, bar} = example2();
		//提取json数据
		let jsonData = {
			id: 42,
			status: "OK",
			data: [853, 98]
		};
		let {id, status, data: number} = jsonData;
		console.log(id, status, number);
	}
				//es5
				//匿名函数闭包实现for循环
	//			for(var i = 0; i < test.length; i ++){
	//				(function(i){
	//					test[i].addEventListener('click',function(){
	//						alert(i);
	//					})
	//				})(i);
	//			}
	//			
	//			
	//			var tmp = new Date();
	//			function f(){
	//				console.log(tmp);
	//				if(false){
	//					var tmp = "hello world!";
	//				}
	//			}
	//			f();//undefined
};