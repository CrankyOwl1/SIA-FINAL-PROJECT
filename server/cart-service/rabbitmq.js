const amqp = require('amqplib');

let channel = null;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost '); // Use RabbitMQ Docker container hostname if needed
    channel = await connection.createChannel();
    console.log('✅ Connected to RabbitMQ');    

    await channel.assertQueue('cartQueue', { durable: true });
  } catch (err) {
    console.error('❌ RabbitMQ connection error:', err);
  }
};

const publishToQueue = async (queueName, message) => {
  if (!channel) {
    console.error('❌ No RabbitMQ channel found');
    return;
  }
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

module.exports = { connectRabbitMQ, publishToQueue };
