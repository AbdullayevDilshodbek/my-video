const express = require('express')

const userController = require('../controllers/userController')
const AuthController = require('../controllers/AuthController')

const router = express.Router()
router.get('/', userController.index)
router.get('/vid/:id', userController.videos)
router.post('/', userController.create)
router.post('/login',AuthController.login)

module.exports = router