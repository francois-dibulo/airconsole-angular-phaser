App.controllers.controller('ModesCtrl', ['$scope', '$location', 'GameModesService', function ($scope, $location, GameModesService) {
  $scope.modes = [];

  $scope.init = function() {
    GameModesService.init();
    $scope.modes = GameModesService.modes;
  };

  $scope.nextMode = function() {
    GameModesService.ctrl.nextMode();
  };

  $scope.prevMode = function() {
    GameModesService.ctrl.prevMode();
  };

  $scope.selectMode = function(index) {
    GameModesService.ctrl.selectMode();
  };

}]);
