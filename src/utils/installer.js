
const tests_model = require('../models/testsModel');
const techniques_model = require('../models/techniquesModel');
const techniqueTatics_model = require('../models/techniqueTaticsModel');
const tatics_model = require('../models/taticsModel');

const createTables = () => {
    return new Promise((Resolve, Reject) => {
        Promise.all([tests_model.sync(), techniques_model.sync(), techniqueTatics_model.sync(), tatics_model.sync()]).then(function(values) {
            console.log("Tables created!");
            Resolve("OK")
        });
    })
}

module.exports = {createTables}