const express = require('express');
const router = express.Router();
const eahandler = require('../utils/EAHandler');

const installer = require('../utils/installer')

const tatics_controller = require('../controllers/tatics');

router.get('/', function (req, res, next) {
    res.status(200).send({
        result: "OK"
    });
});


router.get('/install', async function (req, res, next) {

    installer.createTables().then(data => {
        eahandler.uploadToDB().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(400).send(err)
        })
    }).catch(err => {
        res.status(400).send(err)
    })
    
});


module.exports = router;