<?php
//load httpresponse code
require_once "httpresponsecode.php";

//Get posted data
extract($_POST);
$fields = array(
						'comment' => $slidephotocomment,
						'oldcomment' => $oldslidephotocomment,
						//'noGalData' => $noGalData,
						'flagphoto' => $flagphoto
				);

				session_name('APN');
session_start();
$userLogin=$_SESSION['login'];
session_write_close();

$idPhotoSS = 0;
$todo = 0;

//switch ($flagphoto) {
switch ($fields['flagphoto']) {
    case "galphoto1":
		$newFileName = "gal_photo1_".$userLogin."_".microtime(true);
        break;
    case "galphoto2":
		$newFileName = "gal_photo2_".$userLogin."_".microtime(true);
        break;
    case "slidephoto1":
		$newFileName = "ssw_photo1_".$userLogin."_".microtime(true);
		$idPhotoSS = 1;
        break;
    case "slidephoto2":
		$newFileName = "ssw_photo2_".$userLogin."_".microtime(true);
		$idPhotoSS = 2;
        break;
    case "slidephoto3":
		$newFileName = "ssw_photo3_".$userLogin."_".microtime(true);
		$idPhotoSS = 3;
        break;
}

//Complete param array to send to api
$fields['login'] = $userLogin;
$fields['idphotoss'] = $idPhotoSS;



//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$users_dir = $ini_array['users_dir'];
$trash_dir = $ini_array['trash_dir'];
$image_max_size = $ini_array['image_max_size'];
$comment_ss_length = $ini_array['comment_ss_length'];
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];

define ("MAX_SIZE",$image_max_size);
define ("IMAGE_ONLY",1);
define ("COMMENT_ONLY",2);
define ("BOTH_IMAGE_COMMENT",3);

define ("ERR_COMMENT_LENGTH",3);
define ("ERR_SIZE",2);
define ("ERR_TYPE",1);

$errors=0;

// error_log($_FILES['input-'.$flagphoto]['tmp_name']);
// error_log($_FILES['input-'.$flagphoto]['name']);
// error_log($_FILES['input-'.$flagphoto]['type']);
// error_log($_FILES['input-'.$flagphoto]['size']);

///////////////////
//Image checking //
///////////////////

//Check if the file size is over the one permitted by the server
if (empty($_FILES['input-'.$flagphoto]['tmp_name']) && !empty($_FILES['input-'.$flagphoto]['name'])) // 
{
	$errors=2;
}
else
{
	if (!empty($_FILES['input-'.$flagphoto]['tmp_name']) && !empty($_FILES['input-'.$flagphoto]['name']))
	{
		//a file has been sent
		$todo = 1;
		
		//get the extension
		$filename = stripslashes($_FILES['input-'.$flagphoto]['name']);
		$i = strrpos($filename,".");
		if (!$i) 
		{ 
			$extension = ""; 
		}
		else
		{
			$l = strlen($filename) - $i;
			$extension = substr($filename,$i+1,$l);

			$extension = ".".strtolower($extension);	
		}

		//buil new file name

		$newFileName = $newFileName.$extension;

		//Check file type
		$a = getimagesize($_FILES['input-'.$flagphoto]['tmp_name']);
		$image_type = $a[2];

		if (!in_array($image_type , array(IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG)))
		{
			$errors=1;
		}

		//Check file size
		$size=filesize($_FILES['input-'.$flagphoto]['tmp_name']);
		 
		if ($size > MAX_SIZE*1024)
		{
			$errors=2;
		}
	}
}

/////////////////////
//Comment checking //
/////////////////////
	
//Check comment length
//$comment_length = strlen($slidephotocomment);

$comment_length = strlen($fields['comment']);
if ($comment_length>$comment_ss_length)
{
	$errors=3;
}
else
{
	// if (!isempty($slidephotocomment))
	if (!empty($fields['comment']) || (empty($fields['comment']) && !empty($fields['oldcomment'])))
	{
		//a comment has been sent
		$todo = $todo+2;	
	}
}
		

///////////////////
//Error handling //
///////////////////

switch ($errors) {
	case ERR_COMMENT_LENGTH;
		$todo = 0;
		header(HTTPStatus(403)['error']);
		header('Location: http://'.$_SERVER['SERVER_NAME'].'/errcommenttoolong.html');
		break;
    case ERR_SIZE:
		$todo = 0;
		header(HTTPStatus(403)['error']);
		header('Location: http://'.$_SERVER['SERVER_NAME'].'/errfiletoolarge.html');
        break;
    case ERR_TYPE:
		$todo = 0;
		header(HTTPStatus(403)['error']);
		header('Location: http://'.$_SERVER['SERVER_NAME'].'/errnotanimage.html');
        break;
}	

///////////////////////////////
//Image & comment processing //
///////////////////////////////

if ($todo==IMAGE_ONLY || $todo==BOTH_IMAGE_COMMENT)
{
	// move old file to trash
	$file_moved = "";
	if ($handle = opendir($_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin)) {

		while (false !== ($entry = readdir($handle))) {
			if ($entry != "." && $entry != "..") {
				if (substr($newFileName,0,10)==substr($entry,0,10))
				{
					$move_result = rename($_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin."/".$entry,$_SERVER['DOCUMENT_ROOT'].$trash_dir."/".$entry);
					if ($move_result == false)
					{
						header(HTTPStatus(403)['error']);
						header('Location: http://'.$_SERVER['SERVER_NAME'].'/errimagenotmoved1.html');	
					}
					else
					{
						$file_moved = $entry;
					}					
				}
			}
			
		}
		
		closedir($handle);
	}
	
	//Move new file to userdir
	$move_result = move_uploaded_file($_FILES['input-'.$flagphoto]['tmp_name'],$_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin."/".$newFileName);

	if ($move_result == false)
	{
		//Move old file from trash to userdir
		rename($_SERVER['DOCUMENT_ROOT'].$trash_dir."/".$file_moved,$_SERVER['DOCUMENT_ROOT'].$users_dir."/".$userLogin."/".$file_moved);
		header(HTTPStatus(403)['error']);
		header('Location: http://'.$_SERVER['SERVER_NAME'].'/errimagenotmoved2.html');		
	}

}

if ($todo==COMMENT_ONLY || $todo==BOTH_IMAGE_COMMENT)
{
	// jSON URL which should be requested
	$json_url = "$api_url/artpleasenearby/updategalssphotocomment.json";
	 
	// jSON String for request
	$json_string = http_build_query($fields);

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
		//echo true;
		header('Location: http://'.$_SERVER['SERVER_NAME'].'/myworkspace.html');
	}
	else
	{
		header(HTTPStatus($http_status)['error']);
		$errors = 99;
		echo "$result"; // TODO : Find a way to display the error in a nice dialog
	}
}

// if the code goes here, this means that only 1 image had been submited (no comment) and no error occured
if ($errors == 0)
{
	header('Location: http://'.$_SERVER['SERVER_NAME'].'/myworkspace.html');
}
?>