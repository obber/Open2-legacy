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
  var hashedPass = bcrypt.hashSync(password, 10);
  console.log(req.body);
  var user = {username: username, password: password};

  auth(username, password).then(function(resp){
    console.log('this is resp in auth func: ');
    var result = false;
    resp.forEach(function(currentEl){
      console.log('inside foreach');
      console.log('inside if in foreach: ', currentEl.username, ' ', currentEl.password, ' ', bcrypt.hashSync(password, 10));

      if(currentEl.username===username && bcrypt.compareSync(password, hashedPass)){
        result = true;
      }
    });
    if (result){
      console.log('inside if');
      res.json({
          success : true,
          message : 'you are logged in'
      });
    } else {
        console.log('inside else');
        res.json({
          success : false,
          message : 'invalid credentials'
        });
      }
  }).catch(function(err){
    console.log('unexpected error: ', err);
  });


  // db.query('SELECT * FROM Users WHERE `username` = ?;', [username], function(err, rows) {
  //   // console.log("This is our password in our db", rows[0].password)
  //   // var hash = bcrypt.hashSync(password);

  //   // console.log("This is the bcrypt pass true/false",bcrypt.compareSync( password ,rows[0].password ))

  //   if (err) {
  //     throw err;
  //   } else {
  //     if(!bcrypt.compareSync( password ,rows[0].password )){
  //       console.log("Incorrect password");
  //     }else{
  //       res.send('/dashboard');
  //     }
  //   }
  // })

});

function auth(user, pw){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM Users', function(err, query){
      resolve(query);
    });
  });
}

module.exports = router;
