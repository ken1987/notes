#(ie7-) 子元素定位+父元素有滚动条=子元素不能随滚动条滚动

##场景

子元素position非static，拉动父元素（可以不是直接父级）时，子元素不能随滚动条滚动

##解决办法

给**出现滚动条**的父元素添加position属性，属性值非static