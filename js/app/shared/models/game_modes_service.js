App.services.factory('GameModesService', ['AirConsoleService', function (AirConsoleService) {
  var service = {
    ctrl: {},
    screen: {}
  };
  service.current_selected_mode_index = 0;
  service.modes = [
    {
      name: 'Classic Mode',
      key: 'classic',
      description: 'A classic mode',
      instructions: 'Get to the green zone',
      ctrl_view: 'game'
    },
    {
      name: 'Hard Mode',
      key: 'hard',
      description: 'A much harder game mode',
      instructions: 'Get to the green and yellow zones',
      is_team: true,
      ctrl_view: 'game_hard'
    }
  ];

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = AirConsoleService.airconsole;
  var EVT_NEXT_MODE = 'EVT_NEXT_MODE';
  var EVT_PREV_MODE = 'EVT_PREV_MODE';
  var EVT_SELECT_MODE = 'EVT_SELECT_MODE';

  var evt_on_next = null;
  var evt_on_prev = null;
  var evt_on_select = null;

  service.setModeIndex = function(mode_index) {
    this.current_selected_mode_index = mode_index;
  };

  service.nextMode = function() {
    var next = this.current_selected_mode_index + 1;
    if (next > this.modes.length - 1) {
      next = 0;
    }
    this.setModeIndex(next);
  };

  service.prevMode = function() {
    var prev = this.current_selected_mode_index - 1;
    if (prev < 0) {
      prev = this.modes.length - 1;
    }
    this.setModeIndex(prev);
  };

  service.getSelectedMode = function() {
    return this.modes[this.current_selected_mode_index];
  };

  service.isSelectedMode = function(index) {
    return this.current_selected_mode_index === index;
  };

  // ======================================================
  // SCREEN
  // ======================================================
  service.init = function() {

    if (AirConsoleService.isScreen()) {

      service.screen.onNextMode = function() {};
      service.screen.onPrevMode = function() {};
      service.screen.onSelectMode = function() {};

      evt_on_next = airconsole.on(EVT_NEXT_MODE, function() {
        service.nextMode();
        service.screen.onNextMode();
      });

      evt_on_prev = airconsole.on(EVT_PREV_MODE, function() {
        service.prevMode();
        service.screen.onPrevMode();
      });

      evt_on_select = airconsole.on(EVT_SELECT_MODE, function() {
        service.screen.onSelectMode();
      });

    // ======================================================
    // CTRL
    // ======================================================
    } else {

      service.ctrl.nextMode = function() {
        service.nextMode();
        airconsole.sendEvent(AirConsole.SCREEN, EVT_NEXT_MODE);
      };

      service.ctrl.prevMode = function() {
        service.prevMode();
        airconsole.sendEvent(AirConsole.SCREEN, EVT_PREV_MODE);
      };

      service.ctrl.selectMode = function() {
        airconsole.sendEvent(AirConsole.SCREEN, EVT_SELECT_MODE);
      };

    }
  };

  service.uninit = function() {
    if (AirConsoleService.isScreen()) {
      airconsole.off(evt_on_next);
      airconsole.off(evt_on_prev);
      airconsole.off(evt_on_select);
    }
  };

  return service;
}]);
