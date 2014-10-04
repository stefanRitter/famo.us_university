define(function (require, exports, module) {
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  function FeaturedView() {
    View.apply(this, arguments);
  }

  FeaturedView.prototype = Object.create(View.prototype);
  FeaturedView.prototype.constructor = FeaturedView;

  FeaturedView.DEFAULT_OPTIONS = {};

  module.exports = FeaturedView;
});
