// #!/usr/bin/env node
// export const producer = () => {
//   var amqp = require('amqplib/callback_api');

//   amqp.connect('amqp://localhost', function (error, connection) {
//     if (error) {
//       throw error;
//     }
//     connection.createChannel(function (error1, channel) {
//       if (error1) {
//         throw error1;
//       }

//       var queue = 'FunDoo_Notes';
//       var msg = 'Registration is successful ';

//       channel.assertQueue(queue, {
//         durable: false
//       });
//       channel.sendToQueue(queue, Buffer.from(msg));

//       console.log(`Message📮 :`, msg);
//     });
//     setTimeout(function () {
//       connection.close();
//       process.exit(0);
//     }, 500);
//   });
// };
