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
// They are a mentor, so add them to the mentor list
if($credentials->role == "mentor") {
    $collection = $client->ystem->waitingMentors;
} else if($credentials->role == "student") {
    $collection = $client->ystem->waitingStudents;
} else {
    echo "Please be either a student or a mentor.";
    return;
}
if(is_null($collection->findOne(['username'=>$credentials->username]))) {
    echo "Person is not waiting for a match.";
    return;
}
$collection->deleteOne(['username'=>$credentials->username]);

echo "Person Removed Sucessfully.";
return "Person Removed Sucessfully";
?>
