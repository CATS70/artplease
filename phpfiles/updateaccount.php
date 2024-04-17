<?php
//load httpresponse code
require_once "httpresponsecode.php";

//Get login
session_name('APN');
session_start();
$userLogin=$_SESSION['login'];
session_write_close();

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];
$users_dir = $ini_array['users_dir'];

//Get the fields from the post

extract($_POST);
$fields = array(
						'email' => $email1,
						'fname' => $fnameinput,
						'lname' => $lnameinput,
						'galleryname' =>$galnameinput,
						'street1' => $street1input,
						'street2' => $street2input,
						'city' => $cityinput,
						'type' => $selectnativeAreU,
						'country' => $country,
						'zipcode' => $zipcodeinput,
						'state' => $state,
						'urlsite' => $url1,
						'telnumber' => $telinput,
						'login' => $userLogin
				);

//turn empty fields on null
foreach($fields as $key=>$value) { 
	$var=trim($value);
	if (empty($var)) 
	{
			$fields[$key]="null";
	}
}
//jSON String for request
$json_string=http_build_query($fields);

// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/updateaccount.json";
 
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

if ($http_status=='200') 
{
	header(HTTPStatus($http_status)['error']);
	echo true;
}
else
{
	header(HTTPStatus($http_status)['error']);
	echo "$result";
}

?>