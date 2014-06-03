define(function (require, exports, module) {
  'use strict';
  
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      ImageSurface = require('famous/surfaces/ImageSurface');

  var Transitionable = require('famous/transitions/Transitionable'),
      SpringTransition = require('famous/transitions/SpringTransition');

  Transitionable.registerMethod('spring', SpringTransition);

  var slideData = require('data/slideData');

  function SlideView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size
    });
    this.mainNode = this.add(this.rootModifier);

    _createBackground.call(this);
    _createFilm.call(this);
    _createPhoto.call(this);
    
  }

  SlideView.prototype = Object.create(View.prototype);
  SlideView.prototype.constructor = SlideView;
  SlideView.DEFAULT_OPTIONS = {
    size: [400, 450],
    filmBorder: 15,
    photoBorder: 3,
    photoUrl: slideData.defaultImage,
    angle: -0.5
  };

  SlideView.prototype.fadeIn = function() {
    this.photoModifier.setOpacity(1, {duration: 1500, curve: 'easeIn'});
    this.shake();
  };

  SlideView.prototype.shake = function() {
    this.rootModifier.halt();

    // rotates the slide view back along the top edge
    this.rootModifier.setTransform(
      Transform.rotateX(this.options.angle),
      { duration: 200, curve: 'easeOut' }
    );

    // returns the slide back to 0 degress but using a spring transition
    this.rootModifier.setTransform(
      Transform.identity,
      { method: 'spring', period: 600, dampingRatio: 0.15 }
    );
  };

  function _createBackground() {
    /*jshint validthis:true */
    var background = new Surface({
      properties: {
        backgroundColor: '#FFFFF5',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer'
      }
    });

    background.on('click', function() {
      this._eventOutput.emit('click');
    }.bind(this));
    this.mainNode.add(background);
  }

  function _createFilm() {
    /*jshint validthis:true */
    this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

    var film = new Surface({
      size: [this.options.filmSize, this.options.filmSize],
      properties: {
        backgroundColor: '#222',
        zIndex: 1,
        pointerEvents: 'none'
      }
    });

    var filmModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder, 1)
    });

    // NOTE: both zIndex and z transform are 1
    this.mainNode.add(filmModifier).add(film);
  }

  function _createPhoto() {
    /*jshint validthis:true */
    var photoSize = this.options.filmSize - 2*this.options.photoBorder;

    var photo = new ImageSurface({
      size: [photoSize, photoSize],
      content: this.options.photoUrl,
      properties: {
        zIndex: 2,
        pointerEvents: 'none'
      }
    });

    this.photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      opacity: 0.01,
      transform: Transform.translate(0, this.options.filmBorder+this.options.photoBorder, 2)
    });

    this.mainNode.add(this.photoModifier).add(photo);
  }

  module.exports = SlideView;
});
