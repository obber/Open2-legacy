var express = require('express');
var db = require('./db.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();
var bcrypt = require('bcrypt');
var signup = require('./signup.js');

var app = express();
app.use(cors());

//checks username and password
router.post('/homepage', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  auth(username, password).then(function(resp){
    var result = false;
    if(resp[0].username===username && bcrypt.compareSync(password, resp[0].password)){
        result = true;
      }
    if (result){
      res.json({
          success : true,
          message : 'you are logged in'
      });
    } else {
        res.json({
          success : false,
          message : 'invalid credentials'
        });
      }
  }).catch(function(err){
    console.log('unexpected error: ', err);
  });
});

function auth(user, pw){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM Users WHERE username = ?',[user],function(err, query){
      resolve(query);
    });
  });
}

module.exports = router;
