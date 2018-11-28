const db = require("../config/db.config");
const Sequelize = require("sequelize");
const ReadyDevSheet = db.readyDevelopmentSheet;
const DevelopmentSheet = db.developmentSheet;
const devSheet = require("./developmentSheet.service");
const compCategory = require("./competencyCategory.service");
const mainCategory = require("./mainCategory.service");
const subCategory = require("./subCategory.service");
const competence = require("./competence.service");

module.exports = {
  update,
  create,
  getById
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
  const content = devSheetParam.content;
  for (let i = 0; i < content.length; i++) {
    let x = { name: content[i].name };
    try {
      compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.length; j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategorys = maincategories[j].children;
      for (let k = 0; k < subcategorys.length; k++) {
        let z = {
          name: subcategorys[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          subCategory.create(z);
        } catch {}
        // Step through competences
        let competences = subcategorys[k].children;
        for (let l = 0; l < competences.length; l++) {
          let zA = {
            name: competences[l].name,
            ynAnswer: competences[l].ynAnswer,
            SubCategoryName: subcategorys[k].name
          };
          try {
            competence.create(zA);
          } catch {}

          // Create Relationship

          // TODO: ID DevSheet (max num ID)
          const num = 1;

          const newRelation = ReadyDevSheet.build({
            version: version,
            goalCross: competences[l].goalCross,
            CompetenceName: competences[l].name,
            DevelopmentSheetId: num
          });
          // save Realtion in db
          newRelation.save().then(() => {});
        }
      }
    }
  }
}

async function update(devSheetParam) {}

async function getById(id) {
  return await Competence.findOne({ where: { id: id } });
}
