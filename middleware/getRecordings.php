<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Random Key. Needs to be Changed Later
$jwt = htmlspecialchars_decode($_GET["jwt"]);
$credentials = json_decode(include "verifyNoEcho.php");

if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}

if($credentials->role != 'student') {
    echo "only students have associated recordings";
    return;
}

$client = new MongoDB\Client('mongodb+srv://userAdmin:uUmrCVqTypLPq1Hi@cluster0-rxbrl.mongodb.net/test?retryWrites=true&w=majority');
    // Select the user collection
$collection = $client->ystem->users;
$recordingDoc = $collection->findOne(["username" => $credentials->username]);

$recordings = [];
foreach ($recordingDoc["recordingList"] as $recording) {;
    array_push($recordings, $recording); 
}

echo json_encode($recordings);
?>