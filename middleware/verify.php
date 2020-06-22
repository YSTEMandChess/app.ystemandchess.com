<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Random Key. Needs to be Changed Later

// Get all parameters for creating/validating user
$jwt = htmlspecialchars_decode($_GET["jwt"]); 

if(empty($jwt)) {
    echo "Error: 406. Please Provide a JSON Web Token.";
    return "Error: 406. Please Provide a JSON Web Token.";
}

try{
    $decoded = JWT::decode($jwt, "4F15D94B7A5CF347A36FC1D85A3B487D8B4F596FB62C51EFF9E518E433EA4C8C", array('HS512'));
    if($decoded->eat < time()) {
        throw new Exception("Error Processing Request", 1);
    }
    
    echo json_encode($decoded);
    return $decoded;
} catch (Exception $e)  {
    echo "Error: 405. This key has been tampered with or is out of date.";
    return "Error: 405. This key has been tampered with or is out of date.";
};
?>

