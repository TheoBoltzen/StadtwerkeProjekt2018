module.exports = (sequelize, Sequelize) => {
  const Competence = sequelize.define(
    "Competence",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  //models.competence.belongsTo(Category); // Will add a teamId attribute to Player to hold the primary key value for Team
  // Competence.belongsToMany(Category, { through: 'Competence-Category', foreignKey: 'competenceId' });
  /* Competence.associate = models => {
    Competence.belongsToMany(Category, {
      through: "competence-category"
    });
  };*/

  return Competence;
};
