module.exports = (sequelize, Sequelize) =>
{
    const MainCategory = sequelize.define('MainCategory', {
        name: {
            type: Sequelize.String,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    MainCategory.associate = function (models) {
        MainCategory.hasOne(models.competencyCategory, {
            foreignKey : {
                allowNull: false
            }
        })
    };

    return MainCategory
}