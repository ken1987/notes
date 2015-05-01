#javascript运算

世界上有 10 种人，一种是懂二进制的，一种是不懂二进制的。

##意外的产生
	
	//浮点运算
	0.1+0.2    		 		// 0.30000000000000004   
	-0.09-0.01 				// -0.09999999999999999  
	0.2+0.4==0.6 			// false

	//大数值运算
	12345678901234567+0   	// 12345678901234568
	12345678901234567+1   	// 12345678901234568
	12345678901234567+2   	// 12345678901234570

##浮点运算

###原理
###解决办法
1.避免在js中使用浮点运算
2.

##大数值运算
Number.MIN_VALUE~Number.MAX_VALUE
Infinity


##参考网站：
http://blog.csdn.net/xujiaxuliang/article/details/5939573
http://rockyee.iteye.com/blog/891538
http://rockyee.iteye.com/blog/891547
http://justjavac.com/codepuzzle/2012/11/02/codepuzzle-float-from-surprised-to-ponder.html