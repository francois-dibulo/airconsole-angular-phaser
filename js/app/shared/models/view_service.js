App.services.factory('ViewService', ['AirConsoleService', function (AirConsoleService) {
  var service = {
    ctrl: {},
    screen: {}
  };

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = AirConsoleService.airconsole;
  var EVT_VIEW = 'EVT_VIEW';

  service.screen.current_view = null;
  service.ctrl.current_view = null;

  service.onPath = function(path) {};

  airconsole.on(EVT_VIEW, function(from, params) {
    service.onPath(params.view, params);
  });

  // ======================================================
  // SCREEN
  // ======================================================
  service.init = function() {

    if (AirConsoleService.isScreen()) {

      // A device connects
      airconsole.on(AirConsoleService.Event.Connect, function(from, params) {
        var view_to_show = service.screen.current_view;

        // Redirects
        if (view_to_show === 'game') {
          view_to_show = 'game_running'
        }

        airconsole.sendEvent(from, EVT_VIEW, {
          view: view_to_show
        });
      });

      service.screen.go = function(path, ctrl_too, params) {
        if (ctrl_too) {
          airconsole.broadcastEvent(EVT_VIEW, {
            view: path,
            params: params
          });
        }
        service.screen.current_view = path;
        service.onPath(path, params, true);
      };

    // ======================================================
    // CTRL
    // ======================================================
    } else {

      service.ctrl.go = function(path, all_devices, params) {
        if (all_devices) {
          airconsole.broadcastEvent(EVT_VIEW, {
            view: path,
            params: params
          });
        }
        service.ctrl.current_view = path;
        service.onPath(path, params, true);
      };

    }
  }

  return service;
}]);
