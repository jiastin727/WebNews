<?php 

namespace XLSXWriter;

class Border {
    const SUPPORTED_BORDER_STYLES = ["dashDotDot", "dashDot", "dashed", "dotted", "hair", "mediumDashDotDot", "mediumDashDot", "mediumDashed", "medium", "slantDashDot", "thick", "thin"];
    const BORDERS = ["left", "right", "top", "bottom", "diagonal"];

    private array $left = [];
    private array $right = [];
    private array $top = [];
    private array $bottom = [];
    private array $diagonal = [];
    private bool $diagonalUp = false;
    private bool $diagonalDown = false;

    function __construct(array $options = array()) {
        if(count($options) > 0) {
            foreach(self::BORDERS as $border) {
                $this->setBorder($border, $options);
            }

            if(count($this->diagonal) > 0) {
                if(isset($options['diagonalUp'])) {
                    $this->diagonalUp = $this->checkBoolValue($options['diagonalUp']);
                }

                if(isset($options['diagonalDown'])) {
                    $this->diagonalDown = $this->checkBoolValue($options['diagonalDown']);
                }
            }
        }
    }

    private function setBorder($border, $options) {
        if(isset($options[$border])) {
            if(isset($options[$border]['style']) && is_string($options[$border]['style']) && in_array($options[$border]['style'], self::SUPPORTED_BORDER_STYLES)) {
                $this->{ $border }['style'] = $options[$border]['style'];
            }

            if(isset($options[$border]['color']) && is_array($options[$border]['color'])) {
                $color = $options[$border]['color'];
                $this->{ $border }['color'] = Color::getColorCode($color['from'], $color['value']);
            }
        }
    }

    private function checkBoolValue($val) : bool {
        return $val === true || $val == "true";
    }

    private function getBorderXML($border) : string {
        $xml = '<' . $border;
        if(count($this->{ $border }) > 0) {
            if(isset($this->{ $border }['style'])) {
                $xml .= ' style="' . $this->{ $border }['style'] . '"';
            }

            if(isset($this->{ $border }['color'])) {
                $xml .= '>' . PHP_EOL;
                    $xml .= '<color rgb="' . $this->{ $border }['color'] . '" />' . PHP_EOL;
                $xml .= '</' . $border . '>' . PHP_EOL;
            }
            else {
                $xml .= ' />' . PHP_EOL;
            }
        }
        else {
            $xml .= '/>' . PHP_EOL;
        }
        return $xml;
    }

    public function getXML() : string {
        $xml = '<border';
        if($this->diagonalUp) {
            $xml .= ' diagonalUp="1"';
        }
        if($this->diagonalDown) {
            $xml .= ' diagonalDown="1"';
        }
        $xml .= '>' . PHP_EOL;

        foreach(self::BORDERS as $border) {
            $xml .= $this->getBorderXML($border);
        }

        $xml .= '</border>';
        return $xml;
    }
}