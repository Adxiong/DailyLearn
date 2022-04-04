/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-04 23:16:46
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-04 23:46:02
 */

const express = require("express")

const app = express()

app.use(express.json())

app.use("/login", (req: Request, res: Response, next) => {
  console.log(req.headers)
})

app.listen(3000, ()=> {
  console.log("服务启动：localhost://3000")
})