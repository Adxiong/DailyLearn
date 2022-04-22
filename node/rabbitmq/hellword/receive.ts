/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-22 15:25:13
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-22 17:37:48
 */

import * as amqp from "amqplib"

const QueueName = "task"

const store: Record<string, number> = {
  apple: 10,
  banana: 10
}

function ErrorHandle (err: Error) {
  console.log(err.message.toString())
}

amqp.connect("amqp://127.0.0.1")
.then( (conn: amqp.Connection) => {

  conn.createChannel()
  .then( (ch: amqp.Channel) => {
    ch.assertQueue(QueueName)
    .then( () =>{
      console.log("消息队列持续接受中。。。。。");
      
      ch.consume(QueueName, (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
          const data = JSON.parse(msg.content.toString()) as unknown as {type: string, value: number}
          // check store
          
          store[data.type] -= data.value
          console.log(`receive message: ${msg?.content.toString()}`)
          console.log(`store ====>`, store);
          
        }
    }, {noAck: true})})
  })

})
.catch( err => ErrorHandle(err))