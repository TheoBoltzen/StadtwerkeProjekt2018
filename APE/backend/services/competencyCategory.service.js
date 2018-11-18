const db = require("../config/db.config");
const Sequelize = require("sequelize");
const CompetencyCategory = db.competencyCategory;

module.exports = {
  findAll,
  create,
  getById,
  delete: _delete
};

async function findAll() {
  return await CompetencyCategory.findAll();
}

async function create(competencyCategoryParam) {
  // validate
  if (
    await CompetencyCategory.findOne({
      where: { name: competencyCategoryParam.name }
    })
  ) {
    throw 'CompetencyCategory "' +
      competencyCategoryParam.name +
      '" is already taken';
  } else {
    const newCompetencyCategory = CompetencyCategory.build({
      name: competencyCategoryParam.name,
      description: competencyCategoryParam.description
    });
    // save user in db
    newCompetencyCategory.save().then(() => {});
  }
}

async function getById(id) {
  return await CompetencyCategory.findOne({ where: { name: id } });
}

async function _delete(id) {
  await CompetencyCategory.findByIdAndRemove(id);
}
