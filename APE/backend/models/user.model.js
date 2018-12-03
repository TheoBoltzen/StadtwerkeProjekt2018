module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    job: {
      type: Sequelize.STRING,
      allowNull: true
    },
    education: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hiredOn: {
      type: Sequelize.DATE,
      allowNull: true
    },
    tryLogin: {
      type: Sequelize.INTEGER,
      value: 0,
      allowNull: true
    }
  });

  return User;
};
