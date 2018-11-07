module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define('Item', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        qty: {
            type: Sequelize.INTEGER
        }
    })
    return Item
}