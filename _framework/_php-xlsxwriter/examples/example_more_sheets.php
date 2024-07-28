<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$maxSheets = 3;
$maxRow = 3;
$maxCol = 10;

$export = new Export($output);

for($sheet = 1; $sheet <= $maxSheets; $sheet++) {
    $sheetName = "sheet_" . $sheet;

    for($row = 0; $row < $maxRow; $row++) {
        for($col = 0; $col < $maxCol; $col++) {
            $value = getValue($col);
            $export->addField($sheetName, $row, $col, $value);
        }
    }
}

$export->saveOnDisk(__DIR__);
unset($export);

function getValue(int $col) : int | string {
    if($col < 5) {
        return "CELL_" . ($col + 1);
    }

    return (int)($col + 1);
}