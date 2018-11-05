const http = require('http')
const app = require('./index')

//Set port for server
const port = parseInt(process.env.PORT, 10) || 5000
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => console.log('Server started'))
