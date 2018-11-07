/*
const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};
*/
const Sequelize = require('sequelize');

const dbConfig = {
    database: 'ape',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
});
/*
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
*/

module.exports = {
    User: require('../users/user.model')(sequelize, Sequelize)
};