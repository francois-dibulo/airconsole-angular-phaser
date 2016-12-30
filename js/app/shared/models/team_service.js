App.services.factory('TeamService', ['AirConsoleService', 'PlayerService', function (AirConsoleService, PlayerService) {
  var service = {
    ctrl: {},
    screen: {},
    teams: [
      {
        name: "Team 1",
        color: "#3498db"
      },
      {
        name: "Team 2",
        color: "#e74c3c"
      }
    ]
  };

  (function() {
    // Add common team properties
    for (var i = 0; i < service.teams.length; i++) {
      var team = service.teams[i];
      team.players = [];
      team.score = 0;
    }
  })();

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = AirConsoleService.airconsole;
  var EVT_TEAM_SELECT = "EVT_TEAM_SELECT";
  var event_team_select = null;
  var event_device_disconnect = null;
  var event_custom_data_change = null;

  service.onUpdate = function() {};

  var deviceJoinTeam = function(device_id, team_index) {
    var player = PlayerService.getPlayerByDeviceId(device_id);
    if (player) {
      // Remove player from team before he joins another one
      if (player.team_index !== null) {
        service.deviceLeaveTeam(device_id);
      }
      // Add player to new team
      var team = service.teams[team_index];
      player.team_index = team_index;
      team.players.push(player);
      service.onUpdate();
    }
  };

  service.deviceLeaveTeam = function(device_id) {
    var player = PlayerService.getPlayerByDeviceId(device_id);
    if (player) {
      var team = service.teams[player.team_index];
      if (team) {
        var index = team.players.indexOf(player);
        if (index > -1) {
          team.players.splice(index, 1);
          player.team_index = null;
          service.onUpdate();
        }
      }
    }
  };

  service.getTeamsWithPlayers = function() {
    var teams = [];
    for (var i = 0; i < service.teams.length; i++) {
      var t = service.teams[i];
      if (t.players && t.players.length) {
        teams.push(t);
      }
    }

    // No teams available, so we push every player into his own team
    if (!teams.length) {
      for (var i = 0; i < PlayerService.players.length; i++) {
        var player = PlayerService.players[i];
        teams.push({
          name: player.name,
          color: player.color,
          score: 0,
          players: [player]
        });
      }
    }

    return teams;
  };

  service.init = function() {

    // ======================================================
    // SCREEN
    // ======================================================
    if (AirConsoleService.isScreen()) {

      event_team_select = airconsole.on(EVT_TEAM_SELECT, function(device_id, params) {
        deviceJoinTeam(device_id, params.team_index);
      });

    // ======================================================
    // CTRL
    // ======================================================
    } else {

      service.ctrl.checkAllPlayersInTeam = function(do_update) {
        // Check if all players are in a team
        var all_devices = airconsole.getControllerDeviceIds();
        var players_in_team = 0;
        for (var i = 0; i < all_devices.length; i++) {
          var id = all_devices[i];
          var state = airconsole.getCustomDeviceState(id);
          if (state && state.team_index !== null) {
            players_in_team++;
          }
        }
        service.onUpdate(all_devices.length === players_in_team, do_update);
      };

      event_custom_data_change = airconsole.on(AirConsoleService.Event.DeviceStateChange, function(device_id, data) {
        service.ctrl.checkAllPlayersInTeam(true);
      });

      service.selectTeam = function(index) {
        airconsole.sendEvent(AirConsole.SCREEN, EVT_TEAM_SELECT, {
          team_index: index
        });
        setTimeout(function() {
          airconsole.setCustomDeviceStateProperty('team_index', index);
        }, 100);
      };

    }

  };

  service.uninit = function() {
    if (AirConsoleService.isScreen()) {
      airconsole.off(event_team_select);
      airconsole.off(event_device_disconnect);
    } else {
      airconsole.off(event_custom_data_change);
    }
  };

  return service;
}]);
