const express = require('express');
const router = express.Router();
const eahandler = require('../utils/EAHandler');

router.get('/', function (req, res, next) {
    res.status(200).send({
        result: "OK"
    });
});

router.get('/eaupload', function (req, res, next) {

    eahandler.uploadToDB().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(400).send(err)
    })

});


module.exports = router;