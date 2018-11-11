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

    SubCategory.associate = function (models) {
        SubCategory.hasOne(models.mainCategory, {
            foreignKey : {
                allowNull: false
            }
        })
    };

    return SubCategory
}