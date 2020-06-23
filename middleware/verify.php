<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
//$jwt="";
$jwt = htmlspecialchars_decode($_GET["jwt"]);
$credentials = include "verifyNoEcho.php";
echo $credentials;
?>

