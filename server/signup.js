var express = require('express');
var db = require('./db.js');
var bcrypt = require('bcrypt');
var cors = require('cors');
var bodyParser = require('body-parser');
//var knex = require('knex');

var router = express.Router();

var app = express();

app.use(cors());

//adds a new user to database
// router.post('/newuser', function(request, response){

//   var username = request.body.username;
//   var password = request.body.password;
// var hashedPass = bcrypt.hashSync(password, 10);

//   users = {username: username, password: hashedPass};

//   db.query('INSERT INTO Users SET ?', users, function(err, results){
//     if(err){
//       response.sendStatus(500);
//     }else{
//       //console.log(results);
//       response.send('/login');
//     }
//   })
// });
  // if (!validate(user)) {
  //   // console.log('inside if validate');
  //   // console.log('inside if user', user);
  //   res.json({
  //     success: false,
  //     message: 'User information validation failed.'
  //   });

router.post('/newuser', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var hashedPass = bcrypt.hashSync(password, 10);
  var user = { 
    username: username,
    password: hashedPass
  }

  // add helper functions to clean up code if time permits
  doesUserExist(username).then(function(resp){
    console.log('this is the resp', resp);
    var result=false;
    resp.forEach(function(currentEl){
      if(currentEl.username===username){
          result=true;  
      }
    });
    if(result){
      console.log('user already exist');
      res.json({
          success : false,
          message : 'username already exists!'
      })
    } else {
        console.log('inside else');
        insertUser(user).then(function(resp){
        console.log('inside insertUser');
        res.json({
          success : ('/login'),
          message : 'User inserted into database'
        })
        }).catch(function(err){
          console.log('err inserting user into database');
          })
      }
  }).catch(function(err){
      console.log('this is the err', err);
  })
})


function doesUserExist(user){

  return new Promise(function(resolve, reject) {
    db.query('SELECT username FROM Users', function(err,rows){
      resolve(rows);
    })
  })
}

function insertUser(user) {

  return new Promise(function(resolve, reject){

    db.query('INSERT INTO Users SET ?', user, function (err, results){
      console.log('this is insertuser results',results)
      resolve(results);
    })
  })
}

function validate(user) {
  console.log(user);
  return user.username && user.password;
}
module.exports = router;
