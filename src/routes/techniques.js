const express = require('express');
const router = express.Router();
const controller = require('../controllers/techniques')

router.get('/', controller.get);

module.exports = router;