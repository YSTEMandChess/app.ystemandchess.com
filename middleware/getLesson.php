<?php
    // Allow Cross Origin Requests (other ips can request data)
    header("Access-Control-Allow-Origin: *");
    // Load the JWT library
    require_once __DIR__ . '/vendor/autoload.php';
    use \Firebase\JWT\JWT;

    $jwt = htmlspecialchars_decode($_GET["jwt"]);
    $piece = htmlspecialchars_decode($_GET["piece"]);
    $lessonNum = htmlspecialchars_decode($_GET["lessonNumber"]);
    $credentials = json_decode(include "verifyNoEcho.php");

    if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
        echo $credentials;
        return $credentials;
    }

    $client = new MongoDB\Client('mongodb+srv://userAdmin:uUmrCVqTypLPq1Hi@cluster0-rxbrl.mongodb.net/test?retryWrites=true&w=majority');
    $collection = $client->ystem->lessons;

    $userDoc = $collection->findOne(["piece" => $piece]);

    $currentLesson = [];
    foreach($userDoc["lessons"] as $lesson) {
        //completed lessons for students are one previous, that
        //is why their is plus 1 to get the current lesson
        if($lesson['lessonNumber'] == 1+$lessonNum) {
            $currentLesson = $lesson;
            break;
        }
    }

    echo json_encode($currentLesson);
?>