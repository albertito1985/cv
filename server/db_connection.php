<?php
	define("DB_SERVER", "mysql74.unoeuro.com");
	define("DB_USER", "catchapp_se");
	define("DB_PASS", "Losper1cos");
	define("DB_NAME", "catchapp_se_db_cv");	

	$connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
	
	//para que de los resultados con signos en español y sueco
		mysqli_query($connection, "SET CHARACTER_SET_CLIENT='utf8'");
		mysqli_query($connection, "SET CHARACTER_SET_RESULTS='utf8'");
		mysqli_query($connection, "SET CHARACTER_SET_CONNECTION='utf8'");
	
	
// test
	if (mysqli_connect_errno()){
		die("Database connection failed: " .
		mysqli_connect_error() .
		"(" . mysqli_connect_errno . ")"
		);
	}
	
?>