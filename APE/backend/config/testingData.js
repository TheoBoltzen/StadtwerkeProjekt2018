const Sequelize = require("sequelize");
const cc = require("../services/competencyCategory.service");
const mc = require("../services/mainCategory.service");
const sc = require("../services/subCategory.service");
const c = require("../services/competence.service");
const user = require("../services/user.service");
const rdevsheet = require("../services/readyDevelopmentSheet.service");

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
    MainCategoryName: "Kunden- und Serviceorientierung"
  };
  sc.create(body);

  body = {
    name: "Kommunikation",
    MainCategoryName: "Personenorientierung/Interaktionskompetenz"
  };
  sc.create(body);

  body = {
    name: "Kooperationsfähigkeit",
    MainCategoryName: "Personenorientierung/Interaktionskompetenz"
  };
  mc.create(body);

  body = {
    name: "Konfliktfähigkeit",
    MainCategoryName: "Konfliktlösungskompetenz"
  };
  sc.create(body);

  body = {
    name: "Erworbene Fachkenntnisse",
    MainCategoryName: "Fachkompetenz"
  };
  sc.create(body);

  body = { name: "Fertigkeiten", MainCategoryName: "Fachkompetenz" };
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
    username: "trainee",
    password: "trainee",
    firstname: "Max",
    lastname: "Mustermann",
    role: "trainee"
  };
  user.create(body);

  body = {
    username: "admin",
    password: "admin",
    firstname: "Frank",
    lastname: "Hubertus",
    role: "admin"
  };
  user.create(body);

  body = {
    username: "trainer",
    password: "trainer",
    firstname: "Oliver",
    lastname: "Kahn",
    role: "trainer"
  };
  user.create(body);

  body = {
    department: "PPCa",
    education: "IKB",
    content: [
      {
        name: "Soziale Kompetenz",
        children: [
          {
            name: "Konfliktlösungskompetenz",
            children: [
              {
                name: "Konfliktfähigkeit",
                children: [
                  {
                    name: "Neue Kompetenz zu Konfliktfähigkeit",
                    goalCross: "4",
                    ynAnswer: "false"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Neue Kompetenzkategorie",
        children: [
          {
            name: "Neue Hauptkategorie 1",
            children: [
              {
                name: "Neue Subkategorie 1",
                children: [
                  {
                    name: "Neue Kompetenz 1",
                    goalCross: "1",
                    ynAnswer: "false"
                  },
                  {
                    name: "Neue Kompetenz 2",
                    goalCross: "3",
                    ynAnswer: "false"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  //rdevsheet.create(body);
}
