<?php

namespace XLSXWriter;

use XLSXWriter\Chart\Chart;

class Sheet {
    private array $fields;
    private array $mergedCells;
    private ?Drawing $drawing;
    private FileWriter $fileWriter;
    private array $savedRows;

    public function __construct(private int $id, private SharedStrings &$sharedStrings, private Style &$style, private bool $useTempFiles) {
        $this->fields = [];
        $this->mergedCells = [];
        $this->drawing = null;

        if($this->useTempFiles) {
            $this->fileWriter = new FileWriter("sheet_" . $this->id);
            $this->savedRows = [];
        }
    }

    public function __destruct() {
        unset($this->fields);
        unset($this->mergedCells);
        if(!is_null($this->drawing)) {
            unset($this->drawing);
        }

        if($this->useTempFiles) {
            unset($this->fileWriter);
            unset($this->savedRows);
        }
    }

    public function getID() : int {
        return $this->id;
    }

    public function getDrawing() : Drawing | null {
        return $this->drawing;
    }

    public function addImage($id, $image, $extension, $row, $col) {
        if(is_null($this->drawing)) {
            $this->drawing = new Drawing();
        }

        $this->drawing->addImage($id, $image, $extension, $row, $col);
    }

    public function addChart(Chart &$chart) {
        if(is_null($this->drawing)) {
            $this->drawing = new Drawing();
        }

        $this->drawing->addChart($chart);
    }

    public function addField($row, $col, $value, $style) {
        if(!isset($this->fields[$row])) {
            $this->fields[$row] = [];
        }

        $this->fields[$row][$col] = array("value" => $value, "style" => $style);
    }

    public function markMergedCells($start, $end) {
        $this->mergedCells[] = [
            "start" =>  $start,
            "end"   =>  $end
        ];
    }

    public function openRow(int $row, string $encoding) {
        if(count($this->savedRows) === 0) {
            $xml = $this->getXMLHeader($encoding);
            $this->fileWriter->writeToFile($xml);

            $this->fileWriter->writeToFile('<row r="' . ($row + 1) . '" x14ac:dyDescent="0.25">');
            $this->savedRows[$row] = [ "status" => "open", "lastCell" => -1];
        }
        else {
            $lastRow = array_key_last($this->savedRows);
            if($row <= $lastRow) {
                throw new \InvalidArgumentException("row parameter is lesser or equal than last saved row");
            }

            if($this->savedRows[$lastRow]["status"] === "open") {
                $this->closeCurrentRow();
            }

            $this->fileWriter->writeToFile('<row r="' . ($row + 1) . '" x14ac:dyDescent="0.25">');
            $this->savedRows[$row] = [ "status" => "open", "lastCell" => -1];
        }
    }

    public function writeCell($encoding, $cell, $value, $style) {
        if(count($this->savedRows) > 0) {
            $lastRow = array_key_last($this->savedRows);

            if($this->savedRows[$lastRow]["status"] === "closed") {
                throw new \Exception("Last row is closed so cannot write out cell");
            }

            if($cell <= $this->savedRows[$lastRow]["lastCell"]) {
                throw new \Exception("cell parameter is lesser or equal than last saved cell in the opened row");
            }

            $tmpCell = $this->finalizeCell([ "value" => $value, "style" => $style], $encoding);
            $xml = $this->getCellXML($lastRow, $cell, $tmpCell);
            $this->fileWriter->writeToFile($xml);
            $this->savedRows[$lastRow]["lastCell"] = $cell;
        }
    }

    public function closeCurrentRow() {
        if(count($this->savedRows) > 0) {
            $lastRow = array_key_last($this->savedRows);
            if($this->savedRows[$lastRow]["status"] === "open") {
                $this->fileWriter->writeToFile('</row>');
                $this->savedRows[$lastRow]["status"] ="closed";
            }
        }
    }

    public function finalize($encoding) {
        if(!$this->useTempFiles) {
            if(count($this->mergedCells) > 0) {
                foreach($this->mergedCells as $mergedCell) {
                    $start = $mergedCell['start'];
                    $end = $mergedCell['end'];

                    $startRow = $start['row'];
                    $startCol = $start['col'];
                    $endRow = $end['row'];
                    $endCol = $end['col'];

                    if(!isset($this->fields[$startRow])) {
                        $this->fields[$startRow] = [];
                    }

                    if(!isset($this->fields[$startRow][$startCol])) {
                        $this->fields[$startRow][$startCol] = [ "value" => "", "style" => [] ];
                    }

                    for($row = $startRow; $row <= $endRow; $row++) {
                        for($col = $startCol; $col <= $endCol; $col++) {
                            $this->fields[$row][$col] = $this->fields[$startRow][$startCol];
                        }
                    }
                }
            }

            $this->finalizeFields($encoding);
        }
    }

    private function finalizeFields(string $encoding) {
        ksort($this->fields);
        foreach($this->fields as $row => &$columns) {
            ksort($columns);
            foreach($columns as $col => $cell) {
                $this->fields[$row][$col] = $this->finalizeCell($cell, $encoding);
            }
        }
    }

