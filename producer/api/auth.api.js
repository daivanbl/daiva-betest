const jwtauth = require('../helpers/auth.helper'),
    User = require('../models/user.model'),
    RefreshToken = require('../models/refreshToken.model'),
    response = require('../helpers/response.helper'),
    kafka = require('kafka-node');

module.exports = (app) => {
    const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS}),
        producer = new kafka.Producer(client);

    producer.on('ready', async () => {
        app.get('/auth/', async (req, res) => {
            producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify("API AUTH")}], 
                (err, data) => {
                if (err){
                    console.log(err);
                }
                else {
                    return res.status(200).send("API AUTH");
                }
            })  
        });
        app.post('/auth/login', async (req, res) => {
            try {
                let payload = {};
                const userDoc = await User.findOne({userName: req.body.userName, accountNumber: req.body.accountNumber})
                if (!userDoc) {
                    payload = {data:null, messages:'Wrong credentials'};
                    producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(payload)}], 
                        (err, data) => {
                        if (err) console.log(err);
                        else {
                            return res.status(400).send(response.generateErrorResponse(400, 'Wrong credentials')); 
                        }
                    })
                }
                const currentRefreshToken = await RefreshToken.findOne({owner:userDoc.id})
        
                if (currentRefreshToken != null) await RefreshToken.deleteOne({_id:currentRefreshToken.id});
        
                const refreshTokenDoc = new RefreshToken({
                    owner: userDoc.id
                });
        
                await refreshTokenDoc.save();
                const refreshToken = jwtauth.generateRefreshToken(userDoc.id, refreshTokenDoc.id);
                const accessToken = jwtauth.generateToken(userDoc.id);
                payload = {id: userDoc.id,refreshToken,accessToken}
                producer.send([{topic:process.env.KAFKA_TOPIC, messages:JSON.stringify(payload)}], 
                    (err, data) => {
                    if (err) console.log(err);
                    else {
                        return res.status(200).send(payload);
                    }
                })
                
            } catch (error) {
                console.log(error);
                return res.status(500).send(response.generateErrorResponse(500, error));
            }
                
        });
    });

    producer.on('error',  (err) => console.log(err));
};