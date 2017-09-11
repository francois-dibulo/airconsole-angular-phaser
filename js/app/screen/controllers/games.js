App.controllers.controller('GamesCtrl', ['$scope', '$location', 'ViewService', 'TeamService', 'PlayerService', 'AirConsoleService', 'GameModesService',
  function ($scope, $location, ViewService, TeamService, PlayerService, AirConsoleService, GameModesService) {

  var airconsole = AirConsoleService.airconsole;
  var event_on_player_input = null;
  var event_on_player_disconnects = null;

  $scope.init = function() {
    PhaserGame.init(airconsole, TeamService.getTeamsWithPlayers(), GameModesService.getSelectedMode());

    event_on_player_input = airconsole.on(AirConsoleService.Event.GameInput, function(device_id, params) {
      var player = PlayerService.getPlayer(device_id);
      if (player) {
        PhaserGame.onPlayerInput(player, params);
      }
    });

    event_on_player_disconnects = airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, params) {
      var player = PlayerService.getPlayer(device_id);
      if (player) {
        PhaserGame.onPlayerLeft(player, params);
      }
    });
  };

  var gameOver = function() {
    ViewService.screen.go('game_over', true);
  };

  $scope.$on("$destroy", function() {
    airconsole.off(event_on_player_input);
    airconsole.off(event_on_player_disconnects);
    PhaserGame.destroy();
  });

}]);
