(function() {
	'use strict';

	var $icon = $('.icon'),
			offset = $icon.offset(),
			width = $icon.width(),
			height = $icon.height(),
			mouseOffsetInside = {},
			perspectiveAmount = 800;

	var maxRotation = 8;
	var maxTranslation = 4;


	$icon.on('mousemove', function(e) {
		mouseOffsetInside = {
			x : e.pageX - offset.left,
			y : e.pageY - offset.top
		};

		var xRotationPercentage = calculateRotationPercentage(mouseOffsetInside.y, height);
		var yRotationPercentage = calculateRotationPercentage(mouseOffsetInside.x, width) * -1;

		var xTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.x, width);
		var yTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.y, height);

		$(this).children().each(function(index, element) {
			var stackingFactor = $(element).attr('data-stacking-factor');
			appleTvAnimate($(element), perspectiveAmount, {
				maxTranslationX : maxTranslation * stackingFactor,
				maxTranslationY : maxTranslation * stackingFactor,
				maxRotationX : maxRotation,
				maxRotationY : maxRotation,
				xRotationPercentage : xRotationPercentage,
				yRotationPercentage : yRotationPercentage,
				xTranslationPercentage : xTranslationPercentage,
				yTranslationPercentage : yTranslationPercentage
			});
		});
		
	});

	function appleTvAnimate(element, perspectiveAmount, config) {
		
		var rotate = "perspective(" + perspectiveAmount +"px) rotateX(" + config.xRotationPercentage * config.maxRotationX + "deg)" +  " rotateY(" + config.yRotationPercentage * config.maxRotationY+  "deg)";
		var translate = " translate3d(" + config.xTranslationPercentage * config.maxTranslationX + "px," + config.yTranslationPercentage * config.maxTranslationY + "px, 0px)";
		element.css({
			'transform' : rotate + translate
		})
	}

	function calculateRotationPercentage(offset, dimension) {
		return ((-2 / dimension) * offset) + 1;
	}

	function calculateTranslationPercentage(offset, dimension) {
		return ((-2 / dimension) * offset) + 1;
	}


})();
