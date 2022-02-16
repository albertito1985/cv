<?php
include ("../includes/db_connection.php");
include ("../includes/functions.php");

echo losenord_encrypt("secretpassword");
echo "</br>";
$lösen = '$2y$10$YjkwMmYwZWE3NTU4NjhhMeqDkS2fsu8g97u5GgyVSmIM4YoRZugWe';
echo losenord_check ("secretpassword",$lösen);
echo "</br>";
echo attempt_login ('anulo@live.se', 'secretpassword');
echo find_user_by_epost('anulo@live');
?>