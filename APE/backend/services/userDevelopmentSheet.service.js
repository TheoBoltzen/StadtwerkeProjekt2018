const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheet = db.userDevelopmentSheet;
const ReadyDevSheet = db.readyDevelopmentSheet;
const UserDevSheetAss = db.userDevelopmentSheetAssociation;

module.exports = {
  _create,
  setTrainer,
  getAllUserDevelopmentSheets,
  getAllUserDevelopmentSheetsByUserTrainer,
  getAllUserDevelopmentSheetsByUserTrainee,
  getUserDevelopmentSheet,
  setDigitalAgreement,
  setDigitalDisagreement,
  setStatusEstimated,
  setStatusRated,
  delete: _delete
};

async function _create(devSheetParam) {
  // IN: developmentSheetId + Username

  if (
    await UserDevSheet.findOne({
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.username
      }
    })
  ) {
    throw "UserDevSheet is already taken";
  } else {
    const _userDevSheet = UserDevSheet.build({
      status: "Zugewiesen",
      TraineeUsername: devSheetParam.username,
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId
    });
    // save user in db
    _userDevSheet.save().then(() => {});
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

async function getAllUserDevelopmentSheets(devSheetParam) {}

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
  let x = await UserDevSheet.findOne({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.username
    }
  });

  await UserDevSheetAss.destroy({
    where: {
      UserDevelopmentSheetId: x.id
    }
  });

  await UserDevSheet.destroy({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.username
    }
  });
}
