$( document ).ready(function(){

	var site = new Newfinds();

});


function Newfinds(){

	this.nav = $( '#mainNav' );
	this.header = $( '#header' );

	this.build = function(){
		
		/*
		this.header.css( 'opacity', 0.5 );
		this.header.mouseover( function(){
			$( this ).fadeTo( 200, 1 );
		});
		this.header.mouseout( function(){
			$( this ).fadeTo( 200, 0.5 );
		});
		*/
		$( 'li','.projects').last().css( 'border-bottom', 'none' );		
		this.setupNav();

		this.setupHighlighting();


		$( '.projects li:odd').addClass( 'odd' );


		
		
		
		$( '.contentCell p a:not(.jsLink)' ).attr( 'target', '_blank' );
	}
	
	
	this.setupHighlighting = function(){
		
		var keys = ['[php]','[css]','[javascript]','[html]','[bash]'];
		
		for (var i=0; i < keys.length; i++) {
			var key = keys[i];
			
			$("code:contains('"+key+"')").each( function(){
				var className = key.replace( '[', '' ).replace( ']', '' );
				var text = $( this ).text().replace( key + "\n", '' );
				$( this ).text( text );
				$( this ).addClass( className );
			});
			
		};
		/*
		$( 'pre' ).parent().css( 'position', 'relative' );
		
		$( 'pre' ).click( function(){
			$( this ).css( 'position', 'absolute' ).width( '100%' );
		});
		
		$( 'pre' ).mouseover( function(){
			$( this ).css( 'position', 'normal' ).css( 'overflow', 'auto' ).width( 400 );
		});
		*/
		
		if( $( '#gallery' ).length != 0 ){
			var gallery = new Slider();
		}
		
		$( 'p:empty' ).remove();
		
		hljs.initHighlightingOnLoad();
	}



	this.setupNav = function(){
		//this.nav.find( 'li' ).first().css( 'margin-top', '-15px' );
		//this.nav.find( 'a' ).first().css( 'border-top', 'none' );
		//this.nav.find( 'a' ).last().css( 'border-bottom', 'none' );
		
		
		this.nav.find( 'a' ).each( function(){
			
			var isActive = false;
			
			if( $( this ).hasClass( 'active') == false ){
				var sub = $( this ).parent().find( 'ol' );
				if( sub.length != 0 ){
					
					sub.find( 'a' ).each( function(){
						if( $( this ).hasClass( 'active' ) ){
							isActive = true;
						}
					});
					
					if( isActive == false ){
						sub.hide( );
					}
				}
				
				if( isActive == true ){
					$( this ).addClass( 'active' );
				}
			}
		});
			
		
		
	}

	this.build();

}