var express = require('express');
var app = express();


app.use(express.static('public'));

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("XJcoBSNCEuGXmwKce2bmaqHfGiDAt6AggU6hCviV");
var token = tokenGenerator.createToken({ uid: 'auth.uid', username: 'auth.username' });

app.get('/', function(res, req) {

});

app.listen(3000);