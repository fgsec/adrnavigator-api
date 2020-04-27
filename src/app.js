var express = require("express")
var app = express()

var bodyParser = require('body-parser');

const techniques = require('./routes/techniques');
const manage = require('./routes/manage');
const tatics = require('./routes/tatics');
const tests = require('./routes/tests');
const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
  })
  
app.use('/api/', index);
app.use('/api/manage', manage);
app.use('/api/techniques', techniques);
app.use('/api/tatics', tatics);
app.use('/api/tests', tests);

module.exports = app;