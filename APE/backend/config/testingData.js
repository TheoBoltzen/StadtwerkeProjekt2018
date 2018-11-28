const Sequelize = require("sequelize");
const cc = require("../services/competencyCategory.service");
const mc = require("../services/mainCategory.service");
const sc = require("../services/subCategory.service");
const c = require("../services/competence.service");
const user = require("../services/user.service");

module.exports = {
  createData
};

async function createData() {
  //--------------------------------------------
  // Competency Category

  let body = { name: "Soziale Kompetenz" };
  cc.create(body);

  body = { name: "Fach- und Methodenkompetenz" };
  cc.create(body);

  body = { name: "Persönliche Kompetenz" };
  cc.create(body);

  //--------------------------------------------
  //--------------------------------------------
  // Main Category

  body = {
    name: "Kunden- und Serviceorientierung",
    CompetencyCategoryName: "Soziale Kompetenz"
  };
  mc.create(body);

  body = {
    name: "Personenorientierung/Interaktionskompetenz",
    CompetencyCategoryName: "Soziale Kompetenz"
  };
  mc.create(body);

  body = {
    name: "Konfliktlösungskompetenz",
    CompetencyCategoryName: "Soziale Kompetenz"
  };
  mc.create(body);

  body = {
    name: "Fachkompetenz",
    CompetencyCategoryName: "Fach- und Methodenkompetenz"
  };
  mc.create(body);

  //--------------------------------------------
  //--------------------------------------------
  // Sub Category

  body = {
    name: "Verhalten gegenüber Mitarbeitern",
    mainCategoryName: "Kunden- und Serviceorientierung"
  };
  sc.create(body);

  body = {
    name: "Kommunikation",
    mainCategoryName: "Personenorientierung/Interaktionskompetenz"
  };
  sc.create(body);

  body = {
    name: "Kooperationsfähigkeit",
    mainCategoryName: "Personenorientierung/Interaktionskompetenz"
  };
  mc.create(body);

  body = {
    name: "Konfliktfähigkeit",
    mainCategoryName: "Konfliktlösungskompetenz"
  };
  sc.create(body);

  body = {
    name: "Erworbene Fachkenntnisse",
    mainCategoryName: "Fachkompetenz"
  };
  sc.create(body);

  body = { name: "Fertigkeiten", mainCategoryName: "Fachkompetenz" };
  sc.create(body);

  //---------------------------------------------
  //--------------------------------------------
  // Competences

  body = {
    name: "Freundliches und aufgeschlossenes Auftreten",
    ynAnswer: "false",
    SubCategoryName: "Verhalten gegenüber Mitarbeitern"
  };
  c.create(body);

  body = {
    name: "gepflegtes Erscheinungsbild",
    ynAnswer: "false",
    SubCategoryName: "Verhalten gegenüber Mitarbeitern"
  };
  c.create(body);

  body = {
    name: "geht auf Kundenwünsche ein",
    ynAnswer: "false",
    SubCategoryName: "Verhalten gegenüber Mitarbeitern"
  };
  c.create(body);

  body = {
    name: "äußert Inhalte kurz und präzise",
    ynAnswer: "false",
    SubCategoryName: "Kommunikation"
  };
  c.create(body);

  body = {
    name: "arbeitet sicher und geschickt",
    ynAnswer: "false",
    SubCategoryName: "Fertigkeiten"
  };
  c.create(body);

  body = {
    name: "geht strukturiert und zielorientiert vor",
    ynAnswer: "false",
    SubCategoryName: "Fertigkeiten"
  };
  c.create(body);

  //---------------------------------------------
  // User

  body = {
    username: "AnjaFiedler",
    password: "1234",
    firstname: "Anja",
    lastname: "Fiedler",
    role: "admin"
  };
  user.create(body);

  body = {
    username: "Azubi",
    password: "1234",
    firstname: "Max",
    lastname: "Mustermann",
    role: "trainee"
  };
  user.create(body);

  body = {
    username: "Trainer",
    password: "1234",
    firstname: "Frank",
    lastname: "Hubertus",
    role: "trainer"
  };
  user.create(body);

  body = {
    username: "Admin",
    password: "1234",
    firstname: "Oliver",
    lastname: "Kahn",
    role: "admin"
  };
  user.create(body);
}
