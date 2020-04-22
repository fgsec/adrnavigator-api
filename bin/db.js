const Sequelize = require('sequelize');

//criação do client conexão
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
  });
  

module.exports = sequelize;