<?php

	function redirect_to($new_location){
		header("Location: " . $new_location);
		exit;
	}
	
	function mysql_prep($string){
		global $connection;
		
		$escaped_string = mysqli_real_escape_string($connection, $string);
		return $escaped_string;
	}
	
	function confirm_query ($result_set){
		if (!$result_set){
			die("Database query failed.");
		}
	}
	
	function form_errors($errors = array()){
		$output = "";
		if (!empty($errors)){
			$output .= "<div class=\"error\">";
			$output .= "Please fix the following errors:";
			$output .= "<ul>";
			foreach ($errors as $key => $error){
				$output .= "<li>";
				$output .= htmlentities($error);
				$output .= "</li>";
			}
			$output .= "</ul>";
			$output .= "</div>";
		}
		return $output;
	}
	
	function find_all_subjects ($public = true){
		global $connection;
		$query = "SELECT * ";
		$query .= "FROM subjects ";
		if ($public){
			$query .= "WHERE visible = 1 ";	
		}
		$query .= "ORDER BY position ASC";
		$subject_set = mysqli_query($connection, $query);
		confirm_query($subject_set);
		return $subject_set;
	}
	
	function find_pages_for_subject ($subject_id, $public = true) {
		global $connection;
		
		$safe_subject_id = mysqli_real_escape_string($connection, $subject_id);
		
		$query = "SELECT * ";
		$query .= "FROM pages ";
		$query .= "WHERE subject_id = {$safe_subject_id} ";
		if ($public){
			$query .= "AND visible = 1 ";
		}
		$query .= "ORDER BY position ASC";
		
		$page_set = mysqli_query($connection, $query);
		confirm_query($page_set);
		return $page_set;
		
	}
	
	function find_subject_by_id ($subject_id, $public=true){
		global $connection;
		
		$safe_subject_id = mysqli_real_escape_string($connection, $subject_id);
		
		$query = "SELECT * ";
		$query .= "FROM subjects ";
		$query .= "WHERE id = {$safe_subject_id} ";
		if($public){
			$query .= "AND visible = 1 ";
		}
		$query .= "LIMIT 1";
		
		$subject_set = mysqli_query($connection, $query);
		confirm_query($subject_set);
		
		if ($subject = mysqli_fetch_assoc($subject_set)){
			return $subject;
		}else {
			return null;			
		}	
	}
	
	function find_default_page_for_subject ($subject_id){
		$page_set = find_pages_for_subject ($subject_id);
		if ($first_page = mysqli_fetch_assoc($page_set)){
			return $first_page;
		}else {
			return null;			
		}
	}

	function find_page_by_id ($page_id, $public=true){       
		global $connection;
		
		$safe_page_id = mysqli_real_escape_string($connection, $page_id);
		
		$query = "SELECT * ";
		$query .= "FROM pages ";
		$query .= "WHERE id = {$safe_page_id} ";
		if ($public){
			$query .= "AND visible = 1 ";
		}
		
		$query .= "LIMIT 1";
		
		$page_set = mysqli_query($connection, $query);
		confirm_query($page_set);
		
		if ($page = mysqli_fetch_assoc($page_set)){
			return $page;
		}else {
			return null;			
		}
	}
	
	function find_selected_page ($public=false){
		global $current_subject;
		global $current_page;
		
		if (isset($_GET["subject"])){
			$current_subject = find_subject_by_id ($_GET["subject"], $public);
			if ($current_subject && $public){
				$current_page = find_default_page_for_subject ($current_subject["id"]);
			} else {
				$current_page = null;
			}
		}elseif (isset($_GET["page"])){
			$current_subject = null;
			$current_page = find_page_by_id ($_GET["page"], $public);
		}else{
			$current_subject = null;
			$current_page = null;
		}
	}
	
	function navigation ($subject_array, $page_array){
		$output = "<ul class=\"subjects\">";
		$subject_set = find_all_subjects(false);
		while($subject = mysqli_fetch_assoc($subject_set)){
			$output .= "<li";
			if($subject_array && $subject["id"] == $subject_array["id"]){
				$output .= " class=\"selected\"";
				}
			$output .= ">";
			$output .=	"<a href=\"manage_content.php?subject=";
			$output .= urlencode($subject["id"]);
			$output .= " \">";
			$output .= htmlentities($subject["menu_name"]);
			$output .= "</a>";
			$page_set = find_pages_for_subject ($subject["id"], false);
			$output .= "<ul class=\"pages\">";
						
			while($page = mysqli_fetch_assoc($page_set)){
				$output .= "<li";
				if($page_array && $page["id"] == $page_array["id"]){
					$output .= " class=\"selected\"";
					}
				$output .= ">";
				$output .= "<a href=\"manage_content.php?page=";
				$output .= urlencode($page["id"]);
				$output .="\">";
				$output .= htmlentities($page["menu_name"]);
				$output .= "</a></li>";
			}
			mysqli_free_result($page_set);
			$output .= "</ul></li>";
		}
		mysqli_free_result($subject_set);
		$output .= "</ul>";
		return $output;
	}
	
	function public_navigation($subject_array, $page_array){
		$output = "<ul class=\"subjects\">";
		$subject_set = find_all_subjects();
		while($subject = mysqli_fetch_assoc($subject_set)){
			$output .= "<li";
			if($subject_array && $subject["id"] == $subject_array["id"]){
				$output .= " class=\"selected\"";
				}
			$output .= ">";
			$output .=	"<a href=\"index.php?subject=";
			$output .= urlencode($subject["id"]);
			$output .= " \">";
			$output .= htmlentities($subject["menu_name"]);
			$output .= "</a>";
			if($subject_array["id"] == $subject["id"] || $page_array["subject_id"] == $subject["id"]){
				$page_set = find_pages_for_subject ($subject["id"]);
				$output .= "<ul class=\"pages\">";
				while($page = mysqli_fetch_assoc($page_set)){
					$output .= "<li";
					if($page_array && $page["id"] == $page_array["id"]){
						$output .= " class=\"selected\"";
						}
					$output .= ">";
					$output .= "<a href=\"index.php?page=";
					$output .= urlencode($page["id"]);
					$output .="\">";
					$output .= htmlentities($page["menu_name"]);
					$output .= "</a></li>";
				}
				mysqli_free_result($page_set);
				$output .= "</ul>";
			}

			$output .= "</li>"; // end of the subject li
		}
		mysqli_free_result($subject_set);
		$output .= "</ul>";
		return $output;
	}
	
	function list_pages_for_subject ($current_subject){
		
		$output = "<br/><br/><hr>";
		$output .= "<h3>Pages in this subject: </h3>";
		$output .= "<ul class=\"editp\">";
		
		$page_set = find_pages_for_subject($current_subject["id"]);
						
		while($page = mysqli_fetch_assoc($page_set)){
			$output .= "<li>";
			$output .= "<a href=\"manage_content.php?page=";
			$output .= urlencode($page["id"]);
			$output .="\">";
			$output .= htmlentities($page["menu_name"]);
			$output .= "</a></li>";				
		}
		$output .= "</ul><br/>";
		$output .= "+ <a href=\"new_page.php?subject=";
		$output .= $current_subject["id"];
		$output .= "\">Add a new page to this subject</a>";				
		
		echo $output;
			
	}

	function find_all_users (){
		global $connection;
		
		$query = "SELECT * ";
		$query .= "FROM users ";
		$query .= "ORDER BY epost ASC";
		$users_set = mysqli_query($connection, $query);
		confirm_query($users_set);
		return $users_set;
	}
	
	function find_user_by_id ($user_id) {
		global $connection;
		
		$safe_user_id = mysqli_real_escape_string($connection, $user_id);
		
		$query = "SELECT * ";
		$query .= "FROM users ";
		$query .= "WHERE id = {$safe_user_id} ";
		$query .= "LIMIT 1";
		
		$users_set = mysqli_query($connection, $query);
		confirm_query($users_set);
		
		if ($user = mysqli_fetch_assoc($users_set)){
			return $user;
		}else {
			return null;			
		}
	}

	function find_user_by_epost ($epost) {
		global $connection;
		
		$safe_epost = mysqli_real_escape_string($connection, $epost);
		
		$query = "SELECT * ";
		$query .= "FROM users ";
		$query .= "WHERE epost = '{$safe_epost}' ";
		$query .= "LIMIT 1";
		
		$users_set = mysqli_query($connection, $query);
		confirm_query($users_set);
		
		if ($user = mysqli_fetch_assoc($users_set)){
			return $user;
		}else {
			return null;			
		}
	}

	function losenord_encrypt ($losenord){
		$hash_format = "$2y$10$";
		$salt_length = 22;
		$salt = generate_salt($salt_length);
		$format_and_salt = $hash_format . $salt;
		$hash = crypt($losenord, $format_and_salt);
		return $hash;
	}
	
	function generate_salt($length){
		$unique_random_string = md5(uniqid(mt_rand(), true));
		$base64_string = base64_encode($unique_random_string);
		$modified_base64_string = str_replace('+', '.', $base64_string);
		$salt = substr($modified_base64_string, 0, $length);
		
		return $salt;
	}
	
	function losenord_check($losenord, $existing_hash){
		$hash = crypt($losenord, $existing_hash);
		if($hash === $existing_hash){
			return true;
		}else{
			return false;
		}
	}
	
	function attempt_login($epost, $losenord){
		$user = find_user_by_epost($epost);
		
		if($user){
			if(losenord_check($losenord, $user["losenord"])){
				return $user;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	function loged_in(){
		return isset($_SESSION["id"]);
	}
	
	function confirm_loged_in(){
		if(loged_in()){
			if (isset ($_SESSION["typ"])){
				if($_SESSION["typ"]=="kommun"){
					$context="kommun";
				}else if($_SESSION["typ"]=="master"){
					$context="master";				
				}else if($_SESSION["typ"]=="user"){
					$context="user";
				}else if($_SESSION["typ"]=="region"){
					$context="region";
				}
			}else{
				$context="user";
			}
			
		}else{
			return null;}
		
	}
	?>