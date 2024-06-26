<?php
//load httpresponse code
require_once "httpresponsecode.php";
require_once "hashpassword.php";

//get the api ini data
$ini_array = parse_ini_file("ini/artpleasenearby.ini");
$api_url = $ini_array['api_url'];
$api_user = $ini_array['api_user'];
$api_key  = $ini_array['api_key'];
$anti_brute_dir  = $ini_array['anti_brute_dir'];
$nb_try_auth  = $ini_array['nb_try_auth'];

//Get the login and password from the post
$login = $_POST['login-input-name'];
$password = $_POST['password-input-name'];

if(!empty($login) AND !empty($password))
{
 
	//
	$anti_brute_file = $_SERVER['DOCUMENT_ROOT'].$anti_brute_dir."/".$login.'.tmp';
    // On initialise $existence_ft
    $existence_ft = '';
 
	
    // Si le fichier existe, on le lit
    if(file_exists($anti_brute_file))
    {
         
        // On ouvre le fichier
        $fichier_tentatives = fopen($anti_brute_file, 'r+');
 
        // On r�cup�re son contenu dans la variable $infos_tentatives
        $contenu_tentatives = fgets($fichier_tentatives);
 
        // On d�coupe le contenu du fichier pour r�cup�rer les informations
        $infos_tentatives = explode(';', $contenu_tentatives);
 
 
        // Si la date du fichier est celle d'aujourd'hui, on r�cup�re le nombre de tentatives
        if($infos_tentatives[0] == date('d/m/Y'))
        {
            $tentatives = $infos_tentatives[1];
        }
        // Si la date du fichier est d�pass�e, on met le nombre de tentatives � 0 et $existence_ft � 2
        else
        {
            $existence_ft = 2;
            $tentatives = 0; // On met la variable $tentatives � 0
        }
 
 
    }
    // Si le fichier n'existe pas encore, on met la variable $existence_ft � 1 et on met les $tentatives � 0
    else
    {
        $existence_ft = 1;
        $tentatives = 0;
    }
 

    // S'il y a eu moins de 30 identifications rat�es dans la journ�e, on laisse passer
    if($tentatives < $nb_try_auth)
    {
		//Hash password
		$password = hashpwd($login,$password);
		
		// jSON URL which should be requested
		$json_url = "$api_url/artpleasenearby/authentication.json";
		 
		// jSON String for request
		$json_string = "login=$login&password=$password";
		 
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
			session_name('APN');
			session_start();
			$_SESSION['login'] = $login;//Store login in session for future security checking
			session_write_close();

			//***$subscriptions = getUserSubscriptions($login);

			header(HTTPStatus($http_status)['error']); //Force the error code to overlay getsubscription SUBS_NOT_FOUND error if any.
			
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
			//error_log("subs : ".$aSubscriptions);
			error_log(json_encode(array_merge(json_decode($result,true),json_decode($subscriptions,true))));*/


			//***echo json_encode(array_merge(json_decode($result,true),json_decode($subscriptions,true)));
			// ob_start();
			// var_dump($result);
			// $res=ob_get_contents();
			// ob_end_clean();
			// error_log($res);
			echo json_encode(json_decode($result,true));
			
		}
		else
		{
			//Si bad login, on ne fait rien
			$err_msg=json_decode($result,true);
				// ob_start();
				// var_dump($err_msg);
				// $res=ob_get_contents();
				// ob_end_clean();

			if ($err_msg['errors'][0]['name']!='BAD_LOGIN')
			{
			   if($existence_ft == 1) //Retour login ok, mais pwd ko
			   {
				   $creation_fichier = fopen($anti_brute_file, 'a+'); // On cr�er le fichier puis on l'ouvre
				   fputs($creation_fichier, date('d/m/Y').';1'); // On �crit � l'int�rieur la date du jour et on met le nombre de tentatives � 1
				   fclose($creation_fichier); // On referme
			   }
			   // Si la date n'est plus a jour
			   elseif($existence_ft == 2)
			   {
				   fseek($fichier_tentatives, 0); // On remet le curseur au d�but du fichier
				   fputs($fichier_tentatives, date('d/m/Y').';1'); // On met � jour le contenu du fichier (date du jour;1 tentatives)
			   }
			   else
			   {
				   fseek($fichier_tentatives, 11); // On place le curseur juste devant le nombre de tentatives
				   fputs($fichier_tentatives, $tentatives + 1); // On ajoute 1 au nombre de tentatives
			   }		
				header(HTTPStatus($http_status)['error']);
				echo $result;
			}
			else
			{
				header(HTTPStatus($http_status)['error']);
				echo $result;
			}
		}
	}
	else
	{
		header(HTTPStatus(404)['error']);
		echo '{"errors":[{"message":"too much authentication attempts!"}]}';;
	}
}




?>