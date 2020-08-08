<?php 

// NEED filename


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
/*
$cmd = $s3->getCommand('GetObject', [
    'Bucket' => 'ystemandchess-meeting-recordings',
    'Key' => $filename
]);

$request = $s3->createPresignedRequest($cmd, '+20 minutes');
$presignedUrl = (string)$request->getUri();
*/
$fileContents = $s3->getObject([
    'Bucket' => 'ystemandchess-meeting-recordings',
    'Key' => $filename
]);

file_put_contents($filename, $fileContents['Body']->getContents());

$handle = fopen($filename, "r");
if ($handle) {
    $fc = "";
    while (($line = fgets($handle)) !== false) {
        if($line[0] != '#' ) {
            $newFL = substr($line, 0, -1);
            
            $cmd = $s3->getCommand('GetObject', [
                'Bucket' => 'ystemandchess-meeting-recordings',
                'Key' => $newFL
            ]);
            
            $request = $s3->createPresignedRequest($cmd, '+604800 seconds');
            $presignedUrl = (string)$request->getUri();
            $fc .= $presignedUrl . "\n";
        } else {
            $fc .= $line;
        }
    }
    fclose($handle);
} else {
    // error opening the file.
}

file_put_contents($filename, $fc);
$result = $s3->putObject(array(
    'Bucket'     => 'ystemandchess-meeting-recordings',
    'Key'        => $filename,
    'SourceFile' => $filename,
));

unlink($filename);

?>