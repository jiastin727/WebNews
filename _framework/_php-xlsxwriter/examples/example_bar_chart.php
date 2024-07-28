<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;
use XLSXWriter\Chart\BarChart\BarChart;
use XLSXWriter\Chart\BarChart\Bar;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$sheetName = "sheet1";
$style = ["numberFormat" => "#,##0.00\ [\$Ft-hu-HU]"];

$EURToHUF = ["EUR TO HUF", 380.71, 381.92, 382.10, 382.56, 378.65];
$USDToHUF = ["USD TO HUF", 362.15, 362.15, 362.15, 365.00, 360.87]; 
$dates = ["Date", "2022.05.06.", "2022.05.07.", "2022.05.08.", "2022.05.09.", "2022.05.10."];

$data = [$EURToHUF, $USDToHUF, $dates];
$maxRow = count($data);

$export = new Export($output);

$chart = new BarChart();
$chart->setTitle("EUR (€) & USD ($) to HUF (Ft)");
$chart->setPosition($maxRow, 0);
$chart->setXAxis($sheetName, $maxRow - 1, 1, count($data[$maxRow - 1]) - 1);
$chart->setShowLegend(true);

// $chart->setLegendPosition('t'); // top
// $chart->setLegendPosition('b'); // bottom
// $chart->setLegendPosition('l'); // left
$chart->setLegendPosition('r'); // right

for($row = 0; $row < $maxRow; $row++) {
    $dataRow = $data[$row];
    $maxData = count($dataRow);
    for($col = 0; $col < $maxData; $col++) {
        $value = $dataRow[$col];
        $s = $col > 0 && $row < $maxRow - 1 ? $style : [];
        $export->addField($sheetName, $row, $col, $value, $s);
    }

    if($row < $maxRow - 1) {
        $bar = new Bar();
        $bar->setTitle($sheetName, $row, 0);
        $bar->setData($sheetName, $row, 1, $maxData - 1);
        $chart->addBar($bar);
    }
}

$export->addChart($sheetName, $chart);
$export->saveOnDisk(__DIR__);
unset($export);