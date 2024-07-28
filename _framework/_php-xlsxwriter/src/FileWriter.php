<?php 

namespace XLSXWriter;

class FileWriter {
    const BUFFER_MAX_SIZE = 8191;
    const OPEN_TO_WRITE = "a+";
    const OPEN_TO_SEARCH_OR_PREPEND = "r+";

    private string $tempDir;
    private $handle = null;
    private string $buffer;
    private ?string $currentMode = null;

    public function __construct(private string $fileName) {
        $this->tempDir = sys_get_temp_dir();
        $this->tempFile = tempnam($this->tempDir, $this->fileName);
        $this->buffer = "";
        $this->open(self::OPEN_TO_WRITE);
    }

    public function __destruct() {
        if(file_exists($this->tempFile)) {
            unset($this->tempFile);
        }
    }

    public function getTempFile(): string {
        $this->close();
        return $this->tempFile;
    }

    public function writeToFile(string $text) {
        $this->buffer .= $this->minifyText($text);
        if(isset($this->buffer[self::BUFFER_MAX_SIZE])) {
            $this->storeData();
        }
    }

    private function open(string $mode) {
        if(is_null($this->handle)) {
            $this->handle = fopen($this->tempFile, $mode);
            $this->currentMode = $mode;
        }
        else {
            if($this->currentMode !== $mode) {
                $this->close();
                $this->open($mode);
            }
        }
    }

    private function close() {
        if(!is_null($this->handle)) {
            $this->storeData();
            fclose($this->handle);
            $this->handle = null;
            $this->currentMode = null;
        }
    }

    private function minifyText($text): string {
        $search = [ '>' . PHP_EOL ];
        $replace = '>';

        return str_replace($search, $replace, $text);
    }

    private function storeData() {
        $this->open(self::OPEN_TO_WRITE);

        fwrite($this->handle, $this->buffer);
        $this->buffer = "";
    }
}