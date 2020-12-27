<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php require_once("../includes/validation_functions.php"); ?>
<div class="innehåll">
	<?php
		$section_set=find_all_section();
		for ($x=0;$x<count($section_set);$x++){
			if($section_set[$x]["visible"]==1){
				echo "<h1>";
				echo $section_set[$x]["section_".$_GET["lang"]];
				echo "</h1>";
				$title_set = find("title", "section_id", $section_set[$x]["id"]);
				for($y=0;$y<count($title_set);$y++){
					if($title_set[$y]["visible"]==1){
						$bild= find("image", "title_id", $title_set[$y]["id"]);
						$description= find("description", "title_id", $title_set[$y]["id"]);
						$involve= find("involve", "title_id", $title_set[$y]["id"]);
						$links=find("links", "title_id", $title_set[$y]["id"]);
						$block = new erfarenhet($title_set[$y],$bild[0],$description[0],$involve,$links);
					};
					
				};	
			};
		};
	?>
</div>