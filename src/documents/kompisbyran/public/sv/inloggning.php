<div class="inloggning">
	<form action="login.php" method="post">
		<table>
			<tr>
				<td><input placeholder="E-post" type="text" name="epost" <?php if (isset($_SESSION["errors"])){ ?> class="error" <?php };?>></td>
				<td><input placeholder="lösenord" type="password" name="losenord" <?php if (isset($_SESSION["errors"])){ ?> class="error" <?php };?>></td>
				<td><input type="submit" value="Logga in" name="submit"></td>
			</tr>
		</table>
	</form>
	<?php if (isset($_SESSION["errors"])){ ?><p><?php echo(errors());?></p><?php };?><a href="#" >Glömt lösenord?</a>
</div>