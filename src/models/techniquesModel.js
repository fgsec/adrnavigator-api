const db    = require('../../bin/db');
const type  = db.Sequelize;

let techniqueModel = db.define('technique',{
    id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: type.STRING,
    mid: type.INTEGER,
    source: type.STRING,
    description: type.STRING,
    tatic_id: type.INTEGER
},{
    timestamps: true
});

module.exports = techniqueModel;