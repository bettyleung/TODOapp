var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

  $scope.formData = {};

  $http.get('/api/todos')
  .then(function(res) {
      $scope.todos = res.data;
  }, function(err){
        console.log('GET main.js ' + err);
  });

  $scope.createTodo = function(){
    $http.post('/api/todos', $scope.formData)
    .then(function(res){
      $scope.formData = {};
      $scope.todos= res.data;
      }, function(err){
          console.log( 'POST main.js' + err);
      });
  }

  $scope.deleteTodo = function(id){
    $http.delete('/api/todos/'+id)
    .then(function(res){
        $scope.todos = res.data;
    }, function(err){
        console.log('DELETE main.js ' + err);
  });
  }

});
