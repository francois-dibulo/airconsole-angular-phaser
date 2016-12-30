/**
  Angular JS setup
*/
var Config = {
  // @const {String} APP_NAME - The name of the angular module
  APP_NAME: 'app',
  // @var {Object} dependencies - Dictionary of the angular dependency modules
  dependencies: {
    controllers: 'appControllers',
    services: 'appServices',
    directives: 'appDirectives',
    filters: 'appFilters'
  },

  /**
   * @desc Returns list of dependencies
   * @return {Array}
   */
  getDependencies: function() {
    var dependencies = [];
    for(var depenceny in this.dependencies) {
      dependencies.push(this.dependencies[depenceny]);
    }
    dependencies.push('ngRoute');
    return dependencies;
  }
};

var App = App || {
  app: null,
  services: null,
  controllers: null,
  directives: null
};

/**
 * Provide shortcut and to avoid long module code.
 * Instead use it like:
 *   App.controllers.controller('YourCtrl', ['$scope', function ($scope) { ... }]);
 */
App.controllers = angular.module(Config.dependencies.controllers, []);
App.services = angular.module(Config.dependencies.services, []);
App.directives = angular.module(Config.dependencies.directives, []);
App.filters = angular.module(Config.dependencies.filters, []);

App.app = angular.module(Config.APP_NAME, Config.getDependencies());
