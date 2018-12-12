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

db.userDevelopmentSheet = require("../models/userDevelopmentSheet.model.js")(
  sequelize,
  Sequelize
);

// Associations

//db.competencyCategory.belongsTo(db.mainCategory);
db.mainCategory.belongsTo(db.competencyCategory);

//db.mainCategory.belongsTo(db.subCategory);
db.subCategory.belongsTo(db.mainCategory);

//db.subCategory.belongsTo(db.competence);
db.competence.belongsTo(db.subCategory);

db.readyDevelopmentSheet.belongsTo(db.competence);
db.readyDevelopmentSheet.belongsTo(db.developmentSheet);

db.userDevelopmentSheet.belongsTo(db.readyDevelopmentSheet);
db.userDevelopmentSheet.belongsTo(db.user, { as: "Trainee" });
db.userDevelopmentSheet.belongsTo(db.user, { as: "Trainer" });

/*
db.competence.belongsToMany(db.developmentSheet, {
  through: db.readyDevelopmentSheet
});
db.developmentSheet.belongsToMany(db.competence, {
  through: db.readyDevelopmentSheet
});
*/
//testingData.createData();

//1:1 => competence get category_id
//db.competence.belongsTo(db.category);
//1:n => each category get competence_id
//db.competence.hasMany(db.category);

module.exports = db;
