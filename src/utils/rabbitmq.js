import { sendMailToRegisteredUser } from '../utils/app.util';
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
        durable: false // false :=> if there is no subscriber in the queue till server is available  //True :=> if there is no subcriber this queue is deleted from server
      });
      channel.sendToQueue(queue, Buffer.from(msg)); //send msg to server

      console.log(' msg Sent :', msg);
    });
    setTimeout(function () {
      connection.close(); //we close the server bcz once  we have sent the msg to queue then there is no requirement of the connection
    }, 10000);
  });
};

export const consumer = (queue) => {
  amqp.connect(`amqp://localhost`, function (err, connection) {
    if (err) {
      throw err;
    }
    connection.createChannel(function (error, channel) {
      if (error) {
        throw error;
      }

      channel.assertQueue(queue, {
        durable: false
      });

      console.log(queue);

      //to consume msg pass the queue name and from server we get the msg
      channel.consume(
        queue,
        async function (msg) {
          const object = msg.content.toString(); //msg.content.toString()  bcz we getting msg in a  buffer  content := hold the msg, toString :=> convert msg to string

          const data = JSON.parse(object);
          const Email = data.email;
          const Firstname = data.firstName;
          const Lastname = data.lastName;

          const result = await sendMailToRegisteredUser(
            Email,
            Firstname,
            Lastname
          );
        },
        {
          noAck: true //noAck: true it  means  implicitly consume mtd will pass acknowledgement to every messages
        }
      );
    });
  });
};
consumer('RegistrationData');

/*
send the ack to every messages explicitly use 

channel.ack(msg)
*/
