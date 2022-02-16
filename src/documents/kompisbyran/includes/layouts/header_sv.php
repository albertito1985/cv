<?php require_once("../../includes/session.php"); ?>
<?php $context="public";?>
<?php if(isset($_SESSION["type"])){
	$context = $_SESSION["type"];
}?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Kompisbyrån
</title>
<link href="../stylesheets/index.css" media="all" rel="stylesheet" type="text/css">
<link rel="icon" href="../bilder/ikon.ico">
<script src="../../includes/jquery-3.1.0.min.js"></script>
<script src="../jquery/index.js" type="application/javascript"></script>
</head>
<body>
	<div class="wrapper">
			<div class="logga">
				<div class="logga_in">
					<div class="logga_vanster">
						<div class="logga_vanster_in">
							<a href="hem.php"><img src="../bilder/logo_
							<?php if ($context == "kommun" or $context == "region" or $context == "user") {echo "public";}
								else{echo $context;}
							?>.png" alt="kompisbyråns logga"></a>
							<p>
								<?php
								if (!($context == "user" || $context == "public")){ 
									if ($_SESSION["typ"]=="kommun"){echo ucwords ($_SESSION["kommun"]);}
									else if ($_SESSION["typ"]=="region"){echo ucwords ($_SESSION["region"]);}
									else if ($_SESSION["typ"]=="admin"){echo ucwords ($_SESSION["typ"]);}
									else if ($_SESSION["typ"]=="master"){echo ucwords ($_SESSION["typ"]);}
								}
								else { }
								?>
							</p>
						</div>
					</div>
					<div class="logga_hoger">
						<div class="hoger_in">
							<div class="flaggor">
								<a href="../sv/<?php echo basename($_SERVER['PHP_SELF']);?>"><img class="lan" src="../bilder/sv_flagga.png" alt="svenska flagga"></a>
								<a href="../en/<?php echo basename($_SERVER['PHP_SELF']);?>"><img src="../bilder/en_flagga.png" alt="engelska flagga"></a>
							</div>
							<?php						
								if ($context=="public"){
									include ("inloggning.php");
								}else{
									include ("inloggad.php");
								}
								?>
						</div>
					</div>
				</div>	
			</div>
		<div class="innehall">