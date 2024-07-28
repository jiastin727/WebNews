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

$maxSheets = 2;
$maxRow = 3;
$maxCol = 10;

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

$export = new Export($output);

for($sheet = 1; $sheet <= $maxSheets; $sheet++) {
    $sheetName = "sheet_" . $sheet;

    for($row = 0; $row < $maxRow; $row++) {
        for($col = 0; $col < $maxCol; $col++) {
            $value = getValue($col);
            $style = getRandomStyle(is_numeric($value));
            $export->addField($sheetName, $row, $col, $value, $style);
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

function getRandomStyle($valueIsNumber) : array {
    global $fills, $fonts, $borders;

    $style = [];

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

    return $style;
}