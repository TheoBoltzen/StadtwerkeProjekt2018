const db = require("../config/db.config");
const Sequelize = require("sequelize");
const ReadyDevSheet = db.readyDevelopmentSheet;
const DevelopmentSheet = db.developmentSheet;
const devSheet = require("/developmentSheet.service");
const compCategory = require("/competencyCategory.service");
const mainCategory = require("/services/mainCategory.service");
const subCategory = require("/services/subCategory.service");
const category = require("/services/competence.service");

module.exports = {
  getAll,
  update,
  create,
  getById,
  delete: _delete
};

async function create(devSheetParam) {
  // validate
  const version = 1;
  // Create DevSheet
  let body = {
    education: devSheetParam.education,
    department: devSheetParam.department
  };
  devSheet.create(body);

  // Add Competences to DevSheet for ready Dev Sheet

  // Step through CompetencyCategory
  const content = body.content;
  for (let i = 0; i < content.size(); i++) {
    let x = { name: content[i].name };
    try {
      compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.size(); j++) {
      // Step through Subcategory
      let subcategorys = maincategoriess[j].children;
      for (let k = 0; k < subcategorys.size(); k++) {
        // Step through competences
        let competences = subcategorys[k];
        for (let l = 0; l < competences.size(); l++) {}
      }
    }
  }
}

async function Update(devSheetParam) {
  // validate
  // GET Versionsnummer von ID / Wenn leer dann Version 1 sonst version +1

  if (!(await DevelopmentSheet.findOne({ where: { id: devSheetParam.id } }))) {
    throw 'Developmentsheet "' +
      devSheetParam.id +
      '" does not exist. Please create a new one.';
  } else {
    // Erstelle alle mit neuer Versionnummer

    const newCompetence = Competence.build({
      name: devSheetParam.name,
      ynAnswer: devSheetParam.ynAnswer,
      description: devSheetParam.description,
      SubCategoryName: devSheetParam.SubCategoryName
    });
    // save user in db
    newCompetence.save().then(() => {});
  }
}

async function getById(id) {
  return await Competence.findOne({ where: { id: id } });
}
