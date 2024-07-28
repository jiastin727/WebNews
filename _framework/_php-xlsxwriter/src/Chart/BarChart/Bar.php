<?php

namespace XLSXWriter\Chart\BarChart;

use XLSXWriter\Sheet;

class Bar {
    private int $id = -1;
    private ?string $title = null;
    private array $titleData = [];
    private ?string $reference = null;
    private array $referenceData = [];

    public function setID(int $id) {
        if($this->id === -1) {
            if($id < 0) {
                throw new \InvalidArgumentException("ID cannot be less than 0");
            }
    
            $this->id = $id;
        }
    }

    public function setTitle(string $sheetName, int $row, int $col) {
        $this->titleData = ["sheetName" => $sheetName, "row" => $row, "col" => $col];
    }

    public function removeTitle() {
        $this->titleData = [];
    }

    public function setData(string $sheetName, int $row, int $fromCol, int $toCol) {
        $this->referenceData = ["sheetName" => $sheetName, "row" => $row, "fromCol" => $fromCol, "toCol" => $toCol];
    }

    public function finalize(array $sheetNames) {
        try {
            $this->finalizeTitle($sheetNames);
            $this->finalizeReference($sheetNames);
        } catch(\InvalidArgumentException $e) {
            throw $e;
        }
    }

    private function finalizeTitle(array $sheetNames) {
        if(count($this->titleData) === 3) {
            if(!in_array($this->titleData["sheetName"], $sheetNames)) {
                throw new \InvalidArgumentException("Cannot found sheet: " . $this->titleData["sheetName"]);
            }

            if($this->titleData["row"] < 0) {
                throw new \InvalidArgumentException("Row cannot be less than 0");
            }

            if($this->titleData["col"] < 0) {
                throw new \InvalidArgumentException("Col cannot be less than 0");
            }

            $this->title = "'" . $this->titleData["sheetName"] . "'" . '!' . Sheet::getXLSCell($this->titleData["row"], $this->titleData["col"], true);
        }
    }

    public function finalizeReference(array $sheetNames) {
        if(!in_array($this->referenceData["sheetName"], $sheetNames)) {
            throw new \InvalidArgumentException("Cannot found sheet: " . $this->referenceData["sheetName"]);
        }

        if($this->referenceData["row"] < 0) {
            throw new \InvalidArgumentException("Row cannot be less than 0");
        }

        if($this->referenceData["fromCol"] < 0) {
            throw new \InvalidArgumentException("fromCol cannot be less than 0");
        }

        if($this->referenceData["toCol"] < 0) {
            throw new \InvalidArgumentException("toCol cannot be less than 0");
        }

        if($this->referenceData["fromCol"] == $this->referenceData["toCol"]) {
            throw new \InvalidArgumentException("fromCol and toCol cannot be equal");
        }

        if($this->referenceData["fromCol"] > $this->referenceData["toCol"]) {
            $a = $this->referenceData["fromCol"];
            $this->referenceData["fromCol"] = $this->referenceData["toCol"];
            $this->referenceData["toCol"] = $a;
        }

        $this->reference = "'" . $this->referenceData["sheetName"] . "'" . '!' . Sheet::getXLSCell($this->referenceData["row"], $this->referenceData["fromCol"], true) . ':' . Sheet::getXLSCell($this->referenceData["row"], $this->referenceData["toCol"], true);
    }

    public function getXML(?string $xAxisReference) : string {
        $xml = '<c:ser>' . PHP_EOL;
            $xml .= '<c:idx val="' . $this->id . '"/>' . PHP_EOL;
            if(!is_null($this->title)) {
                $xml .= '<c:tx>' . PHP_EOL;
                    $xml .= '<c:strRef>' . PHP_EOL;
                        $xml .= '<c:f>' . $this->title . '</c:f>' . PHP_EOL;
                    $xml .= '</c:strRef>';
                $xml .= '</c:tx>' . PHP_EOL;
            }
            $xml .= '<c:invertIfNegative val="0"/>' . PHP_EOL;
            if(!is_null($xAxisReference)) {
                $xml .= '<c:cat>' . PHP_EOL;
                    $xml .= '<c:strRef>' . PHP_EOL;
                        $xml .= '<c:f>' . $xAxisReference . '</c:f>' . PHP_EOL;
                    $xml .= '</c:strRef>';
                $xml .= '</c:cat>' . PHP_EOL;
            }
                
            $xml .= '<c:val>' . PHP_EOL;
                $xml .= '<c:numRef>' . PHP_EOL;
                    $xml .= '<c:f>' . $this->reference . '</c:f>' . PHP_EOL;
                $xml .= '</c:numRef>' . PHP_EOL;
            $xml .= "</c:val>" . PHP_EOL;
        $xml .= '</c:ser>';
        return $xml;
    }
}