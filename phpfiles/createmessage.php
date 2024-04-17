<?php
//load httpresponse code

require_once "httpresponsecode.php";

//Captcha check
session_name('APN');
session_start();
include_once $_SERVER['DOCUMENT_ROOT'] . '/phpfiles/securimage/securimage.php';
$securimage = new Securimage();
if ($securimage->check($_POST['captcha_code_msg']) == false) {
	//session_write_close();
	header(HTTPStatus(403)['error']);

	echo '{"errors":[{"message":"Security code check failed!"}]}';
}
else
{
	//get the api ini data
	$ini_array = parse_ini_file("ini/artpleasenearby.ini");
	$api_url = $ini_array['api_url'];
	$api_user = $ini_array['api_user'];
	$api_key  = $ini_array['api_key'];	

	//Get the fields from the post

	extract($_POST);
	$fields = array(
							'email' => $emailmsginput,
							'fname' => $fnamemsginput,
							'lname' => $lnamemsginput,
							'scope' =>$scopeselect,
							'subject' => $subjectinput,
							'message' => $messageinput,
					);
						
	// jSON URL which should be requested
	$json_url = "$api_url/artpleasenearby/createmessage.json";
	 
	// jSON String for request
	$json_string=http_build_query($fields);

	// Initializing curl
	$ch = curl_init( $json_url );
		
	// Setting curl options
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json_string);
	 
	// Getting results
	$result = curl_exec($ch); // Getting jSON result string
	$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	curl_close($ch);	

	header(HTTPStatus($http_status)['error']);
	echo $result;
}
?>