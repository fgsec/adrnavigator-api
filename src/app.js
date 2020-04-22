var express = require("express")
var app = express()

const router = express.Router();

const techniques = require('./routes/techniques');
const index = require('./routes/index');

app.use('/', index);
app.use('/techniques', techniques);

module.exports = app;