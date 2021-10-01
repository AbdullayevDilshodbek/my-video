const express = require('express')

const videoController = require('../controllers/videoController')

const router = express.Router()
router.get('/', videoController.index)
router.get('/:id', videoController.playing)
router.get('/video/:id', videoController.video)

module.exports = router