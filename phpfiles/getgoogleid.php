<?php
//load httpresponse code
require_once "httpresponsecode.php";

//get latitude and longitude
$latitude=$_POST['lat'];
$longitude=$_POST['longi'];

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];
$google_api_url = $ini_array['google_place_url'];
$google_api_key  = $ini_array['google_api_key'];

// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/getgoogleplacedata.json?lat=$latitude&long=$longitude&radius=1000&sensor=false&types=art_gallery&key=$google_api_key&api_url=$google_api_url";
 
// jSON String for request
// $json_string = "?lat=$latitude&long=$longitude&radius=1000&sensor=false&types=art_gallery&key=$google_api_key&api_url=$google_api_url";
 
// Initializing curl
$ch = curl_init( $json_url );
 
// Setting curl options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_USERPWD, "$api_user:$api_key");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_DIGEST);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
// curl_setopt($ch, CURLOPT_POSTFIELDS, $json_string);
 
// Getting results
$result = curl_exec($ch); // Getting jSON result string
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if ($http_status=='200')
{
	/*$aResult = json_decode($result,true);
	$aSubscriptions = json_decode($subscriptions,true);
	$aAll = array_merge(json_decode($result,true),json_decode($subscriptions,true));
	ob_start();
	var_dump($aResult);
	$res=ob_get_contents();

	ob_clean();
	var_dump($aSubscriptions);
	$sub = ob_get_contents();

	ob_clean();
	var_dump($aAll);
	$all = ob_get_contents();

	ob_end_clean();
	error_log($res);
	error_log($sub);
	error_log($all);
	//error_log("result : ".$aResult);
	//error_log("subs : ".$aSubscriptions);*/
	//error_log(json_encode(array_merge(json_decode($result,true),$files)));


	//echo json_encode(array_merge(json_decode($result,true),json_decode($subscriptions,true)));
	header(HTTPStatus($http_status)['error']);

	// echo json_encode(array_merge(json_decode($result,true),$files));
	//error_log($result);
	echo $result;
}
else
{
	header(HTTPStatus($http_status)['error']);
	echo "$result";
}

?>