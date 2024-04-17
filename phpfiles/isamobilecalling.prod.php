<?php
function isAMobileCalling($serverdata)
{
	//get the ini data
	$ini_array = parse_ini_file("ini/artpleasenearby.ini");
	$classname = $ini_array['classname'];

	if (isset($serverdata["HTTP_X_REQUESTED_WITH"]))
	{
		if ($serverdata["HTTP_X_REQUESTED_WITH"]==$classname)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false
		;
	}
}
?>