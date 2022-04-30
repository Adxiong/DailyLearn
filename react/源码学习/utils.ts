/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-27 11:51:53
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-27 11:54:32
 */


function hasValidKey(config) {
  return config.hasOwnProperty("key")
}

function hasValidRef(config) {
  return config.hasOwnProperty("ref")
}

export {
  hasValidKey,
  hasValidRef
}