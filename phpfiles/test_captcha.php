<?php
	//load httpresponse code
	require_once "httpresponsecode.php";

	//Captcha check
	session_name('APN');
	session_start();
	include_once $_SERVER['DOCUMENT_ROOT'] . '/phpfiles/securimage/securimage.php';
	$securimage = new Securimage();
	if ($securimage->check($_POST['captcha_code']) == false) {
	header(HTTPStatus(403)['error']);
	echo "{'message':'Security code check failed!'}";
	}
	else
	{
		echo "ok";
	}
	session_write_close();
	
	
?>