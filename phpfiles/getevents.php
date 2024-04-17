<?php
function clean($elem)
{
    if(!is_array($elem))
        $elem = htmlentities($elem,ENT_QUOTES,"UTF-8");
    else
        foreach ($elem as $key => $value)
			$elem[$key] = clean($value);

    return $elem;
}


//load httpresponse code
require_once "httpresponsecode.php";

//Get login
/*session_name('APN');
session_start();
$userLogin=$_SESSION['login'];
session_write_close();*/

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];

//Get posted data
$_CLEAN['POST'] = clean($_POST); 
        foreach ($_CLEAN['POST'] as $key => $value)
		{
			$_CLEAN['POST'][$key]=$key.'='.$value;
            error_log($key.' (): '.$_CLEAN['POST'][$key]);
		}

// jSON URL which should be requested
$json_url = "$api_url/artpleasenearby/getevents.json";
 
// jSON String for request
$json_string = implode("&",$_CLEAN['POST']);
error_log($json_string);
 
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