const express = require('express');

const controller = require('./../../controllers/auth')

const router = express.Router();

router.post('/', controller.create);
router.post('/login', controller.login);
router.delete('/', controller.removeAll);

module.exports = router;