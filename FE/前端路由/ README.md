<!--
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-07 21:50:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-08 00:25:04
-->


# 前端路由

  在页面url变化下，保证页面不完全刷新，部分视图切换
  
## hash

- onhashchange 
  触发条件：
  - 直接更改浏览器地址，在最后面增加或者改变#hash
  - 通过改变location.href 或 location.hash的值
  - 通过点击带锚点的链接
  - 浏览器的前进后退（hash值不同 

## history
- history.back()
- history.forward()
- history.go(n)

- history.pushState(stateObj, title, url)  //向历史栈添加 url变化 页面不刷新
- history.replaceState(stateObj, title, url) //替换  url变化  页面不刷新
- popstate  //history对象变化，触发事件