const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheetAsso = db.userDevelopmentSheetAssociation;
const ReadyDevSheet = db.readyDevelopmentSheet;
const UserDevSheet = db.userDevelopmentSheet;
const UserDevSheetService = require("./userDevelopmentSheet.service");
const jwt = require("jsonwebtoken");
const config = require("./../config.json");

module.exports = {
  associate,
  setTraineeAssessment,
  setTrainerAssessment,
  getById
};

async function associate(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  let ver = null;
  await ReadyDevSheet.findOne({
    where: { DevelopmentSheetId: devSheetParam.DevelopmentSheetId },
    attributes: [[Sequelize.fn("max", Sequelize.col("version")), "version"]]
  }).then(function(result) {
    if (result != null) {
      ver = result.version;
    }
  });

  let associations = null;

  if (ver != null) {
    await ReadyDevSheet.findAll({
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        version: ver
      }
    }).then(function(result) {
      associations = result;
    });

    if (associations != null && associations != {}) {
      let Data = {
        DevelopmentSheetId: associations[0].DevelopmentSheetId,
        username: username
      };

      try {
        await UserDevSheetService._create(Data);
      } catch {}

      let latest = await UserDevSheet.findOne({
        attributes: [[Sequelize.fn("max", Sequelize.col("id")), "id"]]
      });

      let userdevId;

      if (latest == null) {
        userdevId = 1;
      } else {
        userdevId = latest.id + 1;
      }

      let userToDevSheet = [];
      for (let i = 0; i < associations.length; i++) {
        let dataobject = {
          ReadyDevelopmentSheetId: associations[i].id,
          UserDevelopmentSheetId: userdevId
        };
        userToDevSheet.push(dataobject);
      }

      await UserDevSheetAsso.bulkCreate(userToDevSheet, {
        returning: true
      })
        .then(() => {})
        .catch(function(err) {
          console.log(err);
        });
    }
    // else:
  }
  // else: no version detected; maybe missing devsheet
}

async function setTrainerAssessment(devSheetParam) {
  devSheetParam = devSheetParam.traineeAssessments;

  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheetAsso.update(
      {
        assessmentTRAINER: devSheetParam[i].assessmentTRAINER
      },
      {
        where: {
          id: devSheetParam[i].id
        }
      }
    ).then(() => {});
  }
}

async function setTraineeAssessment(devSheetParam, token) {
  devSheetParam = devSheetParam.traineeAssessments;

  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheetAsso.update(
      {
        assessmentTRAINEE: devSheetParam[i].traineeAssessment
      },
      {
        where: {
          id: devSheetParam[i].id
        }
      }
    ).then(() => {});
  }
}
async function getById(userdevsheetparam) {
  let identifier;

  await UserDevSheetAsso.findOne({
    where: {
      UserDevelopmentSheetId: userdevsheetparam.id
    }
  }).then(function(result) {
    identifier = result.ReadyDevelopmentSheetId;
    console.log("LOG: " + identifier);
  });
  let result = await db.readyDevelopmentSheet.findAll({
    attributes: ["id", "goalcross", "version", "DevelopmentSheetId"],
    required: true,
    where: { id: userdevsheetparam.id },
    include: [
      {
        model: db.competence,
        attributes: ["name", "ynAnswer"],
        required: true,
        include: [
          {
            model: db.subCategory,
            attributes: ["name"],
            required: true,
            include: [
              {
                model: db.mainCategory,
                attributes: ["name"],
                required: true,
                include: [
                  {
                    model: db.competencyCategory,
                    attributes: ["name"],
                    required: true,
                    include: [
                      {
                        model: db.developmentSheet,
                        attributes: ["education", "department"],
                        required: true,

                        where: {
                          id: userdevsheetparam.id
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  });
  //collecting ReadyDevSheetInfos
  let content = new Array();
  let info = {
    devSheetid: result[0].DevelopmentSheetId,
    version: result[0].version,
    department:
      result[0].Competence.SubCategory.MainCategory.CompetencyCategory
        .DevelopmentSheet.department,
    education:
      result[0].Competence.SubCategory.MainCategory.CompetencyCategory
        .DevelopmentSheet.education,
    /*traineename: UserDevSheet.findOne()({
     */
    content: []
  };

  let competencycategories = [];

  let i = 0;
  let j = 0;
  let s = 0;
  let m = 0;

  for (i = 0; i < result.length; i++) {
    if (
      !competencycategories.find(c => {
        return (
          c.name ===
          result[i].Competence.SubCategory.MainCategory.CompetencyCategory.name
        );
      })
    ) {
      let comp = {
        name:
          result[i].Competence.SubCategory.MainCategory.CompetencyCategory.name,
        children: []
      };
      competencycategories.push(comp);
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (j = 0; j < result.length; j++) {
      if (
        !competencycategories[i].children.find(c => {
          return c.name === result[j].Competence.SubCategory.MainCategory.name;
        }) &&
        result[j].Competence.SubCategory.MainCategory.CompetencyCategory
          .name === competencycategories[i].name
      ) {
        let comp = {
          name: result[j].Competence.SubCategory.MainCategory.name,
          children: []
        };
        competencycategories[i].children.push(comp);
      }
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (m = 0; m < competencycategories[i].children.length; m++) {
      for (j = 0; j < result.length; j++) {
        if (
          !competencycategories[i].children[m].children.find(c => {
            return c.name === result[j].Competence.SubCategory.name;
          }) &&
          result[j].Competence.SubCategory.MainCategory.name ===
            competencycategories[i].children[m].name
        ) {
          let sub = {
            name: result[j].Competence.SubCategory.name,
            children: []
          };
          competencycategories[i].children[m].children.push(sub);
        }
      }
    }
  }
  for (i = 0; i < competencycategories.length; i++) {
    for (m = 0; m < competencycategories[i].children.length; m++) {
      for (
        s = 0;
        s < competencycategories[i].children[m].children.length;
        s++
      ) {
        for (j = 0; j < result.length; j++) {
          if (
            !competencycategories[i].children[m].children[s].children.find(
              c => {
                return c.name === result[j].Competence.name;
              }
            ) &&
            result[j].Competence.SubCategory.name ===
              competencycategories[i].children[m].children[s].name
          ) {
            let competences = {
              name: result[j].Competence.name,
              goalCross: result[j].goalcross,
              ynAnswer: result[j].Competence.ynAnswer
            };
            competencycategories[i].children[m].children[s].children.push(
              competences
            );
          }
        }
      }
    }
  }
  info.content.push(competencycategories);
  return info;
}
