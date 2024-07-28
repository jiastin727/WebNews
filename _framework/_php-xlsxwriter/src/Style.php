<?php 

namespace XLSXWriter;

class Style {
    private array $numberFormats = [];
    private array $fonts = [];
    private array $fills = [];
    private array $borders = [];
    private array $cellXfs = [];

    public function __construct() {
        $this->registerDefaultStyles();
    }

    public function __destruct() {
        unset($this->numberFormats);
        unset($this->fonts);
        unset($this->fills);
        unset($this->borders);
    }

    private function registerDefaultStyles() {
        $this->fonts[] = new Font();

        $this->fills[] = new Fill();
        $this->fills[] = new Fill("gray125");

        $this->borders[] = new Border();

        $this->cellXfs[] = new CellXfs();
    }

    private function getIndexFromArray($array, $elem) : int {
        $index = -1;
        $i = 0;
        $length = count($this->{ $array });
        while($i < $length) {
            if($elem == $this->{ $array }[$i]) {
                $index = $i;
            }
            $i++;
        }

        if($index === -1) {
            $this->{ $array }[$length] = $elem;
            $index = $length;
        }

        return $index;
    }

    public function getStyleID(array $style) : int {
        if(count($style) === 0) {
            return 0;
        }

        $numFmtId = 0;
        if(isset($style['numberFormat']) && is_string($style['numberFormat']) && strlen($style['numberFormat']) > 0) {
            $numFmtId = $this->getIndexFromArray("numberFormats", htmlspecialchars($style['numberFormat']));
            $numFmtId++;    // Because num format doesn't have default style
        }
        
        $fontId = 0;
        if(isset($style['font'])) {
            if(is_array($style['font'])) {
                $fontId = $this->getIndexFromArray("fonts", new Font($style['font']));
            }
            else {
                if($style['font'] instanceof Font) {
                    $fontId = $this->getIndexFromArray("fonts", $style['font']);
                }
            }
        }

        $fillId = 0;
        if(isset($style['fill'])) {
            if(is_array($style['fill'])) {
                $fillId = $this->getIndexFromArray("fills", new Fill($style['fill']['pattern'], $style['fill']['color']));
            }
            else {
                if($style['fill'] instanceof Fill) {
                    $fillId = $this->getIndexFromArray("fills", $style['fill']);
                }
            }
        }

        $borderId = 0;
        if(isset($style['border'])) {
            if(is_array($style['border'])) {
                $borderId = $this->getIndexFromArray("borders", new Border($style['border']));
            }
            else {
                if($style['border'] instanceof Border) {
                    $borderId = $this->getIndexFromArray("borders", $style['border']);
                }
            }
        }

        $alignment = $style['alignment'] ?? [];

        return $this->getIndexFromArray('cellXfs', new CellXfs($numFmtId, $fontId, $fillId, $borderId, $alignment));
    }

    public function getXML($encoding) : string {
        $xml = '<?xml version="1.0" encoding="' . $encoding . '" standalone="yes"?>' . PHP_EOL;
        $xml .= '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"' . PHP_EOL;
            $xml .= 'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac x16r2 xr"' . PHP_EOL;
            $xml .= 'xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"' . PHP_EOL;
            $xml .= 'xmlns:x16r2="http://schemas.microsoft.com/office/spreadsheetml/2015/02/main"' . PHP_EOL;
            $xml .= 'xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision">' . PHP_EOL;
            if(count($this->numberFormats) > 0) {
                $xml .= '<numFmts count="' . count($this->numberFormats) . '">' . PHP_EOL;
                    $i = 1;
                    foreach($this->numberFormats as $format) {
                        $xml .= '<numFmt numFmtId="' . $i . '" formatCode="' . $format . '" />' . PHP_EOL;
                        $i++;
                    }
                $xml .= '</numFmts>' . PHP_EOL;
            }
            // $xml .= '<fonts count="' . count($this->fonts) . '" x14ac:knownFonts="1">' . PHP_EOL;
            $xml .= '<fonts count="' . count($this->fonts) . '">' . PHP_EOL;
                foreach($this->fonts as $font) {
                    $xml .= $font->getXML();
                }
            $xml .= '</fonts>' . PHP_EOL;

            $xml .= '<fills count="' . count($this->fills) . '">' . PHP_EOL;
                foreach($this->fills as $fill) {
                    $xml .= $fill->getXML();
                }
            $xml .= '</fills>' . PHP_EOL;

            $xml .= '<borders count="' . count($this->borders) . '">' . PHP_EOL;
                foreach($this->borders as $border) {
                    $xml .= $border->getXML();
                }
            $xml .= '</borders>' . PHP_EOL;

            $xml .= '<cellXfs count="' . count($this->cellXfs) . '">' . PHP_EOL;
                foreach($this->cellXfs as $cell) {
                    $xml .= $cell->getXML();
                }
            $xml .= '</cellXfs>' . PHP_EOL;

        $xml .= '</styleSheet>' . PHP_EOL;
        return $xml;
    }
}
