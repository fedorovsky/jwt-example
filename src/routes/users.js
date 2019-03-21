
const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        firstName: 'User',
        lastname: 'One',
    },
    {
        id: 2,
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