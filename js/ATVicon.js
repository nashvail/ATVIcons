/*! ATVicon.js, v1.0 - Author: Nash Vail (nashvail.me) - https://github.com/nashvail/ATVIcons */
(function() {
  'use strict';

  var W = window,
      D = document,
      R = D.documentElement,

      // Use requestAnimationFrame where available for better performance
      rAF = W.requestAnimationFrame || W.mozRequestAnimationFrame || W.webkitRequestAnimationFrame || W.msRequestAnimationFrame || W.oRequestAnimationFrame || function(callback) { W.setTimeout(callback, 20); }, // IE Fallback

      // Check for browser support of CSS properties. Returns false if no support, or returns the supported property with or without a vendor prefix
      checkStyleSupport = (function() {
        var support = {};
        return function(prop) {
          if ( support[prop] !== undefined ) { return support[prop]; }

          var div = D.createElement('div'),
              style = div.style,
              ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
              prefixes = ["webkit", "moz", "ms", "o"],
              props = (prop + ' ' + (prefixes).join(ucProp + ' ') + ucProp).split(' ');

          for ( var i in props ) {
            if ( props[i] in style ) {
              return support[prop] = props[i];
            }
          }

          return support[prop] = false;
        };
      }()),
      transformProperty = checkStyleSupport('transform');

  // If browser does not support transforms, quit.
  if ( !transformProperty ) {
    window.ATVicon = function(){ return false };
    return false;
  }

  // Throttle the amount of time between function calls
  function throttle(func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }

  function calculateRotationPercentage(offset, dimension) {
    return ((-2 / dimension) * offset) + 1;
  }

  function calculateTranslationPercentage(offset, dimension) {
    return ((-2 / dimension) * offset) + 1;
  }

  // Round number to 4 decimal places
  function round(num) {
    return Math.ceil(num * 10000)/10000;
  }

  // Factory method that creates a new Icon instance for each element provided or matching the selector.
  window.ATVicon = function(selector,options) {
    var elems = ( typeof selector === typeof "" ? D.querySelectorAll(selector) :
                 selector instanceof Element ? [selector] : false ),
        len = elems.length,
        i = 0;

    //
    for (; i < len; i++){ elems[i] = new Icon(elems[i],options); }

    return elems;
  };

  function Icon(el,options) {

    if ( !el ) { return false; }

    this.el = el;
    this.children = el.querySelectorAll('[data-stacking]');

    // Combine user options with default options
    for (var key in options) {
      if ( options.hasOwnProperty(key) ) { this.opts[key] = options[key]; }
    }

    this.opts.damping = this.opts.damping || 0.1; // Don't allow a 0 value.

    this.resize();

    // Get elements dimensions on window resize, in case of percentage based dimensions or responsive designs.
    W.addEventListener('resize',throttle(this.resize,500).bind(this));

    // Private variables for damping
    var _xR = 0,
        _yR = 0,
        _xT = 0,
        _yT = 0;

    this.setTransform = function(element, stackingFactor) {
      stackingFactor = stackingFactor || 1;

      var rotate = "perspective(" + this.opts.perspective + "px) rotateX(" + _xR * this.opts.maxRotation + "deg)" + " rotateY(" + _yR * this.opts.maxRotation + "deg)";

      var translate = " translate3d(" + _xT * this.opts.maxTranslation * stackingFactor + "px," + _yT * this.opts.maxTranslation * stackingFactor + "px, 0px)";

      element.style[transformProperty] = rotate + translate;
    };

    this.animate = function(){

      _xR = round( _xR + ( (this.xRotation - _xR)    * this.opts.damping ));
      _yR = round( _yR + ( (this.yRotation - _yR)    * this.opts.damping ));
      _xT = round( _xT + ( (this.xTranslation - _xT) * this.opts.damping ));
      _yT = round( _yT + ( (this.yTranslation - _yT) * this.opts.damping ));

      var len = this.children.length,
          i = 0,
          child,
          stackingFactor;

      for (; i< len; i++) {
        child = this.children[i];
        stackingFactor = child.getAttribute('data-stacking');
        this.setTransform(child, stackingFactor);
      }

      // Keep animating until values are reset to 0
      if ( _xR && _yR && _xT && _yT ) { rAF(this.animate.bind(this)); }
    };

    this.el.addEventListener('mousemove', throttle(this.mousemove,50).bind(this));
    this.el.addEventListener('mouseleave',throttle(this.mouseleave,500).bind(this));
  }

  Icon.prototype = {

    // Default options, overidden with values provided on call.
    opts: {
      maxRotation: 16, // Maximum rotation for the icon's children, in degrees
      maxTranslation: 10, // Maximum translation for the icon's children, in pixels. Affected by the child's
      perspective: 600, // How drastic the 3D effect is. Lower values increase the effect. See https://developer.mozilla.org/en-US/docs/Web/CSS/perspective for more info
      damping: 0.1 // How quickly the icon will move. 1 = instant, 0.1 = slow
    },

    xRotation: 0,
    yRotation: 0,
    xTranslation: 0,
    yTranslation: 0,

    // Get element size for determining
    resize: function(){
      var rect = this.el.getBoundingClientRect();

      this.offset = {
        top: rect.top + W.pageYOffset - R.clientTop,
        left: rect.left + W.pageXOffset - R.clientLeft
      };

      this.width = rect.width;
      this.height = rect.height;
    },

    mousemove: function(e) {

      var mouseX = ( e.touches ? e.touches[0].clientX : e.clientX ), // touch support
          mouseY = ( e.touches ? e.touches[0].clientY : e.clientY ),
          mouseOffsetInsideX = mouseX - this.offset.left,
          mouseOffsetInsideY = mouseY - this.offset.top;

      this.xRotation = calculateRotationPercentage(mouseOffsetInsideY, this.height);
      this.yRotation = calculateRotationPercentage(mouseOffsetInsideX, this.width) * -1;
      this.xTranslation = calculateTranslationPercentage(mouseOffsetInsideX, this.width);
      this.yTranslation = calculateTranslationPercentage(mouseOffsetInsideY, this.height);

      // Only start the requestAnimationFrame loop on first call.
      if ( !this._animating ) {
        this._animating = true;
        rAF(this.animate.bind(this));
      }
    },

    mouseleave: function(){
      this._animating = false;
      // Reset all values to 0
      this.xRotation = this.yRotation = this.xTranslation = this.yTranslation = 0;
      rAF(this.animate.bind(this));
    }
  };

})();