(function() { 

angular
  .module('myApp')
  /// factory for get/post requests
  .factory('Services', function($http, $window, $location) {
    var username;
    var baseUrl = 'http://localhost:8080/';
     // login
    var login = function(user) {
      var request={
        method : 'POST',
        url : baseUrl+'index/homepage',
        data : user
      }
      
      return $http(request).then(success, err);

      function success(resp){
        //send back username from serve, resp.data.username
        //send back firebase token 
        //store both.
        console.log('inside login front end', " ", resp);
        if(resp.data.token){
          saveUserInfo(resp.data.username,resp.data.token);
          $location.path('/dashboard');
        }
        return resp;
      }

      function err(err){
        $location.path('/login');
        return console.log(err);
        }
      };

    // logout
      var logout = function(){
        $window.localStorage.removeItem('jwtToken');
        delete $window.localStorage['jwtToken'];
        $location.path('/');
      };


    // signup
      var signup = function(user) {
        var request= {
        method : 'POST',
        url : baseUrl+'signup/newuser',
        data : user
      };
      
      return $http(request).then(success, err);
      
      function success(resp){
        if(resp.data.token){
          saveUserInfo(resp.data.token);
          saveUserInfo(resp.data.username);
          saveUserInfo(resp.data.firebaseToken);
          $location.path('/login');
        }
        return resp;
      }

      function err(err){
        $location.path('/');
        return console.log(err);
        }
      }

      function saveUserInfo(username,token){
        //need to add firebase token in parameter
        $window.localStorage['username'] =username;
        $window.localStorage['jwtToken'] = token;
        //need to locate firebase token in local storage
      }

      function getToken(){
        return $window.localStorage['jwtToken'];
      }

      function getUserName(){
        return $window.localStorage['username'];
      }
     //need to get firebase token from local storage
     // get the event info from database 
    

      var uploadDashboard = function() {
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/dashboard/upload',
        })
        .then(function(resp){
          //console.log("data in uploadDashboard", resp.data)
          return resp.data;
        });
      };


    //// Twillio notification
      var notify = function(sendText){
        return $http({
          method: 'POST',
          url: 'http://localhost:8080/dashboard',
          data: sendText
        })
        .then(function(data){
          console.log("Sent the Messages", data);
        })
        .catch(function(err){
          $location.path('/');
          console.log(err);
        })
      };

       
       // new event request
      var eventsPost = function(eventInfo) {
        //console.log('eventinfo inside events post', eventInfo);
        return $http({
          method: 'POST',
          url: 'http://localhost:8080/dashboard/events',
          data: eventInfo
        });
      };

       // get freinds list
      var uploadFriendslist = function() {
        return $http ({
          method: 'GET',
          url: 'http://localhost:8080/dashboard/friends'
        });
      };


     // add a record to database when user joins an event
      var joinEvent = function(eventId) {
          return $http({
            method: 'POST',
            url: 'http://localhost:8080/dashboard/join',
            data: eventId
          });
      };


     //remove the record of user from database// this isn't handled in the backend 
      var unjoinEvent = function(userEventId) {
          return $http({
             method: 'POST',
             url: 'http://localhost:8080/dashboard/unjoin',
             data: userEventId
          });
      };

      return {
        login: login,
        uploadDashboard: uploadDashboard,
        notify: notify,
        eventsPost: eventsPost,
        signup: signup,
        logout: logout,
        username: username,
        uploadFriendslist: uploadFriendslist,
        joinEvent: joinEvent,
        unjoinEvent: unjoinEvent
      };

  });
/// end of Services
})();
