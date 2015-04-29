在js里面，几乎所有变量都能调用toString方法，除了null和undefined例外。

###关于数字

    //错误的用法
    1.toString();
  
    //其他
    var a=1;
    a.toString(); //"1"
    
    //数据格式转换，等效在转成字符串前调用了parseFloat方法
    (1).toString(); //'1'
    (1.0).toString(); //'1'
    (1.1).toString(); //'1.1'
    
    (011).toString(); //'9'   可以转成8进制
    (09).toString();  //'9'   不能转成8进制，直接按十进制转换
    
    NaN.toString();  //'NaN'
