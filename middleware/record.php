  
<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once 'environment.php';

$appID = $_ENV["appID"];
$auth = $_ENV["auth"];
$channelName = $_ENV["channel"];
$uid = $_ENV["uid"];

// AWS Information // NOTE: Changing these values will not do anything. Need to edit them i $startBody and other actual passed values.
$accessKey = $_ENV["awsAccessKey"];
$secretKey = $_ENV["awsSecretKey"];

$vendor = 1;
$region= 1;
$bucketName = "ystemandchess-meeting-recordings";

$queryURL = "https://api.agora.io/v1/apps/" . $appID . "/cloud_recording/";


function startRecording($queryURL, $channelName, $uid, $auth) {
    $resourceID = acquireRecording($queryURL, $channelName, $uid, $auth);
    echo "Resource ID: " . $resourceID;
    $sid = postStartRecording($queryURL, $resourceID, $auth, $uid, $channelName);   
    return $sid;

}

function acquireRecording($url, $cname, $uid, $auth){
    $client = new GuzzleHttp\Client();
    $encodingString = "{\"cname\":\"". $cname ."\",\"uid\":\"" . $uid . "\",\"clientRequest\":{\"resourceExpiredHour\":24}}";
    //addslashes(json_encode($body));
    
    $response = $client->request(
        'POST',
        $url . "acquire",
        [
            'headers' => array('Content-type' => "application/json", "Authorization" => $auth),
            'body' => $encodingString
        ]
    );

    $bdy = $response->getBody()->getContents();
    return (json_decode($bdy)->resourceId);
}

function postStartRecording($queryURL, $resourceID, $auth, $uid, $cname) {
    $client = new GuzzleHttp\Client();

    $newURL = $queryURL . "resourceid/" . $resourceID . "/mode/mix/start";
    // Need to change the contents of startBody in the case that tokens change and whatnot
    $startBody = "{\"uid\":\"".$uid."\",\"cname\":\"".$cname."\",\"clientRequest\":{\"storageConfig\":{\"secretKey\":\"".$_ENV["awsSecretKey"]."\",\"region\":1,\"accessKey\":\"".$_ENV["awsAccessKey"]."\",\"bucket\":\"ystemandchess-meeting-recordings\",\"vendor\":1},\"recordingConfig\":{\"audioProfile\":0,\"channelType\":0,\"maxIdleTime\":30,\"transcodingConfig\":{\"width\":1280,\"height\":720,\"fps\":15,\"bitrate\":600,\"mixedVideoLayout\":3,\"backgroundColor\":\"#000000\",\"layoutConfig\":[{\"x_axis\":0,\"y_axis\":0,\"width\":0.5,\"height\":1,\"alpha\":1,\"render_mode\":1},{\"x_axis\":0.5,\"y_axis\":0,\"width\":0.5,\"height\":1,\"alpha\":1,\"render_mode\":1}]}}}}";
    //echo $startBody;
    //echo $newURL;
    $response = $client->request(
        'POST',
        $newURL,
        [
            'headers' => array('Content-type' => "application/json", "Authorization" => $auth),
            'body' => $startBody
        ]
    );

    $body = $response->getBody()->getContents();
    echo "<br>SID: " . (json_decode($body)->sid);
    return array((json_decode($body)->sid), $resourceID);
}

function stopRecording($queryURL, $channelName, $uid, $auth, $resourceID, $sid) {
    $client = new GuzzleHttp\Client();
    echo "Stopping the recording";
    
    $newURL = $queryURL . "resourceid/" . $resourceID . "/sid/" . $sid . "/mode/mix/stop";
    // Need to change the contents of startBody in the case that tokens change and whatnot
    $stopBody = "{\"uid\":\"" . $uid . "\",\"cname\":\"" . $channelName . "\",\"clientRequest\":{}}";
    //echo $startBody;
    //echo $newURL;

    $response = $client->request(
        'POST',
        $newURL,
        [
            'headers' => array('Content-type' => "application/json", "Authorization" => $auth),
            'body' => $stopBody
        ]
    );

    $body = $response->getBody()->getContents();
    echo "<br>Stopping Recording: " . (($body)->serverResponse->fileList);
    return (($body));
}