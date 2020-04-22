const db    = require('../../bin/db');
const type  = db.Sequelize;

let taticModel = db.define('tatic',{
    id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: type.STRING,
    description: type.INTEGER
},{
    timestamps: true
});

module.exports = taticModel;