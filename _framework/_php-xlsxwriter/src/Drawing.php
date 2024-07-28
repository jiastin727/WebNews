<?php

namespace XLSXWriter;

use XLSXWriter\Chart\Chart;

class Drawing {
    private array $images = [];
    private array $charts = [];

    function __construct() {}

    public function __destruct() {
        while(count($this->images) > 0) {
            $image = array_shift($this->images);
            unset($image);
        }
        unset($this->images);

        while(count($this->charts) > 0) {
            $chart = array_shift($this->charts);
            unset($chart);
        }
        unset($this->charts);
    }

    public function getImages() : array {
        return $this->images;
    }

    public function addImage($id, $image, $extension, $row, $col) {
        $this->images[] = new Image($id, $image, $extension, $row, $col);
    }

    public function addChart(Chart &$chart) {
        $this->charts[] = &$chart;
    }

    public function getRelationXML() : string {
        $lastID = 0;

        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
        $xml .= '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' . PHP_EOL;
            foreach($this->images as $image) {
                $lastID = max($lastID, $image->getID());
                $xml .= $image->getRelationXML() . PHP_EOL;
            }
            
            foreach($this->charts as $chart) {
                $lastID++;
                $xml .= $chart->getRelationXML($lastID) . PHP_EOL;
            }
        $xml .= '</Relationships>' . PHP_EOL;
        return $xml;
    }

    public function getXML($encoding) : string {
        $lastID = 0;

        $xml = '<?xml version="1.0" encoding="' . $encoding . '" standalone="yes"?>' . PHP_EOL;
        $xml .= '<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing"' . PHP_EOL;
            $xml .= 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">' . PHP_EOL;
            foreach($this->images as $image) {
                $lastID = max($lastID, $image->getID());
                $xml .= $image->getXML() . PHP_EOL;
            }

            foreach($this->charts as $chart) {
                $lastID++;
                $xml .= $chart->getDrawingXML($lastID) . PHP_EOL;
            }
        $xml .= '</xdr:wsDr>' . PHP_EOL;
        
        return $xml;
    }
}