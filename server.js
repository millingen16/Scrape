const express = require("express");
const cheerio = require("cheerio");
const handlebars = require("express-handlebars");
const axios = require("axios");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 4000

const app = express();

const db = require("./models");
// const routes = require("./routes/apiRoutes");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:";
mongoose.connect(MONGODB_URI, {});
mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });

app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });