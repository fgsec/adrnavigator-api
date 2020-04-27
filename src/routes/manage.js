const express = require('express');
const router = express.Router();
const eahandler = require('../utils/EAHandler');

const tatics_controller = require('../controllers/tatics');

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


router.get('/test', async function (req, res, next) {

    let test = await tatics_controller.newEntry({ name: 0, description: 0 }).then(data => {
        return data.id;
    }).catch(err => {
        console.log(`Error adding tatic on DB: ${obj_tatic.name} `)
    })

    console.log(test)
    res.status(200).send("ok")

});


module.exports = router;