module.exports = (sequelize, Sequelize) => {
  const UserDevelopmentSheet = sequelize.define("UserDevelopmentSheet", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assessmentTRAINER: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    assessmentTRAINEE: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return UserDevelopmentSheet;
};
