<?php
//load httpresponse code

require_once "httpresponsecode.php";

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];	

//Get the login and the cart from the post
session_name('APN');
session_start();

$login = $_SESSION['login'];
$cart = $_POST['cart'];


// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/createtransaction.json";
 
// jSON String for request
$json_string = "login=$login&cart=$cart";

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
$hashcode = curl_exec($ch); // Getting jSON result string
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);	

if ($http_status=="200")
{
	//Store the hash code for future use
	$_SESSION['hashcode'] = str_replace('"','',$hashcode);
	$_SESSION['cart'] = $cart;
	session_write_close();
}
else
{
	//Store error in SESSION
	$_SESSION['hashcode'] = "error";
	$_SESSION['cart'] = "error";
	session_write_close();
}
header(HTTPStatus($http_status)['error']);
echo $hashcode

?>