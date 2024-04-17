<!DOCTYPE html>
<html>
<head>
	<title>Page Title</title>

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="stylesheet" href="css/themes/default/jquery.mobile-1.3.1.min.css" />
	<link rel='stylesheet' id='camera-css'  href='css/camera_with_no_loader.css' type='text/css' media='all'> <!--j'ai changÃ© la css pour supprimer le loader à l'ouverture-->

	<script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
	<!-- <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script> -->
	<script type="text/javascript" src="js/mobile-utils-1.0-light.js"></script>
	<script type="text/javascript" src="js/jquery.mobile-1.3.1.min.js"></script>
	<script type='text/javascript' src='js/jquery.easing.1.3.js'></script>
	<script type='text/javascript' src='js/camera.min.mod.js'></script>	
</head>
<body>


<div data-role="page" id="martPlaceDetails" data-dom-cache="true">

	<div id="headerpage" data-role="header" data-position="fixed" style="overflow:hidden;">
		<div class="ui-grid-solo" id="headerline">
			<div class="ui-block-a" align="center"><img id="headerimg" src="img/logo.png"  class="responsiveimg"></div>
		</div>
		
		<a href="#" data-icon="info" data-iconpos="notext">help</a>

		<div data-role="navbar">
			<ul>
				<li><a href="#"  data-icon="gear" data-transition="flip">Settings</a></li>
				<li><a href="#" data-icon="search" data-transition="flip">Search</a></li>
				<li><a href="#"  data-icon="bars" class="ui-btn-active ui-state-persist" data-transition="flip">Art nearby</a></li>
				<li><a href="#"  data-icon="star" data-transition="flip">Events</a></li>
			</ul>
		</div><!-- /navbar -->

	</div><!-- /header -->


	
	<div data-role="content">
		<div id="back_to_list">
			 <a href="#" data-role="button" data-icon="back">Back to list</a>
		</div><!-- #back_to_list -->

		<div style="font-weight: bold;font-size: larger;text-align: center;" id="artPlaceName">Nom Galerie</div>

		<div id="artPlaceTel"  style="text-align:center;font-size: small;">&#9742; No tel. # avail. </div>
		<div id="artPlaceUrl"  style="text-align:center;font-size: small;">&#9729; No url avail.</div>

		<br>
		<div data-role="navbar">
			<ul>
				<li><a href="#"  data-icon="arrow-r" id="diridup">Directions</a></li>
				<li><a href="mgaleriesslideshow.html"  data-icon="star" id="ssidup">Slideshow</a></li>
			</ul>
		</div><!-- /navbar -->		
		<br>

		<div>
			<img src="img/logoico.png" id="imgGal1" style="float:right;max-width: 100%; width: auto;height: auto;-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;box-sizing: border-box"/>
			<div id="descArtPlace">
	<!-- 			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus magna quis risus gravida vitae aliquam libero interdum. Quisque eleifend lobortis sapien et rutrum. Vestibulum dictum ipsum a turpis mollis molestie. Aliquam a nulla eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ipsum nulla, eget tempus justo. Nullam diam arcu, scelerisque et molestie vitae, iaculis in leo. Nulla vitae magna elit, et tincidunt arcu.
				Ut eget porta justo. Sed tincidunt nibh at lacus porttitor vel fringilla neque iaculis. Praesent faucibus turpis sit amet enim commodo in luctus justo mollis. Praesent tellus ante, dictum vitae fringilla sagittis, facilisis id mauris. Donec vehicula nulla eget augue sollicitudin faucibus. Nulla neque quam, pretium id mattis interdum, venenatis aliquet diam. Etiam blandit magna sed libero facilisis lobortis. Integer tincidunt sagittis justo a condimentum. Aliquam gravida lobortis ultrices. Curabitur eu enim mi, vitae tempus enim. Maecenas non augue sit amet velit interdum gravida at tincidunt enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
				</p> -->
			</div>
			<img src="img/logoico.png" id="imgGal2" style="float:left;max-width: 100%; width: auto;height: auto;-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;box-sizing: border-box"/>
		</div>
		<br>
		<div data-role="navbar">
			<ul>
				<li><a href="#"  data-icon="arrow-r" id="diriddown">Directions</a></li>
				<li><a href="mgaleriesslideshow.html"  data-icon="star" id="ssiddown">Slideshow</a></li>
			</ul>
		</div><!-- /navbar -->


	</div><!-- /content -->
	<div id="footerpage" data-role="footer" data-position="fixed">
		<h4>Advertisement</h4>
	</div><!-- /footer -->
</div><!-- /page -->
</body>
</html>