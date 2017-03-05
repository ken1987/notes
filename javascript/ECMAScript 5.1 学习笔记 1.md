# ECMAScript 5.1 学习笔记 1

## 8.12 Algorithms for Object Internal Methods

## 8.12.8 `[[DefaultValue]] (hint)`

1. 当 hint String
  * 令 toString 为用参数 "toString" 调用对象 O 的 [[Get]] 内部方法的结果。
  * 如果 IsCallable(toString) 是 true，则
    * 令 str 为用 O 作为 this 值，空参数列表调用 toString 的 [[Call]] 内部方法的结果。
    * 如果 str 是原始值，返回 str。
  * 令 valueOf 为用参数 "valueOf" 调用对象 O 的 [[Get]] 内部方法的结果。
  * 如果 IsCallable(valueOf) 是 true，则
    * 令 val 为用 O 作为 this 值，空参数列表调用 valueOf 的 [[Call]] 内部方法的结果。
    * 如果 val 是原始值，返回 val。
  * 抛出一个 TypeError 异常。
  
2. 当 hint Number
  * 令 valueOf 为用参数 "valueOf" 调用对象 O 的 [[Get]] 内部方法的结果。
  * 如果 IsCallable(valueOf) 是 true，则
    * 令 val 为用 O 作为 this 值，空参数列表调用 valueOf 的 [[Call]] 内部方法的结果。
    * 如果 val 是原始值，返回 val。
  * 令 toString 为用参数 "toString" 调用对象 O 的 [[Get]] 内部方法的结果。
  * 如果 IsCallable(toString) 是 true，则
    * 令 str 为用 O 作为 this 值，空参数列表调用 toString 的 [[Call]] 内部方法的结果。
    * 如果 str 是原始值，返回 str。
  * 抛出一个 TypeError 异常。

3. 当 no hint
  * 当 O 是 Date 类型，按步骤 1 处理
  * 否则，按步骤 2 处理

## 9.1 ToPrimitive

ToPrimitive(input, PreferredType) => non-Object

* input 类型为 non-Object，返回 input
* input 类型为 object，返回 `[[DefaultValue]] (hint PreferredType)`

## 9.3 ToNumber

Object => Number
* Let primValue be ToPrimitive(input argument, hint Number).
* Return ToNumber(primValue).
