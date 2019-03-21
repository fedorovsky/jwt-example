
const express = require('express');
const router = express.Router();

const users = [
    {
        firstName: 'User',
        lastname: 'One',
    },
    {
        firstName: 'User',
        lastname: 'Two',
    }
]

router.route('/').get((req, res) => {
    res.status(200).json({
        users: users,
      });
});

module.exports = router;