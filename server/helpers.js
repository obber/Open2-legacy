var db = require('./db.js');
function doesUserExist(user){
  return new Promise(function(resolve, reject) {
    db.query('SELECT username FROM Users', function(err,rows){
      resolve(rows);
    });
  });
}

function insertUser(user) {
  return new Promise(function(resolve, reject){
    db.query('INSERT INTO Users SET ?', user, function (err, results){
      console.log('this is insertuser results',results);
      resolve(results);
    });
  });
}

function auth(user, pw){
  return new Promise(function(resolve, reject){
    db.query('SELECT * FROM Users WHERE username = ?',[user],function(err, query){
      resolve(query);
    });
  });
}

module.exports= {
  doesUserExist : doesUserExist,
  insertUser : insertUser,
  auth : auth
}