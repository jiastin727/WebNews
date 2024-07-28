<?php

namespace XLSXWriter\Chart\BarChart;

use XLSXWriter\Chart\Chart;
use XLSXWriter\Sheet;

class BarChart extends Chart {
    private array $bars = [];
    private array $xAxis = [];
    private ?string $xAxisReference = null;

    public function setXAxis(string $sheetName, int $row, int $fromCol, int $toCol) {
        $this->xAxis = ["sheetName" => $sheetName, "row" => $row, "fromCol" => $fromCol, "toCol" => $toCol];
    }

    public function addBar(Bar $bar) {
        $bar->setID(count($this->bars));
        $this->bars[] = $bar;
    }

    private function finalizeXAxis(array $sheetNames) {
        if(count($this->xAxis) === 4) {
            if(!in_array($this->xAxis["sheetName"], $sheetNames)) {
                throw new \InvalidArgumentException("Cannot found sheet: " . $this->xAxis["sheetName"]);
            }

            if($this->xAxis["row"] < 0) {
                throw new \InvalidArgumentException("Row cannot be less than 0");
            }
    
            if($this->xAxis["fromCol"] < 0) {
                throw new \InvalidArgumentException("fromCol cannot be less than 0");
            }
    
            if($this->xAxis["toCol"] < 0) {
                throw new \InvalidArgumentException("toCol cannot be less than 0");
            }

            if($this->xAxis["fromCol"] > $this->xAxis["toCol"]) {
                $a = $this->xAxis["fromCol"];
                $this->xAxis["fromCol"] = $this->xAxis["toCol"];
                $this->xAxis["toCol"] = $a;
            }

            $this->xAxisReference = "'" . $this->xAxis["sheetName"] . "'" . '!' . Sheet::getXLSCell($this->xAxis["row"], $this->xAxis["fromCol"], true) . ':' . Sheet::getXLSCell($this->xAxis["row"], $this->xAxis["toCol"], true);
        }
    }

    public function finalize(array $sheetNames) {
        try {
            $this->finalizeXAxis($sheetNames);
            foreach($this->bars as $bar) {
                $bar->finalize($sheetNames);
            }
        } catch(\InvalidArgumentException $e) {
            throw $e;
        }
    }

    public function getXML(string $encoding) : string {
        $xml = $this->getHeaderXML($encoding) . PHP_EOL;
            $xml .= '<c:barChart>'. PHP_EOL;
                $xml .= '<c:barDir val="col"/>'. PHP_EOL;
                $xml .= '<c:grouping val="standard"/>'. PHP_EOL;
                $xml .= '<c:varyColors val="0"/>'. PHP_EOL;
                foreach($this->bars as $bar) {
                    $xml .= $bar->getXML($this->xAxisReference) . PHP_EOL;
                }
                $xml .= '<c:axId val="511678960"/>'. PHP_EOL;
                $xml .= '<c:axId val="49463120"/>'. PHP_EOL;
            $xml .= '</c:barChart>'. PHP_EOL;

            $xml .= '<c:catAx>'. PHP_EOL;
                $xml .= '<c:axId val="511678960"/>'. PHP_EOL;
                $xml .= '<c:scaling>'. PHP_EOL;
                    $xml .= '<c:orientation val="minMax"/>'. PHP_EOL;
                $xml .= '</c:scaling>'. PHP_EOL;
                $xml .= '<c:delete val="0"/>'. PHP_EOL;
                $xml .= '<c:axPos val="b"/>'. PHP_EOL;
                $xml .= '<c:majorTickMark val="none"/>'. PHP_EOL;
                $xml .= '<c:minorTickMark val="none"/>'. PHP_EOL;
                $xml .= '<c:tickLblPos val="nextTo"/>'. PHP_EOL;
                $xml .= '<c:spPr>'. PHP_EOL;
                    $xml .= '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">'. PHP_EOL;
                        $xml .= '<a:solidFill>'. PHP_EOL;
                            $xml .= '<a:schemeClr val="tx1">'. PHP_EOL;
                                $xml .= '<a:lumMod val="15000"/>'. PHP_EOL;
                                $xml .= '<a:lumOff val="85000"/>'. PHP_EOL;
                            $xml .= '</a:schemeClr>'. PHP_EOL;
                        $xml .= '</a:solidFill>'. PHP_EOL;
                    $xml .= '</a:ln>'. PHP_EOL;
                $xml .= '</c:spPr>'. PHP_EOL;
                $xml .= '<c:crossAx val="49463120"/>'. PHP_EOL;
            $xml .= '</c:catAx>'. PHP_EOL;

            $xml .= '<c:valAx>'. PHP_EOL;
                $xml .= '<c:axId val="49463120"/>'. PHP_EOL;
                $xml .= '<c:scaling>'. PHP_EOL;
                    $xml .= '<c:orientation val="minMax"/>'. PHP_EOL;
                $xml .= '</c:scaling>'. PHP_EOL;
                $xml .= '<c:delete val="0"/>'. PHP_EOL;
                $xml .= '<c:axPos val="l"/>'. PHP_EOL;
                $xml .= '<c:majorGridlines>'. PHP_EOL;
                    $xml .= '<c:spPr>'. PHP_EOL;
                        $xml .= '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">'. PHP_EOL;
                            $xml .= '<a:solidFill>'. PHP_EOL;
                                $xml .= '<a:schemeClr val="tx1">'. PHP_EOL;
                                    $xml .= '<a:lumMod val="15000"/>'. PHP_EOL;
                                    $xml .= '<a:lumOff val="85000"/>'. PHP_EOL;
                                $xml .= '</a:schemeClr>'. PHP_EOL;
                            $xml .= '</a:solidFill>'. PHP_EOL;
                        $xml .= '</a:ln>'. PHP_EOL;
                    $xml .= '</c:spPr>'. PHP_EOL;
                $xml .= '</c:majorGridlines>'. PHP_EOL;
            
                $xml .= '<c:spPr>'. PHP_EOL;
                    $xml .= '<a:ln>'. PHP_EOL;
                        $xml .= '<a:noFill/>'. PHP_EOL;
                    $xml .= '</a:ln>'. PHP_EOL;
                $xml .= '</c:spPr>'. PHP_EOL;

                $xml .= '<c:crossAx val="511678960"/>'. PHP_EOL;
                $xml .= '<c:crosses val="autoZero"/>'. PHP_EOL;
            $xml .= '</c:valAx>' . PHP_EOL;
        $xml .= $this->getFooterXML();
        return $xml;
    }
}