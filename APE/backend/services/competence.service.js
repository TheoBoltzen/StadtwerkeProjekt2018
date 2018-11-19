const db = require("../config/db.config");
const Sequelize = require("sequelize");
const Competence = db.competence;

module.exports = {
  findAll,
  create,
  getById,
  getAllBySubCategory,
  getAllByMainCategory,
  getAllByCompetencyCategory,
  delete: _delete
};

async function findAll() {
  return await Competence.findAll();
}

async function create(competenceParam) {
  // validate
  if (await Competence.findOne({ where: { name: competenceParam.name } })) {
    throw 'Competence "' + competenceParam.name + '" is already taken';
  } else {
    const newCompetence = Competence.build({
      name: competenceParam.name,
      ynAnswer: competenceParam.ynAnswer,
      description: competenceParam.description
      // TODO: Belongs to SubCategory
    });
    // save user in db
    newCompetence.save().then(() => {});
  }
}

async function getById(id) {
  return await Competence.findOne({ where: { name: id } });
}

// TODO: Check these
async function getAllBySubCategory(subcategory) {
  return await Competence.findAll({
    where: {},
    include: [
      {
        model: db.subCategory,
        where: { name: Sequelize.col("competence.name"), name: subcategory }
      }
    ]
  });
}

async function getAllByMainCategory(maincategory) {
  return await Competence.findAll({
    where: {},
    include: [
      {
        model: db.subCategory,
        where: { name: Sequelize.col("competence.name") },
        include: [
          {
            model: db.mainCategory,
            where: {
              name: Sequelize.col("subCategory.name"),
              name: maincategory
            }
          }
        ]
      }
    ]
  });
}

async function getAllByCompetencyCategory(competencycategory) {
  return await Competence.findAll({
    where: {},
    include: [
      {
        model: db.subCategory,
        where: { name: Sequelize.col("competence.name") },
        include: [
          {
            model: db.mainCategory,
            where: { name: Sequelize.col("subCategory.name") },
            include: [
              {
                model: db.competencyCategory,
                where: {
                  name: Sequelize.col("mainCategory.name"),
                  name: competencycategory
                }
              }
            ]
          }
        ]
      }
    ]
  });
}

async function _delete(id) {
  await Competence.findByIdAndRemove(id);
}
