<?php

	
	function open_lang_link($lang){
		if ($_GET['lang']==$lang){
			echo "";
		}else{
			$sid=$_GET['sid'];
			echo '<a ';
			query($sid,$lang);
			echo '>';
		}
	}
	function close_lang_link($lang){
		if ($_GET['lang']=='$lang'){
			echo "";
		}else{
			echo "</a>";
		}
	}
	function open_sid_link($sid,$extra,$ist){
		if ($_GET['sid']==$sid){
			if($ist==true){
				echo $ist;
			}
			
		}else{
			$lang=$_GET['lang'];
			echo '<a ';
			query($sid,$lang);
			echo $extra;
			echo '>';
		}
	}
	function close_sid_link($sid,$ist){
		if ($_GET['sid']=='$sid'){
			if($ist==true){
				echo $ist;
			}		
		}else{
			echo "</a>";
		}
	}
	function query ($sid,$lang) {
		echo 'href="index.php?sid=';
		echo $sid;
		echo '&lang=';
		echo $lang;
		echo '" ';
	}
	function lang_alt($sv,$en,$es){
		if ($_GET['lang']=='sv'){
				return $sv;
			}else if ($_GET['lang']=='en'){
				return $en;
			}else if ($_GET['lang']=='es'){
				return $es;
			}
	}
	function clean($string) {
		$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
		return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
	}
	
	class erfarenhet{
		public function __construct($title,$bild,$text,$innebar,$links){
			$this->title_low = clean (strtolower($title["title_".$_GET["lang"]]));
			echo "<div class='erfarenhet_item'>
				<h3>{$title["title_".$_GET["lang"]]}</h3>
				<p class='erfarenhet_text'>{$text["cont_".$_GET["lang"]]}</p>
				<div class='bild_o_lankar'>
					<div class='erfarenhet_bild $this->title_low'>
					</div>
					<style>
						.$this->title_low {background: url('bilder/{$bild["bild_ad"]}') no-repeat center /100%;};
					</style>
					<ul class='innebar'>
						<li><h4>";
						echo lang_alt ('Projektet innebär','This project involves','Proyecto contiene');
						echo ":</h4></li>";
							for($i=0;$i<count($innebar);$i++){
								echo "<li>{$innebar[$i]["inne_".$_GET["lang"]]}</li>";
							}
					echo "</ul>
					<ul class='links'>
						<li><h4>";
					echo lang_alt("Länkar","Links","Enlaces");
					echo":</h4></li>";
						for($i=0;$i<count($links);$i++){
							echo "<a href='";
							echo $links[$i]["link_ad"];
								if($links[$i]["new_page"]==1){
									echo "' target='_blank'";
								};
							echo "'><li>";
							echo $links[$i]["link_".$_GET["lang"]];
							echo "</li></a>";	
						};
					echo "</ul>
				</div>
			</div>";	
		}
	}
	
?>