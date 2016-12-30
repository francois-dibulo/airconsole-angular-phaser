App.controllers.controller('ModesCtrl', ['$scope', '$location', 'GameModesService', 'ViewService', function ($scope, $location, GameModesService, ViewService) {
  $scope.modes = [];

  $scope.init = function() {
    GameModesService.init();

    $scope.modes = GameModesService.modes;

    GameModesService.screen.onNextMode = function() {
      $scope.$apply();
    };

    GameModesService.screen.onPrevMode = function() {
      $scope.$apply();
    };

    GameModesService.screen.onSelectMode = function() {
      var mode = GameModesService.getSelectedMode();
      if (mode.is_team) {
        ViewService.screen.go('select_team', true);
      } else {
        ViewService.screen.go('game', true);
      }
      $scope.$apply();
    };
  };

  $scope.$on("$destroy", function(){
    GameModesService.uninit();
  });

  $scope.isSelectedMode = function(index) {
    return GameModesService.isSelectedMode(index);
  };

}]);
