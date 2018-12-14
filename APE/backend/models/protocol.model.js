module.exports = (sequelize, Sequelize) => {
  const Protocol = sequelize.define("Protocol", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Protocol;
};
