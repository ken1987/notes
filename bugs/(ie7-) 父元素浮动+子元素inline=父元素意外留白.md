#(ie7-) 父元素浮动+子元素inline=父元素意外留白

##场景

当父元素设置浮动，并且子元素呈现出inline或者inline-block时（除非子元素宽度设置100%）

此时父元素不能自适应子元素内容的宽度，导致父容器出现宽度被意外撑大。

![bug](images/bug.png)

````html

<div style="float:left;border:1px solid blue;background:white;">
	<input type="text" style="background:red;">
</div>

````

##解决方案

1.给父元素添加样式*display:inline
2.在某些场景给子元素宽度100%
