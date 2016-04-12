#在微信中touchmove，touchend不执行问题

##场景

微信中浏览

##原因

出现这种情况，一般是由于200ms超时导致内核不一定会一直处理touchmove事件，一旦超时会将后续所有的事件转交给UI处理，导致touchmove不会一直触发。系统浏览器也存在同样的问题。

##解决方法

建议开发者在touchstart时调用event.preventDefault，这样就可以保证内核会一起触发touchmove事件了

##资料

* http://bbs.mb.qq.com/thread-201794-1-1.html
* http://www.hui52.com/archives/944.html
