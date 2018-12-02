const db = require("../config/db.config");
const Sequelize = require("sequelize");
const CompetencyCategory = db.competencyCategory;

module.exports = {
  findAll,
  create,
  getById,
  update,
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

async function update(competencycategoryparam) {
  const cc = await CompetencyCategory.findOne({
    where: { name: competencycategoryparam.name }
  });

  if (!cc) {
    throw "CompetencyCategory not found";
  }
  cc.name = competencycategoryparam.newname;
  cc.description = competencycategoryparam.description;

  await cc.update(
    {
      name: competencycategoryparam.newname,
      description: competencycategoryparam.description
    },
    { where: { name: competencycategoryparam.name } }
  );
}

async function getById(id) {
  return await CompetencyCategory.findById(id);
}

async function _delete(id) {
  await CompetencyCategory.findByIdAndRemove(id);
}
