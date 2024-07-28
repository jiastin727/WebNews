<?php 

namespace XLSXWriter;

use XLSXWriter\Chart\Chart;

class Export {
    const DEFAULT_ENCODING = "UTF-8";
    const DEFAULT_TEMP_FILE_USAGE = false;
    const SUPPORTED_IMAGE_EXTENSIONS = ["png", "jpg", "jpeg"];

    private int $imageCounter = 0;
    private ?string $title = null;
	private ?string $subject = null;
	private ?string $author = null;
	private ?string $company = null;
	private ?string $description = null;
	private array $keywords = [];
    private array $sheets = [];
    private array $charts = [];
    private array $storedImageExtensions = [];
    private SharedStrings $sharedStrings;
    private Style $style;

    public function __construct(private string $fileName = "export.xlsx", private string $encoding = self::DEFAULT_ENCODING, private bool $useTempFiles = self::DEFAULT_TEMP_FILE_USAGE) {
        if(!ini_get('date.timezone')){
			date_default_timezone_set('UTC');
		}

        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);
        
        $this->sharedStrings = new SharedStrings($this->useTempFiles, $this->encoding);
        $this->style = new Style();
    }

    public function __destruct() {
        unset($this->sharedStrings);
        unset($this->style);
        unset($this->storedImageExtensions);

        while(count($this->sheets) > 0) {
            $sheet = array_shift($this->sheets);
            unset($sheet);
        }
        unset($this->sheets);
        
        while(count($this->charts) > 0) {
            $chart = array_shift($this->charts);
            unset($chart);
        }
        unset($this->charts);
    }

    public function setFileName(string $fileName) {
        if(substr(strtolower($fileName), -5) !== ".xlsx") {
            $fileName .= ".xlsx";
        }
        $this->fileName = $fileName;
    }

    public function setEncoding(string $encoding) {
        if($this->useTempFiles) {
            throw new \Exception("Cannot modify encoding if you use temp files");
        }

        if(strlen($encoding) > 0) {
            $this->encoding = $encoding;
        }
    }

    public function setTitle(string $title) {
        $this->title = $title;
    }

	public function setSubject(string $subject) {
        $this->subject = $subject;
    }

    public function setAuthor(string $author) {
        $this->author = $author;
    }

	public function setCompany(string $company) {
        $this->company = $company;
    }

    public function setDescription(string $description) {
        $this->description = $description;
    }

	public function setKeywords(string | array $keywords) {
        $this->keywords = is_array($keywords) ? $keywords : [$keywords];
    }

    private function initializeSheet(string $sheetName) {
        if(!isset($this->sheets[$sheetName])) {
            $this->sheets[$sheetName] = new Sheet(count($this->sheets) + 1, $this->sharedStrings, $this->style, $this->useTempFiles);
        }
    }

    public function addImage(string $sheetName, string $image, int $row, int $col) {
        $extension = explode('.', $image);
        if(count($extension) === 1) {
            throw new \InvalidArgumentException("Wrong parameter: " . $image);
        }

        $extension = strtolower($extension[count($extension) - 1]);
        if(!in_array($extension, self::SUPPORTED_IMAGE_EXTENSIONS)) {
            throw new \InvalidArgumentException("Wrong image extension. Supported extensions: " . join(', ', self::SUPPORTED_IMAGE_EXTENSIONS));
        }

        if(!file_exists($image)) {
            throw new \InvalidArgumentException("Image not exists.");
        }

        $this->initializeSheet($sheetName);
        $this->imageCounter++;
        $this->sheets[$sheetName]->addImage($this->imageCounter, $image, $extension, $row, $col);

        if(!in_array($extension, $this->storedImageExtensions)) {
            $this->storedImageExtensions[] = $extension;
        }
    }

    public function addChart(string $sheetName, Chart $chart) {
        $this->initializeSheet($sheetName);

        $id = count($this->charts);
        $chart->setID($id + 1);
        $this->charts[] = &$chart;
        
        $this->sheets[$sheetName]->addChart($this->charts[$id]);
    }

    /*
	 * @param $sheetName string
	 * @param $row int
	 * @param $col int
     * @param $value string | int
     * @param $style array
	 * */
    public function addField(string $sheetName, int $row, int $col, string | int | float $value, $style = array()) {
        if($this->useTempFiles) {
            throw new \Exception("Cannot use this function if you use temp files");
        }

        $this->initializeSheet($sheetName);
        $this->sheets[$sheetName]->addField($row, $col, $value, $style);
    }

    public function openRow(string $sheetName, int $row) {
        if(!$this->useTempFiles) {
            throw new \Exception("Cannot use this function if you cannot use temp files");
        }

        if($row < 0) {
            throw new \InvalidArgumentException("The minimum row number have to be 0");
        }

        $this->initializeSheet($sheetName);

        try {
            $this->sheets[$sheetName]->openRow($row, $this->encoding);
        }
        catch(\Exception | \InvalidArgumentException $e) {
            throw $e;
        }
    }

    public function writeCell(string $sheetName, int $cell, string | int | float $value, $style = array()) {
        if(!isset($this->sheets[$sheetName])) {
            throw new \Exception("Cannot find sheet with name: " . $sheetName);
        }

        if(!$this->useTempFiles) {
            throw new \Exception("Cannot use this function if you cannot use temp files");
        }

        try {
            $this->sheets[$sheetName]->writeCell($this->encoding, $cell, $value, $style);
        }
        catch(\Exception | \InvalidArgumentException $e) {
            throw $e;
        }
    }

    public function closeCurrentRow(string $sheetName) {
        if(!isset($this->sheets[$sheetName])) {
            throw new \Exception("Cannot find sheet with name: " . $sheetName);
        }

        if(!$this->useTempFiles) {
            throw new \Exception("Cannot use this function if you cannot use temp files");
        }

        $this->sheets[$sheetName]->closeCurrentRow();
    }

	/*
	 * @param $sheetName string
	 * @param $start array, contains start row and start col (example: $start = array("row" => 0, "col" => 0))
	 * @param $end array, contains end row and end col (example: $end = array("row" => 0, "col" => 1))
	 * */
    public function markMergedCells(string $sheetName, array $start, array $end) {
        $this->initializeSheet($sheetName);
        
        $startRow = isset($start['row']) && is_numeric($start['row']) ? (int)$start['row'] : -1;
        $startCol = isset($start['col']) && is_numeric($start['col']) ? (int)$start['col'] : -1;
        $endRow = isset($end['row']) && is_numeric($end['row']) ? (int)$end['row'] : -1;
        $endCol = isset($end['col']) && is_numeric($end['col']) ? (int)$end['col'] : -1;

        if($startRow === -1 || $startCol === -1 || $endRow === -1 || $endCol === -1) {
            throw new \InvalidArgumentException("Wrong parameters: 'start' and 'end' arrays need to contain 'row' and 'col' keys and values.");
        }

        if($startRow > $endRow) {
            throw new \InvalidArgumentException("Wrong parameter: 'startRow' is bigger than 'endRow'");
        }

        if($startRow === $endRow && $startCol === $endCol) {
            throw new \InvalidArgumentException("Wrong parameter: 'start' and 'end' parameters are the same");
        }

        if($startCol > $endCol) {
            throw new \InvalidArgumentException("Wrong parameter: 'startCol' is bigger than 'endCol'");
        }

        $this->sheets[$sheetName]->markMergedCells($start, $end);
    }

    private function generateTempFile() {
        $builder = new XLSXBuilder(
            $this->encoding,
            $this->style,
            $this->sharedStrings,
            $this->sheets,
            $this->charts,
            $this->storedImageExtensions,
            $this->keywords,
            $this->useTempFiles,
            $this->title,
            $this->subject,
            $this->author,
            $this->description,
            $this->company
        );

        try {
            foreach($this->sheets as $sheet) {
                $sheet->finalize($this->encoding);
            }
    
            $sheetNames = array_keys($this->sheets);
            foreach($this->charts as $chart) {
                $chart->finalize($sheetNames);
            }

            $builder->buildXLSX();
            return $builder->getTempFile();
        } catch(\Exception | \InvalidArgumentException $e) {
            $builder->clean();
            throw $e;
        }
    }

    public function saveOnDisk(?string $path = null) {
        try {
            if(!is_null($path) && strlen($path) > 0) {
                $path = realpath($path);
                $path = rtrim($path, '/') . '/';
                if(!is_dir($path)) {
                    mkdir($path, 0777, true);
                }
            }

            $tempFile = $this->generateTempFile();
            copy($tempFile, $path . $this->fileName);
        } catch(\Exception | \InvalidArgumentException $e) {
            throw $e;
        } finally {
            if(isset($tempFile) && file_exists($tempFile)) {
                unlink($tempFile);
            }
        }
    }

    public function download() {
        try {
            $tempFile = $this->generateTempFile();

            header('Content-disposition: attachment; filename="' . $this->fileName . '"');
            header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            header('Content-Transfer-Encoding: binary');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');

            ob_clean();
            flush();
            readfile($tempFile);
        } catch(\Exception | \InvalidArgumentException $e) {
            throw $e;
        } finally {
            if(isset($tempFile) && file_exists($tempFile)) {
                unlink($tempFile);
            }
            exit(0);
        }
    }
}