		</div>
			<div class="footer">
				<div class="footer_tab">
					<?php if ($context=="kommun" || $context=="admin" || $context=="region" || $context=="master"){?>
						<table>
						<tr>
							<td>
								Göteborg: 
							</td>
							<td>
								<a href="mailto:goteborg@kompisbyran.se">goteborg@kompisbyran.se</a>
							</td>
						</tr>
						<tr>
							<td>
								Kalmar: 
							</td>
							<td>
								<a href="mailto:kalmar@kompisbyran.se">kalmar@kompisbyran.se</a>
							</td>
						</tr>
						<tr>
							<td>
								Malmö: 
							</td>
							<td>
								<a href="mailto:malmo@kompisbyran.se">malmo@kompisbyran.se</a>
							</td>
						</tr>
						<tr>
							<td>
								Örebro: 
							</td>
							<td>
								<a href="mailto:orebro@kompisbyran.se">orebro@kompisbyran.se</a>
							</td>
						</tr>
						<tr>
							<td>
								Stockholm: 
							</td>
							<td>
								<a href="mailto:stockholm@kompisbyran.se">stockholm@kompisbyran.se</a>
							</td>
						</tr>
						<tr>
							<td>
								Övrigt: 
							</td>
							<td>
								<a href="mailto:kontakt@kompisbyran.se">kontakt@kompisbyran.se</a>
							</td>
						</tr>
						<?php }else{ ?>
						<table>
						<tr>
							<td>
								<a href="#">Fika kompis</a>
							</td>
							<td>
								<a href="#">Om Oss</a>
							</td>
						</tr>
						<tr>
							<td>
								<a href="#">Start kompis</a>
							</td>
							<td>
								<a href="#">Stöd oss</a>
							</td>
						</tr>
						<tr>
							<td>
								<a href="#">Musik kompis</a>
							</td>
							<td>
								<a href="#">Kontakta oss</a>
							</td>
						</tr>
						<?php } ?>
						<tr>
							<td class="foot_logga col2" colspan="2">
								<a href="hem.php"><img src="../bilder/logo_public.png"</a>
							</td>
						</tr>
						<tr>
							<td class="col2" colspan="2">
								<a href="#"><img src="../bilder/facebook.png"</a>
								<a href="#"><img src="../bilder/twitter.png"</a>
								<a href="#"><img src="../bilder/instagram.png"</a>
							</td>
						</tr>
						
					</table>
				</div>	
			</div>
	</div>
</body>
</html>
<?php
	if (isset($connection)){
		mysqli_close($connection);
	}
?>
