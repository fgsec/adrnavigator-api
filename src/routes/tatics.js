const express = require('express');
const router = express.Router();
const tatics = require('../controllers/tatics')
const techniques = require('../controllers/techniques')

router.get('/', (request, response, next) => {
    tatics.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
  
});

router.get('/:id/techniques', (request, response, next) => {
    techniques.groupByTatic(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id', (request, response, next) => {
    tatics.getById(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.post('/new', (request, response, next) => {
    tatics.newEntry(request.body).then(data => {
        response.status(200).send('Tatic added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
    //next();
});

module.exports = router;