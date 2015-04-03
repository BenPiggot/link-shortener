var express = require('express')
var router = express.Router();
var request = require('request');
var Hashids = require('hashids');

hashids = new Hashids("This is Ben's salt")

router.get("/", function(req, res) {
    res.render("index");
  })

var db = require('../models')

router.post('/', function(req, res) {
  db.link.create({url: req.body.url }).then(function(data) {
    data.hash = hashids.encode(data.id);
    data.save().then(function(newData) {
        res.render('links/create', {hash: data.hash});
    })
  })
})



module.exports = router;
