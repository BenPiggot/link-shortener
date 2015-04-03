var express = require('express')
var linksCtrl = require("./controllers/links")
var db = require("./models")
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use("/links", linksCtrl);

app.get('/:hash', function(req, res) {
  var id = parseInt(hashids.decode(req.params.hash))
  db.link.find(id).then(function(link) {
    res.redirect(link.url)
  })
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on local host 3000")
})