const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheet = db.userDevelopmentSheet;
const ReadyDevSheet = require("./readyDevelopmentSheet.service");
const strings = require("../config/strings.js");

module.exports = {
  associate,
  setTrainer,
  getAllUserDevelopmentSheets,
  getAllUserDevelopmentSheetsByUserId,
  getUserDevelopmentSheet,
  setTrainerAssessment,
  setTraineeAssessment
};

async function associate(devSheetParam) {
  // IN: developmentSheetId + Username
  // Ändere Satus

  x;
  let associations = [
    {
      id: 5,
      goalcross: 4,
      version: 3,
      DevelopmentSheetId: 1,
      Competence: {
        name: "arbeitet sicher und geschickt",
        ynAnswer: false,
        SubCategory: {
          name: "Fertigkeiten",
          MainCategory: {
            name: "Fachkompetenz",
            CompetencyCategory: {
              name: "Fach- und Methodenkompetenz",
              DevelopmentSheet: {
                education: "sdfs",
                department: "fgdf"
              }
            }
          }
        }
      }
    },
    {
      id: 4,
      goalcross: 3,
      version: 3,
      DevelopmentSheetId: 1,
      Competence: {
        name: "äußert Inhalte kurz und präzise",
        ynAnswer: false,
        SubCategory: {
          name: "Kommunikation",
          MainCategory: {
            name: "Personenorientierung/Interaktionskompetenz",
            CompetencyCategory: {
              name: "Soziale Kompetenz",
              DevelopmentSheet: {
                education: "sdfs",
                department: "fgdf"
              }
            }
          }
        }
      }
    }
  ];

  let userToDevSheet = [];
  for (var i = 0; i < associations.length; i++) {
    let dataobject = {
      assessmentTRAINEE: devSheetParam.assessmentTRAINEE,
      //status: , //!!!!!
      ReadyDevelopmentSheetId: devSheetParam.ReadyDevelopmentSheetId,
      TraineeUsername: devSheetParam.username
    };
    userToDevSheet.push(dataobject);
  }
}

async function setTrainerAssessment(devSheetParam) {
  // validate
  const newDevSheet = DevSheet.build({
    //id: devSheetParam.id,
    department: devSheetParam.department,
    education: devSheetParam.education
  });
  // save user in db
  newDevSheet.save().then(() => {});
}

async function setTraineeAssessment(devSheetParam) {
  // validate
  const newDevSheet = DevSheet.build({
    //id: devSheetParam.id,
    department: devSheetParam.department,
    education: devSheetParam.education
  });
  // save user in db
  newDevSheet.save().then(() => {});
}

async function setTrainer(devSheetParam) {
  // validate
  const newDevSheet = DevSheet.build({
    //id: devSheetParam.id,
    department: devSheetParam.department,
    education: devSheetParam.education
  });
  // save user in db
  newDevSheet.save().then(() => {});
}

async function getAllUserDevelopmentSheets(devSheetParam) {
  return await DevSheet.findOne({ where: { id: id } });
}

async function getAllUserDevelopmentSheetsByUserId(devSheetParam) {
  await DevSheet.findByIdAndRemove(id);
}

async function getUserDevelopmentSheet(devSheetParam) {
  await DevSheet.findByIdAndRemove(id);
}
