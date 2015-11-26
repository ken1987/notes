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
    
为什么会有性能差？引用网上的一段说明:
>undefined 是全局对象（window）的属性，那么当我们在程序中使用 undefined 时，实际上使用的是window对象的undefined属性，那么当我们将一个变量或值与undefined进行比较时，javascript引擎会 遍历window所有的属性，直到找到名为’undefined’的属性为止，然后再比较两个操作数的引用指针是否一样。也就是说在遍历属性的过程中会花 费大量的时间，毕竟window对象的属性值非常的多嘛。这样，当频繁与undefined进行比较时，可能就会存在一个性能问题点了。因此，在这种情况 下，我们可以通过自定义个局部的undefined变量，来提高对undefined的比较速度。

##参考
http://www.w3cfuns.com/article-5600007-1-1.html
http://www.smallni.com/null-vs-undefined/
