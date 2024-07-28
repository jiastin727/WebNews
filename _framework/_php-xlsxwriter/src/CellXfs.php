<?php 

namespace XLSXWriter;

class CellXfs {
    const SUPPORTED_HORIZONTAL_ALIGNMENTS = ["left", "center", "right"];
    const SUPPORTED_VERTICAL_ALIGNMENTS = ["top", "center", "bottom"];

    public function __construct(private int $numFmtId = 0, private int $fontId = 0, private int $fillId = 0, private int $borderId = 0, private array $alignment = []) {}

    private function getAlignment() : string {
        $xml = '';

        if(isset($this->alignment['horizontal']) && in_array($this->alignment['horizontal'], self::SUPPORTED_HORIZONTAL_ALIGNMENTS)) {
            $xml .= 'horizontal="' . $this->alignment['horizontal'] . '" ';
        }

        if(isset($this->alignment['vertical']) && in_array($this->alignment['vertical'], self::SUPPORTED_VERTICAL_ALIGNMENTS)) {
            $xml .= 'vertical="' . $this->alignment['vertical'] . '" ';
        }

        if(isset($this->alignment['textRotation']) && is_numeric($this->alignment['textRotation'])) {
            $xml .= 'textRotation="' . (int)$this->alignment['textRotation'] . '" ';
        }

        if(isset($this->alignment['wrapText']) && $this->alignment['wrapText'] == true) {
            $xml .= 'wrapText="1" ';
        }

        return rtrim($xml, ' ');
    }
    
    public function getXML() : string {
        $xml = '<xf numFmtId="' . $this->numFmtId . '" fontId="' . $this->fontId . '" fillId="' . $this->fillId . '" borderId="' . $this->borderId . '" ';

        if($this->fontId > 0) {
            $xml .= 'applyFont="1" ';
        }

        if($this->fillId > 0) {
            $xml .= 'applyFill="1" ';
        }

        if($this->borderId > 0) {
            $xml .= 'applyBorder="1" ';
        }

        $alignment = $this->getAlignment();
        if(strlen($alignment) > 0) {
            $xml .= 'applyAlignment="1">' . PHP_EOL;
                $xml .= '<alignment ' . $alignment . ' />';
            $xml .= '</xf>' . PHP_EOL;
        }
        else {
            $xml .= '/>' . PHP_EOL;
        }

        return $xml;
    }
}