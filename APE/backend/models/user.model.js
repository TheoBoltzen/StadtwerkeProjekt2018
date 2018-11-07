module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        vorname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        job: {
            type: Sequelize.INTEGER,
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
        sessionID: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        tryLogin: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return User