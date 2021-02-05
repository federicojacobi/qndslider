Quick and Dirty Slider
======================
A JS Developer friendly slider. Of course you can code it yourself, but i already did it for you. It is not a jQuery plugin, and does not need it.

The whole purpose is to cut the bloat and do a quick slider with fade in, fade out.

NEXT / PREV arrows are optional and are not built by the slider, giving you control over how they work, but available via .next() and .prev() methods.

In the same fashion if you need to show a specific slide just do .goto(3) to show the 4th slide (because the world zero-based).

When the slider loads, all the slides but the first one are hidden ( display:none; opacity: 0 ). The script will add the style, but you should do this in CSS to prevent Cumulative Layout Shift.

HOW TO
======

Easiest thing in the world:

In HTML:
```
<div id="yourName">
  <div class="slide">First slide, do whatever you want here</div>
  <div class="slide">Second slide</div>
  <div class="slide">Third slide</div>
  <div class="slide">Fourth slide</div>
</div><br/>
```
OR you can do (but DIVS give you more flexibility, use whatever makes you happy) :
```
<ul id="mySlider"><br/>
  <li class="slide"></li>
  <li class="slide"></li>
</ul><br/>
```

Then in JS
```
// Use the element id for the parameter. Do not use a selector.
var GreatSlider = new Slider( 'yourName' );
var anotherSlider = new Slider( 'mySlider' );
```
Notice the lack of CSS ... that&#39;s on purpose so you can do your own, and understand it !!!

CONTROLS PREV / NEXT / GOTO
===========================
Controls for next, previous and go to are separate from the main logic and you can place them wherever you want. Ideally i&#39;d place them inside the main slider div just to keep it neat, but you can use them with an onClick event anywhere. Also, you are not fixed on how to build your controls, as they fire with the slider object methods.
```
<a href"#" onclick="GreatSlider.next()" >NEXT</a> -- <a href="#" onclick="GreatSlider.prev()" >PREV</a>

<a href="#" onclick="GreatSlider.goto(2)" >Go to slide 3</a>
```
You could attach the click event to another element (assume the control button is inside of the main div wrapper) :
```
	document.querySelector( "#yourName .prev-button" ).addEventListener( 'click', function() {
		GreatSlider.prev();
	} );
```

If your slides are created dynamically and you don't know how many slides there are, but still want to do GOTO controls ... no problem, you could do something like this:

```
	unknownSlider = new Slider( 'the_unknown' );
	unknownSlider.goto( unknownSlider.slides.length - 1 ); // go to the last slide.
```

TIMERS
======
Of course your slider needs a timer. But it is not active by default. You need to specify when to fire it:
```
GreatSlider.startTimer()   Defaults to 500ms delay
GreatSlider.startTimer( 3000 );    3000ms delay
GrearSlider.startTimer( 3000, function() { });    3000ms delay and AFTER the the slide is changes function is called. Notice the call happens after the doAfter() callback (see below).
```
The last line is great if you need to do something in particular after the timer clicks, but not when the other controls are clicked:
```
	GreatSlider.startTimer( 5000, function() {
			console.log('The timer has clicked');
	});
```
If you want to pause on HOVER, there&#39;s no pause, BUT there&#39;s .stopTimer() and you can combine with .startTimer().

doBefore AND doAfter
====================
These are callbacks that happen before and after the slide is changed. Useful when you need to update you external controls:
```
	GreatSlider.on( 'afterSlideChange', function( currentSlideElement ) {
		// currentSlideElement is a DOM node corresponding to a slide element.
	};
```
doBefore and doAfter are called whenever you do .next(), .prev() and .goto(). 
