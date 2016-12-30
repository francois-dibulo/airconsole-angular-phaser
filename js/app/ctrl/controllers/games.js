App.controllers.controller('GamesCtrl', ['$scope', '$location', 'ViewService', 'AirConsoleService', function ($scope, $location, ViewService, AirConsoleService) {

  $scope.init = function() {
  };

  $scope.gameOver = function() {
    ViewService.ctrl.go('game_over', true);
  };

  $scope.jump = function() {
    AirConsoleService.airconsole.sendEvent(AirConsole.SCREEN, AirConsoleService.Event.GameInput, { action: 'jump' });
  };

  $scope.goToModeSelection = function() {
    ViewService.ctrl.go('select_mode', true);
  };

}]);
