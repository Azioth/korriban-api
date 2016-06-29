var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/automation_results');

var app = express();

var port = 8000;

app.use(bodyParser.urlencoded({limit: '5mb', extended:true}));
app.use(bodyParser.json({limit: '5mb'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST')
  next();
});

app.use('/', require('./routes'));

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});
