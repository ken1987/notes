#XMLHttpRequest status = 0

在做ajax异常分析时，遇到几种场景,导致的结果status为0

##场景1：跨域访问

````js
var url="http://localhost:1234/test.txt"; // 通过1234端口跨域
````

###基于jquery

````js
$.ajax({
	url:url, 
	error:function(xhr){
		console.log(xhr)
	}
});

/*
	测试结果
	readyState: 0
	responseText: ""
	status: 0
	statusText: "error"
 */

````

###基于XMLHttpRequest

````js
var xhr = new XMLHttpRequest();
xhr.open("get",url,true);
xhr.send();
xhr.onreadystatechange=function(){
    console.log(xhr);
};

/*
	测试结果：
	readyState: 4
	responseText: ""
	status: 0
	statusText: ""
	timeout: 0
 */
````

##场景2：快速跳转页面

可以是手动点击其它链接，也可以通过js

````js
var url="test.txt"; //本地测试时，如果使用本地文件，那么文件最好足够大，用来模拟网络延时
````

###基于jquery

````js
$.ajax({
	url:url,  
	error:function(xhr){
		console.log(xhr)
	}
});

location.href="http://baidu.com"; //通过js重定向到其它页面

/*
 	测试结果
 	readyState: 0
 	responseText: ""
 	status: 0
 	statusText: "error"
 */

````
###基于XMLHttpRequest

````js
var xhr = new XMLHttpRequest();
xhr.open("get",url,true);
xhr.send();
xhr.onreadystatechange=function(){
    console.log(xhr);
    console.log(xhr.readyState);
};

/*
	测试结果：
 	readyState: 4
	responseText: ""
 	status: 0
 	statusText: ""
 */
````


##场景3：通过js中断请求

````js
var url="test.txt"; //本地测试时，如果使用本地文件，那么文件最好足够大，用来模拟网络延时
````

###以下代码依赖jquery

````js

var ajax=$.ajax({
	type:"get",
	url:"test.txt",  //本地测试时，如果使用本地文件，那么文件最好足够大，用来模拟网络延时
	error:function(xhr){
		alert("网络异常");
		console.log(xhr)
	}
});

ajax.abort();

/*
	测试结果：
	readyState: 0
	status: 0
	statusText: "abort"
 */
````

###基于XMLHttpRequest

````js
var xhr = new XMLHttpRequest();
xhr.open("get",url,true);
xhr.send();
xhr.onreadystatechange=function(){
    console.log(xhr);
    console.log(xhr.readyState);
};
xhr.abort();

/*
	测试结果：
	readyState: 0
	responseText: ""
	status: 0
 	statusText: ""
 */
````

##总结

>The status attribute must return the result of running these steps:
>*status的值一定会返回运行这些步骤的结果*。
>1. If the state is UNSENT or OPENED, return 0.*如果状态是UNSENT或者OPENED，返回0*
>2. If the error flag is set, return 0.*如果错误标签被设置，返回0*
>3. Return the HTTP status code.*返回HTTP状态码*

##参考

>+ http://blog.csdn.net/iaiti/article/details/42192659
>+ http://www.w3.org/TR/XMLHttpRequest/



