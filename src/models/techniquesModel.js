const db    = require('../../bin/db');
const type  = db.Sequelize;

let techniqueModel = db.define('technique',{
    id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        noUpdate : {
            readOnly: true
          }
    },
    name: type.STRING,
    mid: type.INTEGER,
    source: type.STRING,
    description: type.STRING,
    plataform: type.STRING,
    variation_id: type.INTEGER
},{
    timestamps: true
});

module.exports = techniqueModel;