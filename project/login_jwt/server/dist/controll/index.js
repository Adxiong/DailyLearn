"use strict";
/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-04-04 23:56:02
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 13:04:18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("./login");
const router = (0, express_1.Router)();
router.use('/user', login_1.default);
exports.default = router;
