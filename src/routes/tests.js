const express = require('express');
const router = express.Router();
const tests = require('../controllers/tests')

router.get('/', (request, response, next) => {
    tests.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id', (request, response, next) => {
    tests.getById(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.post('/new', (request, response, next) => {
    
    tests.newEntry(request.body).then(data => {
        response.status(200).send('Test added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.put('/:id', (request, response, next) => {
    tests.updateEntry(request.params.id,request.body).then(data => {
        response.status(200).send('Test updated successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
});

module.exports = router;