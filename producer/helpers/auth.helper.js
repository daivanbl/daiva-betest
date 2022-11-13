const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.AuthenticateToken  = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader &&  authHeader.split(' ')[1];
    if(token == null) return res.status(401).send({
      message:"Unauthorized"
    });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.status(403).send({
        message:"Forbiden"
      });
      req.validatedUser = user;
      req.token = token;
      next()
    })
};


exports.generateToken = function(userId){  
  var now = moment(Date.now()).locale('id');
  var future = moment(now).add(30, 'm').toDate();
  const payload = { 
    userId: userId,
  }
  token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn: Math.ceil(future.getTime() / 1000)});
  return token;
};

exports.generateRefreshToken = function (userId, refreshToken) {
  var now = moment(Date.now()).locale('id');
  var future = moment(now).add(30, 'm').toDate();
  const payload = { 
    userId: userId,
    refreshToken: refreshToken
  }
  token = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET, {expiresIn: Math.ceil(future.getTime() / 1000)});

  return token;
}