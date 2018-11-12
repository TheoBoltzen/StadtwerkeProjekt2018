module.exports = (sequelize, Sequelize) =>
{
    const CompetencyCategory = sequelize.define('CompetencyCategory', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })


    CompetencyCategory.associate = function (models) {
       CompetencyCategory.hasMany(models.mainCategory, {
            foreignKey : {
                allowNull: true
            }
        })
    };


    return CompetencyCategory

}
