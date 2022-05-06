/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-05-06 23:35:41
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-05-06 23:35:42
 */
var wH = window.innerHeight;
var wW = window.innerWidth;
var generateStars = function generateStars(f) {
  for (var e = 0; e < f; e++) {
    var d = document.createElement("div");
    d.className = e % 20 == 0 ? "star star--big" : e % 9 == 0 ? "star star--medium" : "star";
    d.setAttribute("style", "top:" + Math.round(Math.random() * wH) + "px;left:" + Math.round(Math.random() * wW) + "px;animation-duration:" + (Math.round(Math.random() * 3000) + 3000) + "ms;animation-delay:" + Math.round(Math.random() * 3000) + "ms;");
    document.body.appendChild(d)
  }
};
generateStars(150);