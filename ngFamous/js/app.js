angular.module('famousUniversity', ['famous.angular']);

angular.module('famousUniversity')
  .controller('Lesson1Ctrl', function($scope) {
    $scope.databound = {
      content: "Change me!"
    };
  });
