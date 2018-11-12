module.exports = (sequelize, Sequelize) =>
{
    const MainCategory = sequelize.define('MainCategory', {
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


    MainCategory.associate = function (models) {
        console.log("Hallo " + JSON.stringify(models, null, 4));
        MainCategory.hasOne(models.competencyCategory, {
            foreignKey : {
                allowNull: false
            }
        })

        MainCategory.hasMany(models.subCategory, {
            foreignKey : {
                allowNull: true
            }
        })
    }


    return MainCategory
}