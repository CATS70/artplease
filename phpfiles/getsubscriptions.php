<?php
	//load httpresponse code and fsubscriptions function
	
	require_once "httpresponsecode.php";
	require_once "fgetsubscriptions.php";

	//Get the login from the post
	$login = $_POST['login'];

	//Check login consistency
	session_name('APN');
	session_start();	
	if ($login!=$_SESSION['login'])
	{
		session_write_close();
		return "{'errors':'".HTTPStatus(417)['code']."','message':'".HTTPStatus(417)['error']." - Login inconsistency!'}";
	}
	else
	{	
		//call getUserSubscriptions function
		session_write_close();
		$result = getUserSubscriptions($login);
		// error_log($result);
		//echo json_encode($result, JSON_FORCE_OBJECT);
		echo json_encode(array_merge(json_decode('{"userType":"0"}',true),json_decode($result,true)));
	}
?>