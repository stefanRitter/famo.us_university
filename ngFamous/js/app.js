angular.module('famousUniversity', ['famous.angular']);

angular.module('famousUniversity')
  .controller('Lesson1Ctrl', function($scope) {
    $scope.databound = {
      content: "Change me!"
    };
    
    $scope.generateSize = function() {
      return [100, 100];
    };

    $scope.myModifier = {
      translateValues: [50, 100, 0],
      size: [100, 100]
    };

    $scope.list = [
      {content: "Famous", bgColor: "#b58900"},
      {content: "Angular", bgColor: "#dc322f"},
      {content: "Rocks!", bgColor: "#cb4b16"}
    ];
  });

angular.module('famousUniversity')
  .controller('Lesson2Ctrl', function($scope){
      $scope.myGridLayoutOptions = {
        dimensions: [2, 3]
      };
