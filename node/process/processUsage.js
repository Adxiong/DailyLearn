/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-07-01 22:24:56
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-07-01 22:33:07
 */
const process = require("process")


const CpuUsage = process.cpuUsage()
const Memory = process.memoryUsage()
console.log(process.cpuUsage(CpuUsage))
console.log(Memory)
