var amqp = require('amqplib/callback_api');
var rapid = 'rapid';

var sub = {
    subscribe:function (host, river, _work) {
        amqp.connect(host, function(error, connection) {
            if(error) {
                throw error;
            }
            connection.createChannel(function(error2, channel) {
                if(error2) {
                    throw error2;
                }
    
                channel.prefetch(1);
                
                channel.assertExchange(rapid, 'direct', {
                    durable: false
                }); 
                
                console.log(" [*] Waiting for messages in river: %s. To exit press CTRL+C", river);
                channel.assertQueue(river, {
                    exclusive: false
                }, function(error2, q) {
                    if(error2) {
                        throw error2;
                    }
                    channel.bindQueue(q.queue, rapid, river);

                    const publishWrapper = (river, message) => {
                        if(message instanceof Object) {
                            message = JSON.stringify(message);
                        }
                        channel.publish(rapid, river, Buffer.from(message));
                    }

                    channel.consume(q.queue, function(msg) {
                        if(msg.content) {
                            _work(msg, publishWrapper);
                            channel.ack(msg);                
                        }
                    }, {
                        noAck: false
                    });
                })
            });
        });       
    },
    publish:function (host, river, msg) {
        amqp.connect(host, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertExchange(rapid, 'direct', {
                durable: false
            })

            if(msg instanceof Object) {
                msg = JSON.stringify(msg);
            }

            channel.publish(rapid, river, Buffer.from(msg), {
                durable: true,
                persistent: true
            });
            
            console.log(" [x] Sent '%s' to river: '%s'", msg, river);
            });
        });
    }
};

module.exports = sub;