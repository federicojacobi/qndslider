Quick and Dirty Slider
======================
A JS Developer friendly slider. Of course you can code it yourself, but i already did it for you.

This is NOT a jQuery plugin, but it uses jQuery (who doesn&#39;t nowadays), so you must add the code inside of jQuery(document).ready()

The whole purpose is to cut the bloat and do a quick slider with fade in, fade out.

NEXT / PREV arrows are optional and are not built by the slider, giving you control over how they work, but available via .next() and .prev() methods.

In the same fashion if you need to show a specific slide just do .goto(4) to show the 4th slide.

When the slider loads, all the slides are hidden ( jQuery(slides).hide() ) and then first one is shown.

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
// you can use a jQuery selector as a parameter as in "body .content > div" or whatever
var GreatSlider = new Slider( "yourName" );
var anotherSlider = new Slider( "mySlider" );
```
Notice the lack of CSS ... that&#39;s on purpose so you can do your own, and understand it !!!

CONTROLS PREV / NEXT / GOTO
===========================
Controls for next, previous and go to are separate from the main logic and you can place them wherever you want. Ideally i&#39;d place them inside the main slider div just to keep it neat, but you can use them with an onClick event anywhere. Also, you are not fixed on how to build your controls, as they fire with the slider object methods.
```
<a href"#" onclick="GreatSlider.next()" >NEXT</a> -- <a href="#" onclick="GreatSlider.prev()" >PREV</a>

<a href="#" onclick="GreatSlider.goto(3)" >Go to slide 3</a>
```
You could do some jQuery magic an attach the click event to something else (assume the control button is inside of the main div wrapper) :

	jQuery( "#yourName .prev-button" ).click( function() {
		GreatSlider.prev();
	});

If your slides are created dynamically and you don't know how many slides there are, but still want to do GOTO controls ... no problem ... a bit of jQuery will do it:

	jQuery( "#featured_slider .controls li" ).click( function() { 
		jQuery(this).addClass( "active" ).siblings().removeClass( "active" );
		featuredSlider.goto( jQuery( this ).index() + 1 );
	});
	
In this case, your slider is #featured_slider with the controls in a div .controls and inside of a ul/li. The will remove the &quot;active&quot; class from all the LIs, add it to the clicked control, and go to that slide. That way your active control has the &quot;active&quot; class. The main slider always has the &quot;active&quot; class on the visible slide.

TIMERS
======
Of course your slider needs a timer. But it is not active by default. You need to specify when to fire it:

GreatSlider.startTimer()   Defaults to 500ms delay
GreatSlider.startTimer( 3000 );    3000ms delay
GrearSlider.startTimer( 3000, function() { });    3000ms delay and AFTER the the slide is changes function is called. Notice the call happens after the doAfter() callback (see below).

The last line is great if you need to do something in particular after the timer clicks, but not when the other controls are clicked:

	GreatSlider.startTimer( 5000, function() {
			console.log('The timer has clicked');
	});
	
If you want to pause on HOVER, there&#39;s no pause, BUT there&#39;s .stopTimer() so you can do:

	jQuery( "#featured_slider" ).hover( 
		function() { 
			featuredSlider.stopTimer();
		}, 
		function() {
			featuredSlider.startTimer( 5000 );
		}
	);

doBefore AND doAfter
====================
These are callbacks that happen before and after the slide is changed. Useful when you need to update you external controls:

	GreatSlider.doAfter = function( currentSlideElement ) {
		jQuery( "#featured_slider ul.controls li" ).removeClass( "active" );
		jQuery( "#featured_slider ul.controls li:nth-child(" + featuredSlider["currentSlide"] + ")" ).addClass( "active");
	};
	
Returning false in doBefore will stop switching the slide (and in turn triggering doAfter).

doBefore and doAfter are called whenever you do .next(), .prev() and .goto(). 
