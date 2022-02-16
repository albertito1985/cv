<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Kompisbyrån
</title>
<link href="stylesheets/index.css" media="all" rel="stylesheet" type="text/css">
<link rel="icon" href="bilder/ikon.ico">
<script src="../includes/jquery-3.1.0.min.js"></script>
<script src="jquery/index.js" type="application/javascript"></script>
</head>
<body>
	<div class="wrapper">
		<div class="admin">
			<form action="#">
				<table>
					<tr>
					<td><img src="bilder/logo_public.png"></td>
					</tr>
					<tr>
						<td><p>För administratörer</br>
						For administrators</p></td>
					</tr>
					<tr>
						<td><input type="text" name="epost" placeholder="E-post / E-mail" <?php if (isset($_SESSION["errror"])){ ?> class="error" <?php };?>></td>
					</tr>
					<tr>
						<td><input type="password" name="losenord" placeholder="Lösenord / Password" <?php if (isset($_SESSION["errror"])){ ?> class="error" <?php };?>></td>
					</tr>
					
					<?php if (isset($_SESSION["errror"])){ ?><tr><td><p>Fel e-post eller lösenord</p></td></tr><?php };?>
					
					<tr>
						<td><input type="submit" value="logga in / log in"></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</body>
</html>