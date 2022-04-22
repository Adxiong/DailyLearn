/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-04-22 15:25:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-04-22 17:33:45
 */
import * as amqp from 'amqplib';

const QueueName = "task"

function ErrorHandle(err: Error) {
  console.log(err.message.toString());
}

amqp.connect("amqp://127.0.0.1")
.then( (conn: amqp.Connection) => {
  conn.createChannel()
  .then((ch: amqp.Channel) => {
    const msg = {
      date: new Date().toString(),
      type: Math.random() > 0.5 ? "apple" : "banana",
      value: Math.floor(Math.random() * 10 % 5) 
    }
    ch.assertQueue("task")
    ch.sendToQueue(QueueName, Buffer.from(JSON.stringify(msg)))
    console.log(`send message to queueName:{ ${QueueName} }, content is `, msg);
    // ch.close()
  })
  .catch( err => {
    ErrorHandle(err)
  }).finally( () =>{
    // conn.close()
  } )
})
.catch( err => ErrorHandle(err))