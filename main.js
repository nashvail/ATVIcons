(function() {
	'use strict';

	var $box = $('.box'),
			offset = $box.offset(),
			width = $box.width(),
			height = $box.height(),
			mouseOffsetInside = {},
			perspectiveAmount = 600;

	var maxRotation = 8;
	var maxTranslation = 5;


	$box.on('mousemove', function(e) {
		// Calculate the mouse offset inside this thing 
		// animate the main then its children like that 
		mouseOffsetInside = {
			x : e.pageX - offset.left,
			y : e.pageY - offset.top
		};

		var xRotationPercentage = calculateRotationAmount(mouseOffsetInside.y, height);
		var yRotationPercentage = calculateRotationAmount(mouseOffsetInside.x, width) * -1;

		var rotate = "perspective(" + perspectiveAmount +"px) rotateX(" + xRotationPercentage * maxRotation + "deg)" +  " rotateY(" + yRotationPercentage * maxRotation+  "deg)";
		var translate = " translate3d(" + xRotationPercentage * maxTranslation + "px," + yRotationPercentage * maxTranslation + "px, 0px)";
		$(this).css({
			'transform' : rotate + translate
		})

	});

	function calculateRotationAmount(offset, dimension) {
		return ((-2 / dimension) * offset) + 1;
	}

})();
