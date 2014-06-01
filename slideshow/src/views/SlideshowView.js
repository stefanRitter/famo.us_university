define(function (require, exports, module) {
  'use strict';
  
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      Lightbox = require('famous/views/Lightbox'),
      Easing = require('famous/transitions/Easing');

  var SlideView = require('views/SlideView');


  function SlideshowView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size,
      origin: [0.5, 0],
      align: [0.5, 0]
    });

    this.mainNode = this.add(this.rootModifier);
    
    _createLightbox.call(this);
    _createSlides.call(this);
  }

  SlideshowView.prototype = Object.create(View.prototype);
  SlideshowView.prototype.constructor = SlideshowView;
  SlideshowView.DEFAULT_OPTIONS = {
    size: [450, 500],
    data: [],
    lightboxOpts: {
      inOpacity: 1,
      outOpacity: 0,
      inOrigin: [0, 0],
      outOrigin: [0, 0],
      showOrigin: [0, 0],
      inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, -300]),
      outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
      inTransition: { duration: 650, curve: 'easeOut' },
      outTransition: { duration: 500, curve: Easing.inCubic }
    }
  };

  SlideshowView.prototype.showCurrentSlide = function() {
    this.ready = false; // new photo is in process

    var slide = this.slides[this.currentIndex];
    this.lightbox.show(slide, function() {
      this.ready = true;
      slide.fadeIn();
    }.bind(this));
  };

  SlideshowView.prototype.showNextSlide = function() {
    if (!this.ready) { return; }
    this.currentIndex++;
    this.currentIndex = this.currentIndex%this.slides.length;
    this.showCurrentSlide();
  };

  function _createLightbox() {
    /*jshint validthis:true */
    this.lightbox = new Lightbox(this.options.lightboxOpts);
    this.mainNode.add(this.lightbox);
  }

  function _createSlides() {
    /*jshint validthis:true */
    this.slides = [];
    this.currentIndex = 0;

    var data = this.options.data;
    for (var i = 0; i < data.length; i++) {
      var slide = new SlideView({
        size: this.options.size,
        photoUrl: data[i]
      });
      
      slide.on('click', this.showNextSlide.bind(this));
      this.slides.push(slide);
    }

    this.showCurrentSlide();
  }

  module.exports = SlideshowView;
});