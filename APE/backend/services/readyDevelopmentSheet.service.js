const db = require("../config/db.config");
const Sequelize = require("sequelize");
const ReadyDevSheet = db.readyDevelopmentSheet;
const DevelopmentSheet = db.developmentSheet;
const devSheet = require("./developmentSheet.service");
const compCategory = require("./competencyCategory.service");
const mainCategory = require("./mainCategory.service");
const subCategory = require("./subCategory.service");
const category = require("./competence.service");

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
  const content = body.content;
  for (let i = 0; i < content.size(); i++) {
    let x = { name: content[i].name };
    try {
      compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.size(); j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategorys = maincategories[j].children;
      for (let k = 0; k < subcategorys.size(); k++) {
        let z = {
          name: subcategorys[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          subCategory.create(z);
        } catch {}
        // Step through competences
        let competences = subcategorys[k].children;
        for (let l = 0; l < competences.size(); l++) {
          let zA = {
            name: competences[l].name,
            SubCategoryName: subcategorys[k].name
          };
          try {
            category.create(zA);
          } catch {}

          // Create Relationship

          const num = await DevelopmentSheet.findAll({
            attributes: [Sequelize.fn("MAX", Sequelize.col("id"))]
          });

          const newRelation = ReadyDevSheet.build({
            version: version,
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

async function update(devSheetParam) {
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
