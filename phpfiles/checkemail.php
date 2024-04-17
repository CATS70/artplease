<?php
//load httpresponse code
require_once "httpresponsecode.php";

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];

//Get the login and email from the post
$email = $_POST['email1'];
$login = $_POST['login'];


if (isset($_POST['inverse'])) 
{
	$inverse = $_POST['inverse'];
}
else
{
	$inverse = 1;
}
// error_log('val : '.$inverse);
// error_log('val post : '.$_POST['inverse']);
// error_log(' val isset : '.isset($_POST['inverse']));
// error_log('val empty : '.empty($_POST['inverse']));
// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/checkemail.json";
 

// jSON String for request
$json_string = "emailaddress=$email&login=$login&inverse=$inverse";
 
// Initializing curl
$ch = curl_init( $json_url );
 
// Setting curl options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_USERPWD, "$api_user:$api_key");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_DIGEST);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_string);
 
// Getting results
$result = curl_exec($ch); // Getting jSON result string
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

header(HTTPStatus($http_status)['error']);
echo "$result";
?>