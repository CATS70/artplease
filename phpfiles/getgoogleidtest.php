<?php
//load httpresponse code
require_once "httpresponsecode.php";

//get latitude and longitude
// $latitude=$_GET['lat'];
// $longitude=$_GET['long'];

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['google_place_url'];
$api_key  = $ini_array['google_api_key'];


// jSON URL which should be requested
// $location = urlencode("43.3420764,3.2126435999999785");
// $json_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$location."&radius=1000&types=art_gallery&sensor=false&key=AIzaSyA51Su8K06kRq12OSHP_nR1WcEZTy4CMj8";//"$api_url/json?location=".$latitude.",".$longitude."&radius=1000&types=art_gallery&sensor=false&key=".$api_key;
 $json_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.3420764,3.2126435999999785&radius=1000&types=art_gallery&sensor=false&key=AIzaSyA51Su8K06kRq12OSHP_nR1WcEZTy4CMj8";//"$api_url/json?location=".$latitude.",".$longitude."&radius=1000&types=art_gallery&sensor=false&key=".$api_key;
 
// Initializing curl
$ch = curl_init($json_url);
 
// Setting curl options
// curl_setopt($ch, CURLOPT_URL, $json_url);
// curl_setopt($ch, CURLOPT_HEADER, false);
// curl_setopt($ch, CURLOPT_ENCODING, "");
// curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt ($ch, CURLOPT_CAINFO, $_SERVER['DOCUMENT_ROOT']."/phpfiles/cert/cacert.pem");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
 
		// Getting results
		$result = curl_exec($ch); // Getting jSON result string
		error_log(curl_error($ch));
		error_log($result);
		$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		error_log($http_status);
		curl_close($ch);

		if ($http_status=='200')
		{
			//echo json_encode(array_merge(json_decode($result,true),$files));
			echo $result;
		}
		else
		{
			//header(HTTPStatus($http_status)['error']);
			echo $result;
		}

?>