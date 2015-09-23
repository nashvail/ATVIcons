/*
* File : ATicon.js
* ****************
*/

(function($) {
	/********************************************
	* ATicon.js                                 *
	* Apple TV 2015 style icons                 *
	* Author : Nash Vail (nashvail.me)          *
	*********************************************/

	'use strict';
	// Exporting module to global
	window.ATicon= {};

	// Factory method for producing new Material Dialog objects
	window.ATicon.getInstance = function(jQueryDOMElement) {
		if(jQueryDOMElement === null) throw new Error("Passed in element doesn't exist in DOM");
		return new ATicon(jQueryDOMElement);
	};
	
	function ATicon(jQueryDomElement) {

		this.$icon = jQueryDomElement;

		this.perspectiveAmount = 800;
		this.offset = this.$icon.offset();
		this.width = this.$icon.width();
		this.height = this.$icon.height();

		this.maxRotation = 8;
		this.maxTranslation = 4;

		var that = this;
		this.$icon.on('mousemove', function(e) {
			that.events.hover.call(that, e);
		});

	}

	ATicon.prototype = {

			appleTvAnimate : function(element, config) {
				var rotate = "perspective(" + this.perspectiveAmount +"px) rotateX(" + config.xRotationPercentage * config.maxRotationX + "deg)" +  " rotateY(" + config.yRotationPercentage * config.maxRotationY+  "deg)";
				var translate = " translate3d(" + config.xTranslationPercentage * config.maxTranslationX + "px," + config.yTranslationPercentage * config.maxTranslationY + "px, 0px)";
				element.css({
					'transform' : rotate + translate
				})
			}, 

			calculateRotationPercentage : function(offset, dimension) {
				return ((-2 / dimension) * offset) + 1;
			},

			calculateTranslationPercentage : function(offset, dimension) {
				return ((-2 / dimension) * offset) + 1;
			}

	};

	ATicon.prototype.events = {
		hover : function(e) {
			var that = this;

			var mouseOffsetInside = {
				x : e.pageX - this.offset.left,
				y : e.pageY - this.offset.top
			};

			var xRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.y, this.height);
			var yRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.x, this.width) * -1;

			var xTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.x, this.width);
			var yTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.y, this.height);

			this.$icon.children().each(function(index, element) {
				var stackingFactor = $(element).attr('data-stacking-factor');

				that.appleTvAnimate($(element), {
					maxTranslationX : that.maxTranslation * stackingFactor,
					maxTranslationY : that.maxTranslation * stackingFactor,
					maxRotationX : that.maxRotation,
					maxRotationY : that.maxRotation,
					xRotationPercentage : xRotationPercentage,
					yRotationPercentage : yRotationPercentage,
					xTranslationPercentage : xTranslationPercentage,
					yTranslationPercentage : yTranslationPercentage
				});				
			});


			// For animating the glow
			that.appleTvAnimate(that.$icon.find('.glow'), {
				maxTranslationX : that.maxTranslation * 5,
				maxTranslationY : that.maxTranslation * 5,
				maxRotationX : that.maxRotation,
				maxRotationY : that.maxRotation,
				xRotationPercentage : xRotationPercentage,
				yRotationPercentage : yRotationPercentage,
				xTranslationPercentage : xTranslationPercentage,
				yTranslationPercentage : yTranslationPercentage
			});				


		}
	};

})(jQuery);
