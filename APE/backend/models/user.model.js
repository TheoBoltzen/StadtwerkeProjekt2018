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
      allowNull: true
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
      allowNull: false
    }
  });

  /*
  User.create({
    username: "",
    firstname: "Anja",
    lastname: "Fiedler",
    hash: "1234",
    role: "",
    job: null,
    education: null,
    hiredOn: null,
    tryLogin: 0
  });
  User.create({
    username: "",
    firstname: "Tom",
    lastname: "Riddle",
    hash: "1234",
    role: "",
    job: "Verwaltungsfachkraft",
    education: "Büromanagement",
    hiredOn: "01.01.2019",
    tryLogin: 0
  });
  User.create({
    username: "",
    firstname: "Harry",
    lastname: "Potter",
    hash: "1234",
    role: "",
    job: "Systemtechniker",
    education: "IT-Assistant",
    hiredOn: "01.01.2019",
    tryLogin: 0
  });
  User.create({
    username: "",
    firstname: "Basti",
    lastname: "Bohr",
    hash: "1234",
    role: "",
    job: null,
    education: null,
    hiredOn: null,
    tryLogin: 0
  });
*/
  return User;
};
