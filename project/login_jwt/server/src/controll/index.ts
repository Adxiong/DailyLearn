/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-04 23:56:02
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 13:04:18
 */

import { Router } from "express"
import login from "./login"

const router = Router()
router.use('/user', login)

export default router  