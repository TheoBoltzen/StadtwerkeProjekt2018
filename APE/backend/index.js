const express = require('express')

const app = express();

//Just a test for the server - no db connection at that moment
app.get('/api/members', (req, res) => {
    const projectMembers = [
        { id: 0, name: 'Finn'},
        { id: 1, name: 'Tim'},
        { id: 2, name: 'Theo'},
        { id: 3, name: 'Glen'},
        { id: 4, name: 'Steven'},
    ]

    res.json(projectMembers)
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
