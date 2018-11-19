const db = require("../config/db.config");
const Category = db.category;

// FETCH all Items
exports.findAll = (req, res) => {
  Category.findAll().then(categories => {
    res.send(categories);
  });
};

//Country.hasMany(City, { foreignKey: "countryCode", sourceKey: "isoCode" });
//City.belongsTo(Country, { foreignKey: "countryCode", targetKey: "isoCode" });
