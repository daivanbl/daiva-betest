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

auth(app)
user(app)

app.listen(`${process.env.APPNAME} is listening at port: ${process.env.PORT}`)