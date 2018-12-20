const db = require("../config/db.config");
const Sequelize = require("sequelize");
const UserDevSheetAsso = db.userDevelopmentSheetAssociation;
const ReadyDevSheet = db.readyDevelopmentSheet;
const UserDevSheet = db.userDevelopmentSheet;
const UserDevSheetService = require("./userDevelopmentSheet.service");

module.exports = {
  associate,
  setTraineeAssessment,
  setTrainerAssessment
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
      let Data = {
        DevelopmentSheetId: associations[0].DevelopmentSheetId,
        username: devSheetParam.username
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
        userdevId = latest.id;
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
  let x = await ReadyDevSheet.findOne({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.TraineeUsername
    }
  });

  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheetAsso.update(
      {
        assessmentTRAINER: devSheetParam[i].assessmentTRAINER
      },
      {
        where: {
          ReadyDevelopmentSheetId: devSheetParam[i].ReadyDevelopmentSheetId,
          UserDevelopmentSheetId: x.id
        }
      }
    ).then(() => {});
  }
}

async function setTraineeAssessment(devSheetParam) {
  let x = await ReadyDevSheet.findOne({
    where: {
      DevelopmentSheetId: devSheetParam.DevelopmentSheetId,
      TraineeUsername: devSheetParam.TraineeUsername
    }
  });

  for (let i = 0; i < devSheetParam.length; i++) {
    await UserDevSheetAsso.update(
      {
        assessmentTRAINEE: devSheetParam[i].assessmentTRAINEE
      },
      {
        where: {
          ReadyDevelopmentSheetId: devSheetParam[i].ReadyDevelopmentSheetId,
          UserDevelopmentSheetId: x.id
        }
      }
    ).then(() => {});
  }
}
