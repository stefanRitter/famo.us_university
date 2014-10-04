define(function (require, exports, module) {
  var View          = require('famous/core/View');
  var Surface       = require('famous/core/Surface');
  var Transform     = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface  = require('famous/surfaces/ImageSurface');

  function FeaturedView() {
    View.apply(this, arguments);
    
    _createTitle.call(this);
    _createBackground.call(this);
    _createSubTitle.call(this);
  }

  FeaturedView.prototype = Object.create(View.prototype);
  FeaturedView.prototype.constructor = FeaturedView;

  FeaturedView.DEFAULT_OPTIONS = {
    width: 320,
    height: 2*55,
    angle: -0.2,
    fontSize: 26,
    subTitle: 'Timbre Staff Picks',
    featuredImageUrl: 'img/band.png'
  };


  function _createTitle () {
    var titleSurface = new Surface({
      size: [true, true],
      content: 'noteworthy',
      properties: {
        color: 'black',
        fontSize: this.options.fontSize + 'px',
        textTransform: 'uppercase'
      }

    });

    var titleModifier = new StateModifier({
      transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [20, -5, 0])
    });

    this.add(titleModifier).add(titleSurface);
  }

  function _createBackground () {
    var backgroundImageSurface = new ImageSurface({
      size: [this.options.width, true],
      content: this.options.featuredImageUrl
    });
    
    var imageModifier = new StateModifier({
      transform: Transform.translate(0, -this.options.fontSize, 0)
    });

    this.add(imageModifier).add(backgroundImageSurface);
  }

  function _createSubTitle () {
    var subTitleSurface = new Surface({
      size: [true, true],
      content: this.options.subTitle,
      properties: {
        color: 'white',
        fontSize: this.options.fontSize + 'px',
        textTransform: 'uppercase'
      }

    });

    var subTitleModifier = new StateModifier({
      transform: Transform.thenMove(Transform.rotateZ(this.options.angle),
        [20, this.options.fontSize + 10, 0])
    });

    this.add(subTitleModifier).add(subTitleSurface);
  }

  module.exports = FeaturedView;
});
