<?php
function hashpwd($login,$pwd)
{
	$p1 = substr($login,0,1);
	$p3 = substr($login,2,1);
	$p4 =substr($login,3,1);
	$salt = $p4.'ç'.$p1.'é'.$p3.'µ';
	$hashedpassword = hash('sha512',$pwd.$salt);

	return $hashedpassword;
}
?>