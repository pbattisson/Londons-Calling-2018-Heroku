var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var jsforce = require('jsforce');
var dotenv = require('dotenv');
dotenv.load();
var conn = new jsforce.Connection();
var user = process.env.SF_USERNAME;
var pwd = process.env.SF_PASSWORD;

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/speak', function(req, res) {
    console.log(req.body.message);
    var messageInput= {"input__c": req.body.message};
    conn.login(user, pwd, function(err, userInfo) {
        conn.sobject("Message__e").create(messageInput).then(function(res) {
            console.log(res);
        });
    });
});

app.listen(PORT, () => console.log('We are listening onm ' + PORT));