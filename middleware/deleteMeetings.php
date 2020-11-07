<?php 
// Allow Cross Origin Requests (other ips can request data)
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/vendor/autoload.php';
require_once 'environment.php';

$client = new MongoDB\Client($_ENV["mongoCredentials"]);
$collection = $client->ystem->meetings;

$amount = $collection->count(array('CurrentlyOngoing' => false));

while($amount > 0) {
    $collection->deleteOne(['CurrentlyOngoing' => false]);
    $amount--;
    echo "$amount";
}
?>