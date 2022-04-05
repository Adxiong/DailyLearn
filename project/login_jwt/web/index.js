/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-05 11:07:44
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 15:06:04
 */
let token

fetch("http://localhost:3000/api/user/login", {
  method: "post",
  headers: {
    'Content-Type': "application/json"
  },
  body: JSON.stringify({
    username: "adxiong",
    password: "123456"
  })
}).then(response => {
  return response.json()
}).then(res => {
  console.log(res)
})

