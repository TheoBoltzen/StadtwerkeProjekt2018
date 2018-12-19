module.exports = (sequelize, Sequelize) => {
  const UserDevelopmentSheetAssociation = sequelize.define(
    "UserDevelopmentSheetAssociation",
    {
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
      }
    }
  );

  return UserDevelopmentSheetAssociation;
};
