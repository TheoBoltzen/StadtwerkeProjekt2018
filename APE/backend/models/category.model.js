const Competence = require("./competence.model");
module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  //Category.belongsToMany(Competence, { through: 'Competence-Category', foreignKey: 'categoryId' });
  return Category;
};
