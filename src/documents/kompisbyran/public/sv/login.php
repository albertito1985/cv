<?php require_once("../../includes/session.php"); ?>
<?php require_once("../../includes/db_connection.php"); ?>
<?php require_once("../../includes/functions.php"); ?>
<?php require_once("../../includes/validation_functions.php"); ?>
<?php 
	
	if (isset($_POST["submit"])){
		//validations
			$required_fields = array("epost","losenord");
			validate_precenses($required_fields);
		
		if (empty($errors)){
			//attempt login
			$epost = $_POST["epost"];
			$losenord = $_POST["losenord"];
			$found_user = attempt_login($epost, $losenord);
			if ($found_user){
				$_SESSION["id"] = $found_user["id"];
				$_SESSION["namn"] = $found_user["namn"];
				$_SESSION["efternamn"] = $found_user["efternamn"];
				$_SESSION["type"]= "user";
				redirect_to("hem.php");
			}else{
				$_SESSION["errors"] = "Fel e-post eller lösenord";
				redirect_to("hem.php");
			}
		
		}

	}
?>