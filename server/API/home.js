const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message : 'Home is ok'});
});

module.exports = router;