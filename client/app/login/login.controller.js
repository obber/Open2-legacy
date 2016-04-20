(function() {

angular 
  .module('myApp')
  // login controller
  .controller('loginCtrl', function($scope, Services, $location) {
  
  $scope.pageClass = "login auth";
  $scope.loading = false;

  $scope.redirectSignup = function(e) {
    $location.path('/signup');
  };

  $scope.submit = function() {

    $scope.loading = true;

    var user = {
      username: $scope.username,
      password: $scope.password
    };
  
    //login the user
    Services.login(user);
  };
});

})();
