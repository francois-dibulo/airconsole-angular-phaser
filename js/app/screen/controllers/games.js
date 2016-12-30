App.controllers.controller('GamesCtrl', ['$scope', '$location', 'ViewService', 'TeamService', 'PlayerService', 'AirConsoleService',
  function ($scope, $location, ViewService, TeamService, PlayerService, AirConsoleService) {

  var event_on_player_input = null;

  $scope.init = function() {
    PhaserGame.init(TeamService.getTeamsWithPlayers());

    event_on_player_input = $scope.airconsole.on(AirConsoleService.Event.GameInput, function(device_id, params) {
      var player = PlayerService.getPlayer(device_id);
      if (player) {
        PhaserGame.onPlayerInput(player, params);
      }
    });
  };

  var gameOver = function() {
    ViewService.screen.go('game_over', true);
  };

  $scope.$on("$destroy", function() {
    $scope.airconsole.off(event_on_player_input);
    PhaserGame.destroy();
  });

}]);
