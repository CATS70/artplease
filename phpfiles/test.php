<?php
// jSON URL which should be requested
$json_url = "http://maps.google.com/staticmap?
center=50.6797307,3.2481878&zoom=14&size=442x512&maptype=satellite
&markers=
50.6833328,3.2303452,bluea|
50.6895660,3.2363319,greenb|
50.68274414,3.2511914,redc|
50.6800085,3.2478440,yellowd
&sensor=false&key=AIzaSyA51Su8K06kRq12OSHP_nR1WcEZTy4CMj8";
 
// jSON String for request
// $json_string = "?lat=$latitude&long=$longitude&radius=1000&sensor=false&types=art_gallery&key=$google_api_key&api_url=$google_api_url";
 
// Initializing curl
$ch = curl_init( $json_url );
 
// Setting curl options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_USERPWD, "$api_user:$api_key");
//curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_DIGEST);
//curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));

$result = curl_exec($ch); // Getting jSON result string
// Getting results
return imagecreatefromstring($result);


?>