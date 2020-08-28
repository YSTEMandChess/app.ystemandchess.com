<?php
    // Allow Cross Origin Requests (other ips can request data)
    header("Access-Control-Allow-Origin: *");
    // Load the JWT library
    require_once __DIR__ . '/vendor/autoload.php';
    use \Firebase\JWT\JWT;
    require_once 'environment.php';

    $jwt = htmlspecialchars_decode($_GET["jwt"]);
    $piece = htmlspecialchars_decode($_GET["piece"]);
    $lessonNum = htmlspecialchars_decode($_GET["lessonNumber"]);
    $credentials = json_decode(include "verifyNoEcho.php");

    if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
        echo $credentials;
        return $credentials;
    }

    $client = new MongoDB\Client($_ENV["mongoCredentials"]);
    $collection = $client->ystem->users;

    $index = 0;
    $cursor = $collection->findOne(array("username" => $credentials->username), array("lessonsCompleted"));
    printf("before iterations");
    echo "<br>";
    foreach($cursor['lessonsCompleted'] as $lesson) {
        if(strcmp($lesson->piece, $piece) == 0) {
            break;
        }
        $index++;
    }

    printf($piece);
    echo "<br>";
    //printf($index);
    printf($lessonNum);

    $collection->updateOne(['username' => $credentials->username], [
        '$set' => 
        [
            'lessonsCompleted.'.$index => ['piece' => $piece, 'lessonNumber' => 1+$lessonNum]
        ]
    ]);
?>