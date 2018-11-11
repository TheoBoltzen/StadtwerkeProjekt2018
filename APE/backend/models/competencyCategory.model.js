module.exports = (sequelize, Sequelize) =>
{
    const CompetencyCategory = sequelize.define('CompetencyCategory', {
        name: {
            type: Sequelize.String,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return CompetencyCategory

}