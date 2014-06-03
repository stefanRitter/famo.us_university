// basic View for our app

define(function (require, exports, module) {
  'use strict';
  
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier');

  function EmptyView() {
    View.apply(this, arguments);
  }

  EmptyView.prototype = Object.create(View.prototype);
  EmptyView.prototype.constructor = EmptyView;

  EmptyView.DEFAULT_OPTIONS = {};

  // add shared view methods here

  module.exports = EmptyView;
});