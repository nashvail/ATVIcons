#ATVicon.js

![Slow Mo Demo](http://i.imgur.com/CcFrXxS.gif)

A Javascript recreation of the 2015 Apple TV icons. Causes an element's children to follow the mouse.

[Online Demo](http://nashvail.me/ATVIcons) [Writeup](https://medium.com/@nashvail/recreating-the-apple-tv-icons-in-javascript-and-css-eec306d41617)


#Usage

Set up your 3D icon with children that have a `data-stacking` attribute which determines the child's apparent depth. Higher values mean more dramatic transforms.

```html
<div class="icon icon--settings">
	<div data-stacking="1.8" class="icon__cog3"></div>
	<div data-stacking="1.4" class="icon__cog2"></div>
	<div data-stacking="1" class="icon__cog1"></div>
	<div data-stacking="1" class="icon__base">
		<div data-stacking="5" class="icon__base__glow"></div>
	</div>
	<div data-stacking="2" class="icon__shadow"></div>
</div>
```

Include the `ATVicon.js` file on your page and call the `ATVicon` function just before the `</body>` closing tag or on DOM ready.

```javascript
<script src="js/ATVicon.js"></script>
<script> ATVicon('.icon'); </script>
</body>
```

The function accepts two parameters:

```javascript
ATVicon(selector,options);
```

1. _`selector`_ can be a string selector ( `'#myIcon'`, `'.icon'`) or an Element ( `document.getElementById('#myIcon')`, `document.querySelectorAll('.icon')` )
2. _`options`_ is an optional object that will override the default options, shown below.

```javascript
ATVicon('.icon',{
  maxRotation: 16, // Maximum rotation for the icon's children, in degrees
  maxTranslation: 10, // Maximum translation for the icon's children, in pixels. Affected by the child's 
  perspective: 600, // How drastic the 3D effect is. Lower values increase the effect. See https://developer.mozilla.org/en-US/docs/Web/CSS/perspective for more info
  damping: 0.1 // How quickly the icon will move. 1 = instant, 0.1 = slow
});
```