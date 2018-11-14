const Category = require("./category.model");
module.exports = (sequelize, Sequelize) => {
  const Competence = sequelize.define("Competence", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });
  // Competence.belongsToMany(Category, { through: 'Competence-Category', foreignKey: 'competenceId' });
  Competence.associate = models => {
    Competence.belongsToMany(models.category, {
      through: "competence-category"
    });
  };
  return Competence;
};
