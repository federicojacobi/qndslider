jQuery("document").ready( function() {

	function Slider( id ) {
		this.delay = 500;
		this.slides = jQuery( id ).children(".slide");
		this.slides.hide();
		this.slides.first().show();
		this.currentSlide = 1;
		this.timer = null;
		this.doBefore = null;
		this.doAfter = null;
		
		this.next = function() {
			if ( this.slides.length < 2 ) return false;
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
			if ( this.slides.length < 2 ) return false;
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
			if ( n > this.slides.length || n < 1 )	return;
			if ( stop !== false )
				this.stopTimer();
				
			var oldSlide = this.getSlide( this.currentSlide );
			this.currentSlide = n;
			var newSlide = this.getSlide( this.currentSlide );
			this.switch( oldSlide, newSlide );
		};
		
		this.switch = function( from, to ) {
			var obj = this;
			if ( typeof this.doBefore === 'function' )
				this.doBefore( from );
			jQuery( from )
				.fadeOut( this.delay, function() {
					jQuery( to ).fadeIn( obj.delay ).addClass("active");
				        if ( typeof obj.doAfter === 'function' )
						obj.doAfter( to );
				})
				.removeClass("active");
		};
		
		this.startTimer = function( t, callback ) {
			var obj = this;
			if ( this.timer != null ) {
				this.stopTimer();
			}
			if ( t < 500 || t == null ) t = 500;
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
	}
	
	// All your mods/code goes here ... including the creation of the slider as in var mySlider = new Slider('#mySlider');
});
