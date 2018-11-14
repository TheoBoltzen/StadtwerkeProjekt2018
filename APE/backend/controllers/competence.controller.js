const db = require("../config/db.config");
const Competence = db.competence;

// FETCH all Items
exports.findAll = (req, res) => {
  Competence.findAll().then(competences => {
    res.send(competences);
  });
};

//Competence.hasMany(, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
//City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode
