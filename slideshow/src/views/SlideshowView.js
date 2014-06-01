define(function (require, exports, module) {
  'use strict';
  
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      Lightbox = require('famous/views/Lightbox');

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
    lightboxOpts: {}
  };

  SlideshowView.prototype.showCurrentSlide = function() {
    var slide = this.slides[this.currentIndex];
    this.lightbox.show(slide);
  };

  SlideshowView.prototype.showNextSlide = function() {
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