
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users.js');

router.route('/login').post(usersCtrl.login);
router.route('/register').post(usersCtrl.register);

module.exports = router;