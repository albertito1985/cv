<div class="menu_div">
	<nav class="menu">
		<?php if ($context=="user" || $context=="public"){?>
			<ul class="menu1">
				<li <?php if (basename($_SERVER['PHP_SELF']) == "hem.php"){
						echo("class='aktuell'") ;
					}?>>
					<a href="hem.php" >Hem</a>
				</li>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "start.php"){echo("class='aktuell'");}?>>
					<a href="start.php?kompis=start">Start kompis</a>
				</li>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "fika.php"){echo("class='aktuell'");}?>>
					<a href="fika.php?kompis=fika">Fika kompis</a>
				</li>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "musik.php"){echo("class='aktuell'");}?>>
					<a href="fika.php?kompis=musik">Musik kompis</a>
				</li>
				
				
				
				
				
				<li>
					<div>
						<ul class="sub1">
							<li>
								<a href="om.php">Om Kompisbyrån</a><div class="v"></div>
							</li>
							<li>
								<a href="stod.php">Stöd Oss</a>
							</li>
							<li>
								<a href="kontakt.php">Kontakta Oss</a>
							</li>
						</ul>
					</div>
				</li>
				
				
				
			</ul>
		<?php
			}if ($context=="kommun" || $context=="admin" || $context=="region" || $context=="master" ){?>
			<ul class="menu2">
				<li <?php if (basename($_SERVER['PHP_SELF']) == "ansokan.php"){echo("class='aktuell'") ;}?>>
					<a href="ansokan.php">Ansökan</a>
				</li>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "matchade.php"){echo("class='aktuell'") ;}?> >
					<a href="<?php echo $lan?>/matchade.php">Matchade</a>
				</li>

		<?php
			}if ($context=="master"){?>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "administratorer.php"){echo("class='aktuell'") ;}?>>
					<a href="<?php echo $lan?>/admins.php">Administratörer</a>
				</li>
			
		<?php
			}if ($context=="admin" || $context=="region" || $context=="master"){?>
				<li <?php if (basename($_SERVER['PHP_SELF']) == "statistik.php"){echo("class='aktuell'") ;}?> >
					<a href="<?php echo $lan?>/statistik.php">Statistik</a>
				</li>
			
			
		<?php
			} if ($context=="kommun" || $context=="admin" || $context=="region" || $context=="master" ){?>
			</ul>
		<?php
			}
			?>	
	</nav>
</div>