<?php

namespace XLSXWriter\Chart;

abstract class Chart {
    const SUPPORTED_LEGEND_POSITIONS = ['t', 'b', 'l', 'r']; // top, bottom, left, right
    const DEFAULT_LEGEND_POSITION = 'r';
    protected ?string $title = null;
    protected int $id = -1;
    protected int $row = 0;
    protected int $col = 0;
    private bool $showLegend = true;
    private string $legendPosition = self::DEFAULT_LEGEND_POSITION;

    public function setID(int $id) {
        if($this->id === -1) {
            if($id < 1) {
                throw new \InvalidArgumentException("ID cannot be less than 1");
            }
    
            $this->id = $id;
        }
    }

    public function getID() : int {
        return $this->id;
    }

    public function setTitle(string $title) {
        $this->title = htmlspecialchars($title);
    }

    public function removeTitle() {
        $this->title = null;
    }

    public function setPosition(int $row, int $col) {
        if($row < 0) {
            throw new \InvalidArgumentException("Row cannot be less than 0");
        }

        if($col < 0) {
            throw new \InvalidArgumentException("Col cannot be less than 0");
        }

        $this->row = $row;
        $this->col = $col;
    }

    public function setShowLegend(bool $showLegend) {
        $this->showLegend = $showLegend;
    }

    public function setLegendPosition(string $legendPosition) {
        $legendPosition = strtolower($legendPosition);
        if(in_array($legendPosition, self::SUPPORTED_LEGEND_POSITIONS)) {
            $this->legendPosition = $legendPosition;
        }
    }

    public function getRelationXML($id) : string {
        return '<Relationship Id="rId' . $id . '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="../charts/chart' . $this->id . '.xml"/>';
    }

    public function getDrawingXML($id) : string {
        $max = max($this->row, $this->col) + 15;

        $xml = '<xdr:twoCellAnchor>' . PHP_EOL;
            $xml .= '<xdr:from>' . PHP_EOL;
                $xml .= '<xdr:col>' . $this->col . '</xdr:col>' . PHP_EOL;
                $xml .= '<xdr:colOff>0</xdr:colOff>' . PHP_EOL;
                $xml .= '<xdr:row>' . $this->row . '</xdr:row>' . PHP_EOL;
                $xml .= '<xdr:rowOff>0</xdr:rowOff>' . PHP_EOL;
            $xml .= '</xdr:from>' . PHP_EOL;

            $xml .= '<xdr:to>' . PHP_EOL;
                $xml .= '<xdr:col>' . $max . '</xdr:col>' . PHP_EOL;
                $xml .= '<xdr:colOff>0</xdr:colOff>' . PHP_EOL;
                $xml .= '<xdr:row>' . $max  . '</xdr:row>' . PHP_EOL;
                $xml .= '<xdr:rowOff>0</xdr:rowOff>' . PHP_EOL;
            $xml .= '</xdr:to>' . PHP_EOL;
        
            $xml .= '<xdr:graphicFrame>' . PHP_EOL;
                $xml .= '<xdr:nvGraphicFramePr>' . PHP_EOL;
                    $xml .= '<xdr:cNvPr id="1" name="Diagram 1" />' . PHP_EOL;
                    $xml .= '<xdr:cNvGraphicFramePr/>' . PHP_EOL;
                $xml .= '</xdr:nvGraphicFramePr>' . PHP_EOL;

                $xml .= '<xdr:xfrm />' . PHP_EOL;
                
                $xml .= '<a:graphic>' . PHP_EOL;
                    $xml .= '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">' . PHP_EOL;
                        $xml .= '<c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"' . PHP_EOL;
                            $xml .= 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId' . $id . '"/>' . PHP_EOL;
                    $xml .= '</a:graphicData>' . PHP_EOL;
                $xml .= '</a:graphic>' . PHP_EOL;
            $xml .= '</xdr:graphicFrame>' . PHP_EOL;
            
            $xml .= '<xdr:clientData/>' . PHP_EOL;
        $xml .= '</xdr:twoCellAnchor>';
        return $xml;
    }

