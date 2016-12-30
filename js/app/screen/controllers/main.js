App.controllers.controller('MainCtrl', ['$scope', '$location', '$http', 'AirConsoleService', 'GameModesService', 'ViewService', 'PlayerService', 'TeamService', function ($scope, $location, $http, AirConsoleService, GameModesService, ViewService, PlayerService, TeamService) {

  $scope.airconsole = null;

  $scope.init = function() {
    $scope.airconsole = AirConsoleService.airconsole;
    AirConsoleService.onReady = function() {
      ViewService.init();
      PlayerService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          $location.path('/' + path);
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };
      ViewService.screen.go('select_mode', true);

      var event_device_disconnect = $scope.airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, params) {
        TeamService.deviceLeaveTeam(device_id);
        PlayerService.removePlayer(device_id);
      });

    };
  };

}]);
