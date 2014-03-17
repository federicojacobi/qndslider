qndslider
=========

Quick and Dirty Slider - Developer friendly.

This is NOT a jQuery plugin, but it uses jQuery (who doesn't nowadays).

The whole purpose is to cut the bloat and do a quick slider with fade in, fade out.

NEXT / PREV arrows are optional and are not built by the slider, giving you control over how they work, but available via .next() and .prev() methods.

In the same fashion if you need to show a specific slide just do .goto(4) to show the 4th slide.

HOW TO
======

Easiest thing in the world:

In HTML:

<div id="yourName">
  <div class="slide">First slide, do whatever you want here</div>
  <div class="slide">Second slide</div>
  <div class="slide">Third slide</div>
  <div class="slide">Fourth slide</div>
</div>

OR you can do:

<ul id="mySlider">
  <li class="slide"></li>
  <li class="slide"></li>
</ul>

Then in JS

var GreatSlider = new Slider( "yourName" );  // you can use a jQuery selector as a parameter as in "body .content > div" or whatever
var anotherSlider = new Slider( "mySlider" );

Notice the lack of CSS ... that's on purpose so you can do your own, and understand it !!!
