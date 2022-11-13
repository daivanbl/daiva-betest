const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({ 
    userName: String, 
    accountNumber : String, 
    emailAddress : String, 
    identityNumber : String 
})

module.exports = model('users', userSchema);