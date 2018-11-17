const db = require("../config/db.config");
const Sequelize = require("sequelize");
const Item = db.items;

module.exports = {
  findAll
};

async function findAll() {
  return await Item.findAll();
}
