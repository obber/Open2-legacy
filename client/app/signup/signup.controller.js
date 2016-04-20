(function() {

angular
  .module('myApp')
	// signup controller
  .controller('signupCtrl', function($scope, Services, $location) {

  $scope.pageClass = "signup auth";
  $scope.loading = false;

  $scope.submit = function() {
    $scope.loading = true;

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
