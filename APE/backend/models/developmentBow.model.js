module.exports = (sequelize, Sequelize) => {
    const DevelopmentBow = sequelize.define('DevelopmentBow', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        department: {
            type: Sequelize.STRING,
            allowNull: false
        },
        education: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return DevelopmentBow
}