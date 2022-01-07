/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-07 23:37:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-08 00:30:20
 */
const axios = require('axios')
const url = 'http://api.isoyu.com/api/picture/index'

async function getPictures(page=20) {
  new Promise( (resolve, reject) => {
    axios.get(url)
    .then( res => {
      resolve(res)
    })
    .catch( e => {
      console.error(e);
      reject(e)
    })
  })
}
