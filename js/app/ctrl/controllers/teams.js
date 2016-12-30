App.controllers.controller('TeamsCtrl', ['$scope', '$location', 'ViewService', 'TeamService', function ($scope, $location, ViewService, TeamService) {
  $scope.teams = [];
  $scope.all_players_in_team = false;

  $scope.init = function() {
    TeamService.init();
    $scope.teams = TeamService.teams;
    TeamService.onUpdate = function(all_players_in_team, update) {
      $scope.all_players_in_team = all_players_in_team;
      if (update) {
        $scope.$apply();
      }
    }
    TeamService.ctrl.checkAllPlayersInTeam();
  };

  $scope.$on("$destroy", function() {
    TeamService.uninit();
  });

  $scope.selectTeam = function(index) {
    TeamService.selectTeam(index);
  };

  $scope.goBackToMode = function() {
    ViewService.ctrl.go('select_mode', true);
  };

  $scope.startGame = function() {
    ViewService.ctrl.go('game', true);
  };

}]);
