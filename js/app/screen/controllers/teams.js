App.controllers.controller('TeamsCtrl', ['$scope', '$location', 'TeamService', function ($scope, $location, TeamService) {
  $scope.teams = [];

  $scope.init = function() {
    TeamService.init();
    $scope.teams = TeamService.teams;
    TeamService.onUpdate = function() {
      $scope.$apply();
    };
  };

  $scope.$on("$destroy", function(){
    TeamService.uninit();
  });
}]);
