(function() {

angular 
  .module('myApp')
  // login controller
  .controller('loginCtrl', function($scope, Services, $location) {
  
  $scope.redirectSignup = function(e) {
    $location.path('/signup');
  };

  $scope.submit = function() {
    var user = {
      username: $scope.username,
      password: $scope.password
    };
  
    //login the user
    Services.login(user);
  };
});

})();
