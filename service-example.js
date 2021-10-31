var rapidriver = require("@ovcina/rapidriver");

const host = 'amqp://localhost';

/***
 *  INFO service
 */

/** 
 * subscribe to river(s), and do some work if it gets an event.
 */
 rapidriver.subscribe(host, "display", (msg) => {
    console.log(" [x] Received: %s", msg);
    
});

/** 
 *  More subscriptions can be added by calling the subscribe function again:
 */
// rapidriver.subscribe(host, "info", (msg, publish) => {
//     console.log(" [x] Received: %s", msg);

//     //Send an "error" event back into the rapid.
//      publish("error", "error message");
// });
