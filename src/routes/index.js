const express = require('express');
const router = express.Router();
const tests = require('../utils/tests');

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "ADR Navigator API",
        version: "0.0.1"
    });
});

router.get('/test', function (req, res, next) {
    res.status(200).send({
        title: "ADR Navigator API",
        version: "0.0.1"
    });
});

module.exports = router;