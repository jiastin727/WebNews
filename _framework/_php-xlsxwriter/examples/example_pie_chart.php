<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;
use XLSXWriter\Chart\PieChart\PieChart;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$sheetName = "sheet_1";
$legends = ["PHP", "React", "nodeJS", "TypeScript", "vue.js", "next.js"];
$data    = [   45,      40,       35,           30,       25,        20];

$export = new Export($output);

$row = 0;
for($i = 0; $i < count($legends); $i++) {
    $col = 0;
    $legend = $legends[$i];
    $legendData = $data[$i] ?? 0;

    $export->addField($sheetName, $row, $col++, $legend);
    $export->addField($sheetName, $row, $col, $legendData);

    $row++;
}

$chart = new PieChart();
$chart->setTitle("Lovers of the languages");
$chart->setPosition($row, 0);
$chart->setShowLegend(true);

// $chart->setLegendPosition('t'); // top
$chart->setLegendPosition('b'); // bottom
// $chart->setLegendPosition('l'); // left
// $chart->setLegendPosition('r'); // right

$chart->setLegend($sheetName, 0, $row - 1, 0, 0);
$chart->setPies($sheetName, 0, $row - 1, 1, 1);

$export->addChart($sheetName, $chart);

$sheetName = "sheet_2";
$row = 0;
$col = 0;
foreach($legends as $legend) {
    $export->addField($sheetName, $row, $col++, $legend);
}

$row++;
$col = 0;
foreach($data as $legendData) {
    $export->addField($sheetName, $row, $col++, $legendData);
}
$row++;

$chart = new PieChart();
$chart->setTitle("Lovers of the languages");
$chart->setPosition($row, 0);
$chart->setShowLegend(true);
$chart->setLegendPosition('r');

$chart->setLegend($sheetName, 0, 0, 0, count($legends) - 1);
$chart->setPies($sheetName, 1, 1, 0, count($data) - 1);

$export->addChart($sheetName, $chart);

$export->saveOnDisk(__DIR__);
unset($export);