const express = require("express");
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'leberkaese',
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


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
