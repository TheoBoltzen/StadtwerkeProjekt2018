const Sequelize = require("sequelize");

const dbConfig = {
  database: "ape",
  username: "root",
  password: "leberkaese",
  host: "localhost",
  port: 3306,
  dialect: "mysql"
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models (Tables)
db.items = require("../models/items.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.competence = require("../models/competence.model.js")(sequelize, Sequelize);

//1:1 => competence get category_id
//db.competence.belongsTo(db.category);
//1:n => each category get competence_id
db.competence.hasMany(db.category); //

module.exports = db;
