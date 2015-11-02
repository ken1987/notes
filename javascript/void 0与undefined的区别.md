#void 0 与 undefined区别

##undefined

undefined在JavaScript中并不属于保留字/关键字。

在IE5.5~8中可以将其当作变量对其赋值

在IE9+及其他现代浏览器中赋值无效

##void

void作为一元运算符,对任何值都返回undefined

##性能比较

    function test(type, num) {
      num = num > 0 ? num : 10000000;
  
      var s = new Date(),
          v, i;
      if (type === "void") {
          for (i = 0; i < num; i++) {
              v = void 0;
          }
      } else {
          for (i = 0; i < num; i++) {
              v = undefined;
          }
      }
      console.log(+new Date() - s.getTime());
    }

在chrome 44.0.2403.89中运行结果：

    test()        //1606ms
    test("void")  //61ms

##参考
http://www.w3cfuns.com/article-5600007-1-1.html
