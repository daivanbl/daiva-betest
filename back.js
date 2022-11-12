// const { MongoClient, ObjectId } = require('mongodb'),
const mongoose = require('mongoose');
const Users = require('./user.model')
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'db_daiva_betest';


// MongoDB
// const client = new MongoClient(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Mongoose
mongoose.connect(url+'/'+dbName).then(res => console.log('KONEK')).catch(err => console.log('GAGAL'));

Users.find().then(res => console.log(res)).catch(err => err);

// run()
// async function run() {
//     try {
//         const data = await User.findById("636e2f249c8d41d623ba3fbc");
//         console.log(data);
//     } catch (err) {
//         console.log(err);
//     }
// }

// client.connect((err, client) => {
//     if (err) {
//         return console.log('Fail konek');
//     }
//     console.log('Berhasil konek');
// });

// const db = client.db(dbName);

// db.collection('users').find().toArray((err, res) =>{
//     if (err) {
//         return console.log(err);
//     }
//     console.log(res);
// });

// db.collection('users')
//     .findOne({_id: ObjectId('636e2f249c8d41d623ba3fbc')})
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));

// db.collection('users').insertOne(
//     {
//         userName : 'Test User', 
//         accountNumber : '5520084354058665', 
//         emailAddress : "testuser@gmail.com", 
//         identityNumber : "5520084354058665"
//     },
//     (err, res) => {
//         if (err) {
//             return console.log('Fail Insert');
//         }
//         console.log('Sukses Insert' + res);
//     }
// )

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('documents');

//   // the following code examples can be pasted here...

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());