module.exports = (sequelize, Sequelize) => {
  const ReadyDevelopmentSheet = sequelize.define("ReadyDevelopmentSheet", {
    version: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ynAnswer: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    goalcross: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return ReadyDevelopmentSheet;
};
