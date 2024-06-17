const express = require('express')
const { loginController, registerController } = require('../controllers/userController')
const router = express.Router()

router.route('/register').post(registerController)
router.route('/login').post(loginController)

module.exports = router