module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.INTEGER,
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
      allowNull: false
    }
  });

  User.create({
    id: 1001,
    firstname: "Anja",
    name: "Fiedler",
    password: "1234",
    role: 0,
    job: null,
    education: null,
    hiredOn: null,
    sessionID: null,
    tryLogin: 0
  });
  User.create({
    id: 5001,
    firstname: "Tom",
    name: "Riddle",
    password: "1234",
    role: 2,
    job: "Verwaltungsfachkraft",
    education: "Büromanagement",
    hiredOn: "01.01.2019",
    sessionID: null,
    tryLogin: 0
  });
  User.create({
    id: 5002,
    firstname: "Harry",
    name: "Potter",
    password: "1234",
    role: 2,
    job: "Systemtechniker",
    education: "IT-Assistant",
    hiredOn: "01.01.2019",
    sessionID: null,
    tryLogin: 0
  });
  User.create({
    id: 2001,
    firstname: "Basti",
    name: "Bohr",
    password: "1234",
    role: 1,
    job: null,
    education: null,
    hiredOn: null,
    sessionID: null,
    tryLogin: 0
  });

  return User;
};
