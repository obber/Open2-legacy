(function() {

angular
  .module('myApp', [
    'ngMaterial', 
    'ngRoute', 
    'ngMessages'
    ]);


//moved to dashboard controller
// function DialogController($scope, $mdDialog) {
//   $scope.hide = function() {
//     $mdDialog.hide();
//   };
//   $scope.cancel = function() {
//     $mdDialog.cancel();
//   };
//   $scope.answer = function(answer) {
//     $mdDialog.hide(answer);
//   };
// }
})();
