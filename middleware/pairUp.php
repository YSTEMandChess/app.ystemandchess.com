<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

$client = new MongoDB\Client('mongodb+srv://userAdmin:uUmrCVqTypLPq1Hi@cluster0-rxbrl.mongodb.net/test?retryWrites=true&w=majority');

// To pair up, continue making matches until there is no longer any people to match left
$waitingMentorCollection = $client->ystem->waitingMentors;
$waitingStudentsCollection = $client->ystem->waitingStudents;
$meetingCollection = $client->ystem->meetings;

// Get the mentors in sorted order, then get the students in sorted order.
$sortedMentorsCursor = $waitingMentorCollection->find([],["$sort" => [requestedGameAt => 1]]);
$sortedStudentsCursor = $waitingStudentsCollection->find([],["$sort" => [requestedGameAt => 1]]);
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

for($i=0; $i<$smallerArraySize; $i++) {
    $meetingCollection->insertOne([
        // MeetingID is the studentsusername and then the mentors username shoved against each other
        'meetingID' => $sortedStudentsArray[$i]->username . $sortedStudentsMentor[$i]->username,
        'studentUsername' => $sortedStudentsArray[$i]->username,
        'studentFirstName' => $sortedStudentsArray[$i]->firstName,
        'studentLastName' => $sortedStudentsArray[$i]->lastName,
        'mentorUsername' => $sortedMentorArray[$i]->username,
        'mentorFirstName' => $sortedMentorArray[$i]->firstName,
        'mentorLastName' => $sortedMentorArray[$i]->lastName,
        'MeetingInitialized' => false,
        'CurrentlyOngoing' => true,
        'meetingStartTime' => time()
    ]);
    // Now delete the waiting status of the mentor and the student.
    $waitingMentorCollection->deleteOne(['username' => $sortedMentorArray[$i]->username]);
    $waitingStudentsCollection->deleteOne(['username' => $sortedStudentsArray[$i]->username]);
    echo "Sucessfully Paired " .  $sortedMentorArray[$i]->username . " and " .  $sortedStudentsArray[$i]->username . "\n";
} 

?>
