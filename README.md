Quick and Dirty Slider
======================
A JS Developer friendly slider. Of course you can code it yourself, but i already did it for you.

This is NOT a jQuery plugin, but it uses jQuery (who doesn't nowadays).

The whole purpose is to cut the bloat and do a quick slider with fade in, fade out.

NEXT / PREV arrows are optional and are not built by the slider, giving you control over how they work, but available via .next() and .prev() methods.

In the same fashion if you need to show a specific slide just do .goto(4) to show the 4th slide.

HOW TO
======

Easiest thing in the world:

In HTML:

&lt;div id=&quot;yourName&quot;&gt;<br/>
  &lt;div class=&quot;slide&quot;&gt;First slide, do whatever you want here&lt;/div&gt;<br/>
  &lt;div class=&quot;slide&quot;&gt;Second slide&lt;/div&gt;<br/>
  &lt;div class=&quot;slide&quot;&gt;Third slide&lt;/div&gt;<br/>
  &lt;div class=&quot;slide&quot;&gt;Fourth slide&lt;/div&gt;<br/>
&lt;/div&gt;<br/>

OR you can do:

&lt;ul id=&quot;mySlider&quot;&gt;<br/>
  &lt;li class=&quot;slide&quot;&gt;&lt;/li&gt;<br/>
  &lt;li class=&quot;slide&quot;&gt;&lt;/li&gt;<br/>
&lt;/ul&gt;<br/>

Then in JS

var GreatSlider = new Slider( &quot;yourName&quot; );  // you can use a jQuery selector as a parameter as in &quot;body .content &gt; div&quot; or whatever<br/>
var anotherSlider = new Slider( &quot;mySlider&quot; );<br/>

Notice the lack of CSS ... that&#39;s on purpose so you can do your own, and understand it !!!

CONTROLS PREV / NEXT / GOTO
===========================
Controls for next, previous and go to are separate from the main logic and you can place them wherever you want. Ideally i'd place them inside the main slider div just to keep it neat, but you can use them with an onClick event anywhere. Also, you are not fixed on how to build your controls, as they fire with the slider object methods.

&lt;a href&quot;#&quot; onclick=&quot;GreatSlider.next()&quot; &gt;NEXT&lt;/a&gt; -- &lt;a href=&quot;#&quot; onclick=&quot;GreatSlider.prev()&quot; &gt;PREV&lt;/a&gt;

&lt;a href=&quot;#&quot; onclick=&quot;GreatSlider.goto(3)&quot; &gt;Go to slide 3&lt;/a&gt;

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
GrearSlider.startTimer( 3000, function() { });    3000ms delay and AFTER the slide is changed fires the function

The last line is great when combined with GOTO controls. Because all the controls are external, you need to change the &quot;active&quot; control to the proper one. Again a bit of jQuery will do the trick:

	GreatSlider.startTimer( 5000, function() {
			jQuery( "#featured_slider ul.controls li" ).removeClass( "active" );
			jQuery( "#featured_slider ul.controls li:nth-child(" + featuredSlider["currentSlide"] + ")" ).addClass( "active");
	});
	
If you want to pause on HOVER, there's no pause, BUT there's .stop() so you can do:

	jQuery( "#featured_slider" ).hover( 
		function() { 
			featuredSlider.stopTimer();
		}, 
		function() {
			featuredSlider.startTimer( 5000 );
		}
	);
