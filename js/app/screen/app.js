App.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/screen/main.html',
        controller: 'MainCtrl'
      }).
      when('/select_mode', {
        templateUrl: 'views/screen/select_mode.html',
        controller: 'ModesCtrl'
      }).
      when('/select_team', {
        templateUrl: 'views/screen/select_team.html',
        controller: 'TeamsCtrl'
      }).
      when('/game', {
        templateUrl: 'views/screen/game.html',
        controller: 'GamesCtrl'
      }).
      when('/game_over', {
        templateUrl: 'views/ctrl/game_over.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

App.app.run(function($rootScope, AirConsoleService) {
  AirConsoleService.createInstance();
});
