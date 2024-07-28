<?php 

namespace XLSXWriter;

class Font {
    const SUPPORTED_VERTICAL_ALIGNMENTS = ["superscript", "subscript"];
    const DEFAULT_FONT_SIZE = 12;
    const DEFAULT_FONT_FAMILY = "Calibri";

    private int $size = self::DEFAULT_FONT_SIZE;
    private string $name = self::DEFAULT_FONT_FAMILY;
    private ?string $color = null;
    private ?string $vertAlign = null;
    private bool $bold = false;
    private bool $italic = false;
    private bool $underline = false;
    private bool $strike = false;

    public function __construct($options = []) {
        if(isset($options['size']) && is_numeric($options['size']) && (int)$options['size'] > 0) {
            $this->size = (int)$options['size'];
        }

        if(isset($options['name']) && strlen($options['name']) > 0) {
            $this->name = $options['name'];
        }

        if(isset($options['color']) && count($options['color']) === 2) {
            $this->color = Color::getColorCode($options['color']['from'], $options['color']['value']);
        }

        if(isset($options['vertalign']) && in_array($options['vertalign'], self::SUPPORTED_VERTICAL_ALIGNMENTS)) {
            $this->vertAlign = $options['vertalign'];
        }

        if(isset($options['bold'])) {
            $this->bold = $this->checkBoolValue($options['bold']);
        }

        if(isset($options['italic'])) {
            $this->italic = $this->checkBoolValue($options['italic']);
        }

        if(isset($options['underline'])) {
            $this->underline = $this->checkBoolValue($options['underline']);
        }

        if(isset($options['strike'])) {
            $this->strike = $this->checkBoolValue($options['strike']);
        }
    }

    private function checkBoolValue($val) : bool {
        return $val === true || $val == "true";
    }

    public function getXML() : string {
        $xml = '<font>' . PHP_EOL;
            $xml .= '<sz val="' . $this->size . '" />' . PHP_EOL;
            $xml .= '<name val="' . $this->name . '" />' . PHP_EOL;
            if($this->bold) {
                $xml .= '<b/>' . PHP_EOL;
            }
            if($this->italic) {
                $xml .= '<i/>' . PHP_EOL;
            }
            if($this->underline) {
                $xml .= '<u/>' . PHP_EOL;
            }
            if($this->strike) {
                $xml .= '<strike/>' . PHP_EOL;
            }
            if($this->vertAlign) {
                $xml .= '<vertAlign val="' . $this->vertAlign . '"/>' . PHP_EOL;
            }
            if(!is_null($this->color) && strlen($this->color) > 2) { // because of default FF
                $xml .= '<color rgb="' . $this->color . '"/>' . PHP_EOL;
            }
        $xml .= '</font>';
        return $xml;
    }
}
