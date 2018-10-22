const express = require("express");
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'leberkaese',
    database: 'ape'
})



//Just a test for the server - no db connection at that moment
app.get("/api/members", (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log(err)
        }
        console.log('MySql is now connected')
    })

    connection.query('SELECT * FROM Members', (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.send(JSON.stringify(result))
      }
    })

    //connection.end()
});


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
