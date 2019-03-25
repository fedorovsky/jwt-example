
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.route('/').get((req, res) => {
    User.find({}, function (err, users) {
        res.status(200).json({
            users: users,
          });
    });
});

module.exports = router;