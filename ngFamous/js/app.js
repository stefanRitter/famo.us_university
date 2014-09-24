angular.module('famousUniversity', ['famous.angular']);


angular.module('famousUniversity')
  .controller('Lesson1Ctrl', function ($scope) {
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
  .controller('Lesson2Ctrl', function ($scope) {
    $scope.myGridLayoutOptions = {
      dimensions: [2, 3]
    };
    
    $scope.list = [
      {content:"hello", bgColor: "#b58900"},
      {content:"world", bgColor: "#cb4b16"},
      {content: "famous", bgColor: "#dc322f"},
      {content: "angular", bgColor: "#d33682"},
      {content: "is", bgColor: "#6c71c4"},
      {content: "cool!", bgColor: "#268bd2"}
    ];
  });


angular.module('famousUniversity')
  .controller('Lesson3Ctrl', function ($scope, $famous) {
    
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    $scope.boxes = [];

    var arrayOfCurves = ['inOutQuad', 'inOutCubic', 'outQuint', 'outBack', 'inCirc', 'outElastic'];

    for (var i = 0; i < arrayOfCurves.length; i++) {
      var box = {
        curve: arrayOfCurves[i],
        position: new Transitionable([0, i * 75, 0])
      };
      $scope.boxes.push(box);
    }


    $scope.myTransitionable = new Transitionable([0, 0, 0]);

    $scope.animate = function () {
      for (var i = 0; i < $scope.boxes.length; i++) {
        var box = $scope.boxes[i];
        box.position.set([200, i * 75, 0], {
          curve: Easing[box.curve],
          duration: 2000
        });
      }
    };
  });
