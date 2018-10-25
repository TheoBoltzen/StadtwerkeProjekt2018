const express = require("express");
const mysql = require('mysql');

const app = express();

//Including dependency
const Sequelize = require('sequelize');

//Setting up the config
const sequelize = new Sequelize('ape', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//Checking connection status
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Create Item Table Structure
var Item = sequelize.define('Item', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name:Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER
});

sequelize.sync();
Item.findAll().then(function (user) {        //{ where: { id: '1' } }
    console.log("Reading data - succesfully");          //transactions have to be included because of multiple access
    console.log(user)                                      //.dataValues.get({plain:true})
}).error(function (err) {
    console.log("Error:" + err);
});
/*
Item.findAll().then(function(insertedItem){
    console.log(insertedItem.dataValues)
});
*/
//##############################Insert Data - refresh table in data window!#######################################################
//There is two way of inserting data into database
//One way: Forming object from modal
/*
var item1 = Item.build({
    id: 2,
    name:'PC',
    description: 'MAC 2340TL',
    qty: 23
});
//Inserting Data into database
item1.save();

//Second way: create() equals build() + save()
Item.create({
    id: 2,
    name: 'PC',
    description: 'MAC 2340TL',
    qty: 23
}).then(function(insertedItem){
    console.log(insertedItem.dataValues)
});
*/
//#####################################################################################

//---------------------------without Sequelize = old version------------------------------------------
/*
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'ape'
})

connection.connect((err) => {
    if (err) {
        console.log(err)
        return err
    }
    console.log('MySql is now connected')
})

const SELECT_ALL_QUERY = 'SELECT * FROM MEMBERS'


//Just a test for the server - no db connection at that moment
app.get("/api/members", (req, res) => {

    connection.query(SELECT_ALL_QUERY, (err, result) => {
      if (err) {
        console.log(err)
          return res.send(err)
      }
      else {
          return res.json({
              data: result
          })
      }
    })

});
*/

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
