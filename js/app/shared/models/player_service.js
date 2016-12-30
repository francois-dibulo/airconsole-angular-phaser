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

  var player_colors = ['#77bbff', '#ff9900', '#99ee00', '#f4359e',
                      '#651067', '#b82e2e', '#329262', '#9c5935',
                      '#3b3eee', '#fb9a99', '#ccbb22', '#cab2d6',
                      '#aaffaa', '#b91383', '#008800', '#660000',
                      '#ff0000', '#ffff00', '#00ff00', '#0000ff',
                      '#743411', '#111177', '#b77322', '#66aa00',
                      '#00aac6', '#a9c413', '#9e8400', '#5574a6',
                      '#777777', '#999999', '#bbbbbb', '#eeeeee'];

  service.init = function() {

    // ======================================================
    // SCREEN
    // ======================================================
    if (AirConsoleService.isScreen()) {

      var player_map_key = 'player_map_key';

      service.updatePlayersMap = function() {
        airconsole.setCustomDeviceStateProperty(player_map_key, this.players_map);
      };
      service.updatePlayersMap();

      service.addPlayer = function(device_id) {
        if (this.getPlayerByDeviceId(device_id) !== null) return;
        var color = player_colors[device_id] || player_colors[0];
        var player = {
          device_id: device_id,
          color: color,
          stats: {},
          team_index: null,
          name: airconsole.getNickname(device_id),
          img: airconsole.getProfilePicture(device_id)
        };
        this.players.push(player);
        this.players_map[device_id] = player;
        this.updatePlayersMap();
        // airconsole.sendEvent(device_id, AirConsoleService.Event.SetPlayer, {
        //   color: color
        // });
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
