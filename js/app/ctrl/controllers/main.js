App.controllers.controller('MainCtrl', ['$scope', '$location', '$http', 'AirConsoleService', 'ViewService', function ($scope, $location, $http, AirConsoleService, ViewService) {

  $scope.airconsole = null;
  $scope.player = {
    device_id: null,
    is_master: false
  };

  var setMasterPlayer = function() {
    var device_id = $scope.airconsole.getDeviceId();
    var is_master = AirConsoleService.isMasterPlayer(device_id);
    $scope.player.is_master = is_master;
    $scope.$apply();
  };

  var initPlayer = function() {
    var device_id = $scope.airconsole.getDeviceId();
    setMasterPlayer();
    $scope.airconsole.setCustomDeviceStateProperty('team_index', null);
    $scope.player.device_id = device_id;
  };

  $scope.init = function() {
    $scope.airconsole = AirConsoleService.airconsole;

    $scope.airconsole.onReady = function() {
      initPlayer();
      ViewService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          $location.path('/' + path);
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };
    };

    $scope.airconsole.on(AirConsoleService.Event.DeviceStateChange, function(device_id, custom_data) {
      var ctrl_device_id = $scope.airconsole.getDeviceId();
      if (custom_data && device_id === AirConsole.SCREEN) {
        if (custom_data['player_map_key'] && custom_data['player_map_key'][ctrl_device_id]) {
          $scope.player = custom_data['player_map_key'][ctrl_device_id];
          setMasterPlayer();
        }
      }
    });

    $scope.airconsole.on(AirConsoleService.Event.Connect, function(device_id, params) {
      setMasterPlayer();
    });

    $scope.airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, params) {
      setMasterPlayer();
    });

  };

}]);
