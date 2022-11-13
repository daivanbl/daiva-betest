const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const ObjectId = Schema.ObjectId;

const refreshTokenSchema = new Schema({ 
    owner: {type: ObjectId, ref: 'users'}
});

module.exports = model('RefreshToken', refreshTokenSchema);