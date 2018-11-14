const db = require("../config/db.config");
const Sequelize = require("sequelize");
const Competence = db.competence;

module.exports = {
  findAll,
  firstFunction
};

async function findAll() {
  return await Competence.findAll();
}

async function firstFunction() {
  return await Competence.findAll({
    include: [
      {
        model: db.category,
        where: { CompetenceId: Sequelize.col("competence.id") }
      }
    ]
  });
}
