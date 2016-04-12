var todoApp = angular.module('todoApp', []);

function mainController($scope, $http){
  $scope.formData = {};

  $http.get('/api/todos')
    .then(
      function onSuccessCallback(res){
        $scope.data = res;
        console.log("mainController.js, res: " + res);
      }, function onErrorCallback(res){
        console.log("in mainController.js, err: " + res);
      }
    )
}
