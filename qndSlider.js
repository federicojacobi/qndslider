class Slider {
	constructor( id ) {
		this.container = document.getElementById( id );
		this.slides = this.container.querySelectorAll( '.slide' );
	
		this.delay = 250;
		this.currentSlide = 0;
		
		this.timer = null;
		
		this.slides.forEach( ( slide, index ) => {
			if ( index > 0 ) {
				slide.style.display = 'none';
				slide.style.opacity = 0;
			}
		} );

		this.ready = true;

		this._events = {};
	}

	on( name, listener ) {
		if ( ! this._events[ name ] ) {
			this._events[ name ] = [];
		}

		this._events[ name ].push( listener );
	}

	off( name, listener ) {
		this._events[ name ] = this._events[name].filter( l => l !== listener );
	}

	trigger( name, data ) {
		if ( this._events[ name ] ) {
			this._events[ name ].forEach( callback => { callback( data ) } );
		}
	}
	
	next() {
		if ( ! this.ready || 0 === this.slides.length ) {
			return false;
		}

		var oldSlide = this.slides[ this.currentSlide ];
		
		if ( this.currentSlide === this.slides.length - 1 ) {
			this.currentSlide = 0;
		} else {
			this.currentSlide++;
		}

		this.switch( oldSlide, this.slides[ this.currentSlide ] );
	}
	
	prev() {
		if ( ! this.ready || 0 === this.slides.length ) {
			return false;
		}

		var oldSlide = this.slides[ this.currentSlide ];
		
		if ( 0 === this.currentSlide ) {
			this.currentSlide = this.slides.length - 1;
		} else {
			this.currentSlide--;
		}

		this.switch( oldSlide, this.slides[ this.currentSlide ] );
	}
	
	goto( n, stop ) {
		if ( this.ready ) {
			if ( n >= this.slides.length || n < 0 || ! this.ready ) {
				return;
			}

			if ( stop !== false ) {
				this.stopTimer();
			}
				
			var oldSlide = this.slides[ this.currentSlide ];
			this.currentSlide = n;
			var newSlide = this.slides[ this.currentSlide ];
			this.switch( oldSlide, newSlide );
		}
	}
	
	animate( options ) {
		if ( ! options.el ) {
			return;
		}

		let lerp = ( start, end, amt ) => ( 1 - amt ) * start + amt * end;
		let clamp = ( num, a, b ) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

		let initialOpacity = window.getComputedStyle( options.el ).opacity;
		let targetOpacity = options.targetOpacity;

		let length = options.time || 250;

		let startTime = performance.now();
		let animation = ( time ) => {
			let elapsed = time - startTime;
			let pct = clamp( elapsed / length, 0, 1 );
			
			options.el.style.opacity = lerp( initialOpacity, targetOpacity, pct );

			if ( elapsed < length ) {
				window.requestAnimationFrame( animation );
			} else {
				if ( options.callback ) {
					options.callback();
				}
			}
		}
		window.requestAnimationFrame( animation );
	}

	switch( from, to ) {
		this.trigger( 'beforeSlideChange', from );
		
		this.ready = false;
		this.animate( {
			el: from,
			targetOpacity: 0,	// fadeOut
			time: this.delay,
			callback: () => {
				from.style.display = 'none';
				from.classList.remove( 'active' );
				to.style.display = 'block';
				to.style.opacity = 0;

				this.animate( {
					el: to,
					targetOpacity: 1,	// fadeIn
					callback: () => {
						to.classList.add( 'active' );
						this.ready = true;
						this.trigger( 'afterSlideChange', to );
					}
				} );
			}
		} );
	}
	
	startTimer( t = 3000, callback = null ) {
		if ( this.timer != null ) {
			this.stopTimer();
		}

		if ( t < 125 ) {
			t = 125;
		}
		
		this.timer = setInterval(
			() => {
				this.next();
				if ( null !== callback ) {
					callback();
				} 
			}, t );

		return this.timer;
	}
	
	stopTimer() {
		clearInterval( this.timer );
	}
}
