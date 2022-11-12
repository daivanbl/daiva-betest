const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const dbName = 'db_daiva_betest';

module.exports = mongoose.connect(url+'/'+dbName, {serverSelectionTimeoutMS: 5000});;