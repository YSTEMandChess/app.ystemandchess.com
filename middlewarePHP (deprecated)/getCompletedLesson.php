<?php 
    // Allow Cross Origin Requests (other ips can request data)
    header("Access-Control-Allow-Origin: *");
    // Load the JWT library
    require_once __DIR__ . '/vendor/autoload.php';
    use \Firebase\JWT\JWT;
    require_once 'environment.php';

    $jwt = htmlspecialchars_decode($_GET["jwt"]);
    $piece = htmlspecialchars_decode($_GET["piece"]);
    $credentials = json_decode(include "verifyNoEcho.php");

    if($credentials == "Error: 405. This key has been tampered with or is out of date." || $credentials == "Error: 406. Please Provide a JSON Web Token.") {
        echo $credentials;
        return $credentials;
    }

    $client = new MongoDB\Client($_ENV["mongoCredentials"]);
    $collection = $client->ystem->users;

    $lessonNum = 0;

    $cursor = $collection->findOne(array("username" => $credentials->username), array("lessonsCompleted"));
    foreach($cursor['lessonsCompleted'] as $chessPiece) {
        if(strcmp($chessPiece->piece, $piece) == 0) {
            $lessonNum = $chessPiece->lessonNumber;
            break;
        }
    }

    echo json_encode($lessonNum);
?>