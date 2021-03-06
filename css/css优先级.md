#CSS优先级

##规则

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明。

选择器通常是您需要改变样式的 HTML 元素。

每条声明由一个属性和一个值组成。

##优先级

根据以下规则依次逐条比较，如果当中比较出高低，则无需继续比较，否则继续比较。

###1. 浏览器预定义、继承、自身

>* 自身 > 浏览器预定义 > 继承
>* 如果样式继承于祖先元素，那么越靠近自身的祖先的样式越高

###2. `!important`

包含`!important`的声明比不包含的高

###3. 内联样式

内联样式高于非内联的样式

###4. 选择器优先级

从上往下由大到小

>* ID
>* 类
>* 伪类 | 属性
>* 元素 (包含伪元素)
>* 通配符

当一个选择器由多个选择器组合而成时：
1. 先比较 ID 选择器的个数，个数多者高
2. 若个数相同，再比较类选择器个数，个数多者优先级高
3. 以此类推，依次比较伪类选择器、属性选择器、元素选择器
4. 若仍相同，则后定义（位置在后面）的优先级高。

###5. 不同位置的优先级

通过`<style>`或 `<link>`引入样式，标签在html中位置居后可视为后定义的。

##相关疑问

###伪元素

伪元素是一种特殊的元素，只是没有定义属性（例如：id,data-id）的能力。目前包含以下几个：

>* `:first-letter` 向文本的第一个字母添加特殊样式。
>* `:first-line` 向文本的首行添加特殊样式。
>* `:before` 在元素之前添加内容。
>* `:after` 在元素之后添加内容。

````html

<p>First</p>

````

````css

p{color:red;}
p:first-letter{color:blue;}

````

上面的例子可以这么理解，元素`:first-letter`继承了父元素p的样式，并且通过选择器定义了一套自身的样式，根据上面的规则字母F呈现出蓝色


###成为笑柄

>* `1,0,0,0`--------ID
>* `0,1,0,0`--------类
>* `0,0,1,0`--------伪类 | 属性
>* `0,0,0,1`--------元素 (包含伪元素)
>* `0,0,0,0`--------通配符

一直误以为用`x,x,x,x`的方式来表示css优先级，是因为存在数值转换的关系，比如：总以为11个类选择器叠加就能超过一个ID选择器的优先级。

##参考

* [CSS 基础语法](http://www.w3school.com.cn/css/css_syntax.asp)
* [CSS 选择器参考手册](http://www.w3school.com.cn/cssref/css_selectors.asp)
* [CSS 样式优先级](http://segmentfault.com/a/1190000003860309)
* [CSS 引入方式](http://segmentfault.com/a/1190000003866058)
* [CSS:选择器与优先级](http://segmentfault.com/a/1190000003064142)
* [css的选择器效率分析](http://segmentfault.com/a/1190000000657442)