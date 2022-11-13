const express = require('express'),
  kafka = require('kafka-node'),
  app = express(),
  mongoose = require('mongoose'),
  User = require('./models/user.model'),
 {auth, user} = require('./api');

mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 5000})
.then(res => console.log('..MongoDB connected..'))
    .catch(err => console.log(err));

app.use(express.json());

// const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS}),
//       producer = new kafka.Producer(client);

// producer.on('ready', async () => {
//     // app.get('/', async (req,res) => {
//     //     const userAll = await User.find();
//     //     producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(userAll)}], 
//     //         (err, data) => {
//     //         if (err){
//     //             console.log(err);
//     //         }
//     //         else {
//     //             return res.send(userAll);
//     //         }
//     //     })
//     // });
//     app.get('/test', (req,res) => {
//         producer.send([{topic:process.env.KAFKA_TOPIC, messages:'API TEST'}], 
//             (err, data) => {
//             if (err){
//                 console.log(err);
//             }
//             else {
//                 return res.send('TEST');
//             }
//         })
//     });
//     app.get('/SAMPLE', (req,res) => {
//         producer.send([{topic:process.env.KAFKA_TOPIC, messages:'API SAMPLE'}], 
//             (err, data) => {
//             if (err){
//                 console.log(err);
//             }
//             else {
//                 return res.send('SAMPLE');
//             }
//         })
//     });
    
// })

// producer.on('error',  (err) => console.log(err));

auth(app)
user(app)



app.listen(process.env.PORT)