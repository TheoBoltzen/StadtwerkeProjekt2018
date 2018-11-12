const http = require("http");
const app = require("./index"); //express() in index.js

require("rootpath")();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// global error handler
app.use(errorHandler);

// start server
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port, () => console.log("Server started"));
