const cors = require('cors'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  APPNAME = process.env.APPNAME,
  PORT = process.env.PORT || 3000,
  db = require('./db.connect');

db.then(res => console.log('..MongoDB connected..'))
    .catch(err => err);

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  parameterLimit: 10000,
  limit: 1024 * 1024 * 10
}));


app.get('/', function (req, res) {
  res.send('API MICROSERVICE')
});

app.use(bodyParser.json());


require('./routes/api.route')(app);


app.listen(PORT, () => {
  console.log(`${APPNAME} is listening at port: ${PORT}`)
});