module.exports = (sequelize, Sequelize) =>
{
    const SubCategory = sequelize.define('SubCategory', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });


    return SubCategory
}