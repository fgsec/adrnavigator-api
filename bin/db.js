const Sequelize = require('sequelize');

//criação do client conexão
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db.sqlite'
  });
  

module.exports = sequelize;