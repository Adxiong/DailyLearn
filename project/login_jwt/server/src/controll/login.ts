/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-04 23:50:35
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 15:05:24
 */
import { Router, Request, Response, NextFunction } from "express"
const jwt = require("jsonwebtoken")
const router = Router()

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  jwt.sign({
    username: req.body.username
  }, "slat", (err,token) => {
    if(err) {
      console.log(err)
      res.json({err})
    } 
    if(token) {
      console.log(token)
      res.json({token})
    }
  })
  // return res.json({status:"ok"})
})

export default router
