(function() {
	'use strict';

	var $box = $('.icon'),
			offset = $box.offset(),
			width = $box.width(),
			height = $box.height(),
			mouseOffsetInside = {},
			perspectiveAmount = 800;

	var maxRotation = 4;
	var maxTranslation = 4;


	$box.on('mousemove', function(e) {
		mouseOffsetInside = {
			x : e.pageX - offset.left,
			y : e.pageY - offset.top
		};

		var xRotationPercentage = calculateRotationPercentage(mouseOffsetInside.y, height);
		var yRotationPercentage = calculateRotationPercentage(mouseOffsetInside.x, width) * -1;

		var xTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.x, width);
		var yTranslationPercentage = calculateTranslationPercentage(mouseOffsetInside.y, height);

		appleTvAnimate($(this).children('.box'), perspectiveAmount, {
			maxTranslationX : maxTranslation,
			maxTranslationY : maxTranslation,
			maxRotationX : maxRotation,
			maxRotationY : maxRotation,
			xRotationPercentage : xRotationPercentage,
			yRotationPercentage : yRotationPercentage,
			xTranslationPercentage : xTranslationPercentage,
			yTranslationPercentage : yTranslationPercentage
		});

		appleTvAnimate($(this).children('.shadow'), 0, {
			maxTranslationX : maxTranslation * 2,
			maxTranslationY : maxTranslation * 2,
			maxRotationX : maxRotation,
			maxRotationY : maxRotation,
			xRotationPercentage : xRotationPercentage,
			yRotationPercentage : yRotationPercentage,
			xTranslationPercentage : xTranslationPercentage,
			yTranslationPercentage : yTranslationPercentage
		});

		appleTvAnimate($(this).children('.title'), 600, {
			maxTranslationX : maxTranslation * 0.65,
			maxTranslationY : maxTranslation * 0.65,
			maxRotationX : maxRotation,
			maxRotationY : maxRotation,
			xRotationPercentage : xRotationPercentage,
			yRotationPercentage : yRotationPercentage,
			xTranslationPercentage : xTranslationPercentage,
			yTranslationPercentage : yTranslationPercentage 
		});

		appleTvAnimate($(this).children('.subtitle'), 600, {
			maxTranslationX : maxTranslation * 0.8,
			maxTranslationY : maxTranslation * 0.8 ,
			maxRotationX : maxRotation,
			maxRotationY : maxRotation,
			xRotationPercentage : xRotationPercentage,
			yRotationPercentage : yRotationPercentage,
			xTranslationPercentage : xTranslationPercentage,
			yTranslationPercentage : yTranslationPercentage 
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
