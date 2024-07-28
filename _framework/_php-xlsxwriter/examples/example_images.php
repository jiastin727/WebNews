<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$imgDir = __DIR__ . '/../images/';
$maxSheets = 2;
$images = [[
    "file"  =>  $imgDir . 'img.png',
    "row"   =>  0,
    "col"   =>  0
], [
    "file"  =>  $imgDir . 'img_2.png',
    "row"   =>  0,
    "col"   =>  2
], [
    "file"  =>  $imgDir . 'img_3.png',
    "row"   =>  0,
    "col"   =>  4
]];

$export = new Export($output);

for($sheet = 1; $sheet <= $maxSheets; $sheet++) {
    $sheetName = "sheet " . $sheet;
    foreach($images as $image) {
        $export->addImage($sheetName, $image['file'], $image['row'], $image['col']);
    }
}

$export->saveOnDisk(__DIR__);
unset($export);