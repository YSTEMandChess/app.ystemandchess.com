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
$student = "";
$meetingStartTime = "";
$client = new MongoDB\Client($_ENV["mongoCredentials"]);
// They are a mentor, so add them to the mentor list
$collection = $client->ystem->meetings;
$userCollection = $client->ystem->users;

if($credentials->role == "mentor") {
    $searchFor = "mentorUsername";
    $cursor = $collection->find( array('mentorUsername' => $credentials->username), array("studentUsername"));
    foreach ($cursor as $doc) {
        //echo $doc['studentUsername'];
        $student = $doc['studentUsername'];
    }

    $timeCursor = $collection->find( array('mentorUsername' => $credentials->username), array("meetingStartTime"));
    foreach ($timeCursor as $doc) {
        $meetingStartTime = $doc['meetingStartTime'];
    }
} else if ($credentials->role == "student") {
    $searchFor = "studentUsername";

    $cursor = $collection->find( array($searchFor => $credentials->username));
    foreach ($cursor as $doc) {
        //echo $doc['studentUsername'];
        $student = $doc['studentUsername'];
    }

    $timeCursor = $collection->find( array($searchFor => $credentials->username), array("meetingStartTime"));
    foreach ($timeCursor as $doc) {
        $meetingStartTime = $doc['meetingStartTime'];
    }
}
try {
    $document = $collection->findOne(['CurrentlyOngoing' => true, $searchFor => $credentials->username]);
    if(!is_null($document)) {
        include_once "record.php";
        $info = stopRecording($queryURL, $document->meetingID, $uid, $auth, $document->resourceId, $document->sid);
        $collection->findOne(['CurrentlyOngoing' => true, $searchFor => $credentials->username]);
        $videoName = json_decode($info)->serverResponse->fileList;
        $title = $document->meetingID . "_" . $document->mentorUsername . "_" . $document->studentUsername . "_" . $document->meetingStartTime;
        $userCollection->updateOne(['username' => $document->studentUsername], ['$push' => ['recordingList' => [ 'video' => $videoName, 'recordingDate' => date("l jS \of F Y"), 'title' => $title]]]);
        $userCollection->updateOne(['username' => $document->mentorUsername], ['$push' => ['recordingList' => [ 'video' => $videoName, 'recordingDate' => date("l jS \of F Y"), 'title' => $title]]]);
        $collection->deleteOne([$searchFor => $credentials->username]);
    }
} catch(Exception $E) {
    echo "meeting is not being recorded";
}

$collection->updateOne(['CurrentlyOngoing' => true, $searchFor => $credentials->username],[
    '$set' =>
        [
            'CurrentlyOngoing' => false
        ]
    ]
);

$meetingEndTime = date("H:i");
$hours = $meetingEndTime-$meetingStartTime;

$startMinutes = substr($meetingStartTime, 3);
$endMinutes = substr($meetingEndTime, 3);

if(($meetingEndTime-$meetingStartTime) > 0 && $endMinutes < $startMinutes) {
    $endMinutes = $endMinutes + 60;
    $hours = $hours-1;
}

// minutes in meeting
$minutes = $endMinutes - $startMinutes;

//hours and minutes of meeting
$timePlayed = $hours . ":" . ($endMinutes-$startMinutes);

$totalHours = "";

//get total time played by student before meeting
$c = $userCollection->find( array("username" => $student), array("timePlayed"));
    foreach ($c as $doc) {
        $totalTime = $doc['timePlayed'];
    }

$totalMinutes = substr($totalTime, 6, 3); //1 hr : 20 min
$newTotalHours = $totalTime + $hours;
$newTotalMinutes = (int)$totalMinutes + $minutes;

if($newTotalMinutes > 59) {
    $newTotalHours += 1;
    $newTotalMinutes -= 60;
}

$userCollection->updateOne(['username' => $student], [
    '$set' =>
    [
         'timePlayed' => $newTotalHours . " hr: " . $newTotalMinutes . " min"
    ]
]);

echo "Meeting Status Updated Sucessfully.";
return "Meeting Status Updated Sucessfully.";
?>