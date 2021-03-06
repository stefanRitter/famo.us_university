define(function (require, exports, module) {
  'use strict';

	var FastClick    = require('famous/inputs/FastClick');

  var Engine      = require('famous/core/Engine'),
      Utility     = require('famous/utilities/Utility');

  var AppView     = require('views/AppView'),
      slideData   = require('data/slideData');

  var mainContext = Engine.createContext();


  function initApp(data) {
    data = slideData.parse(data);

    var appView = new AppView({data: data});
    mainContext.add(appView);
  }

  Utility.loadURL(slideData.getUrl(), initApp);
});
