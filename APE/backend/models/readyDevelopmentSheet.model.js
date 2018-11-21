module.exports = (sequelize, Sequelize) => {
  const ReadyDevelopmentSheet = sequelize.define("ReadyDevelopmentSheet", {
    version: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  return ReadyDevelopmentSheet;
};
