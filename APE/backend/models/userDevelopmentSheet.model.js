module.exports = (sequelize, Sequelize) => {
  const UserDevelopmentSheet = sequelize.define("UserDevelopmentSheet", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return UserDevelopmentSheet;
};
