/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-10 22:46:25
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-14 21:21:17
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

/**
 * 创建一个新数组，将array与任何数组 或 值连接在一起
 * @param {*} array  被连接的数组
 * @param  {...any} args 连接的值或数组
 * @returns 
 */
function concat(array, ...args) {
  var newArr = [...array]
  args.forEach( item => {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      item.forEach( todo => {
        newArr.push(todo)
      })
    } else {
      newArr.push(item)
    }
  } )
  return newArr
}

/**
 * 创建一个具有唯一array值的数组，每个值不包含在其他的数组中
 * @param {*} array 数组
 * @param {*} values 排除项
 * @returns 
 */
function difference (array, values) {
  return array.filter( value => !values.includes(value))
}


export {
  chunk,
  compact,
  concat,
  difference
}