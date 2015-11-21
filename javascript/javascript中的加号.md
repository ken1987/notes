#javascript中的加号


先来看几个例子

````javascript

+ null;			//0
1 + null;		//1

+ [];  			//0
1 + []; 		//"1"

`````

##一元运算符

如例子中1、3行那样，作为一元运算符时，将操作数强制转换为Number类型，效果等同于`Number(operand)`。

````javascript

+ null;		//==> Number(null) ==> 0
+ [];		//==> "" ==> Number("") ==> 0
+ [1];		//==> "1" ==> Number("1") ==> 1
+ [1,2];	//==> "1,2" ==> Number("1,2") ==> NaN

`````

参考：[Unary + Operator](http://www.ecma-international.org/ecma-262/6.0/#sec-unary-plus-operator)

##二元运算符

如例子中2、4行那样，作为二元运算符时，则具有二义性，是执行加法运算，还是字符连接呢？

大致过程如下：
>1. 将左右操作数*转换原始类型*
>2. 如果转换后的操作数包含String类型，则将他们都转换成String类型，执行字符连接。
>3. 否则，都转换成Number类型，进行加法运算。

例子`1 + null`中，1是原始类型Number，null是原始类型Null，因此执行1和3。

````javascript

1 + null;			//==> 1 + 0	==> 1
1 + undefined;		//==> 1 + NaN  ==> NaN

`````

例子`1 + []`中，[]是引用类型Object，通过转换它成了String类型，因此执行1和2。

````javascript

1 + []; 			//==> 1 + "" ==> "1" + "" ==> "1"
1 + [1]; 			//==> 1 + "1" ==> "1" + "1" ==> "11"
1 + [1,2]; 			//==> 1 + "1,2" ==> "1" + "1,2" ==> "11,2"

`````

参考：[The Addition operator](http://www.ecma-international.org/ecma-262/6.0/#sec-addition-operator-plus)

##转换原始类型的实现过程

没找到PreferredType的解释，大致可认为Object转换成原始类型的首选类型是String。

参考：[PreferredType](http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive)

##区分`++`和`+`

先看例子：

````javascript

	1 + + + [] //1

````

压根没有`++`的事情，`++`中间不带空格，上面可以看作

````javascript

	1 + (+ (+ [])) // ==> 1+(+0) ==> 1+0 ==> 1 

````
