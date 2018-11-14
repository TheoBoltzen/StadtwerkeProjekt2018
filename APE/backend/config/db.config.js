const Sequelize = require('sequelize');

const dbConfig = {
    database: 'ape',
    username: 'root',
    password: 'leberkaese',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//Models (Tables)
db.items = require('../models/items.model.js')(sequelize, Sequelize)
db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.competencyCategory = require('../models/competencyCategory.model.js')(sequelize, Sequelize)
db.mainCategory = require('../models/mainCategory.model.js')(sequelize, Sequelize)
db.subCategory = require('../models/subCategory.model.js')(sequelize, Sequelize)
db.competence = require('../models/competence.model.js')(sequelize, Sequelize)
db.developmentBow = require('../models/developmentBow.model.js')(sequelize,Sequelize)


// Associations

db.competence.hasOne(db.subCategory);
db.subCategory.hasMany(db.category);

db.subCategory.hasOne(db.mainCategory);
db.mainCategory.hasMany(db.subCategory);

db.mainCategory.hasOne(db.competencyCategory);
db.competencyCategory.hasMany(db.mainCategory);

//db.developmentBow.hasMany(db.competence);


module.exports = db
