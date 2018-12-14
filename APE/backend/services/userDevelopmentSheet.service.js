const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheet = db.userDevelopmentSheet;
const ReadyDevSheet = db.readyDevelopmentSheet;

module.exports = {
  associate,
  setTrainer,
  getAllUserDevelopmentSheets,
  getAllUserDevelopmentSheetsByUserId,
  getUserDevelopmentSheet,
  setDigitalAgreement,
  setTrainerAssessment,
  setTraineeAssessment,
  delete: _delete
};

async function associate(devSheetParam) {
  // IN: developmentSheetId + Username

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
      let userToDevSheet = [];
      for (var i = 0; i < associations.length; i++) {
        let dataobject = {
          status: "Zugewiesen",
          DevelopmentSheetId: associations[i].DevelopmentSheetId,
          ReadyDevelopmentSheetId: associations[i].id,
          TraineeUsername: devSheetParam.username
        };
        userToDevSheet.push(dataobject);
      }

      await UserDevSheet.bulkCreate(userToDevSheet, {
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

async function setTrainerAssessment(devSheetParam) {}

async function setTraineeAssessment(devSheetParam) {}

async function setTrainer(devSheetParam) {}

async function getAllUserDevelopmentSheets(devSheetParam) {}

async function getAllUserDevelopmentSheetsByUserId(devSheetParam) {}

async function getUserDevelopmentSheet(devSheetParam) {}

async function setDigitalAgreement(devSheetParam) {}

async function _delete(devSheetParam) {
  await UserDevSheet.destroy({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.username
    }
  });
}
