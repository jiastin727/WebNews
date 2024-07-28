<?php 

namespace XLSXWriter;

class XLSXBuilder {
    private string $tempFile;
    private ?\ZipArchive $zip = null;

    public function __construct(
        private string $encoding,
        private Style &$style,
        private SharedStrings &$sharedStrings,
        private array &$sheets,
        private array &$charts,
        private array &$storedImageExtensions,
        private array &$keywords,
        private bool &$useTempFiles,
        private ?string &$title,
        private ?string &$subject,
        private ?string &$author,
        private ?string &$description,
        private ?string &$company
    ) {
        $this->generateTemp();
    }

    public function __destruct() {
        /*
        DO NOT DELETE HERE
        if(file_exists($this->tempFile)) {
            unlink($this->tempFile);
        }
        */
    }

    private function generateTemp() {
		$tempdir = sys_get_temp_dir();
		$this->tempFile = tempnam($tempdir, "xlsx_export_");
	}

    public function getTempFile() : string {
        return $this->tempFile;
    }

    public function buildXLSX() {
        if(count($this->sheets) === 0) {
            throw new \Exception('[' . __CLASS__ . '][' . __FUNCTION__ . '] there is no defined sheet');
        }

        $this->zip = new \ZipArchive();
        if(!$this->zip->open($this->tempFile, \ZipArchive::CREATE)) {
            throw new \Exception('[' . __CLASS__ . '][' . __FUNCTION__ . '] cannot create zip');
        }

        // Create _rels
        $this->zip->addEmptyDir("_rels/");
        $this->zip->addFromString("_rels/.rels", $this->buildRelsXML());

        // Create docProps
        $this->zip->addEmptyDir("docProps/");
        $this->zip->addFromString("docProps/core.xml", $this->buildCoreXML());
        $this->zip->addFromString("docProps/app.xml", $this->buildAppXML());

        // create xl
        $this->zip->addEmptyDir("xl/");
        $this->zip->addFromString("xl/workbook.xml", $this->buildWorkbookXML());
        $this->zip->addFromString("xl/styles.xml", $this->style->getXML($this->encoding));
        if($this->sharedStrings->needXML()) {
            if($this->useTempFiles) {
                $this->sharedStrings->finalizeXML();
                $this->zip->addFile($this->sharedStrings->getTempFile(), "xl/" . SharedStrings::FILE_NAME);
            }
            else {
                $this->zip->addFromString("xl/" . SharedStrings::FILE_NAME, $this->sharedStrings->getXML($this->encoding));
            }
        }

        $this->buildWorkSheets();

        $this->zip->addEmptyDir("xl/_rels/");
        $this->zip->addFromString("xl/_rels/workbook.xml.rels", $this->buildWorkbookRelsXML());

        // Create content types
        $this->zip->addFromString("[Content_Types].xml", $this->buildContentTypesXML());

        $this->zip->close();
    }

    public function clean() {
        if(file_exists($this->tempFile)) {
            unlink($this->tempFile);
        }
    }

    private function buildRelsXML() : string {
        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
            $xml .= '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>';
            $xml .= '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>';
            $xml .= '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>';
        $xml .= '</Relationships>';
        return $xml;
    }

    private function buildCoreXML() : string {
        $date = date("Y-m-d\TH:i:s.00\Z");

        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
            if(!is_null($this->title) && strlen($this->title) > 0) {
                $xml .= "<dc:title>" . $this->title . "</dc:title>";
            }
            if(!is_null($this->subject) && strlen($this->subject) > 0) {
                $xml .= "<dc:subject>" . $this->subject . "</dc:subject>";
            }
            if(!is_null($this->author) && strlen($this->author) > 0) {
                $xml .= "<dc:creator>" . $this->author . "</dc:creator>";
            }
            if(!is_null($this->description) && strlen($this->description) > 0) {
                $xml .= "<dc:description>" . $this->description . "</dc:description>";
            }
            if(count($this->keywords) > 0) {
                $xml .= "<cp:keywords>" . implode(',' , $this->keywords) . "</cp:keywords>";
            }

            $xml .= "<cp:lastModifiedBy></cp:lastModifiedBy>";
            $xml .= '<dcterms:created xsi:type="dcterms:W3CDTF">' . $date . '</dcterms:created>';
            $xml .= '<dcterms:modified xsi:type="dcterms:W3CDTF">' . $date . '</dcterms:modified>';
        $xml .= '</cp:coreProperties>';
        return $xml;
    }

    private function buildAppXML() : string {
        $sheetNames = array_keys($this->sheets);
        $sheetCount = count($sheetNames);

        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">';
            $xml .= '<Application>Microsoft Excel</Application>';
            $xml .= '<DocSecurity>0</DocSecurity>';
            $xml .= '<ScaleCrop>false</ScaleCrop>';
            $xml .= '<HeadingPairs>';
                $xml .= '<vt:vector size="2" baseType="variant">';
                    $xml .= '<vt:variant>';
                        $xml .= '<vt:lpstr>Worksheets</vt:lpstr>';
                    $xml .= '</vt:variant>';
                    $xml .= '<vt:variant>';
                        $xml .= '<vt:i4>' . $sheetCount . '</vt:i4>';
                    $xml .= '</vt:variant>';
                $xml .= '</vt:vector>';
            $xml .= '</HeadingPairs>';
            $xml .= '<TitlesOfParts>';
                $xml .= '<vt:vector size="' . $sheetCount . '" baseType="lpstr">';
                    foreach($sheetNames as $sheetName) {
                        $xml .= '<vt:lpstr>' . $sheetName . '</vt:lpstr>';
                    }
                $xml .= '</vt:vector>';
            $xml .= '</TitlesOfParts>';
            $xml .= '<Manager></Manager>';
            if(!is_null($this->company) && strlen($this->company) > 0) {
                $xml .= '<Company>' . $this->company . '</Company>';
            }
            $xml .= '<LinksUpToDate>false</LinksUpToDate>';
            $xml .= '<SharedDoc>false</SharedDoc>';
            $xml .= '<HyperlinksChanged>false</HyperlinksChanged>';
            $xml .= '<AppVersion>15.0300</AppVersion>';
        $xml .= '</Properties>';
        
        return $xml;
    }

