const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "ADR Navigator API",
        version: "0.0.1"
    });
});

module.exports = router;