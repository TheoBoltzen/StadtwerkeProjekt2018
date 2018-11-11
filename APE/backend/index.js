const express = require("express");
const logger = require('morgan')
const bodyParser = require('body-parser')
const db = require('./config/db.config')

const app = express();

app.use(logger('dev'))

//Mit BodyParser werden Requests direkt geparsed
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//Sync Sequelize
db.sequelize.sync().catch(error => {
    console.log('sync failed: ', error)
});

//Routes
require('./routes/items.route')(app)
//require('./routes/user.route')(app)
require('./routes/user.route')(app)
require('./routes/competencyCategory.route')(app)
require('./routes/competence.route')(app)
require('./routes/mainCategory.route')(app)
require('./routes/subCategory.route')(app)
require('./routes/developmentBow.route')(app)

//Catch-All Route
app.get('*', (req, res) => (
    res.status(200).send({
        message: 'Willkommen'
    })
))

module.exports = app;
