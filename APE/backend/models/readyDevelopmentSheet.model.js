module.exports = (sequelize, Sequelize) => {
  const ReadyDevelopmentSheet = sequelize.define("ReadyDevelopmentSheet", {
    version: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  });

  return ReadyDevelopmentSheet;
};
