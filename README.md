# ovcina-rapidriver

*RabbitMQ is required to be running: https://www.rabbitmq.com/download.html*

1. Download this repository and save somewhere.
2. Create a sperate workspace for the service.
3. Go to the workspace and open terminal.

## Installation

Install rapidriver Node module:
```bash
npm install path/to/ovcina-rapidriver
```

## Creating the service
An example can be found in service-example.js

First import the node module: 
```javascript
var subscribe = require("@ovcina/rapidriver");
```

Define a constant called 'host':
```javascript
const host = 'amqp://localhost';
```

Subscribe to a river: 
```javascript
subscribe.subscribe(host, "display", (msg, channel) => {
    console.log(" [x] Received: %s", msg.content.toString());
});
```

Send an event back to the rapid. This is done inside the subscribe function:
```javascript
channel.publish(subscribe.rapid, "error", Buffer.from('info message sent'));
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

To test the service-example.js
```bash
node path/to/producer.js "display" "hello world"
```


