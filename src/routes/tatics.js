const express = require('express');
const router = express.Router();
const controller_tatics = require('../controllers/tatics')
const controller_techniques = require('../controllers/techniques')

router.get('/', (request, response, next) => {
    controller_tatics.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
  
});

router.get('/:id/techniques', (request, response, next) => {
    controller_techniques.groupByTatic(request.params.id).then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.post('/new', (request, response, next) => {
    controller_tatics.newEntry(request.body).then(data => {
        response.status(200).send('Tatic added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

module.exports = router;