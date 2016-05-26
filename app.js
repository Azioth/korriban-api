var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/automation_results');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});
