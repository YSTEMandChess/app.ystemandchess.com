<?php
$s = "17:40";
$e = "23:22";
$hours = $e-$s;

$sMin = substr($s, 3);
$eMin = substr($e, 3);

if(($e-$s) > 0 && $eMin < $sMin) {
    $eMin = $eMin + 60;
    $hours = $hours-1;
}

$minutes = $eMin-$sMin-40;
$minutes += 2;

$timePlayed = $hours . " hrs: " . $minutes . " min";

$c = $timePlayed[7] . $timePlayed[8];

echo $c

//echo $e-$s;
//echo $eMin;

?>