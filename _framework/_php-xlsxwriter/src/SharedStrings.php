<?php 

namespace XLSXWriter;

class SharedStrings {
    const FILE_NAME = "sharedStrings.xml";
    const XML_HEADER = '<?xml version="1.0" encoding="{ENCODING}" standalone="yes"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
    const XML = "<si><t>{STRING}</t></si>";
    const PATTERN = "<si>";

    private int $counter;
    private array $sharedStrings;
    private FileWriter $fileWriter;

    public function __construct(private bool $useTempFiles, private string $encoding) {
        if($this->useTempFiles) {
            $this->counter = 0;
            $this->fileWriter = new FileWriter(self::FILE_NAME);
        }
        else {
            $this->sharedStrings = [];
        }
    }

    public function __destruct() {
        if($this->useTempFiles) {
            unset($this->fileWriter);
        }
        else {
            unset($this->sharedStrings);
        }
    }

    public function needXML(): bool {
        if($this->useTempFiles) {
            return $this->counter > 0;
        }

        return count($this->sharedStrings) > 0;
    }

    public function getStringID(string $string): int {
        if($this->useTempFiles) {
            $id = $this->counter;
            $this->addString($string);
            return $id;
        }
        else {
            $result = array_search($string, $this->sharedStrings);
            if($result === false) {
                $this->addString($string);
                return count($this->sharedStrings) - 1;
            }

            return $result;
        }
    }

    private function addString(string $string) {
        if($this->useTempFiles) {
            if($this->counter === 0) {
                $xml = $this->getXMLHeader($this->encoding);
                $this->fileWriter->writeToFile($xml);
            }

            $xml = str_replace("{STRING}", $string, self::XML);
            $this->fileWriter->writeToFile($xml);
            $this->counter++;
        }
        else {
            $this->sharedStrings[] = $string;
        }
    }

    public function getXML(string $encoding): string {
        $xml = '';
        if($this->needXML()) {
            $xml = $this->getXMLHeader($encoding);

            foreach($this->sharedStrings as $string) {
                $xml .= str_replace("{STRING}", $string, self::XML);
            }

            $xml .= '</sst>';
        }
        return $xml;
    }


    public function finalizeXML() {
        if($this->needXML()) {
            $this->fileWriter->writeToFile("</sst>");
        }
    }

    public function getTempFile(): string {
        return $this->fileWriter->getTempFile();
    }

    private function getXMLHeader($encoding) {
        $search = "{ENCODING}";
        $replace = $encoding;
        return str_replace($search, $replace, self::XML_HEADER);
    }
}