const User = require('../models/user.model');

exports.findMe = async (req, res) => {
    try {
        const userDoc = await User.findById(req.validatedUser.userId).exec();
        if (!userDoc) {
            return res.status(400).send('Id not found');
        }
        return res.status(200).send(userDoc);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('failed');
    }
        
}

exports.findById = async (req, res) => {
    try {
        const userNumber = req.params.id;
        const payload = userNumber.length < 12 ? {accountNumber:userNumber}: {identityNumber:userNumber};
        const userDoc = await User.findOne(payload).exec();
        if (!userDoc) {
            return res.status(400).send('Id not found');
        }
        return res.status(200).send(userDoc);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send('failed');
    }
        
}
