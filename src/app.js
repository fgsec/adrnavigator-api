var express = require("express")
var app = express()

var bodyParser = require('body-parser');

const techniques = require('./routes/techniques');
const manage = require('./routes/manage');
const tatics = require('./routes/tatics');
const viewer = require('./routes/viewer');
const tests = require('./routes/tests');
const index = require('./routes/index');

let preroute = "/api"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

app.use(preroute + '/', index);
app.use(preroute + '/manage', manage);
app.use(preroute + '/techniques', techniques);
app.use(preroute + '/tatics', tatics);
app.use(preroute + '/tests', tests);
app.use(preroute + '/viewer', viewer);

module.exports = app;