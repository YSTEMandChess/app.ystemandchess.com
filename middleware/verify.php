<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Random Key. Needs to be Changed Later
$key = "4F15D94B7A5CF347A36FC1D85A3B487D8B4F596FB62C51EFF9E518E433EA4C8C";

// Get all parameters for creating/validating user
$jwt = htmlspecialchars_decode($_GET["jwt"]); 

if(empty($jwt)) {
    echo "Error: 406. Please Provide a JSON Web Token.";
    return;
}

try{
    $decoded = JWT::decode($jwt, $key, array('HS256'));
    if($decoded->eat < time()) {
        throw new Exception("Error Processing Request", 1);
    }
    
    echo json_encode($decoded);
} catch (Exception $e)  {
    echo "Error: 405. This key has been tampered with or is out of date.";
};
?>

