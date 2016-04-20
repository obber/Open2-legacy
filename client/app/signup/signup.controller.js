(function() {

angular
  .module('myApp')
	// signup controller
  .controller('signupCtrl', function($scope, Services, $location) {

  $scope.submit = function() {
    var user = {
      username: $scope.username,
      password: $scope.password
    };
    Services.signup(user);
  };

  $scope.redirectToLogin = function() {
    $location.path('/login');
  }
});

})();
