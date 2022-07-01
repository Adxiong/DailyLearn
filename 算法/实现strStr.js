/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-07-01 22:03:29
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-07-01 22:08:27
 */
var strStr = function (haystack, needle) {
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    let flag = true

    for (let j = 0; j < m; j++) {
      if (haystack[i + j] != needle[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      return i
    }
  }
  return -1
};

if (1) {
  console.log(strStr("hello", 'll'))
  console.log(strStr("aaaaa", 'bba'))
}

if (1) {
  console.log(strStr("a", 'a'))
}