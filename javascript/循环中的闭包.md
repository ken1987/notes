#循环中的闭包
摘自：https://bonsaiden.github.io/JavaScript-Garden/zh/

例子如下，原本的想法是从1到10输出，结果是是输出了10次10
    
    for(var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i);  
        }, 1000);
    }
    
按以下方式进行分解

    //全局变量
    var i;
    
    //函数表达式，访问并输出全局变量i的值
    var fn=function(){
        console.log(i); 
    };
    
    //执行10次fn，但是一秒延时后开始执行
    for(i = 0; i < 10; i++) {
        setTimeout(fn, 1000);
    }

首先在运行1秒后，整个循环体已经完成循环，此时i的值已经是10，
然后fn开始执行，每次都在访问的都是循环结束后的i的值，所以全部输出了10

解决这个问题，一种方法是利用闭包把每次的值缓存起来。
    
    var i=0;
    for(var i = 0; i < 10; i++) {
        (function(e) {
            setTimeout(function() {
                console.log(e);  
            }, 1000);
        })(i);
    }

外部的匿名函数会立即执行，并把 i 作为它的参数，此时函数内 e 变量就拥有了 i 的一个拷贝。
    
题外话，上面这段代码，有个问题，在循环体里面反复创建功能类似的函数，算是一种资源浪费，可以有如下改进：

    var i;
    var fn=function(e){
        setTimeout(function() {
            console.log(e);
        }, 1000);
    };
    for(var i = 0; i < 10; i++) {
        fn(i)
    }
