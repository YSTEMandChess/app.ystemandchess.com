<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$jwt = htmlspecialchars_decode($_GET["jwt"]);
$credentials = json_decode(include "verifyNoEcho.php");
if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
    echo $credentials;
    return $credentials;
}
$student = "";
$client = new MongoDB\Client('mongodb+srv://userAdmin:uUmrCVqTypLPq1Hi@cluster0-rxbrl.mongodb.net/test?retryWrites=true&w=majority');
// They are a mentor, so add them to the mentor list
$collection = $client->ystem->meetings;
$userCollection = $client->ystem->users;
if($credentials->role == "mentor") {
    $searchFor = "mentorUsername";
    $cursor = $collection->find( array('mentorUsername' => $credentials->username), array("studentUsername"));
    foreach ($cursor as $doc) {
        echo $doc['studentUsername'];
        $student = $doc['studentUsername'];
    }
} else if ($credentials->role == "student") {
    $searchFor = "studentUsername";
    $cursor = $collection->find( array($searchFor => $credentials->username));
    foreach ($cursor as $doc) {
        echo $doc['studentUsername'];
        $student = $doc['studentUsername'];
    }
}
$collection->updateOne([$searchFor => $credentials->username, 'CurrentlyOngoing' => true],[
    '$set' =>
        [
            'CurrentlyOngoing' => false
        ]
    ]
);
echo $student;
$userCollection->updateOne(['username' => $student], [
    '$set' => 
    [
        'timePlayed' => 9
    ]
]);

echo "Meeting Status Updated Sucessfully.";
return "Meeting Status Updated Sucessfully.";
?>