"use strict";
/*
* @Description:
* @version:
* @Author: Adxiong
* @Date: 2022-04-04 23:16:46
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 14:59:02
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const controll_1 = require("./controll");
const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/api", controll_1.default);
app.listen(3000, () => {
    console.log("服务启动：localhost://3000");
});
