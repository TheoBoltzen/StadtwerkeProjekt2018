const db = require("../config/db.config");
const Sequelize = require("sequelize");
const SubCategory = db.subCategory;

module.exports = {
  findAll,
  create,
  getById,
  getAllByMainCategory,
  getAllByCompetencyCategory,
  delete: _delete
};

async function findAll() {
  return await SubCategory.findAll();
}

async function create(subCategoryParam) {
  // validate
  if (await SubCategory.findOne({ where: { name: subCategoryParam.name } })) {
    throw 'SubCategory "' + subCategoryParam.name + '" is already taken';
  } else {
    const newSubcategory = SubCategory.build({
      name: subCategoryParam.name,
      description: subCategoryParam.description,
      MainCategoryName: subCategoryParam.MainCategoryName
    });
    // save user in db
    newSubcategory.save().then(() => {});
  }
}

async function getById(id) {
  return await SubCategory.findOne({ where: { name: id } });
}

async function getAllByMainCategory(maincategoryparam) {
  return await SubCategory.findAll({
    where: {},
    include: [
      {
        model: db.mainCategory,
        where: {
          name: Sequelize.col("subCategory.name"),
          name: maincategoryparam.name
        }
      }
    ]
  });
}

async function getAllByCompetencyCategory(competencycategoryparam) {
  return await SubCategory.findAll({
    where: {},
    include: [
      {
        model: db.mainCategory,
        where: { name: Sequelize.col("subCategory.name") },
        include: [
          {
            model: db.competencyCategory,
            where: {
              name: Sequelize.col("mainCategory.name"),
              name: competencycategoryparam.name
            }
          }
        ]
      }
    ]
  });
}

async function _delete(id) {
  await SubCategory.findByIdAndRemove(id);
}
