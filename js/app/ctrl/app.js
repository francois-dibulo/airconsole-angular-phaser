App.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/ctrl/main.html',
        controller: 'MainCtrl'
      }).
      when('/select_mode', {
        templateUrl: 'views/ctrl/select_mode.html',
        controller: 'ModesCtrl'
      }).
      when('/select_team', {
        templateUrl: 'views/ctrl/select_team.html',
        controller: 'TeamsCtrl'
      }).
      when('/game', {
        templateUrl: 'views/ctrl/game.html',
        controller: 'GamesCtrl'
      }).
      when('/game_running', {
        templateUrl: 'views/ctrl/game_running.html',
        controller: 'GamesCtrl'
      }).
      when('/game_over', {
        templateUrl: 'views/ctrl/game_over.html',
        controller: 'GamesCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

App.app.run(function($rootScope, AirConsoleService) {
  AirConsoleService.createInstance({
    orientation: AirConsole.ORIENTATION_LANDSCAPE
  });
});
