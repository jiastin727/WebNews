<?php

require_once __DIR__ . '/../vendor/autoload.php'; // Autoload files using Composer autoload

use XLSXWriter\Export;
use XLSXWriter\Fill;
use XLSXWriter\Font;
use XLSXWriter\Border;

$output = strtolower(basename(__FILE__, ".php")) . ".xlsx";
if(file_exists($output)) {
    unlink($output);
}

$sheetName = "sheet1";
$maxRow = 500000;
$maxCol = 200;

$fills = [
    // You can add style as an array
    [
        "pattern"   =>  "solid",
        "color"     =>  [
            "from"  =>  "rgb",
            "value" => ["red" => 0, "green" => 125, "blue" => 125]
        ]
    ],
    // or as a Class
    new Fill("solid", ["from" => "string", "value" => "black"])
];

$fonts = [
    // You can add style as an array
    [
        "size"      =>  12,
        "name"      =>  "Helvetica",
        "bold"      =>  true,
        "italic"    =>  true,
        "underline" =>  true,
        "color"     =>  [
            "from"  =>  "hex",
            "value" =>  "000000"
        ]
    ],

    // or as a Class
    new Font(["size" => 20, "bold" => true, "vertalign" => "superscript", "color" => [ "from" => "hex", "value" => "EEEEEE"]])
];

$color = ["from" => "rgb", "value" => ["red" => 0, "green" => 125, "blue" => 125]];
$borders = [
    // You can add style as an array
    [
        "left"  =>  [
            "style" =>  Border::SUPPORTED_BORDER_STYLES[rand(0, count(Border::SUPPORTED_BORDER_STYLES) - 1)],
            "color" =>  $color
        ],
        "top"  =>  [
            "style" =>  Border::SUPPORTED_BORDER_STYLES[rand(0, count(Border::SUPPORTED_BORDER_STYLES) - 1)],
            "color" =>  $color
        ],
        "right"  =>  [
            "style" =>  Border::SUPPORTED_BORDER_STYLES[rand(0, count(Border::SUPPORTED_BORDER_STYLES) - 1)],
            "color" =>  $color
        ],
        "bottom"  =>  [
            "style" =>  Border::SUPPORTED_BORDER_STYLES[rand(0, count(Border::SUPPORTED_BORDER_STYLES) - 1)],
            "color" =>  $color
        ]
    ],
    // or as a Class
    new Border([
        "left"  =>  [
            "style" =>  "medium",
            "color" =>  $color
        ],
        "diagonal"  =>  [
            "style" =>  "medium",
            "color" =>  $color
        ],
        "diagonalUp"    =>  true,
        "diagonalDown"  =>  true,
    ])
];

$useTempFiles = true; // add this parameter if you want to work with huge data
$export = new Export($output, Export::DEFAULT_ENCODING, $useTempFiles);

echo "Started at: ", date('Y-m-d H:i:s'), "\n\n";

for($row = 0; $row < $maxRow; $row++) {
    $export->openRow($sheetName, $row);

    for($col = 0; $col < $maxCol; $col++) {
        $value = getValue($row, $col);
        $style = getRandomStyle(is_numeric($value));
        $export->writeCell($sheetName, $col, $value, $style);
    }

    $export->closeCurrentRow($sheetName);
    // echo "Row (" . $row + 1 . ") closed at: ", date('Y-m-d H:i:s'), "\n";
}

// echo "Save started at: ", date('Y-m-d H:i:s'), "\n";
$export->saveOnDisk(__DIR__);
unset($export);

echo "Ended at: ", date('Y-m-d H:i:s'), "\n";

echo '#'.floor((memory_get_peak_usage())/1024/1024)."MB"."\n";

function getValue(int $row, int $col) : int | string {
    /*
    if($col < 2) {
        return "CELL_" . ($col + 1);
    }

    return (int)($col + 1);
    */
    return $row + $col + 1;
}

function getRandomStyle(bool $valueIsNumber) : array {
    $style = [];
    /*
    if(rand(0, 1) === 1) {
        global $fills, $fonts, $borders;

        $fillIndex = rand(-1, count($fills) - 1);
        if($fillIndex > -1) {
            $style['fill'] = $fills[$fillIndex];
        }

        $fontIndex = rand(-1, count($fonts) - 1);
        if($fontIndex > -1) {
            $style['font'] = $fonts[$fontIndex];
        }

        $borderIndex = rand(-1, count($borders) - 1);
        if($borderIndex > -1) {
            $style['border'] = $borders[$borderIndex];
        }

        if($valueIsNumber && rand(0, 1) === 1) {
            $style['numberFormat'] = "##\%";
        }

        if(rand(0, 1) === 1) {
            $style['alignment'] = [
                "horizontal"    =>  "center",
                "vertical"      =>  "center",
                "wrapText"      =>  "1",
                "textRotation"  =>  "90"
            ];
        }
    }
    */
    return $style;
}