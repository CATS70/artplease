<?php
//load httpresponse code

require_once "httpresponsecode.php";
require_once 'ppeg/functions.php';

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];	

//Get the hashcode from the post
session_name('APN');
session_start();

$hashcode = $_SESSION['hashcode'];
$cart=$_SESSION['cart'];

//Paypal process payment
$paypal = initPurchaseDetails(json_decode($cart, true));
$response = $paypal->process_payment();	

// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/confirmtransaction.json";
 
// jSON String for request
$json_string = "hashcode=$hashcode&transactionid=".$response['PAYMENTINFO_0_TRANSACTIONID'];

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

//Delete the hash code

unset($_SESSION['hashcode']);
session_write_close();

if ($http_status=='200') 
{
	header(HTTPStatus($http_status)['error']);
	echo json_encode($response);
}
else
{
	header(HTTPStatus($http_status)['error']);
	echo $result;
}


?>