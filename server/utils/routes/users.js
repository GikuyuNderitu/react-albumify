const express = require('express');

const controller = require('./../../controllers/users')

const router = express.Router();

router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/logout', controller.logout)
router.delete('/', controller.removeAll);


module.exports = router;