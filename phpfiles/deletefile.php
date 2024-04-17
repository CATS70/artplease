<?php
//load httpresponse code
require_once "httpresponsecode.php";

//Get posted data
$filetodelete=$_GET['id'];

session_name('APN');
session_start();
$userLogin=$_SESSION['login'];
session_write_close();

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$users_dir = $ini_array['users_dir'];
$trash_dir = $ini_array['trash_dir'];

switch ($filetodelete) {
    case "input-galphoto1":
		$filename = "/gal_photo1*.*";
        break;
    case "input-galphoto2":
		$filename = "/gal_photo2*.*";
        break;
    case "slidephoto1form":
		$filename = "/ssw_photo1*.*";
        break;
    case "slidephoto2form":
		$filename = "/ssw_photo2*.*";
        break;
    case "slidephoto3form":
		$filename = "/ssw_photo3*.*";
        break;
}

$photodir =$_SERVER['DOCUMENT_ROOT'].$users_dir."/". $userLogin;
$tab_photo=glob($photodir.$filename);

if ($tab_photo && 0!=count($tab_photo))
{
	foreach ($tab_photo as $namefile)
	{
		$move_result = rename($_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin."/".basename($namefile),$_SERVER['DOCUMENT_ROOT'].$trash_dir."/".basename($namefile));
		if ($move_result == false)
		{
			header(HTTPStatus(403)['error']);
			header('Location: http://'.$_SERVER['SERVER_NAME'].'/errimagenotdeleted.html');	
		}
		else
		{
			header('Location: http://'.$_SERVER['SERVER_NAME'].'/myworkspace.html');
		}					
	}
}

?>