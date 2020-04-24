var express = require("express")
var app = express()

var bodyParser = require('body-parser');

const techniques = require('./routes/techniques');
const tatics = require('./routes/tatics');
const tests = require('./routes/tests');
const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/techniques', techniques);
app.use('/tatics', tatics);
app.use('/tests', tests);

module.exports = app;