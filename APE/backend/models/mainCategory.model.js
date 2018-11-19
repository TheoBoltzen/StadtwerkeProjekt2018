module.exports = (sequelize, Sequelize) => {
  const MainCategory = sequelize.define("MainCategory", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return MainCategory;
};
