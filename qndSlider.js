jQuery(document).ready( function() {

	function Slider( id ) {
		
		this.init = function() {
			this.slides.hide();
			this.slides.first().show();
			this.ready = true;
		};
		
		this.next = function() {
			if ( this.slides.length < 2 || ! this.ready ) return false;
			var oldSlide = this.getSlide( this.currentSlide );
			
			if ( this.currentSlide + 1 > this.slides.length ) {
				this.currentSlide = 1;
			} else {
				this.currentSlide++;
			}
			var newSlide = this.getSlide( this.currentSlide );
			this.switch( oldSlide, newSlide );
		};
		
		this.prev = function() {
			if ( this.slides.length < 2 || ! this.ready ) return false;
			var oldSlide = this.getSlide( this.currentSlide );
			
			if ( this.currentSlide - 1 < 1 ) {
				this.currentSlide = this.slides.length;
			} else {
				this.currentSlide--;
			}
			var newSlide = this.getSlide( this.currentSlide );
			this.switch( oldSlide, newSlide );
		};
		
		this.goto = function( n, stop ) {
			if ( this.ready ) {
				if ( n > this.slides.length || n < 1 || ! this.ready )	return;
				if ( stop !== false )
					this.stopTimer();
					
				var oldSlide = this.getSlide( this.currentSlide );
				this.currentSlide = n;
				var newSlide = this.getSlide( this.currentSlide );
				this.switch( oldSlide, newSlide );
			}
		};
		
		this.switch = function( from, to ) {
			var obj = this;
			var keepGoing = true;
			
			if ( typeof this.doBefore === 'function' )
				keepGoing = this.doBefore( from );
			
			if ( keepGoing !== false ) {
					this.ready = false;
					jQuery( from )
						.fadeOut( this.delay, function() {
							jQuery( to ).fadeIn( obj.delay, function() { obj.ready = true;} ).addClass("active");
							if ( typeof obj.doAfter === 'function' )
								obj.doAfter( to );
						})
						.removeClass("active");
			}
		};
		
		this.startTimer = function( t, callback ) {
			var obj = this;
			if ( this.timer != null ) {
				this.stopTimer();
			}
			if ( t == null )
				t = this.timerWait;
			else {
				if ( t < 125 ) t = this.timerWait;
			}
			this.timerWait = t;
			
			this.timer = setInterval( 
				function() {
					obj.next();
					if ( typeof callback === 'function' )
						callback(); 
				} , t);
			return this.timer;
		};
		
		this.stopTimer = function() {
			clearInterval( this.timer );
		};
		
		this.getSlide = function( n ) {
			return this.slides[n-1];
		};
		
		this.slides = jQuery( id ).children(".slide");
		
		this.delay = 500;
		this.currentSlide = 1;
		
		this.timer = null;
		this.timerWait = 1000;
		
		this.doBefore = null;
		this.doAfter = null;
		this.ready = false;
		
		this.init();
	}
	
	// All your mods/code goes here ... including the creation of the slider as in var mySlider = new Slider('#mySlider');
});
