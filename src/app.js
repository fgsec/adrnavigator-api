var express = require("express")
var db = require("../bin/db.js")
var app = express()

var bodyParser = require('body-parser');

const router = express.Router();

const techniques = require('./routes/techniques');
const tatics = require('./routes/tatics');
const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/techniques', techniques);
app.use('/tatics', tatics);

module.exports = app;