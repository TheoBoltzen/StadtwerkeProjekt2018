module.exports = (sequelize, Sequelize) => {
  const Competence = sequelize.define("Competence", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    ynAnswer: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Competence;
};
