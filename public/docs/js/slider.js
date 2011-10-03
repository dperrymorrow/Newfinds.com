var Slider = function(){
	
	this.stepAmount = 690;
	this.position = 0;
	
	this.build = function(){
		
		var loc = this;
		
		
		
		this.container = $( '.nest', '#gallery' );
		this.numImgs = this.container.find( '.image' ).length;
		this.controls = $( '#galleryControls' );
		this.controls.find( '.thumbLink' ).first().addClass( 'active' );
		
		this.controls.find( '.thumbLink' ).click( function(){
			
			loc.position = $( this ).index();
			loc.update(  );
			
		});

		
		if( this.numImgs == 1 ){
			this.controls.find( '.thumbLink' ).hide();
		}
		
		this.container.click( function(){
			loc.position ++;
			loc.update( );
		});
		
	}
	
	
	this.update = function(){
		var loc = this;
		
		if( this.position > this.numImgs -1 ){
			this.position = 0;
		}
		
		this.controls.find( '.thumbLink' ).removeClass( 'active' );
		$(this.controls.find( '.thumbLink' ).get( this.position )).addClass( 'active' );
		this.container.animate( {'left': -loc.stepAmount*loc.position + 'px'}, 200  );
		
	}
	
	
	this.build();
}