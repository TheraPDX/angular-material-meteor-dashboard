/**
Get md theme colors in other HTML elements! (non-md)

USAGE:
<md-button md-style-color="{'background-color': 'hue-1'}">My Button</md-button>
<md-button md-style-color="{'background-color': '100'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'warn.hue-3'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'accent.400'}">My Button</md-button>
<md-button md-style-color="{'background-color': 'green.900'}">My Button</md-button>

<span md-style-color="{'color': 'primary'}">Text that is of color Primary!</span>
*/
(function () {
  "use strict";

  var _theme;
  var _palettes;

  angular
    .module('app.mdColors',[])

    .config(['$mdThemingProvider', function($mdThemingProvider) {
      // CUSTOMIZE THEME COLORS HERE
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey', {default:"800"})
        .accentPalette('light-blue') //, {default:"100"})
        .warnPalette('yellow', {default: '900'})
        //.backgroundPalette("white")
        ;

      // TOAST themes
      $mdThemingProvider.theme("success-toast");
      $mdThemingProvider.theme("error-toast");
      $mdThemingProvider.theme("info-toast");

      // what you really need
      _theme = $mdThemingProvider.theme();
      _palettes = $mdThemingProvider._PALETTES;
    }])

    .directive('mdStyleColor',
      function ($mdColorPalette) {
        return {
          restrict: 'A',
          scope: { mdStyleColor: '=', colour:'@' },
          link: function (scope, element, attrs) {
            for (var p in scope.mdStyleColor) {
              if (scope.mdStyleColor.hasOwnProperty(p)) {

                var themeColors = _theme.colors;

                var split = (scope.mdStyleColor[p] || '').split('.');
                if (split.length < 2) split.unshift('primary');

                var hueR   = split[1] || 'hue-1';    // 'hue-1'
                var colorR = split[0] || 'primary';  // 'warn'

                // Absolute color: 'orange'
                var colorA = themeColors[colorR] ?
                  themeColors[colorR].name : colorR;

                // Absolute Hue: '500'
                var hueA =
                  themeColors[colorR] ?
                  themeColors[colorR].hues[hueR] || hueR :
                  hueR;

                var colorValue = _palettes[colorA][hueA] ?
                  _palettes[colorA][hueA].value :
                  _palettes[colorA]['500'].value;

                element.css(p, 'rgb('+colorValue.join(',')+')');

              }
            }
          }
        }
      });
}());
