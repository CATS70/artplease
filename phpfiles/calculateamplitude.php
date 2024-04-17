<?php
	function calculateamplitude($lat, $lng, $radius)
	{
		// 1° de latitude = 111,11 Km, on fait donc un produit en croix
		$offSetLat = $radius / 111110;

		// 1° de longitude à 'latitude' degrés de latitude correspond à
		// OneLongitudeDegree mètres. On passe à la méthode Math.Cos
		// des radians
		$OneLongitudeDegree = 111110 * cos($lat * pi() / 180);

		// Produit en croix pour trouver le nombre de degrés de longitude auquel
		// correspond la longueur de notre rayon
		$offSetLong = $radius / $OneLongitudeDegree;

		$MaxLatitude = $lat + $offSetLat;
		$MinLatitude = $lat - $offSetLat;
		$MaxLongitude = $lng + $offSetLong;
		$MinLongitude = $lng - $offSetLong;
		
		$coordinates['MaxLatitude']=$MaxLatitude;
		$coordinates['MinLatitude']=$MinLatitude;
		$coordinates['MaxLongitude']=$MaxLongitude;
		$coordinates['MinLongitude']=$MinLongitude;
		return $coordinates;
	}

?>