const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
let router = require("./router.js");

let app = express();

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

//static assets
app.use(express.static("css"));
app.use(express.static("images"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use("/", router);

let mongoURL = "mongodb://localhost:27017/Week-7";
mongoose.connect(mongoURL).then(function(){
    app.listen(8000);
});