<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;
use XLSXWriter\Chart\LineChart\LineChart;
use XLSXWriter\Chart\LineChart\Line;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$sheetName = "sheet1";

$maxRow = 10;
$maxCol = 30;

$export = new Export($output);
$chart = new LineChart();
$chart->setTitle("Title Of Chart");
$chart->setPosition($maxRow, 0);

$chart->setShowLegend(true);
// $chart->setLegendPosition('t'); // top
$chart->setLegendPosition('b'); // bottom
// $chart->setLegendPosition('l'); // left
// $chart->setLegendPosition('r'); // right

for($row = 0; $row < $maxRow; $row++) {
    $export->addField($sheetName, $row, 0, "Line " . $row + 1);
    
    for($col = 1; $col < $maxCol; $col++) {
        $value = rand(0, $maxCol);
        $export->addField($sheetName, $row, $col, $value);
    }
    $line = new Line();
    $line->setTitle($sheetName, $row, 0);
    $line->setData($sheetName, $row, 1, $maxCol - 1);
    $chart->addLine($line);
}

$export->addChart($sheetName, $chart);

$chart = new LineChart();
$chart->setTitle("Title Of Chart 2 ");
$chart->setPosition(0, 0);
$chart->addLine($line);

$line = new Line();
$line->setData($sheetName, 1, 1, 3);
$chart->addLine($line);

$export->addChart("sheet2", $chart);

$export->saveOnDisk(__DIR__);
unset($export);