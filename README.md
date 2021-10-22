# ovcina-rapidriver
<<<<<<< HEAD
=======

1. Download this repository and save somewhere.
2. Create a sperate workspace for the service.
3. Go to the workspace and open terminal.

## Installation

Install RabbitMQ Node module:
```bash
npm install amqplib
```

Install rapidriver Node module:
```bash
npm install path/to/module/ovcina-rapidriver
```

## Creating the service
An example can be found in service-example.js

First import the node module: 
```javascript
var subscribe = require("./subscribe");
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
>>>>>>> d80bcd74956669e9203761e331361abd627fe8aa
