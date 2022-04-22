/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-22 09:43:40
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-22 11:45:06
 */

import * as amqp from "amqplib/callback_api";

const q = "task"

function publisher (conn: { createChannel: (arg0: (err: any, ch: any) => void) => void; }) {
  conn.createChannel( (err, ch) =>{
    if(err){
      console.log(err);
    }
    ch.assertQueue(q)
    ch.sendToQueue(q, Buffer.from("something to do"))
  })
}

function consumer (conn: { createChannel: (arg0: (err: any, ch: any) => void) => void; }) {
  conn.createChannel(( err, ch) => {
    if(err){
      console.log(err);
    }
    ch.assertQueue(q)
    ch.consume(q, (msg: { content: any; }) => {
      if(msg){
        console.log(msg.content);
        ch.ack(msg)
        
      }
    })
  })
}

amqp.connect("amqp://127.0.0.1", (err: any,conn: any) => {
  if(err){
    console.log(err);
  }
  
  publisher(conn)
  consumer(conn)
})

