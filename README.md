# ovcina-rapidriver

*RabbitMQ is required to be running: https://www.rabbitmq.com/download.html*

## Installation
Create a folder for the microservice. Open a terminal window and navigate to the empty folder.

Install rapidriver Node module:
```bash
npm install @ovcina/rapidriver
```

## Creating the service
An example can be found in service-example.js

First import the node module: 
```javascript
var rapidriver = require("@ovcina/rapidriver");
```

Define a constant called 'host':
```javascript
const host = 'amqp://localhost';
```

Subscribe to a river: 
```javascript
rapidriver.subscribe(host, "display", (msg) => {
    console.log(" [x] Received: %s", msg.content.toString());
});
```

Send an event back to the rapid. This is done inside the subscribe function:
```javascript
rapidriver.subscribe(host, "display", (msg, publish, channel) => {
    publish("error", "Error message");
});
```

## Testing the service
Run RabbitMQ message broker:
```bash
rabbitmq-server
```

Run the service:
```bash
node service.js
```

The file "producer.js" is for sending a message to the rapid which the service can subscribe to.
It's only used for testing the service:
```bash
node path/to/producer.js <event_name> <message>
```

Open a new terminal window.
To test the running service-example.js, run the producer and make a display event:
```bash
node node_modules/@ovcina/rapidriver/producer.js "display" "hello world"
```

## Further Testing
Try making a new service (in a different folder), and make it subscribe to the "error" river.
```javascript
rapidriver.subscribe(host, "error", (msg, channel) => {
    console.log(" [x] Received: %s", msg.content.toString());
});
```

In the first service add the "channel.publish" line which sends an error event back into the river.
Now when both services are run, make the producer send a display event, the first service will send an error event which the other service will subscribe to and print out.


