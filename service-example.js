var subscribe = require("@ovcina/rapidriver");

const host = 'amqp://localhost';

/***
 *  INFO service
 */

/** 
 * subscribe to river(s), and do some work if it gets an event.
 */
subscribe.subscribe(host, "display", (msg, channel) => {
    console.log(" [x] Received: %s", msg.content.toString());
});

/** 
 *  More subscriptions can be added by calling the subscribe function again:
 */
// subscribe.subscribe(host, "info", (msg, channel) => {
//     console.log(" [x] Received: %s", msg.content.toString());

//     //Send an event back into the rapid 
//     channel.publish(subscribe.rapid, "error", Buffer.from('error message'));
// });
