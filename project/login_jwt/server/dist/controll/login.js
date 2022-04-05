"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-04-04 23:50:35
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-05 15:05:24
 */
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const router = (0, express_1.Router)();
router.post("/login", (req, res, next) => {
    console.log(req.body);
    jwt.sign({
        username: req.body.username
    }, "slat", (err, token) => {
        if (err) {
            console.log(err);
            res.json({ err });
        }
        if (token) {
            console.log(token);
            res.json({ token });
        }
    });
    // return res.json({status:"ok"})
});
exports.default = router;
