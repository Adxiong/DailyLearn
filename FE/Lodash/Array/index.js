/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-10 22:46:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-11 12:50:50
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

/**
 * 创建一个新数组，包含原数组中所有非假值元素。例如false，null，0，“”，undefined，NaN都是被认定为假值
 * @param {*} array 待处理的数组
 * @returns 返回过滤掉假值的新数组
 */
function compact( array ) {
  var newArr = []
  array.forEach(ele => {
    if (Boolean(ele)) {
      newArr.push(ele)
    }
  });
  return newArr
}


export {
  chunk,
  compact
}