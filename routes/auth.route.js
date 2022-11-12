var express = require('express'), 
    router = express.Router(), 
    controller = require('../controllers/auth.controller');

router.post("/signup", controller.signUp);
router.post("/login", controller.login);

module.exports = router;