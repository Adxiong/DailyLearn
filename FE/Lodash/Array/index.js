/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-10 22:46:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-10 23:32:04
 */

/**
 * 将数组拆分为多个size长度的区块，并将这些区块组成一个新数组，如果array无法分割成全部长度的区块，那么最后剩余的元素将组成一个区块
 * @param {*} array 
 * @param {*} size 
 */
function chunk(array, size=1) {
  var newArr = []
  for(let i = 0; i < array.length; i += size) {
    newArr.push(array.slice(i, i+size))
  }
  return newArr
}

export {
  chunk
}