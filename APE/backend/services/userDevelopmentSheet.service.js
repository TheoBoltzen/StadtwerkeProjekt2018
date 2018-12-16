const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheet = db.userDevelopmentSheet;
const ReadyDevSheet = db.readyDevelopmentSheet;

module.exports = {
  associate,
  setTrainer,
  getAllUserDevelopmentSheets,
  getAllUserDevelopmentSheetsByUserTrainer,
  getAllUserDevelopmentSheetsByUserTrainee,
  getUserDevelopmentSheet,
  setDigitalAgreement,
  setTrainerAssessment,
  setTraineeAssessment,
  setDigitalDisagreement,
  setStatusEstimated,
  setStatusRated,
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
      for (let i = 0; i < associations.length; i++) {
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

async function setTrainerAssessment(devSheetParam) {
  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheet.update(
      {
        assessmentTRAINER: devSheetParam[i].assessmentTRAINER
      },
      {
        where: {
          ReadyDevelopmentSheetId: devSheetParam[i].ReadyDevelopmentSheetId,
          TraineeUsername: devSheetParam.TraineeUsername
        }
      }
    ).then(() => {});
  }
}

async function setTraineeAssessment(devSheetParam) {
  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheet.update(
      {
        assessmentTRAINEE: devSheetParam[i].assessmentTRAINEE
      },
      {
        where: {
          ReadyDevelopmentSheetId: devSheetParam[i].ReadyDevelopmentSheetId,
          TraineeUsername: devSheetParam.TraineeUsername
        }
      }
    ).then(() => {});
  }
}

async function setTrainer(devSheetParam) {
  await UserDevSheet.update(
    {
      TrainerUsername: devSheetParam.TrainerUsername
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  ).then(() => {});
}

async function getAllUserDevelopmentSheets(devSheetParam) {
  return await UserDevSheet.findAll({
    where: {},
    Attributes: {
      TraineeUsername,
      DevelopmentSheetId,
      status,
      createdAt
    }
  });
}

async function getAllUserDevelopmentSheetsByUserTrainer(devSheetParam) {}

async function getAllUserDevelopmentSheetsByUserTrainee(devSheetParam) {}

async function getUserDevelopmentSheet(devSheetParam) {}

async function setStatusRated() {
  await UserDevSheet.update(
    {
      status: "Überarbeitet"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  ).then(() => {});
}

async function setStatusEstimated(devSheetParam) {
  await UserDevSheet.update(
    {
      status: "Eingeschätzt"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  ).then(() => {});
}

async function setDigitalAgreement(devSheetParam) {
  await UserDevSheet.update(
    {
      status: "Abgeschlossen"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  ).then(() => {});
}

async function setDigitalDisagreement(devSheetParam) {
  await UserDevSheet.update(
    {
      status: "Gesprächsbedarf"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  ).then(() => {});
}

async function _delete(devSheetParam) {
  await UserDevSheet.destroy({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.username
    }
  });
}
