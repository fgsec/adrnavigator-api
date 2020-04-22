const express = require('express');
const router = express.Router();
const controller = require('../controllers/tatics')

router.get('/', (request, response, next) => {
    controller.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

router.post('/new', (request, response, next) => {
    controller.newEntry(request.body).then(data => {
        response.status(200).send('Tatic added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

module.exports = router;