App.directives.directive('ndTouch', [function() {
  return function(scope, element, attr) {
    function isMobile() {
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
    }
    var event_down = isMobile() ? 'touchstart' : 'mousedown';
    element.on(event_down, function(event) {
      scope.$apply(function() {
          scope.$eval(attr.ndTouch);
      });
    });
  };
}]);

App.directives.directive('ndTouchEnd', [function() {
  return function(scope, element, attr) {
    function isMobile() {
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
        return true;
      }
     else {
        return false;
      }
    }
    var event_down = isMobile() ? 'touchend' : 'mouseup';
    element.on(event_down, function(event) {
      scope.$apply(function() {
          scope.$eval(attr.ndTouchEnd);
      });
    });
  };
}]);
