#String对象和toString方法

在js里面，几乎所有变量都能调用toString方法，除了null和undefined例外，而String把所有类型转换成字符串

##两者不同的地方

###关于null和undefined
    
    //错误的用法
    null.toString();
    undefined.toString();
    
    //正确的用法
    String(null);      //"null"
    String(undefined); //"undefined"

###关于数字

使用toString，等效在转成字符串前调用了parseFloat方法

    (1.0).toString(); //'1'
    parseFloat(1.0);  //'1'
    
    //错误的用法
    1.toString();
    
    //数据格式转换，
    (1).toString(); //'1'
    (1.0).toString(); //'1'
    (1.1).toString(); //'1.1'
    
    //默认按照10进制进行转换
    (011).toString(); //'9'   可以转成8进制
    (09).toString();  //'9'   不能转成8进制，直接按十进制转换
    
    //也可以设置了相应的进制数
    (3).toString(3); //'10'
    
使用String对象，等效于与空字符串连接
    
    String(1.0);      //"1.0"
    1.0+"";           //"1.0"
    
##使用后，获得相同的结果

###关于数字
 
    NaN.toString();  //'NaN'

###关于布尔值
    
    false.toString(); //"false"
    true.toString(); //"true"

###关于对象
    
    //一般对象
    ({}).toString();         //"[object,object]"
    
    //数组,相当于把数组的每一项的值分别toString后，对数据join(",")
    [1,{}].toString();       //"1,[object,object]"
    
    //日期对象,相关功能toLocaleString
    (new Date).toString();   //"Wed Apr 29 2015 22:35:29 GMT+0800 (中国标准时间)"
    
    //正则表达式
    (new RegExp).toString();             //"/(?:)/"
    (new RegExp("string")).toString();   //"/string/"
    (new RegExp(/\s/)).toString();       //"/\s/"
    (/\s/).toString();                   //"/\s/"
    
    //函数对象
    var fn=function(){};
    fn.toString();   //"function (){}"
    
    //Error 没用用过
    Error.toString(); //错误的文本
    
