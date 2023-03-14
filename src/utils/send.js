var amqp = require('amqplib/callback_api');

export const producer = (queue, msg) => {
  amqp.connect(`amqp://localhost`, function (err, connection) {
    //help us to connect with rabbitmq server
    if (err) {
      throw err;
    }
    connection.createChannel(function (error, channel) {
      if (error) {
        throw error;
      }

      channel.assertQueue(queue, {
        //if there is no queue in the server then create queue
        durable: false // false :=> if there is no subscriber in the queue server is available  //True :=> if there is no subcriber this queue is deleted from server
      });
      channel.sendToQueue(queue, Buffer.from(msg)); //send msg to server

      console.log('message Sent :', msg);
    });
    setTimeout(function () {
      connection.close(); //we close the server bcz once  we have sent the msg to queue then there is no requirement of the connection
    }, 10000);
  });
};
