const db    = require('../../bin/db');
const type  = db.Sequelize;

let testsModel = db.define('test',{
    id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        noUpdate : true
    },
    technique_id: type.INTEGER,
    operator: type.STRING,
    execution_date: type.DATE,
    source: type.STRING,
    destination: type.STRING,
    result: type.INTEGER,
    mttd: type.DATE,
    mttr: type.DATE,
    status: type.INTEGER,
    visible: type.INTEGER,
    team: type.STRING
},{
    timestamps: true
});

module.exports = testsModel;