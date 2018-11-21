const db = require("../config/db.config");
const Sequelize = require("sequelize");
const DevSheet = db.developmentSheet;

module.exports = {
  findAll,
  create,
  getById,
  delete: _delete
};

async function findAll() {
  return await DevSheet.findAll();
}

async function create(devSheetParam) {
  // validate
  Console.log("Service-Create");
  if (await DevSheet.findOne({ where: { id: devSheetParam.id } })) {
    throw 'DevelopmentSheet "' + devSheetParam.id + '" is already taken';
  } else {
    const newDevSheet = DevSheet.build({
      id: devSheetParam.id,
      name: devSheetParam.name,
      department: devSheetParam.department,
      education: devSheetParam.education
    });
    // save user in db
    newDevSheet.save().then(() => {});
  }
}

async function getById(id) {
  return await DevSheet.findOne({ where: { id: id } });
}

async function _delete(id) {
  await DevSheet.findByIdAndRemove(id);
}
