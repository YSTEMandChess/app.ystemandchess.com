<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
require_once 'environment.php';

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$credentials = json_decode(include "verifyNoEcho.php");
if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}
$client = new MongoDB\Client($_ENV["mongoCredentials"]);
$collection = $client->ystem->meetings;

if($credentials->role == "mentor") {
    $keyQuery = "mentorUsername";
} else if($credentials->role == "student") {
    $keyQuery = "studentUsername";
} else {
    echo "Please be either a student or a mentor.";
    return;
}
$document = $collection->findOne([$keyQuery => $credentials->username, "CurrentlyOngoing" => true]);
if(is_null($document)) {
    echo "There are no current meetings with this user.";
    return;
}
echo json_encode($document);
?>