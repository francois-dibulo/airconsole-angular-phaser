App.controllers.controller('GamesCtrl', ['$scope', '$location', 'ViewService', 'AirConsoleService', function ($scope, $location, ViewService, AirConsoleService) {

  $scope.init = function() {
  };

  $scope.gameOver = function() {
    ViewService.ctrl.go('game_over', true);
  };

  $scope.jump = function(state) {
    var action = state === true ? 'jump' : 'fall';
    AirConsoleService.airconsole.sendEvent(AirConsole.SCREEN, AirConsoleService.Event.GameInput, { action: action });
  };

  $scope.goToModeSelection = function() {
    ViewService.ctrl.go('select_mode', true);
  };

}]);
