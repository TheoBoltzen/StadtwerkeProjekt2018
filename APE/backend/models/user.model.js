module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      hash: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Users;
};
