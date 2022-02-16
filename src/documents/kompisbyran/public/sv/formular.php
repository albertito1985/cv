<div class="registrering">
<h2>Ansök till en <?php echo ($_GET["kompis"]);?>kompis här!</h2>
<div class="progresscontainter">
	<ul class="progressbar">
		<li class="active">
			Skapa ett konto
		</li>
		<li >
			Fyll i ansökan
		</li>
		<li >
			Vänta på att bli matchad
		</li>
	</ul>
</div>

<?php if (!isset($_SESSION["id"])){?>
	<form action="konto.php" method="post">
		<table class="table1">
			<tr>
				<td>Konto:</td>
			</tr>
			<tr>
				<td><input type="text" name="epost"  placeholder="Epost"></td>
				<td><input type="password" name="losenord" placeholder="Lösenord"></td>
			</tr>
			<tr>
				<td><input type="text" name="epost"  placeholder="Upreppa epost"></td>
				<td><input type="password" name="losenord" placeholder="Upreppa lösenord"></td>
			</tr>
			<tr>
				<td><input type="submit" value="Skapa"></td>
				<td><input type="reset" value="Nollställ"></td>
			</tr>
		</table>
	</form>
<?php }?>					
	<form action="#">
		<table class="table2">
			<tr>
				<td>
					Profil:
				</td>
			</tr>
			<tr>
				<td>
					<input type="text" name="namn"  placeholder="Namn">
				</td>
				<td>
					<input type="text" name="efternamn"  placeholder="Efternamn">
				</td>
				<td>
					<select name="kon" value="kon">
						<option disabled selected>Kön</option>
						<option value="man">Man</option>
						<option value="kvinna">Kvinna</option>
						<option value="icke_binar">Icke binär</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<input type="text" name="ursprung"  placeholder="Ursprungs land">
				</td>
				<td colspan="2">
					<input name="sprak" type="textarea" placeholder="Språk ( en eller flera, ex. Svenska, Spanska)">
				</td>
					
			</tr>
			<tr>
				<td>
					<select name="foddelse_ar" value="foddelse_ar">
					<option disabled selected>Föddelse år</option>
						<?php
							for ($y= date("Y"); $y > 1900 ; $y--){?>
								<option value="<?php echo($y);?>"><?php echo($y);?></option>
						<?php }?>
					</select>					
				</td>
				<td>
					<select name="utbildning">
						<option disabled selected>Utbildning</option>
						<option value=1>Jag har en utbildning</option>
						<option value=0>Jag har inte en utbildning</option>
					</select>
				</td>
				<td>
					<select name="sysselsatning" value="sysselsattning">
						<option disabled selected>Sysselsattning</option>
						<?php
							$sysselsatning = array('Jag jobbar', 'Jag studerar', 'Jag vill ha jobb', 'Annat',);
							for ($y=0; isset($sysselsatning[$y]);$y++){?>
								<option value="<?php echo ($sysselsatning[$y])?>"><?php echo ($sysselsatning[$y])?></option>
							<?php
						}?>
						
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<select name="i_sverige_sedan" >
					<option disabled selected>Bor i Sverige sedan.</option>
						<?php
							for ($y= date("Y"); $y > 1900 ; $y--){?>
								<option value="<?php echo($y);?>"><?php echo($y);?></option>
						<?php }?>
					</select>					
				</td>
				<td>
					<select name="status" value="status">
						<option disabled selected>Status i Sverige</option>
						<option value="1">Etablerad</option>
						<option value="0">Ny i Sverige</option>
					</select>
				</td>
				<td>
					<select name="kommun" value="kommun">
						<option disabled selected>Bosättningskommun</option>
						<?php
							$kommun = array('Ale kommun', 'Alingsås kommun', 'Alvesta kommun', 'Aneby kommun', 'Arboga kommun', 'Arjeplogs kommun', 'Arvidsjaurs kommun', 'Arvika kommun', 'Askersunds kommun', 'Avesta kommun', 'Bengtsfors kommun', 'Bergs kommun', 'Bjurholms kommun', 'Bjuvs kommun', 'Bodens kommun', 'Bollebygds kommun', 'Bollnäs kommun', 'Borgholms kommun', 'Borlänge kommun', 'Borås stad', 'Botkyrka kommun', 'Boxholms kommun', 'Bromölla kommun', 'Bräcke kommun', 'Burlövs kommun', 'Båstads kommun', 'Dals-Eds kommun', 'Danderyds kommun', 'Degerfors kommun', 'Dorotea kommun', 'Eda kommun', 'Ekerö kommun', 'Eksjö kommun', 'Emmaboda kommun', 'Enköpings kommun', 'Eskilstuna kommun', 'Eslövs kommun', 'Essunga kommun', 'Fagersta kommun', 'Falkenbergs kommun', 'Falköpings kommun', 'Falu kommun', 'Filipstads kommun', 'Finspångs kommun', 'Flens kommun', 'Forshaga kommun', 'Färgelanda kommun', 'Gagnefs kommun', 'Gislaveds kommun', 'Gnesta kommun', 'Gnosjö kommun', 'Region Gotland', 'Grums kommun', 'Grästorps kommun', 'Gullspångs kommun', 'Gällivare kommun', 'Gävle kommun', 'Göteborgs stad', 'Götene kommun', 'Habo kommun', 'Hagfors kommun', 'Hallsbergs kommun', 'Hallstahammars kommun', 'Halmstads kommun', 'Hammarö kommun', 'Haninge kommun', 'Haparanda stad', 'Heby kommun', 'Hedemora kommun', 'Helsingborgs stad', 'Herrljunga kommun', 'Hjo kommun', 'Hofors kommun', 'Huddinge kommun', 'Hudiksvalls kommun', 'Hultsfreds kommun', 'Hylte kommun', 'Håbo kommun', 'Hällefors kommun', 'Härjedalens kommun', 'Härnösands kommun', 'Härryda kommun', 'Hässleholms kommun', 'Höganäs kommun', 'Högsby kommun', 'Hörby kommun', 'Höörs kommun', 'Jokkmokks kommun', 'Järfälla kommun', 'Jönköpings kommun', 'Kalix kommun', 'Kalmar kommun', 'Karlsborgs kommun', 'Karlshamns kommun', 'Karlskoga kommun', 'Karlskrona kommun', 'Karlstads kommun', 'Katrineholms kommun', 'Kils kommun', 'Kinda kommun', 'Kiruna kommun', 'Klippans kommun', 'Knivsta kommun', 'Kramfors kommun', 'Kristianstads kommun', 'Kristinehamns kommun', 'Krokoms kommun', 'Kumla kommun', 'Kungsbacka kommun', 'Kungsörs kommun', 'Kungälvs kommun', 'Kävlinge kommun', 'Köpings kommun', 'Laholms kommun', 'Landskrona stad', 'Laxå kommun', 'Lekebergs kommun', 'Leksands kommun', 'Lerums kommun', 'Lessebo kommun', 'Lidingö stad', 'Lidköpings kommun', 'Lilla Edets kommun', 'Lindesbergs kommun', 'Linköpings kommun', 'Ljungby kommun', 'Ljusdals kommun', 'Ljusnarsbergs kommun', 'Lomma kommun', 'Ludvika kommun', 'Luleå kommun', 'Lunds kommun', 'Lycksele kommun', 'Lysekils kommun', 'Malmö stad', 'Malung-Sälens kommun', 'Malå kommun', 'Mariestads kommun', 'Markaryds kommun', 'Marks kommun', 'Melleruds kommun', 'Mjölby kommun', 'Mora kommun', 'Motala kommun', 'Mullsjö kommun', 'Munkedals kommun', 'Munkfors kommun', 'Mölndals stad', 'Mönsterås kommun', 'Mörbylånga kommun', 'Nacka kommun', 'Nora kommun', 'Norbergs kommun', 'Nordanstigs kommun', 'Nordmalings kommun', 'Norrköpings kommun', 'Norrtälje kommun', 'Norsjö kommun', 'Nybro kommun', 'Nykvarns kommun', 'Nyköpings kommun', 'Nynäshamns kommun', 'Nässjö kommun', 'Ockelbo kommun', 'Olofströms kommun', 'Orsa kommun', 'Orust kommun', 'Osby kommun', 'Oskarshamns kommun', 'Ovanåkers kommun', 'Oxelösunds kommun', 'Pajala kommun', 'Partille kommun', 'Perstorps kommun', 'Piteå kommun', 'Ragunda kommun', 'Robertsfors kommun', 'Ronneby kommun', 'Rättviks kommun', 'Sala kommun', 'Salems kommun', 'Sandvikens kommun', 'Sigtuna kommun', 'Simrishamns kommun', 'Sjöbo kommun', 'Skara kommun', 'Skellefteå kommun', 'Skinnskattebergs kommun', 'Skurups kommun', 'Skövde kommun', 'Smedjebackens kommun', 'Sollefteå kommun', 'Sollentuna kommun', 'Solna stad', 'Sorsele kommun', 'Sotenäs kommun', 'Staffanstorps kommun', 'Stenungsunds kommun', 'Stockholms stad', 'Storfors kommun', 'Storumans kommun', 'Strängnäs kommun', 'Strömstads kommun', 'Strömsunds kommun', 'Sundbybergs stad', 'Sundsvalls kommun', 'Sunne kommun', 'Surahammars kommun', 'Svalövs kommun', 'Svedala kommun', 'Svenljunga kommun', 'Säffle kommun', 'Säters kommun', 'Sävsjö kommun', 'Söderhamns kommun', 'Söderköpings kommun', 'Södertälje kommun', 'Sölvesborgs kommun', 'Tanums kommun', 'Tibro kommun', 'Tidaholms kommun', 'Tierps kommun', 'Timrå kommun', 'Tingsryds kommun', 'Tjörns kommun', 'Tomelilla kommun', 'Torsby kommun', 'Torsås kommun', 'Tranemo kommun', 'Tranås kommun', 'Trelleborgs kommun', 'Trollhättans stad', 'Trosa kommun', 'Tyresö kommun', 'Täby kommun', 'Töreboda kommun', 'Uddevalla kommun', 'Ulricehamns kommun', 'Umeå kommun', 'Upplands Väsby kommun', 'Upplands-Bro kommun', 'Uppsala kommun', 'Uppvidinge kommun', 'Vadstena kommun', 'Vaggeryds kommun', 'Valdemarsviks kommun', 'Vallentuna kommun', 'Vansbro kommun', 'Vara kommun', 'Varbergs kommun', 'Vaxholms stad', 'Vellinge kommun', 'Vetlanda kommun', 'Vilhelmina kommun', 'Vimmerby kommun', 'Vindelns kommun', 'Vingåkers kommun', 'Vårgårda kommun', 'Vänersborgs kommun', 'Vännäs kommun', 'Värmdö kommun', 'Värnamo kommun', 'Västerviks kommun', 'Västerås stad', 'Växjö kommun', 'Ydre kommun', 'Ystads kommun', 'Åmåls kommun', 'Ånge kommun', 'Åre kommun', 'Årjängs kommun', 'Åsele kommun', 'Åstorps kommun', 'Åtvidabergs kommun', 'Älmhults kommun', 'Älvdalens kommun', 'Älvkarleby kommun', 'Älvsbyns kommun', 'Ängelholms kommun', 'Öckerö kommun', 'Ödeshögs kommun', 'Örebro kommun', 'Örkelljunga kommun', 'Örnsköldsviks kommun', 'Östersunds kommun', 'Österåkers kommun', 'Östhammars kommun', 'Östra Göinge kommun', 'Överkalix kommun', 'Övertorneå kommun');
							for ($y=0; isset($kommun[$y]);$y++){?>
								<option value="<?php echo ($kommun[$y])?>"><?php echo ($kommun[$y])?></option>
							<?php
						}?>
						
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<select name="barn">
						<option disabled selected>Antal barn</option>
						<option>Inga barn</option>
							<?php
								for ($y= 1 ; $y <= 5 ; $y++){?>
									<option value="<?php echo($y);?>"><?php echo($y);?></option>
							<?php }?>
						<option value="6">Mer än 5</option>
					</select>
				</td>
				<td class="barn">
						<input type="text" placeholder="Barnens ålder">
				</td>
			</tr>
			<tr>
				<td colspan="3"><p>Jag är intresserad av:</p>
					<table>
					<?php
						$intressen = array ('Dans', 'Djur och natur', 'Familj', 'Film/TV', 'Litteratur', 'Matlagning', 'Musik', 'Politik', 'Promenader', 'Resor', 'Sport', 'Träning');
						for ($y=0; isset($intressen[$y]);$y++){?>
						<?php if($y == 0 || $y == 4 || $y == 8 ){echo "<tr>";};?>
						<td><input type="checkbox" value="<?php echo($intressen[$y])?>" id="<?php echo($intressen[$y])?>" name="intressen"><label for="<?php echo($intressen[$y])?>"><?php echo($intressen[$y])?></label></td>
						<?php if($y == 3 || $y == 7 || $y == 11 ){echo "</tr>";};?>
						<?php
					}?>
					</table>
				</td>
			</tr>
		</table>
			
		<table class="table2">
			<tr>
				<td>
					Om mötet:
				</td>
			</tr>
			<tr>
				<td>
					<select name="traffas_i" value="traffas_i">
					<option disabled selected>Jag vill träffas i</option>
					<?php
					for ($y=0; isset($kommun[$y]);$y++){?>
								<option value="<?php echo ($kommun[$y])?>"><?php echo ($kommun[$y])?></option>
							<?php
						}?>
					</select>
				</td>
				<td>
					<select name="tillganglig_dagar" value="tillganglig_dagar">
					<option disabled selected>Jag är tillgänglig (veckodagar)</option>
					<?php
					$tillganglig_dagar = array('Vardagar', 'Helger', 'Båda');
					for ($y=0; isset($tillganglig_dagar[$y]);$y++){?>
								<option value="<?php echo ($tillganglig_dagar[$y])?>"><?php echo ($tillganglig_dagar[$y])?></option>
							<?php
						}?>
					</select>
				</td>
				<td>
					<select name="tillganglig_tid" value="tillganglig_tid">
					<option disabled selected>Jag är tillgänglig (tid)</option>
					<?php
					$tillganglig_tid = array('Dag (innan kl 17)', 'Kväll (efter kl 17)', 'Båda');
					for ($y=0; isset($tillganglig_tid[$y]);$y++){?>
								<option value="<?php echo ($tillganglig_tid[$y])?>"><?php echo ($tillganglig_tid[$y])?></option>
							<?php
						}?>
					</select>
				</td>
			<tr>
				<td>
					<input type="checkbox" name="extrapers"><label>Jag vill ta med en kompis till träffen</label>
				</td>
				<td class="kompis">
					<select name="kompisens_kon">
						<option disabled selected>Kompisens kön</option>
						<option value="man">Man</option>
						<option value="kvinna">Kvinna</option>
						<option value="icke_binar">Icke binär</option>
					</select>
				</td>
				<td class="kompis">
					<select name="kompisens_relation">
						<option disabled selected>Kompisen är</option>
						<option value="van">En vän</option>
						<option value="barn">Mitt barn</option>
						<option value="partner">Min partner</option>
						<option value="annan_familj">En familjemedlem</option>
					</select>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<input type="text" name="om_sig_sjalv" placeholder="Kort om mig själv...">
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<input type="text" name="onskemal" placeholder="Speciella önskemål">
				</td>
			</tr>
			<!--?php if ($_GET["kompis"]="musik"){?-->
			<tr>
				<td colspan="3"><p>Vad kan du tänka dig att göra med din musikkompis?</p>
					<table class="table_checkbox">
					<?php
						$musik_gora = array ('att dansa till musik', 'att lyssna på musik', 'att prata om musik', 'att spela musik');
						for ($y=0; isset($musik_gora[$y]);$y++){?>
						<td><input type="checkbox" value="<?php echo($musik_gora[$y])?>" id="<?php echo($musik_gora[$y])?>" name="musik_gora"><label for="<?php echo($musik_gora[$y])?>"><?php echo($musik_gora[$y])?></label></td>
						<?php
					}?>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input name="instrument" type="text" placeholder="Jag spelar följande instrument:">
				</td>
				<td>
					<input type="checkbox" name="proffs" value="ja" id="ja"><label for="ja">Jag är proffs</label>
				</td>
			</tr>
			<tr>
				<td colspan="3">
					<input type="text" name="genrer" placeholder="Jag gillar följande musik genrer:">
				</td>
			</tr>

		</table>
		<table class="table2">
			<tr>
				<td>
					<input action="#" type="submit" value="Skicka ansökan">
				</td>
				<td>
				</td>

				<td>
					<input type="reset" value="Nollställ">
				</td>
			</tr>
		</table>
	</form>
</div>