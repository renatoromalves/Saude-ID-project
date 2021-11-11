const { Router } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const sequelize = require('Sequelize')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes");
app.use(routes);


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

//app.get("/", (req, res) => res.send("Node funcionando"));
const sql = require('./config/connection.js');
sql.sync().then(result => {
  //console.log(result);
  app.listen(3000);
}).catch(error => {
  console.log(error);
})
app.use((req, res) => {
  res.status(404).send('<h1> Erro 404 - Página não encontrada</h1>');
});

//app.listen(3000);
