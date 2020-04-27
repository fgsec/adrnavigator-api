const db    = require('../../bin/db');
const type  = db.Sequelize;

let techniqueTatics = db.define('techniquetatic',{
    id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        noUpdate : true
    },
    technique_id: type.INTEGER,
    tatic_id: type.INTEGER
},{
    timestamps: true
});

module.exports = techniqueTatics;