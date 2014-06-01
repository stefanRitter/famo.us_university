
define(function(require, exports, module) {
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier');

  var SlideshowView = require('views/SlideshowView');

  function AppView() {
    View.apply(this, arguments);

    var slideshowView = new SlideshowView();
    this.add(slideshowView);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};

  module.exports = AppView;
});