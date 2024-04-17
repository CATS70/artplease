
		$(document).ready(function() {
			alert('toto');
			jQuery(function(){ //cette fonction crÃ©e le slideshow Ã  l'aide du plugin camera
				
				jQuery('#camera_wrap_1').camera({
					height: '35%',
					thumbnails: false,
					loader: 'none',
					portrait: true,
					time : 3000
					
				});

			});
		});