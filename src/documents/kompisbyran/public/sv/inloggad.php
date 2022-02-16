<div class="inloggad">
	<ul>
		<li>
			<?php echo ucfirst($_SESSION["namn"]) ." ". ucfirst($_SESSION["efternamn"])[0] .".";?> <div class="v"></div>
		</li>
		<?php
		if ($context == "user"){
		echo "<li>
			<a href='#'>Min profil</a>
			</li>";
		}else {}
		?>	
		
		<li>
			<a href="#">Logga ut</a>
		</li>
	</ul>
</div>