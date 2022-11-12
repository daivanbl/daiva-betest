const { default: mongoose } = require("mongoose");

exports.withTrasaction =  function(fn) {
    return async function(req, res, next) {
        let result;
        await mongoose.connection.transaction(async (session) => {
            result = await fn(req, res, session);
            return result
        });
        return result;
    }
}