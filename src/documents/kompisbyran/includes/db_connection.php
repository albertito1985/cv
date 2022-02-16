<?php
	define("DB_SERVER", "localhost");
	define("DB_USER", "admin");
	define("DB_PASS", "k0mp1s#pa55");
	define("DB_NAME", "kompisbyran");	

	$connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
	
	
// test
	if (mysqli_connect_errno()){
		die("Database connection failed: " .
		mysqli_connect_error() .
		"(" . mysqli_connect_errno . ")"
		);
	}
?>