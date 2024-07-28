<?php

namespace XLSXWriter;

class Image {
    const PX_TO_EMU = 6350;

    function __construct(private int $id, private string $image, private string $extension, private int $row, private int $col) {}

    public function getID() : int {
        return $this->id;
    }

    public function fileExists() : bool {
        return file_exists($this->image);
    }

    public function getFileName() : string {
        return $this->image;
    }

    public function getImageExtension() : string {
        return $this->extension;
    }

    public function getFileContent() : string {
        return file_get_contents($this->image);
    }

    public function getRelationXML() : string {
        return '<Relationship Id="rId' . $this->id . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image' . $this->id . '.png"/>';
    }

    private function calculateImageDimension() : array {
        list($width, $height) = getimagesize($this->image);
        $cx = ceil($width * self::PX_TO_EMU);
        $cy = ceil($height * self::PX_TO_EMU);
        return array($cx, $cy);
    }

    public function getXML() : string {
        list($cx, $cy) = $this->calculateImageDimension();
        
        $xml = '<xdr:oneCellAnchor>' . PHP_EOL;
            $xml .= '<xdr:from>' . PHP_EOL;
                $xml .= '<xdr:col>' . $this->col . '</xdr:col>' . PHP_EOL;
                $xml .= '<xdr:colOff>0</xdr:colOff>' . PHP_EOL;
                $xml .= '<xdr:row>' . $this->row . '</xdr:row>' . PHP_EOL;
                $xml .= '<xdr:rowOff>0</xdr:rowOff>' . PHP_EOL;
            $xml .= '</xdr:from>' . PHP_EOL;

            $xml .= '<xdr:ext cx="' . $cx . '" cy="' . $cy . '"/>' . PHP_EOL;
            
            $xml .= '<xdr:pic>' . PHP_EOL;
                $xml .= '<xdr:nvPicPr>' . PHP_EOL;
                    $xml .= '<xdr:cNvPr id="' . $this->id . '" name="Image ' . $this->id . '" />' . PHP_EOL;
                
                    // $xml .= '<xdr:cNvPicPr>' . PHP_EOL;
                    $xml .= '<xdr:cNvPicPr preferRelativeResize="0">' . PHP_EOL;
                        // $xml .= '<a:picLocks noChangeAspect="0"/>' . PHP_EOL;
                        $xml .= '<a:picLocks/>';
                    $xml .= '</xdr:cNvPicPr>' . PHP_EOL;
                $xml .= '</xdr:nvPicPr>' . PHP_EOL;

                $xml .= '<xdr:blipFill>' . PHP_EOL;
                    $xml .= '<a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="rId' . $this->id . '"/>' . PHP_EOL;
                $xml .= '</xdr:blipFill>' . PHP_EOL;

                $xml .= '<xdr:spPr>' . PHP_EOL;
                    $xml .= '<a:prstGeom prst="rect" />' . PHP_EOL;
                $xml .= '</xdr:spPr>' . PHP_EOL;
            $xml .= '</xdr:pic>' . PHP_EOL;

            $xml .= '<xdr:clientData/>' . PHP_EOL;
        $xml .= '</xdr:oneCellAnchor>' . PHP_EOL;
        return $xml;
    }
}