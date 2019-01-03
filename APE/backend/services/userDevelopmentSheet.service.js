const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheet = db.userDevelopmentSheet;
const ReadyDevSheet = db.readyDevelopmentSheet;
const UserDevSheetAss = db.userDevelopmentSheetAssociation;
const jwt = require("jsonwebtoken");
const config = require("./../config.json");

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

async function setTrainer(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  await UserDevSheet.update(
    {
      TrainerUsername: username
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: devSheetParam.TraineeUsername
      }
    }
  )
    .then(() => {})
    .catch();
}

async function getAllUserDevelopmentSheets(devSheetParam) {
  return await UserDevSheet.findAll({
    where: {},
    include: [
      {
        model: db.developmentSheet,
        attributes: ["department", "education"],
        required: true
      }
    ]
  });
}

async function getAllUserDevelopmentSheetsByUserTrainer(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  return await UserDevSheet.findAll({
    where: {
      TrainerUsername: username
    },
    include: [
      {
        model: db.developmentSheet,
        attributes: ["department", "education"],
        required: true
      }
    ]
  });
}

async function getAllUserDevelopmentSheetsByUserTrainee(devSheetParam) {
  return await UserDevSheet.findAll({
    where: {
      TraineeUsername: devSheetParam.TraineeUsername
    },
    include: [
      {
        model: db.developmentSheet,
        attributes: ["department", "education"],
        required: true
      }
    ]
  });
}

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

async function setStatusEstimated(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  await UserDevSheet.update(
    {
      status: "Eingeschätzt"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: username
      }
    }
  ).then(() => {});
}

async function setDigitalAgreement(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  await UserDevSheet.update(
    {
      status: "Abgeschlossen"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: username
      }
    }
  ).then(() => {});
}

async function setDigitalDisagreement(devSheetParam, token) {
  let username = null;

  const _token = token;
  const decodedToken = jwt.verify(_token, config.secret);
  username = decodedToken.username;

  await UserDevSheet.update(
    {
      status: "Gesprächsbedarf"
    },
    {
      where: {
        DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
        TraineeUsername: username
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
