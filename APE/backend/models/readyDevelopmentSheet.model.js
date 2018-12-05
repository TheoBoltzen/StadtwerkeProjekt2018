module.exports = (sequelize, Sequelize) => {
  const ReadyDevelopmentSheet = sequelize.define("ReadyDevelopmentSheet", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    version: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    goalcross: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });

  return ReadyDevelopmentSheet;
};
