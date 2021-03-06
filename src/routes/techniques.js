const express = require('express');
const router = express.Router();
const techniques = require('../controllers/techniques')
const tests = require('../controllers/tests')
const techniqueTatics = require('../controllers/techniqueTatics')
const riskhandler = require('../utils/riskHandler');

router.get('/', (request, response, next) => {
    techniques.search().then(data => {
        response.status(200).send(data)
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/tatics', (request, response, next) => {
    techniqueTatics.getByTechniqueId(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/risk', (request, response, next) => {
    riskhandler.getOverallRiskByTechnique(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/variations', (request, response, next) => {
    techniques.getVariationsById(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/tatics', (request, response, next) => {
    techniqueTatics.getByTechniqueId(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/tests', (request, response, next) => {
    tests.getByTechnique(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id/tests/recent', (request, response, next) => {
    tests.getMostRecentByTechnique(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.get('/:id', (request, response, next) => {
    techniques.getById(request.params.id).then(data => {
        status = 404
        if (data.length) 
            status = 200
        response.status(status).send(data)
        
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.post('/new', (request, response, next) => {
    techniques.newEntry(request.body).then(data => {
        response.status(200).send('Technique added successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
});

router.put('/:id', (request, response, next) => {
    techniques.updateEntry(request.params.id,request.body).then(data => {
        response.status(200).send('Technique updated successfully!')
    }).catch(err => {
        response.status(400).send(err)
    })
});



module.exports = router;