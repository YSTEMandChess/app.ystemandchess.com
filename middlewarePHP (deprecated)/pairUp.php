<?php
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
require_once 'environment.php';

$client = new MongoDB\Client($_ENV["mongoCredentials"]);

// To pair up, continue making matches until there is no longer any people to match left
$waitingMentorCollection = $client->ystem->waitingMentors;
$waitingStudentsCollection = $client->ystem->waitingStudents;
$meetingCollection = $client->ystem->meetings;

// Get the mentors in sorted order, then get the students in sorted order.
$sortedMentorsCursor = $waitingMentorCollection->find([],[$sort => ["requestedGameAt" => 1]]);
$sortedStudentsCursor = $waitingStudentsCollection->find([],[$sort => ["requestedGameAt" => 1]]);
// Get first doc of both
$sortedMentorArray = [];
$sortedStudentsArray = [];

// Get all of elements in the arrays
foreach ($sortedMentorsCursor as $doc) {
    array_push($sortedMentorArray, $doc);
}
foreach ($sortedStudentsCursor as $doc) {
    array_push($sortedStudentsArray, $doc);
}

if(count($sortedMentorArray) > count($sortedStudentsArray)) {
    $smallerArraySize = count($sortedStudentsArray);
} else {
    $smallerArraySize = count($sortedMentorArray);
}

include "record.php";

for($i=0; $i<$smallerArraySize; $i++) {
//if ($smallerArraySize >= 1) {
    $document = $meetingCollection->findOne(["mentorUsername" => $sortedMentorArray[$i]->username, "CurrentlyOngoing" => true]);
    if(is_null($document)) {

        // Now delete the waiting status of the mentor and the student.
        $waitingMentorCollection->deleteOne(['username' => $sortedMentorArray[$i]->username]);
        $waitingStudentsCollection->deleteOne(['username' => $sortedStudentsArray[$i]->username]);
        //echo "Sucessfully Paired " .  $sortedMentorArray[$i]->username . " and " .  $sortedStudentsArray[$i]->username . "\n";

        $meetingID = uniqid(20);
        $rec = startRecording($queryURL, $meetingID, $uid, $auth);
        $meetingCollection->insertOne([
            // MeetingID is the studentsusername and then the mentors username shoved against each other
            'meetingID' => $meetingID,
            'password' => uniqidReal(20),
            'studentUsername' => $sortedStudentsArray[$i]->username,
            'studentFirstName' => $sortedStudentsArray[$i]->firstName,
            'studentLastName' => $sortedStudentsArray[$i]->lastName,
            'mentorUsername' => $sortedMentorArray[$i]->username,
            'mentorFirstName' => $sortedMentorArray[$i]->firstName,
            'mentorLastName' => $sortedMentorArray[$i]->lastName,
            'CurrentlyOngoing' => true,
            'resourceId' => $rec[1],
            'sid' => $rec[0],
            'meetingStartTime' => date("H:i")
        ]);
    }
}

function uniqidReal($length) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($length / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($length / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $length);
}

?>