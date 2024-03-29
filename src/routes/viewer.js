const express = require('express');
const router = express.Router();
const mvhandler = require('../utils/MVHandler');

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin' , "*" );
    mvhandler.createJSONView().then(data => {
        res.status(200).send(data);
    })
    
});

router.get('/all', function (req, res, next) {
    res.status(200).json(req.app.locals.easy_view);     
});

router.get('/tests', function (req, res, next) {
    mvhandler.getTestsView().then(data => {
        res.status(200).send(data);
    })
    
});

module.exports = router;