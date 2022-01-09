/*
 * @Descripttion:
 * @version:
 * @Author: Adxiong
 * @Date: 2022-01-06 22:22:43
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-09 22:55:14
 */
const mysql = require('mysql');
const fs = require("fs");
const path = require("path");
const { resolve } = require('path');
const configPath = path.resolve(__dirname, '.config');
const config = JSON.parse(fs.readFileSync(configPath, { encoding: "utf-8" }));

const pool = mysql.createPool({ 
    connectionLimit: 10 ,
    ...config
});


//可以做命名格式转换


class PoolUtil {
    query (sql, params) {
        console.log('sql query', sql, params ?? "");
        return new Promise( (resolve, reject) => {
            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error('执行sql错误', err.sql)
                    reject(err)
                } else {
                    resolve(result)
                }
            } )
        })
    }
    write (sql, params) {
        console.log('sql insert', sql, params ?? "");
        return new Promise( (resolve, reject) => {
            pool.query( sql, params, (err, result) => {
                if (err) {
                    console.error("执行insert语句错误", err.sql)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    beginTransaction () {
        return new Promise( (resolve, reject) => {
            pool.getConnection( (err, connection) => {
                if (err) {
                    console.error("获取数据库连接失败", err)
                    reject(err)
                }
                connection.beginTransaction( error => {
                    if (error) {
                        console.error("开启事物失败", err)
                        reject(err)
                    } else {
                        resolve(connection)
                    }
                })
            })
        })
    }
    queryInTransaction (connect, sql, params) {
        return new Promise( (resolve, reject) => {
            console.log('事物中执行查询', sql, params)
            connect.query( sql, params, (err, result) => {
                if (err) {
                    console.error("事物中执行sql失败", err.sql)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    writeInTransaction (connect, sql, params) {
        return new Promise( (resolve, reject) => {
            console.log("事物中执行写入", err.sql)
            connect.query( sql, params, (err, result) => {
               if (err) {
                console.log("事物中执行sql失败", err.sql)
                reject(err)
               } else {
                   resolve(result)
               }
               
            }) 
        })
    }
    commit ( connect ) {
        return new Promise( (resolve, reject) => {
            connect.commit(err => {
                if (err) {
                    console.error("提交事物失败", err);
                } else {
                    connect.release ()
                    resolve()
                }
            })
        })
    }
    rollback (connect) {
        connect.rollback( () => {
            connect.release()
        })
    }
}

const pool = new PoolUtil()