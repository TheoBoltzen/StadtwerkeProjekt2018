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
  let competencesForDevSheet = [];
  // validate
  const version = 1;
  // Create DevSheet
  let body = {
    education: devSheetParam.education,
    department: devSheetParam.department
  };
  await devSheet.create(body);

  let identifier;
  await DevelopmentSheet.findOne({
    where: {},
    attributes: [[Sequelize.fn("max", Sequelize.col("id")), "id"]]
  }).then(function(result) {
    if (result == {}) {
      identifier = 1;
    } else {
      identifier = result.id + 1;
    }
  });

  // Step through CompetencyCategory
  const content = devSheetParam.content;
  for (let i = 0; i < content.length; i++) {
    let x = { name: content[i].name };
    try {
      await compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.length; j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        await mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategories = maincategories[j].children;
      for (let k = 0; k < subcategories.length; k++) {
        let z = {
          name: subcategories[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          await subCategory.create(z);
        } catch {}
        // Step through competences
        let competences = subcategories[k].children;
        for (let l = 0; l < competences.length; l++) {
          let zA = {
            name: competences[l].name,
            ynAnswer: competences[l].ynAnswer,
            SubCategoryName: subcategories[k].name
          };
          try {
            await competence.create(zA);
          } catch {}

          // Create Relationship

          competencesForDevSheet.push({
            version: version,
            goalCross: competences[l].goalCross,
            CompetenceName: competences[l].name,
            DevelopmentSheetId: identifier
          });
        }
      }
    }
  }
  console.log("LOG: " + competencesForDevSheet);
  ReadyDevSheet.bulkCreate(competencesForDevSheet, {
    returning: true
  })
    .then(() => {})
    .catch(function(err) {
      console.log(err);
    });
}

async function update(devSheetParam) {
  let competencesForDevSheet = [];
  // validate

  // Step through CompetencyCategory

  let identifier;
  await ReadyDevSheet.findOne({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId
    },
    attributes: [[Sequelize.fn("max", Sequelize.col("version")), "version"]]
  }).then(function(result) {
    identifier = result.version + 1;
    console.log("LOG: " + identifier);
  });

  const content = devSheetParam.content;
  for (let i = 0; i < content.length; i++) {
    let x = { name: content[i].name };
    try {
      await compCategory.create(x);
    } catch {}

    // Step through MainCategory
    let maincategories = content[i].children;
    for (let j = 0; j < maincategories.length; j++) {
      let y = {
        name: maincategories[j].name,
        CompetencyCategoryName: content[i].name
      };
      try {
        await mainCategory.create(y);
      } catch {}
      // Step through Subcategory
      let subcategorys = maincategories[j].children;
      for (let k = 0; k < subcategorys.length; k++) {
        let z = {
          name: subcategorys[k].name,
          MainCategoryName: maincategories[j].name
        };
        try {
          await subCategory.create(z);
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
            await competence.create(zA);
          } catch {}

          // Create Relationship

          competencesForDevSheet.push({
            version: identifier,
            goalCross: competences[l].goalCross,
            CompetenceName: competences[l].name,
            DevelopmentSheetId: devSheetParam.DevelopmentSheetId
          });
        }
      }
    }
  }
  ReadyDevSheet.bulkCreate(competencesForDevSheet, {
    returning: true
  })
    .then(() => {})
    .catch(function(err) {
      console.log(err);
    });
}

async function getById(id) {
  return await ReadyDevSheet.findOne({ where: { id: id } });
}
