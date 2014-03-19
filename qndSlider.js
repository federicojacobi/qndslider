jQuery("document").ready( function() {

	function Slider( id ) {
		this.delay = 500;
		this.slides = jQuery( id ).children(".slide");
		this.slides.hide();
		this.slides.first().show();
		this.currentSlide = 1;
		this.timer = null;
		
		this.next = function() {
			if ( this.slides.length < 2 ) return false;
			var oldSlide = this.getSlide( this.currentSlide );
			
			if ( this.currentSlide + 1 > this.slides.length ) {
				this.currentSlide = 1;
			} else {
				this.currentSlide++;
			}
			var newSlide = this.getSlide( this.currentSlide );
			
			jQuery( oldSlide )
				.fadeOut( this.delay, function() {
					jQuery( newSlide ).fadeIn( this.delay ).addClass("active");
				})
				.removeClass("active");
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
			
			jQuery( oldSlide )
				.fadeOut( this.delay, function() {
					jQuery( newSlide ).fadeIn( this.delay ).addClass("active");
				})
				.removeClass("active");
		};
		
		this.goto = function( n, stop ) {
			if ( n > this.slides.length || n < 1 )	return;
			if ( stop !== false )
				this.stopTimer();
				
			var oldSlide = this.getSlide( this.currentSlide );
			this.currentSlide = n;
			var newSlide = this.getSlide( this.currentSlide );
			
			jQuery( oldSlide )
				.fadeOut( this.delay, function() {
					jQuery( newSlide ).fadeIn( this.delay ).addClass("active");
				})
				.removeClass("active");
		};
		
		this.startTimer = function( t, callback ) {
			var obj = this;
			if ( this.timer != null ) {
				this.stopTimer();
			}
			if ( t < 500 ) t = 500;
			this.timer = setInterval( 
				function() {
					obj.next();
					if ( callback != null )
						callback(); 
				} , t);
			return this.timer;
		};
		
		this.stopTimer = function() {
			clearInterval( this.timer );
		}
		
		this.getSlide = function( n ) {
			return this.slides[n-1];
		};
	}
	
	var mySlider = new Slider( "#theSlider" );
	jQuery( "#theSlider .controls .first" ).click( function() { 
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(1);
	});
	jQuery( "#theSlider .controls .second" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(2);
	});
	jQuery( "#theSlider .controls .third" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(3);
	});
	jQuery( "#theSlider .controls .forth" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(4);
	});
	jQuery( "#theSlider .controls .fifth" ).click( function() {
		jQuery(this).addClass( "active").siblings().removeClass( "active" );
		awardSlider.goto(5);
	});
	awardSlider.startTimer( 3000, function() {
			jQuery( "#theSlider .controls span" ).removeClass( "active" );
			jQuery( "#theSlider .controls span:nth-child(" + awardSlider["currentSlide"] + ")" ).addClass( "active");
	});

	var slider = new Slider( "#theSlider2" );			
	jQuery( "#slider .larrow" ).click( function() {
		slider.prev();
	});
	
	jQuery( "#slider .rarrow" ).click( function() {
		slider.next();
	});
});
