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
    $collection = $client->ystem->users;

    $index = -1;
    $cursor = $collection->find(array("username" => $credentials->username), array("lessonsCompleted"));
    foreach($cursor as $doc) {
        if(strcmp($doc->piece, $piece) == 0) {
            break;
        }
        $index++;
    }

    printf($piece);
    printf($index);
    printf($lessonNum);

    $collection->updateOne(['username' => $credentials->username], [
        '$set' => 
        [
            'lessonsCompleted.'.$index => ['piece' => $piece, 'lessonNumber' => 1+$lessonNum]
        ]
    ]);
?>