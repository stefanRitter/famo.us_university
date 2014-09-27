define(function (require, exports, module) {
  'use strict';
  
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');

  var PageView =  require('views/PageView');

  function AppView () {
    View.apply(this, arguments);

    _createPageView.call(this);
    _setListeners.call(this);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {};


  function _createPageView () {
    this.pageView = new PageView();
    this.pageModifier = new StateModifier();

    this.add(this.pageModifier).add(this.pageView);
  }

  function _setListeners () {
    this.pageView.on('menuToggle', function () {
      console.log('menuToggle');
    }.bind(this));
  }


  module.exports = AppView;
});
