App.services.factory('PlayerService', ['AirConsoleService', function (AirConsoleService) {
  var service = {
    ctrl: {},
    screen: {},
    players: [],
    players_map: {}
  };

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = AirConsoleService.airconsole;

  service.init = function() {

    // ======================================================
    // SCREEN
    // ======================================================
    if (AirConsoleService.isScreen()) {

      service.addPlayer = function(device_id) {
        if (this.getPlayerByDeviceId(device_id) !== null) return;
        var player = {
          device_id: device_id,
          color: '#000000',
          stats: {},
          team_index: null,
          name: airconsole.getNickname(device_id),
          img: airconsole.getProfilePicture(device_id)
        };
        this.players.push(player);
        this.players_map[device_id] = player;
      };

      service.removePlayer = function(device_id) {
        var index = this.getPlayerByDeviceId(device_id, true);
        if (index !== null) {
          this.players.splice(index, 1);
          delete this.players_map[device_id];
        } else {
          throw "Could not remove player with device_id " + device_id;
        }
      };

      service.getPlayer = function(device_id) {
        return this.players_map[device_id]
      };

      service.getPlayerByDeviceId = function(id, as_index) {
        var player = null;
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].device_id === id) {
            player = as_index ? i : this.players[i];
            break;
          }
        }
        return player;
      };

      airconsole.on(AirConsoleService.Event.Connect, function(device_id, params) {
        service.addPlayer(device_id);
      });

    // ======================================================
    // CTRL
    // ======================================================
    } else {

    }

  }

  return service;
}]);
