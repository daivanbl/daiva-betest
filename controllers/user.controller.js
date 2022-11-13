const User = require('../models/user.model');
const response = require('../helpers/response.helper')

exports.findMe = async (req, res) => {
    try {
        const userDoc = await User.findById(req.validatedUser.userId).exec();
        if (!userDoc) {
            return res.status(400).send(response.generateFailResponse('Data not found'));
        }
        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Data Found'));
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(response.generateErrorResponse(500, error));
    }
        
}

exports.findById = async (req, res) => {
    try {
        const userNumber = req.params.id;
        const payload = userNumber.length < 12 ? {accountNumber:userNumber}: {identityNumber:userNumber};
        const userDoc = await User.findOne(payload).exec();
        if (!userDoc) {
            return res.status(400).send(response.generateFailResponse('Data not found'));
        }
        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Data Found'));
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(response.generateErrorResponse(500, error));
    }
        
}

exports.findOneAndUpdate =  async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).send(response.generateErrorResponse(400, 'Data to update can not be empty!'));
    try {
        console.log(req.validatedUser.userId);
        const query = {_id: req.validatedUser.userId};
        const userDoc = await User.findOneAndUpdate(query, req.body).exec();
        if (!userDoc) {
            return res.status(400).send(response.generateFailResponse('Failed to update data'));
        }
        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Successfuly update data!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(response.generateErrorResponse(500, error));
    }
}

exports.findOneAndDelete = async (req, res) => {
    try {
        const query = {_id: req.validatedUser.userId};
        const userDoc = await User.findOneAndDelete(query).exec();
        if (!userDoc) {
            return res.status(400).send(response.generateFailResponse('Failed to delete data'));
        }
        return res.status(200).send(response.generateSuccessResponse(userDoc, 'Successfuly delete data!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(response.generateErrorResponse(500, error));
    }
}
