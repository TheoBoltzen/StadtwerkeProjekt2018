const db = require("../config/db.config");
const Sequelize = require("sequelize");
const MainCategory = db.mainCategory;

module.exports = {
  findAll,
  create,
  getById,
  getAllByCompetencyCategory,
  joinTest,
  delete: _delete
};

async function findAll() {
  return await MainCategory.findAll();
}

async function create(mainCategoryParam) {
  // validate
  if (await MainCategory.findOne({ where: { name: mainCategoryParam.name } })) {
    throw 'MainCategory "' + mainCategoryParam.name + '" is already taken';
  } else {
    const newMainCategory = MainCategory.build({
      name: mainCategoryParam.name,
      description: mainCategoryParam.description,
      CompetencyCategoryName: mainCategoryParam.CompetencyCategoryName
    });
    // save user in db
    newMainCategory.save().then(() => {});
  }
}

async function getById(id) {
  return await MainCategory.findOne({ where: { name: id } });
}

// TODO: Check these
async function getAllByCompetencyCategory(competencyCategoryparam) {
  return await MainCategory.findAll({
    where: {},
    include: [
      {
        model: db.competencyCategory,
        where: {
          name: Sequelize.col("mainCategory.name"),
          name: competencyCategoryparam.name
        }
      }
    ]
  });
}

async function joinTest(competencyCategoryparam) {
  return await MainCategory.findAll({
    where: {},
    include: [
      {
        model: db.competencyCategory,
        where: { name: Sequelize.col("mainCategory.name") }
      }
    ]
  });
}

async function _delete(id) {
  await Competence.findByIdAndRemove(id);
}
