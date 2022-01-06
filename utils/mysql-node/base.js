/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-06 23:00:53
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-06 23:11:08
 */
const mysql = require("mysql")
const fs = require("fs")
const path = require("path")
const configPath = path.resolve(__dirname, '.config')


const config = JSON.parse(fs.readFileSync(configPath, {encoding:"utf-8"}))

const connection = mysql.createConnection({
  ...config
})

connection.connect( (err) => {
  if (err) {
    // 连接失败 connection.state === ‘disconnected’
    // err.message 为错误信息  err.stark 为错误栈
    console.error(`error connecting: ${err.message}`)
    return
  }
  // 连接成功 connection.state  === 'connected'
  console.log(`connected as id ${connection.state}`)
});

// connection.query('select * from sys', ( error, results, fields) => {
//   if (error) throw error;
//   console.log('The solution is: ', results[0]);
// })

connection.end()