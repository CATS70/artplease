<?php
//load httpresponse code
require_once "httpresponsecode.php";

//Check login consistency
$userLogin=$_POST['login'];
session_name('APN');
session_start();
if ($userLogin!=$_SESSION['login'])
{
	session_write_close();
	header(HTTPStatus($http_status)['error']);
	return "{'errors':'".HTTPStatus($num)['code']."','message':'".HTTPStatus($num)['error']." - Login inconsistency!'}";
}
session_write_close();

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];
$users_dir = $ini_array['users_dir'];

// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/getgallerydata.json";
 
// jSON String for request
$json_string = "login=$userLogin";
 
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
	// get gallery and slideshow files
	if ($handle = opendir($_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin)) {

		while (false !== ($entry = readdir($handle))) {
			if ($entry != "." && $entry != "..") {
				$files[]=$users_dir."/".$userLogin."/".$entry;
			}
			
		}
		
		if (false==isset($files)) $files[]="No files";
		closedir($handle);
	}	

	header(HTTPStatus($http_status)['error']);
	echo json_encode(array_merge(json_decode($result,true),$files));
	
}
else
{
	header(HTTPStatus($http_status)['error']);
	echo "$result";
}

?>