    private function getTitleXML() : string {
        /*
         * sng means single
         * dbl means double
         * <a:defRPr sz="1400" b="1" i="1" u="sng" strike="dblStrike" kern="1200" spc="0" baseline="0" />
         * <a:defRPr sz="1400" b="1" i="1" u="dbl" strike="sngStrike" kern="1200" spc="0" baseline="0" />
         */
        $xml = '<c:title>' . PHP_EOL;
            $xml .= '<c:tx>' . PHP_EOL;
                $xml .= '<c:rich>' . PHP_EOL;
                    $xml .= '<a:bodyPr rot="0" spcFirstLastPara="1" vertOverflow="ellipsis" vert="horz" wrap="square" anchor="ctr" anchorCtr="1"/>' . PHP_EOL;
                    $xml .= '<a:p>' . PHP_EOL;
                        $xml .= '<a:pPr>' . PHP_EOL;
                            $xml .= '<a:defRPr sz="1400" b="0" i="0" u="none" strike="noStrike" kern="1200" spc="0" baseline="0" />' . PHP_EOL;
                        $xml .= '</a:pPr>' . PHP_EOL;
                        $xml .= '<a:r>' . PHP_EOL;
                            $xml .= '<a:t>' . $this->title . '</a:t>' . PHP_EOL;
                        $xml .= '</a:r>' . PHP_EOL;
                    $xml .= '</a:p>' . PHP_EOL;
                $xml .= '</c:rich>' . PHP_EOL;
            $xml .= '</c:tx>' . PHP_EOL;
            $xml .= '<c:overlay val="0"/>' . PHP_EOL;
            $xml .= '<c:txPr>' . PHP_EOL;
                $xml .= '<a:bodyPr rot="0" spcFirstLastPara="1" vertOverflow="ellipsis" vert="horz" wrap="square" anchor="ctr" anchorCtr="1"/>' . PHP_EOL;
                $xml .= '<a:p>' . PHP_EOL;
                    $xml .= '<a:pPr>' . PHP_EOL;
                        $xml .= '<a:defRPr sz="1400" b="0" i="0" u="none" strike="noStrike" kern="1200" spc="0" baseline="0" />' . PHP_EOL;
                    $xml .= '</a:pPr>' . PHP_EOL;
                $xml .= '</a:p>' . PHP_EOL;
            $xml .= '</c:txPr>' . PHP_EOL;
        $xml .= '</c:title>';
        return $xml;
    }

    protected function getHeaderXML($encoding) : string {
        $xml = '<?xml version="1.0" encoding="' . $encoding . '" standalone="yes"?>' . PHP_EOL;
        $xml .= '<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"' . PHP_EOL;
            $xml .= 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"' . PHP_EOL;
            $xml .= 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"' . PHP_EOL;
            $xml .= 'xmlns:c16r2="http://schemas.microsoft.com/office/drawing/2015/06/chart">' . PHP_EOL;
            $xml .= '<c:roundedCorners val="0"/>' . PHP_EOL;
            $xml .= '<c:chart>' . PHP_EOL;

            if(!is_null($this->title)) {
                $xml .= $this->getTitleXML() . PHP_EOL;
            }

            $xml .= '<c:plotArea>';
        return $xml;
    }

    private function getLegendXML() : string {
        $xml = '<c:legend>' . PHP_EOL;
            $xml .= '<c:legendPos val="' . $this->legendPosition . '"/>' . PHP_EOL;
            $xml .= '<c:overlay val="0"/>' . PHP_EOL;
        $xml .= '</c:legend>';
        return $xml;
    }

    protected function getFooterXML() : string {
                $xml = '</c:plotArea>' . PHP_EOL;
                if($this->showLegend) {
                    $xml .= $this->getLegendXML() . PHP_EOL;
                }
            $xml .= '</c:chart>' . PHP_EOL;
            $xml .= '<c:spPr>' . PHP_EOL;
                $xml .= '<a:solidFill>' . PHP_EOL;
                    $xml .= '<a:schemeClr val="bg1"/>' . PHP_EOL;
                $xml .= '</a:solidFill>' . PHP_EOL;
                $xml .= '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr">' . PHP_EOL;
                    $xml .= '<a:solidFill>' . PHP_EOL;
                        $xml .= '<a:schemeClr val="tx1">' . PHP_EOL;
                            $xml .= '<a:lumMod val="15000"/>' . PHP_EOL;
                            $xml .= '<a:lumOff val="85000"/>' . PHP_EOL;
                        $xml .= '</a:schemeClr>' . PHP_EOL;
                    $xml .= '</a:solidFill>' . PHP_EOL;
                $xml .= '</a:ln>' . PHP_EOL;
            $xml .= '</c:spPr>' . PHP_EOL;
            $xml .= '<c:printSettings>' . PHP_EOL;
                $xml .= '<c:headerFooter/>' . PHP_EOL;
                $xml .= '<c:pageMargins b="0.75" l="0.7" r="0.7" t="0.75" header="0.3" footer="0.3"/>' . PHP_EOL;
                $xml .= '<c:pageSetup/>' . PHP_EOL;
            $xml .= '</c:printSettings>' . PHP_EOL;
        $xml .= '</c:chartSpace>';
        return $xml;
    }
}
