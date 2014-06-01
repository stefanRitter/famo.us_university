
define(function(require, exports, module) {
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier');

  var SlideView = require('views/SlideView');

  function SlideshowView() {
    View.apply(this, arguments);

    var slideView = new SlideView();

    this.add(slideView);
  }

  SlideshowView.prototype = Object.create(View.prototype);
  SlideshowView.prototype.constructor = SlideshowView;

  SlideshowView.DEFAULT_OPTIONS = {};

  module.exports = SlideshowView;
});