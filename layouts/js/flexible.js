define(function (require, exports, module) {
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var FlexibleLayout = require('famous/views/FlexibleLayout');

  var mainContext = Engine.createContext();

  var colors = [
    'rgba(256, 0, 0, .7)',
    'rgba(0, 256, 0, .7)',
    'rgba(0, 0, 256, .7)'
  ];

  var ratios = [1, 3, 5];

  var layout = new FlexibleLayout({
    ratios: ratios,
    transition: {
      curve: 'easeInOut',
      duration: 2000
    }
  });

  var surfaces = [];

  for (var i = 0; i < 3; i++) {
    surfaces.push(new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: colors[i % 3]
      }
    }));
  }

  layout.sequenceFrom(surfaces);

  mainContext.add(layout);

  Engine.on('click', function() {
    ratios = ratios.reverse();
    layout.setRatios(ratios)
  });
});
