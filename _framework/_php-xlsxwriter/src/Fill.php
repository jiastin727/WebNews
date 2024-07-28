<?php 

namespace XLSXWriter;

class Fill {
    const SUPPORTED_PATTERN_TYPES = ["none", "gray125", "solid", "darkGray", "mediumGray", "lightGray", "gray0625", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis"];
    const DEFAULT_PATTERN_TYPE = "solid";

    private string $patternType;
    private ?string $color = null;

    public function __construct($patternType = self::DEFAULT_PATTERN_TYPE, $color = []) {
        if(!in_array($patternType, self::SUPPORTED_PATTERN_TYPES)) {
            $patternType = self::DEFAULT_PATTERN_TYPE;
        }
        $this->patternType = $patternType;

        if(count($color) === 2) {
            $this->color = Color::getColorCode($color['from'], $color['value']);
        }
    }

    public function getXML() : string {
        $xml = '<fill>' . PHP_EOL;
            if(!is_null($this->color) && strlen($this->color) > 2) { // because of default FF
                $xml .= '<patternFill patternType="' . $this->patternType . '">' . PHP_EOL;
                    $xml .= '<fgColor rgb="' . $this->color . '"/>' . PHP_EOL;
                $xml .= '</patternFill>' . PHP_EOL;
            }
            else {
                $xml .= '<patternFill patternType="' . $this->patternType . '" />' . PHP_EOL;
            }
        $xml .= '</fill>';
        return $xml;
    }
}
