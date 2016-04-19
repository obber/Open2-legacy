(function() {

angular 
  .module('myApp')
  // login controller
  .controller('loginCtrl', function($scope, Services, $location) {
  
  $scope.redirectSignup = function() {
    $location.path('/signup');
  };


  $scope.submit = function() {
    var user = {
      username: $scope.username,
      password: $scope.password
    };

    //remember the current username to use later
  localStorage.setItem('username', $scope.username);
   
   //login the user
  Services.login(user);
  };
})

})();