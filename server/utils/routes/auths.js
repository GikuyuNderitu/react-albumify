const express = require('express');

const controller = require('./../../controllers/auths')

const router = express.Router();

router.get('/', controller.authenticate);

module.exports = router;