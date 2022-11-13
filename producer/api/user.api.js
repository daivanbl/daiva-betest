const User = require('../models/user.model'),
    response = require('../helpers/response.helper'),
    kafka = require('kafka-node'),
    jwtauth = require('../helpers/auth.helper');


module.exports = (app) => {
    const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS}),
        producer = new kafka.Producer(client);

    producer.on('ready',  () => {

        app.get('/user/', jwtauth.AuthenticateToken,  (req, res) => {
            try {
                producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify('API USER')}], 
                    (err, data) => {
                        return res.status(200).send('API USER');
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send(response.generateErrorResponse(500, error));
            }
        });
        // Get all user
        app.get('/user/all', jwtauth.AuthenticateToken, async (req, res) => {
            try {
                const userDoc = await User.find().exec();
                producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(userDoc)}], 
                    (err, data) => {
                        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Data Found'));
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send(response.generateErrorResponse(500, error));
            }
        });
        // Get user by accountNumber and get user by IdentityNumber.
        app.get('/user/:id', jwtauth.AuthenticateToken, async (req, res) => {
            try {
                const userNumber = req.params.id;
                // console.log(userNumber.length);
                let payload = userNumber.length == 16 ? {identityNumber:userNumber} : {accountNumber:userNumber};
                // console.log(payload);
                const userDoc = await User.findOne(payload).exec();
                console.log(userDoc);
                if (userDoc == null) {
                    producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify('Data not found')}], (err, data) => {});
                    return res.status(400).send(response.generateFailResponse('Data not found'));
                }
                producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(payload)}], 
                    (err, data) => {
                        console.log('SINI');
                        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Data Found'));
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send(response.generateErrorResponse(500, error));
            } 
        });
    });

    producer.on('error',  (err) => console.log(err));
}