    private function finalizeCell($cell, $encoding) : array {
        $value = $cell['value'];
        $style = $cell['style'];
        $type = gettype($value);

        if($type === "string") {
            if(!mb_detect_encoding($value, $encoding, true)) {
                $value = @mb_convert_encoding($value, $encoding);
            }
            $value = htmlspecialchars($value, ENT_COMPAT, $encoding);
            $value = $this->sharedStrings->getStringID($value);
        }
        
        $cell['type'] = $type;
        $cell['value'] = $value;
        $cell['style'] = $this->style->getStyleID($style);

        return $cell;
    }

    public static function getXLSCell($row, $col, $absolute = false) : string {
		$n = $col;
		for($r = ""; $n >= 0; $n = intval($n / 26) - 1) {
			$r = chr($n % 26 + 0x41) . $r;
		}

		if ($absolute) {
			return '$' . $r . '$' . ($row + 1);
		}
		return $r . ($row + 1);
	}

    private function getCellXML($row, $col, $column) : string {
        $cell = self::getXLSCell($row, $col);
        $style = $column['style'] > 0 ? ' s="' . $column['style'] . '"' : '';
        $xml = '';
        if($column['type'] === "string") {
            $xml .= '<c r="' . $cell . '" t="s"' . $style . '>' . PHP_EOL;
                $xml .= '<v>' . $column['value'] . '</v>' . PHP_EOL;
            $xml .= '</c>' . PHP_EOL;
        }
        else if($column['type'] === "double") {
            $xml .= '<c r="' . $cell . '"' . $style . '>' . PHP_EOL;
                $xml .= '<v>' . (double)$column['value'] . '</v>' . PHP_EOL;
            $xml .= '</c>' . PHP_EOL;
        }
        else if($column['type'] === "float") {
            $xml .= '<c r="' . $cell . '"' . $style . '>' . PHP_EOL;
                $xml .= '<v>' . (float)$column['value'] . '</v>' . PHP_EOL;
            $xml .= '</c>' . PHP_EOL;
        }
        else { // integer
            $xml .= '<c r="' . $cell . '"' . $style . '>' . PHP_EOL;
                $xml .= '<v>' . (int)$column['value'] . '</v>' . PHP_EOL;
            $xml .= '</c>' . PHP_EOL;
        }
        return $xml;
    }

    private function getMergedCellXML($mergedCell) : string {
        $startCell = self::getXLSCell($mergedCell['start']['row'], $mergedCell['start']['col']);
        $endCell = self::getXLSCell($mergedCell['end']['row'], $mergedCell['end']['col']);
        return '<mergeCell ref="' . $startCell . ':' . $endCell . '"/>' . PHP_EOL;
    }

    private function getXMLHeader($encoding) : string {
        $xml = '<?xml version="1.0" encoding="' . $encoding . '" standalone="yes"?>';
        $xml .= '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
            $xml .= '<sheetViews>';
                if($this->id === 1) {
                    $xml .= '<sheetView tabSelected="1" workbookViewId="0" />';
                }
                else {
                    $xml .= '<sheetView workbookViewId="0" />';
                }
            $xml .= '</sheetViews>';

            $xml .= '<sheetFormatPr defaultRowHeight="15" x14ac:dyDescent="0.25"/>';
            $xml .= '<sheetData>';
        return $xml;
    }

    private function getXMLFooter() : string {
        $mergedCellsCounter = count($this->mergedCells);

            $xml = '</sheetData>';
            if($mergedCellsCounter > 0) {
                $xml .= '<mergeCells count="' . $mergedCellsCounter . '">';
                    foreach($this->mergedCells as $mergedCell) {
                        $xml .= $this->getMergedCellXML($mergedCell);
                    }
                $xml .= '</mergeCells>';
            }
            $xml .= '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>';

            if(!is_null($this->drawing) && $this->drawing instanceof Drawing) {
                $xml .= '<drawing r:id="rId' . $this->id . '" />';
            }
        $xml .= '</worksheet>';
        return $xml;
    }

    public function getTempFile() : string {
        $xml = $this->getXMLFooter();
        $this->fileWriter->writeToFile($xml);

        return $this->fileWriter->getTempFile();
    }

    public function getXML($encoding) : string {
        $xml = $this->getXMLHeader($encoding);

        foreach($this->fields as $row => $columns) {
            $xml .= '<row r="' . ($row + 1) . '" x14ac:dyDescent="0.25">';
                foreach($columns as $columnIndex => $column) {
                    $xml .= $this->getCellXML($row, $columnIndex, $column);
                }
            $xml .= '</row>';
        }

        $xml .= $this->getXMLFooter();

        return $xml;
    }

    public function getRelationXML($encoding) : string {
        $xml = '<?xml version="1.0" encoding="' . $encoding . '" standalone="yes"?>' . PHP_EOL;
        $xml .= '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' . PHP_EOL;
            $xml .= '<Relationship Id="rId' . $this->id . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing' . $this->id . '.xml"/>' . PHP_EOL;
        $xml .= '</Relationships>' . PHP_EOL;

        return $xml;
    }
}