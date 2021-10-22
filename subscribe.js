var amqp = require('amqplib/callback_api');
var rapid = 'rapid';

function setupChannel(host, _callback) {
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
            
            _callback(channel);
        });
    });
}

var sub = {
    subscribe:function (host, river, _work) {
        setupChannel(host, (channel) => {
            console.log(" [*] Waiting for messages in river: %s. To exit press CTRL+C", river);
            channel.assertQueue(river, {
                exclusive: false
            }, function(error2, q) {
                if(error2) {
                    throw error2;
                }
                channel.bindQueue(q.queue, rapid, river);

                channel.consume(q.queue, function(msg) {
                    if(msg.content) {
                        _work(msg, channel);
                        channel.ack(msg);                
                    }
                }, {
                    noAck: false
                });
            })
        });        
    },
    String:rapid = "rapid"
};

module.exports = sub;