var rapidriver = require("@ovcina/rapidriver");

const host = 'amqp://localhost';

/***
 *  INFO service
 */

/** 
 * subscribe to river(s), and do some work if it gets an event.
 */
 rapidriver.subscribe(host, "display", (msg, channel) => {
    console.log(" [x] Received: %s", msg.content.toString());
});

/** 
 *  More subscriptions can be added by calling the subscribe function again:
 */
// rapidriver.subscribe(host, "info", (msg, channel) => {
//     console.log(" [x] Received: %s", msg.content.toString());

//     //Send an "error" event back into the rapid.
//     rapidriver.publish(channel, "error", "error message"));
// });
