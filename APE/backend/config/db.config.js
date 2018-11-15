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
db.competencyCategory = require("../models/competencyCategory.model.js")(
  sequelize,
  Sequelize
);
db.mainCategory = require("../models/mainCategory.model.js")(
  sequelize,
  Sequelize
);
db.subCategory = require("../models/subCategory.model.js")(
  sequelize,
  Sequelize
);
db.competence = require("../models/competence.model.js")(sequelize, Sequelize);
db.developmentSheet = require("../models/developmentSheet.model.js")(
  sequelize,
  Sequelize
);
db.readyDevelopmentSheet = require("../models/readyDevelopmentSheet.model.js")(
  sequelize,
  Sequelize
);

// Associations

db.competencyCategory.belongsToMany(db.mainCategory);
db.mainCategory.belongsTo(db.competencyCategory);

db.mainCategory.belongsToMany(db.subCategory);
db.subCategory.belongsTo(db.mainCategory);

db.subCategory.belongsToMany(db.competence);
db.competence.belongsTo(db.subCategory);

db.readyDevelopmentSheet.belongsToMany(db.developmentSheet);
db.readyDevelopmentSheet.belongsToMany(db.competence);

module.exports = db;
