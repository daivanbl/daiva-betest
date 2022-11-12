var express = require('express'), 
    router = express.Router(), 
    jwtauth = require('../helpers/auth.helper'),
    controller = require('../controllers/user.controller');

router.get("/", jwtauth.AuthenticateToken,controller.findMe);
router.get("/:id", jwtauth.AuthenticateToken,controller.findById);

module.exports = router;