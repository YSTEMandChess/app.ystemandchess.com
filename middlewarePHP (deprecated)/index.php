<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
require_once 'environment.php';

// Random Key. Needs to be Changed Later
$key = $_ENV["indexKey"];
// Get all parameters for creating/validating user
$username = htmlspecialchars_decode($_GET["username"]);
$password = htmlspecialchars_decode($_GET["password"]);
$firstName = htmlspecialchars_decode($_GET["first"]);
$lastName = htmlspecialchars_decode($_GET["last"]);
$reason = htmlspecialchars_decode($_GET["reason"]);
$email = htmlspecialchars_decode($_GET["email"]);
$students = htmlspecialchars_decode($_GET["students"]);
$parentUsername = htmlspecialchars_decode($_GET["parentUsername"]);
//$jwt = htmlspecialchars_decode($_GET["jwt"]); May not be needed if this file only is going to be handing out JWT tokens / Validating users.
$role = htmlspecialchars_decode($_GET["role"]); // Role of the person: student, mentor, parent

// Determine reason

// Create. The user has not been created and will be.
if ($reason == "create") {
    if (!$username || !$password || !$firstName || !$lastName || !$role) {
        echo "Not all of the parameters were found. Please ensure that you pass: username, password, first, last, and role as well.";
        return;
    }
    createUser($username, $password, $firstName, $lastName, $email, $role, $students, $parentUsername);
// Verify. The user claims to be already in the system. Making sure that they are who they claim to be. Checking their username and password
} else if ($reason == "verify") {
    if (!$username || !$password) {
        echo "Not all of the parameters were found. Please ensure that you pass: username and password as well.";
        return;
    }
    verifyUser($username, $password);

// Authenticate. Verify that the JWT is vaalid and allow them access to the page (if they have permission)
} else if ($reason == "authenticate") {
    if (!$jwt) {
        echo "Not all of the parameters were found. Please ensure that you pass: jwt as well.";
        return;
    }
// Something went wrong.
} else {
    echo "Invalid reason. Must be create, verify, authenticate.";
    return;
}



function createUser($username, $password, $firstName, $lastName, $email, $role, $students, $parentUsername) {
    // MONGO DB LOGIN
    $client = new MongoDB\Client($_ENV["mongoCredentials"]);
    // Select the user collection
    $collection = $client->ystem->users;

    if(isTakenUsername($username, $collection)) {
        echo "This username has been taken. Please choose another.";
        return;
    };

    $hashPass = hash("sha384",$password);

    if($role == 'parent') {
        // They are a parent, will need to create a different document
        try {
            $studentInfo = json_decode($students);
        } catch(Exception $e) {
            echo "Error decoding json.\n";
            return;
        }
        
        for($i=0; $i<count($studentInfo); $i++) {
            if(isTakenUsername($studentInfo[$i]->username, $collection)) {
                echo "Student ";
                echo $i;
                echo "username has been taken. Please choose another.";
                return;
            };
        }

        $sUsernames = [];
        for($i=0; $i<count($studentInfo); $i++) {
            $studentUsername = $studentInfo[$i]->username;
            $studentFirst = $studentInfo[$i]->first;
            $studentLast = $studentInfo[$i]->last;
            $studentPassword = hash("sha384",$studentInfo[$i]->password);
            $lessonsCompleted = createLessonObject();
            // insert all students into the collection
            $collection->insertOne([
                'username' => $studentUsername,
                'password' => $studentPassword,
                'firstName' => $studentFirst,
                'lastName' => $studentLast,
                'parentUsername' => $username,
                'role' => 'student',
                'timePlayed' => '0 hr: 0 min',
                'lessonsCompleted' => $lessonsCompleted,
                'accountCreatedAt' => time()
            ]);
        }
        // Create the parent account
        $collection->insertOne([
            'username' => $username,
            'password' => $hashPass,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'role' => $role,
            'children' => $sUsernames,
            'accountCreatedAt' => time()
        ]);
        
    } else if($role == 'student') {
        // If they are a student, then we will need to add a link to the parent.
        $lessonsCompleted = createLessonObject();
        $collection->insertOne([
            'username' => $username,
            'password' => $hashPass,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'role' => $role,
            'lessonsCompleted' => $lessonsCompleted,
            'timePlayed' => '0 hr: 0 min',
            'accountCreatedAt' => time()
        ]);
        // Now find the parent and update their children.
        $collection->updateOne(['username' => $parentUsername],[
            '$push' =>
                [
                    'children' => $username
                ]
            ]
        );
        
    } else {
        $collection->insertOne([
            'username' => $username,
            'password' => $hashPass,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'role' => $role,
            'accountCreatedAt' => time()
        ]);
    }

    $payload = array(
        'username' => $username,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'role' => $role,
        'iat' => time(),
        'eat' => strtotime("+30 days")
    );

    $jwt = JWT::encode($payload, $_ENV["indexKey"], 'HS512');
    echo $jwt;
}

function createLessonObject() {
    $lessons = [];
    $pawnLessonObject = (object)array('piece' => 'pawn', 'lessonNumber' => 0);
    $rookLessonObject = (object)array('piece' => 'rook', 'lessonNumber' => 0);
    $bishopLessonObject = (object)array('piece' => 'bishop', 'lessonNumber' => 0);
    $kingLessonObject = (object)array('piece' => 'king', 'lessonNumber' => 0);
    $queenLessonObject = (object)array('piece' => 'queen', 'lessonNumber' => 0);
    $horseLessonObject = (object)array('piece' => 'horse', 'lessonNumber' => 0);
    array_push($lessons, $horseLessonObject);
    array_push($lessons, $queenLessonObject);
    array_push($lessons, $kingLessonObject);
    array_push($lessons, $bishopLessonObject);
    array_push($lessons, $pawnLessonObject);
    array_push($lessons, $rookLessonObject);
    return $lessons;
}

function verifyUser($username, $password) {
    // MONGO DB LOGIN
    //echo $_ENV["indexKey"];
    $client = new MongoDB\Client($_ENV["mongoCredentials"]);
    // Select the user collection

    $hashPass = hash("sha384",$password);

    $collection = $client->ystem->users;

    $document = $collection->findOne(['username' => $username]);
    if($document['password'] == $hashPass) {
        if($document['role'] == 'student') {
            $payload = array(
                'username' => $username,
                'firstName' => $document['firstName'],
                'lastName' => $document['lastName'],
                'role' => $document['role'],
                'email' => $document['email'],
                'parentUsername' => $document['parentUsername'],
                'iat' => time(),
                'eat' => strtotime("+30 days")
            );
        } else {
            $payload = array(
                'username' => $username,
                'firstName' => $document['firstName'],
                'lastName' => $document['lastName'],
                'role' => $document['role'],
                'email' => $document['email'],
                'iat' => time(),
                'eat' => strtotime("+30 days")
            );
        }
        $jwt = JWT::encode($payload, $_ENV["indexKey"], 'HS512');
        echo $jwt;
    } else {
        echo "The username or password is incorrect.";
    }
}

function isTakenUsername($username, $collection) {
    $document = $collection->findOne(['username' => $username]);
    if(is_null($document)) {
        return false;
    } else {
        return true;
    }
}

?>
