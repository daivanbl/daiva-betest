const express = require('express'),
  kafka = require('kafka-node'),
  app = express();

const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS}),
    consumer = new kafka.Consumer(client, [{topic: process.env.KAFKA_TOPIC}],{autoCommit: false});
consumer.on('message', (message) => {
    console.log('From Consumer');
    console.log(message);
})
    