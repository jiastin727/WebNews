<?php

namespace XLSXWriter\Chart\PieChart;

use XLSXWriter\Chart\Chart;
use XLSXWriter\Sheet;

class PieChart extends Chart {
    private array $pies = [];
    private array $legend = [];
    private ?string $legendReference = null;
    private ?string $piesReference = null;

    public function addLine(Line $line) {
        $line->setID(count($this->lines));
        $this->lines[] = $line;
    }

    public function setLegend(string $sheetName, int $fromRow, int $toRow, int $fromCol, int $toCol) {
        $this->legend = ["sheetName" => $sheetName, "fromRow" => $fromRow, "toRow" => $toRow, "fromCol" => $fromCol, "toCol" => $toCol];
    }

    public function setPies(string $sheetName, int $fromRow, int $toRow, int $fromCol, int $toCol) {
        $this->pies = ["sheetName" => $sheetName, "fromRow" => $fromRow, "toRow" => $toRow, "fromCol" => $fromCol, "toCol" => $toCol];
    }

    private function swapIfLarger(int $a, int $b) : array {
        if($a > $b) {
            $c = $a;
            $a = $b;
            $b = $c;
        }
        return [$a, $b];
    }

    private function finalizeDataArray(array $sheetNames, string $arrayPointer, string $referencePointer) {
        if(count($this->legend) === 5) {
            $array = $this->{ $arrayPointer };
            $keys = ["fromRow", "toRow", "fromCol", "toCol"];

            if(!in_array($array["sheetName"], $sheetNames)) {
                throw new \InvalidArgumentException("Cannot found sheet: " . $array["sheetName"]);
            }

            foreach($keys as $key) {
                if($array[$key] < 0) {
                    throw new \InvalidArgumentException($key . " cannot be less than 0");
                }
            }

            list($array["fromRow"], $array["toRow"]) = $this->swapIfLarger($array["fromRow"], $array["toRow"]);
            list($array["fromCol"], $array["toCol"]) = $this->swapIfLarger($array["fromCol"], $array["toCol"]);

            $this->{ $referencePointer } = "'" . $array["sheetName"] . "'" . '!' . Sheet::getXLSCell($array["fromRow"], $array["fromCol"], true) . ':' . Sheet::getXLSCell($array["toRow"], $array["toCol"], true);
        }
    }

    public function finalize(array $sheetNames) {
        if(count($this->pies) === 0) {
            throw new \InvalidArgumentException("Pies data cannot be empty");
        }

        try {
            $this->finalizeDataArray($sheetNames, "legend", "legendReference");
            $this->finalizeDataArray($sheetNames, "pies", "piesReference");
        } catch(\InvalidArgumentException $e) {
            throw $e;
        }
    }

    public function getXML(string $encoding) : string {
        $xml = $this->getHeaderXML($encoding) . PHP_EOL;
            $xml .= '<c:pieChart>'. PHP_EOL;
                $xml .= '<c:varyColors val="1" />'. PHP_EOL;
                $xml .= '<c:ser>'. PHP_EOL;
                    $xml .= '<c:idx val="0"/>'. PHP_EOL;
                    if(!is_null($this->legendReference)) {
                        $xml .= '<c:cat>'. PHP_EOL;
                            $xml .= '<c:strRef>'. PHP_EOL;
                                $xml .= '<c:f>' . $this->legendReference . '</c:f>'. PHP_EOL;
                            $xml .= '</c:strRef>'. PHP_EOL;
                        $xml .= '</c:cat>'. PHP_EOL;
                    }
                
                    $xml .= '<c:val>'. PHP_EOL;
                        $xml .= '<c:numRef>'. PHP_EOL;
                            $xml .= '<c:f>' . $this->piesReference . '</c:f>'. PHP_EOL;
                        $xml .= '</c:numRef>'. PHP_EOL;
                    $xml .= '</c:val>'. PHP_EOL;
                $xml .= '</c:ser>'. PHP_EOL;
            $xml .= '</c:pieChart>'. PHP_EOL;
        $xml .= $this->getFooterXML();
        return $xml;
    }
}