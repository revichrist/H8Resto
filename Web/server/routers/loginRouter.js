const router = require("express").Router();
const { LoginController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

router.post('/login', LoginController.login)
router.post('/register', authentication, authorization, LoginController.register)

module.exports = { loginRouter: router };