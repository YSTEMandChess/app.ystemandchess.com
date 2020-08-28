<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
require_once 'environment.php';

// Random Key. Needs to be Changed Later
$jwt = htmlspecialchars_decode($_GET["jwt"]);
$student = htmlspecialchars_decode($_GET["student"]);
$credentials = json_decode(include "verifyNoEcho.php");

if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}

$client = new MongoDB\Client($_ENV["mongoCredentials"]);
    // Select the user collection
$collection = $client->ystem->users;
$recordingDoc = "";

if($credentials->role == "student") { $recordingDoc = $collection->findOne(["username" => $credentials->username]); }
else if($credentials->role == "parent") { $recordingDoc = $collection->findOne(["username" => $student]);}


$recordings = [];
foreach ($recordingDoc["recordingList"] as $recording) {;
    array_push($recordings, $recording); 
}

echo json_encode($recordings);
?>