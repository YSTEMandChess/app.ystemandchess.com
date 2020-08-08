<?php 

// NEED filename
$filename = "00e7fb6aaf48251fcc85cb9421366b68_205f25ae18950eb.m3u8";

// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");
// Load the JWT library
require_once __DIR__ . '/vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

$s3 = new Aws\S3\S3Client([
    'version' => 'latest',
    'region' => 'us-east-2',
    'credentials' => [
        'key'    => 'AKIA3W5HAAMI6L45OV5X',
        'secret' => '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'
    ]
]);

$cmd = $s3->getCommand('GetObject', [
    'Bucket' => 'ystemandchess-meeting-recordings',
    'Key' => $filename
]);

$request = $s3->createPresignedRequest($cmd, '+20 minutes');
$presignedUrl = (string)$request->getUri();
echo($presignedUrl)
?>

https://s3.us-east-2.amazonaws.com/ystemandchess-meeting-recordings/prog_index.m3u8