const express = require('express');
const router = express.Router();
const controller = require('../controllers/techniques')


router.get('/', (request, response, next) => {
    console.log("im here")
    controller.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

router.post('/new', (request, response, next) => {
    controller.newEntry(request.body).then(data => {
        response.status(200).send('Technique added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

module.exports = router;