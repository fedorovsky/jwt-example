
const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Privare Route API');
});

module.exports = router;