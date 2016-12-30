App.services.factory('AirConsoleService', [function () {
  var airconsole = null;
  return {
    airconsole: airconsole,
    Event: {
      Connect: 'connect',
      Disconnect: 'disconnect',
      DeviceStateChange: 'device_state_change',
      GameInput: 'game_input_event',
      SetPlayer: 'set_player'
    },

    onReady: function() {},

    createInstance: function(opts) {
      var self = this;
      opts = opts || {};
      airconsole = new AirConsole(opts);

      airconsole.onReady = function() {
        self.onReady();
      };

      airconsole.onConnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Connect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onDisconnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Disconnect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onMessage = function(device_id, data) {
        // Put this into your onMessage function to listen for events
        this.dispatchEvent(device_id, data);
      };

      airconsole.onCustomDeviceStateChange = function(device_id, custom_data) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.DeviceStateChange,
          params: custom_data
        });
      };

      this.airconsole = airconsole;
    },

    isMasterPlayer: function(device_id) {
      return this.airconsole.getMasterControllerDeviceId() === device_id;
    },

    getMasterPlayer: function() {
      var master_id = this.airconsole.getMasterControllerDeviceId();
      return {
        name: this.airconsole.getNickname(master_id),
        picture: this.airconsole.getProfilePicture(master_id)
      };
    },

    isScreen: function() {
      return airconsole.device_id === AirConsole.SCREEN;
    }

  };
}]);
