<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$sheetName = "sheet_1";

$borderStyle = "medium";
$borderColor = ["from" => "string", "value" => "black"];
$border = [
    "left"  =>  [
        "style" =>  $borderStyle,
        "color" =>  $borderColor 
    ],
    "top"  =>  [
        "style" =>  $borderStyle,
        "color" =>  $borderColor 
    ],
    "right"  =>  [
        "style" =>  $borderStyle,
        "color" =>  $borderColor 
    ],
    "bottom"  =>  [
        "style" =>  $borderStyle,
        "color" =>  $borderColor 
    ]
];

$style = ['border' => $border];

$export = new Export($output);
$export->addField($sheetName, 3, 3, "TEST", $style);

/*
 * row 3 and col 3 is cell D4
 * In this case, the sheet class copy the value and style of cell 3:3
 */
$export->markMergedCells($sheetName, array("row" => 3, "col" => 3), array("row" => 5, "col" => 5));

$export->saveOnDisk(__DIR__);
unset($export);