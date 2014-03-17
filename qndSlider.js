jQuery("document").ready( function() {

	function Slider( id ) {
		this.delay = 500;
		this.slides = jQuery( id ).children(".slide");
		this.currentSlide = 1;
		this.timer = null;
		
		this.next = function() {
			if ( this.slides.length < 2 ) return false;
			jQuery( this.getSlide( this.currentSlide ) ).fadeOut( this.delay ).removeClass("active");
			if ( this.currentSlide + 1 > this.slides.length ) {
				this.currentSlide = 1;
			} else {
				this.currentSlide++;
			}
			jQuery( this.getSlide( this.currentSlide ) ).fadeIn( this.delay ).addClass("active");
		};
		
		this.prev = function() {
			if ( this.slides.length < 2 ) return false;
			jQuery( this.getSlide( this.currentSlide ) ).fadeOut( this.delay ).removeClass("active");
			if ( this.currentSlide - 1 < 1 ) {
				this.currentSlide = this.slides.length;
			} else {
				this.currentSlide--;
			}
			jQuery( this.getSlide( this.currentSlide ) ).fadeIn( this.delay ).addClass("active");;
		};
		
		this.goto = function( n, stop ) {
			if ( n > this.slides.length || n < 1 )	return;
			if ( stop !== false )
				this.stopTimer();
			
			jQuery( this.getSlide( this.currentSlide ) ).fadeOut( this.delay ).removeClass("active");
			this.currentSlide = n;
			jQuery( this.getSlide( this.currentSlide ) ).fadeIn( this.delay ).addClass("active");
		};
		
		this.startTimer = function( t, callback ) {
			var obj = this;
			if ( this.timer == null ) {
				if ( t < 500 ) t = 500;
				this.timer = setInterval( function() {obj.next(); callback(); } , t);
			}
		};
		
		this.stopTimer = function() {
			clearInterval( this.timer );
		}
		
		this.getSlide = function( n ) {
			return this.slides[n-1];
		};
	}

	var awardSlider = new Slider( "#awards" );
	jQuery( "#awards .controls .first" ).click( function() { 
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(1);
	});
	jQuery( "#awards .controls .second" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(2);
	});
	jQuery( "#awards .controls .third" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(3);
	});
	jQuery( "#awards .controls .forth" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(4);
	});
	jQuery( "#awards .controls .fifth" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(5);
	});
	awardSlider.startTimer( 3000, function() {
			jQuery( "#awards .controls span" ).removeClass( "active" );
			jQuery( "#awards .controls span:nth-child(" + awardSlider["currentSlide"] + ")" ).addClass( "active");
	});

	var slider = new Slider( "#slider" );			
	jQuery( "#slider .larrow" ).click( function() {
		slider.prev();
	});
	
	jQuery( "#slider .rarrow" ).click( function() {
		slider.next();
	});
});