const jwtauth = require('../helpers/auth.helper');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const response = require('../helpers/response.helper')

exports.signUp =  async (req, res) => {
    const accountNumber = Math.floor(Math.random() * 1000000000);
    
    try {
        const useraNameExist = await User.findOne({userName:req.body.userName});
        if (useraNameExist) return res.status(409).send(response.generateErrorResponse(409, 'Username already exist')); 

        const emailAddressExist = await User.findOne({emailAddress:req.body.emailAddress});
        if (emailAddressExist) return res.status(409).send(response.generateErrorResponse(409, 'Email already exist')); 

        const userDoc = new User({ 
            userName: req.body.userName, 
            accountNumber : accountNumber.toString(), 
            emailAddress : req.body.emailAddress, 
            identityNumber : req.body.identityNumber 
        });
        const refreshTokenDoc = new RefreshToken({
            owner: userDoc.id
        });

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
        return res.status(500).send(response.generateErrorResponse(500, error));
    }

}

exports.login = async (req, res) => {
    try {
        const userDoc = await User.findOne({userName: req.body.userName, accountNumber: req.body.accountNumber})
        if (!userDoc) {
            return res.status(400).send(response.generateErrorResponse(400, 'Wrong credentials')); 
        }
        const currentRefreshToken = await RefreshToken.findOne({owner:userDoc.id})

        if (currentRefreshToken != null) await RefreshToken.deleteOne({_id:currentRefreshToken.id});

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
        return res.status(500).send(response.generateErrorResponse(500, error));
    }
        
}
