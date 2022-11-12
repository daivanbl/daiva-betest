const jwtauth = require('../helpers/auth.helper');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');

exports.signUp =  async (req, res) => {
    const accountNumber = Math.floor(Math.random() * 1000000000);
    
    const userDoc = new User({ 
        userName: req.body.userName, 
        accountNumber : accountNumber.toString(), 
        emailAddress : req.body.emailAddress, 
        identityNumber : req.body.identityNumber 
    });
    const refreshTokenDoc = new RefreshToken({
        owner: userDoc.id
    });
    try {
        await userDoc.save();
        await refreshTokenDoc.save();

        const refreshToken = jwtauth.generateRefreshToken(userDoc.id, refreshTokenDoc.id);
        const accessToken = jwtauth.generateToken(userDoc.id);
        return res.status(200).send({
            id: userDoc.id,
            refreshToken,
            accessToken
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

}

exports.login = async (req, res) => {
    try {
        const userDoc = await User.findOne({userName: req.body.userName, accountNumber: req.body.accountNumber})
        if (!userDoc) {
            return res.status(400).send('Wrong Credentials');
        }
        const refreshTokenDoc = new RefreshToken({
            owner: userDoc.id
        });

        await refreshTokenDoc.save();
        const refreshToken = jwtauth.generateRefreshToken(userDoc.id, refreshTokenDoc.id);
        const accessToken = jwtauth.generateToken(userDoc.id);
        return res.status(200).send({
            id: userDoc.id,
            refreshToken,
            accessToken
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
        
}
