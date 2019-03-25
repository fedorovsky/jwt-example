
const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        firstName: 'User',
        lastName: 'One',
    },
    {
        id: 2,
        firstName: 'User',
        lastName: 'Two',
    }
]

router.route('/').get((req, res) => {
    res.status(200).json({
        users: users,
      });
});

module.exports = router;