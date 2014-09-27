define(function (require, exports, module) {
  var Engine = require("famous/core/Engine");
  var Surface = require("famous/core/Surface");
  var View = require("famous/core/View");
  var SequentialLayout = require("famous/views/SequentialLayout");
  var StateModifier = require("famous/modifiers/StateModifier");

  var mainContext = Engine.createContext();

  var sequentialLayout = new SequentialLayout({
    direction: 0
  });

  var renderables = [];

  sequentialLayout.sequenceFrom(renderables);

  renderables.push(new Surface({
    size: [100, undefined],
    properties: {
      backgroundColor: "rgba(256, 0, 0, .7)",
    }
  }));

  var view = new View();

  view.add(new Surface({
    size: [300, undefined],
    properties: {
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 1)",
    }
  }));

  view.setOptions({
    size: [300, undefined]
  });


  view.add(new Surface({
    size: [100, undefined],
    properties: {
      zIndex: 2,
      backgroundColor: "rgba(0, 256, 0, .7)",
    }
  }));

  renderables.push(view);

  renderables.push(new Surface({
    size: [100, undefined],
    properties: {
      backgroundColor: "rgba(0, 0, 256, .7)",
    }
  }));

  mainContext.add(sequentialLayout);
});