const db = require("../config/db.config");
const Sequelize = require("sequelize");
const Category = db.category;

module.exports = {
  findAll
};

async function findAll() {
  return await Category.findAll();
}
