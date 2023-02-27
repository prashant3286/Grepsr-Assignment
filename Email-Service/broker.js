const amqp = require('amqplib')
require('dotenv').config();

let instance;

class MessageBroker {

  async init() {

    this.connection = await amqp.connect(process.env.RABBIT_URL);
    this.channel = await this.connection.createChannel();
    return this
  }

  async send(queue, msg) {
    if (!this.connection) {
      await this.init();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, msg)
  }
  async listen(queue, handler) {
    if (!this.connection) {
      await this.init();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, async (msg) => {
      try {
        handler(msg.content.toString()) //callback
        this.channel.ack(msg) // acknowlegde the message
      } catch(err) {
        console.error(err)
        this.channel.nack(msg) //requeue msg
      }
    })
  }
}

MessageBroker.getInstance = async function () {
  if (!instance) {
    const broker = new MessageBroker();
    instance = broker.init()
  }
  return instance;
};

module.exports = MessageBroker;