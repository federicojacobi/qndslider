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
