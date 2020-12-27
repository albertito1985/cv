<?php
if (empty($_GET['sid'])){
	$_GET['sid']='text';
	}
if (empty($_GET['lang'])){
	$_GET['lang']='sv';
	}
?>
<div class="global">   	     
	<div class="dropdown" >
		<div class="menico"></div>
		<nav>
			<ul class="nivå1">
<!-- menu länkar-->
				<li class="<?php if ($_GET["sid"]=="text"){echo "selected";}?>">
					<?php 
						open_sid_link ('text',null,'<p>');
						echo lang_alt('Text CV','Text CV','Curriculum en texto');
						close_sid_link ('text','</p>');
					?>
				</li>
				<li class="<?php if ($_GET["sid"]=="port"){echo "selected";}?>">
					<?php
					open_sid_link ('port',null,'<p>');
					echo lang_alt('Portfölj','Portfolio','Portafolio');					
					close_sid_link ('port','</p>');
					?>
				</li>
				<li>
					<a href='mailto:anulo@live.se'>
						<?php
							echo lang_alt('Mejla mig','Drop me a line','Mandame un correo');
						?>
					</a>
				</li>
				<li>
					<a href='tel:0046737296127'>
						<?php 
							echo lang_alt('Ring mig','Call me','Llamame');
						?>
					</a>
				</li>
			</ul>	
		</nav> 
	</div>
	<div class="globdel_v">
		<div class="meny_icon">
			<?php
				$extra='title="';
				$extra.=lang_alt('Text CV','Text CV','Curriculum en texto');
				$extra.='" alt="';
				$extra.=lang_alt('Till min resumé i text','To my resume in text','Hacia mi curriculum en texto');
				$extra.='"';
				open_sid_link('text',$extra,false);
			?>
			<div class="icon_text <?php if ($_GET["sid"]=="text"){echo "selected";}?>"></div>
			<?php
				close_sid_link('text',false);
			?>
		</div >
		<div class="meny_icon" title="<?php echo lang_alt('Portfölj','Portfolio','Portafolio');?>">
		<?php
			$extra='title="';
			$extra.=lang_alt('Portfölj','Portfolio','Portafolio');
			$extra.='" alt="';
			$extra.=lang_alt('Till min portfölj','To my portfolio','Hacia mi protafolio');
			$extra.='"';
			open_sid_link('port',$extra,false);
			?>
			<div class="icon_porta  <?php if ($_GET["sid"]=="port"){echo "selected";}?>"></div>
			<?php
				close_sid_link('port',false);
			?>
		</div>
	</div>
	<div class="logga">
    		<h1>Alberto Nuñez</h1>
	</div> 
</div>
<!-- idiomas -->
<div class="language_menu">
	<div class="banderas">
		<div class="bandera banderas_first">
			<?php
			open_lang_link('es');
			?>
			<img class="<?php if ($_GET["lang"]=="es"){echo "selected";}?>" title="Español" alt="pagina en español" src="bilder/sp.png">
			<?php
			close_lang_link('es');?>
		</div>
		<div class="bandera">
			<?php
			open_lang_link('en');
			?>
			<img class="<?php if ($_GET["lang"]=="en"){echo "selected";}?>" title="English" alt="page in english"src="bilder/en.png">
			<?php
			close_lang_link('en');?>
		</div>
		<div class="bandera bandera_sist">
			<?php
			open_lang_link('sv');
			?>
			<img class="<?php if ($_GET["lang"]=="sv"){echo "selected";}?>" title="Svenska" alt="sidan på svenska"src="bilder/sv.png">
			<?php
			close_lang_link('sv');
			?>
		</div>
	</div>
</div>