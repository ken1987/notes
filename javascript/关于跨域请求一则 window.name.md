关于跨域请求一则 window.name
============================

##基础

1. name 在浏览器环境中是一个全局/window对象的属性，且当在 frame 中加载新页面时，name 的属性值依旧保持不变
2. name 属性仅对相同域名的 frame 可访问
3. 可以支持非常长的 name 值（2MB）

##流程
1. 创建一个隐藏的iframe节点，目标指向跨域请求地址
2. 等待请求页面加载完毕，此时window.name已经有了新值，但是跨域，不能访问window.name
3. 接着，修改iframe的地址，指向同域代理页面（不需要有实际内容，空的节约流量）
4. 等待新的页面加载完毕，此时已经是同域了，可以获取window.name的值了
5. 最后，防止其他代码访问window.name，可以把iframe删除

##样例

跨域请求地址：http://localshost:20000/test.html
		
		<script>window.name = "something"</script>

主站代理请求：http://localshost:10000/proxy.html
		
		//空着就好了

主站地址：http://localshost:10000/index.html

        <iframe src="http://localhost:10000/test.html" style="display:none;"></iframe>
	    <script>
	        var i,ifr = document.getElementsByTagName("iframe")[0];
	        ifr.onload = function() {
	            if (i) {
	                alert("main: " + ifr.contentWindow.name);
	            } else {
	                ifr.src = "/proxy.html";
	                i = 1;
	            }
	        };
	    </script>

##总结

过程和jsonp的过程很像，两次请求量，感觉还是有点怪怪的。

##参考资料

1. http://www.planabc.net/2008/09/01/window_name_transport/
2. http://zcw.me/blogwp/crossdomain/
