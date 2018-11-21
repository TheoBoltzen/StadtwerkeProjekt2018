module.exports = (sequelize, Sequelize) => {
  const DevelopmentSheet = sequelize.define("DevelopmentSheet", {
    id: {
      type: Sequelize.INTEGER,
      //autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    department: {
      type: Sequelize.STRING,
      allowNull: false
    },
    education: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return DevelopmentSheet;
};
