function getGoogleIds(){
	
	$.getJSON("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+$('#latitudeid').text()+","+$('#longitudeid').text(),
	{ 
	radius:1000,
	types:"art_gallery",
	sensor:false,
	key:apiKey
	},function(data){retrieveGalleriesData(data);});
}