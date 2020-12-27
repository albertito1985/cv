<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<title>Index</title>
<link rel="stylesheet" type="text/css" href="index.css">
<script src="jquery/jquery-3.1.0.min.js"></script>
<script src="index.js" type="application/javascript"></script>
</head>

<body>
	<?php include "functions_classes.php";?>
	<?php include "meny.php";?>
<div class="wrapper">
	<?php 
	if ($_GET['sid']=='text'){
				include "text.php";
			};
	if ($_GET['sid']=='port'){
				include "port.php";
			}			
	include "fot.php";
	?>   
</div>
</body>
</html>