    private function buildWorkbookXML() : string {
        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main">';
            $xml .= '<fileVersion appName="xl" lastEdited="0" lowestEdited="0" rupBuild="14420"/>';
            $xml .= '<workbookPr filterPrivacy="1" defaultThemeVersion="124226"/>';
            $xml .= '<bookViews>';
                $xml .= '<workbookView xWindow="240" yWindow="105" windowWidth="14805" windowHeight="8010" activeTab="0"/>';
            $xml .= '</bookViews>';
            $xml .= '<sheets>';
                foreach($this->sheets as $name => $sheet) {
                    $xml .= '<sheet name="' . $name . '" sheetId="' . $sheet->getID() . '" r:id="rId' . $sheet->getID() . '"/>';
                }
            $xml .= '</sheets>';
                $xml .= '<calcPr calcId="122211"/>';
        $xml .= '</workbook>';
        return $xml;
    }

    private function buildWorkSheets() {
        $this->zip->addEmptyDir("xl/worksheets/");
        $drawings = [];

        foreach($this->sheets as $sheet) {
            $name = "sheet" . $sheet->getID() . ".xml";
            if($this->useTempFiles) {
                $this->zip->addFile($sheet->getTempFile(), "xl/worksheets/" . $name);
            }
            else {
                $this->zip->addFromString("xl/worksheets/" . $name, $sheet->getXML($this->encoding));
            }

            $drawing = $sheet->getDrawing();
            if(!is_null($drawing) && $drawing instanceof Drawing) {
                $drawings[] = ["id" => $sheet->getID(), "drawing" => $drawing];

                $this->zip->addEmptyDir("xl/worksheets/_rels/");
                $this->zip->addFromString("xl/worksheets/_rels/" . $name . ".rels", $sheet->getRelationXML($this->encoding));
            }
        }

        if(count($this->charts) > 0) {
            $this->zip->addEmptyDir("xl/charts/");
            foreach($this->charts as $chart) {
                $file = "xl/charts/chart" . $chart->getID() . '.xml';
                $this->zip->addFromString($file, $chart->getXML($this->encoding));
            }
        }

        if(count($drawings) > 0) {
            $this->zip->addEmptyDir("xl/drawings/");
            $this->zip->addEmptyDir("xl/drawings/_rels/");

            $this->zip->addEmptyDir("xl/media/");
            foreach($drawings as $drawing) {
                $id = $drawing['id'];
                $object = $drawing['drawing'];

                $fileName = "drawing" . $id . ".xml";
                $images = $object->getImages();

                foreach($images as $image) {
                    if($image instanceof Image) {
                        if(!$image->fileExists()) {
                            throw new \Exception('[' . __CLASS__ . '][' . __FUNCTION__ . '] cannot find image: ' . $image->getFileName());
                        }
    
                        $file = "xl/media/image" . $image->getID() . "." . $image->getImageExtension();
                        $this->zip->addFromString($file, $image->getFileContent());
                    }
                }

                $this->zip->addFromString("xl/drawings/_rels/" . $fileName . ".rels", $object->getRelationXML($this->encoding));
                $this->zip->addFromString("xl/drawings/" . $fileName, $object->getXML($this->encoding));
            }
        }
    }

    private function buildWorkbookRelsXML() : string {
        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
            // $xml .= '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>';
            $lastID = 0;
            foreach($this->sheets as $sheet) {
                $id = $sheet->getID();
                $xml .= '<Relationship Id="rId' . $id . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' . $id . '.xml"/>';
                $lastID = max($lastID, $id);
            }

            $lastID++;
            $xml .= '<Relationship Id="rId' . $lastID . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';

            if($this->sharedStrings->needXML()) {
                $lastID++;
                $xml .= '<Relationship Id="rId' . $lastID . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>';
            }
        $xml .= '</Relationships>';
        return $xml;
    }

    private function buildContentTypesXML() : string {
        $xml = '<?xml version="1.0" encoding="' . $this->encoding . '" standalone="yes"?>';
        $xml .= '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';

            if(count($this->storedImageExtensions) > 0) {
                foreach($this->storedImageExtensions as $extension) {
                    $xml .= '<Default Extension="' . $extension . '" ContentType="image/' . $extension . '"/>';
                }
            }

            $xml .= '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>';
            $xml .= '<Default Extension="xml" ContentType="application/xml"/>';
            $xml .= '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>';
            foreach($this->sheets as $sheet) {
                $xml .= '<Override PartName="/xl/worksheets/sheet' . $sheet->getID() . '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';

                $drawing = $sheet->getDrawing();
                if(!is_null($drawing) && $drawing instanceof Drawing) {
                    $xml .= '<Override PartName="/xl/drawings/drawing' . $sheet->getID() . '.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>';
                }
            }

            foreach($this->charts as $chart) {
                $xml .= '<Override PartName="/xl/charts/chart' . $chart->getID() . '.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>';
            }

            // $xml .= '<Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>' . PHP_EOL;
            $xml .= '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>';

            if($this->sharedStrings->needXML()) {
                $xml .= '<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>';
            }

            $xml .= '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>';
            $xml .= '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>';
        $xml .= '</Types>';
        return $xml;
    }
}