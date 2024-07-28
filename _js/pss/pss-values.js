
const NonceValue = "rdsystem2020";

const ColorOwner      = "#00139f";
const ColorFinish     = "#5d5d5d";
const ColorCancel     = "#7c0000";
const ColorRejectReturn = "#2c007c";
const ColorIHPPlacein = "#720378";
const ColorIHPProcess = "#00139f";
const ColorReqRev     = "#00860e";
const BgColorReqRev   = "#fff5e9";
const ColorRevised    = "#7d7d7d";
const ColorTMakerIHP  = "#125384";
const BgColorTMakerNOT= "#ffecec";
const BgColorTMakerOK = "#effde9";

const ColorAllDiff    = "#df00ff";
const ColorItemDiff   = "#df00ff";
const BgColor000000   = "#fed7fc";
const BgColorInsert   = "#e0ffe8";
const ColorKebNull    = "#6c0101";

const ColorBorderFreeze = "#d6eeff96";

const ColorIHPNeedApprove   = "#ae8101";
const BgColorIHPNeedApprove = "#fbff0017";
const ColorIHPApproved      = "#0a3c04";
const BgColorIHPApproved    = "#f1fff1";
const ColorIHPMscOpr        = "#777777";
const ColorIHPNOT           = "#9b0000";
const ColorIHPFinish        = "#7d7d7d";
const ColorIHPCancel        = "#7c0000";


var VUserName   = getCookie("usrnm");
var VToken      = getCookie("token");
var RestLocMPP  = decodeURIComponent(getCookie("restlocmpp"));
var restlocpss  = decodeURIComponent(getCookie("restlocpss"));

let Ucrypt = new Encryption();
var DUser  = Ucrypt.decrypt(EUser, NonceValue);
var DJbtn  = Ucrypt.decrypt(EJbtn, NonceValue);
var DSect  = Ucrypt.decrypt(ESect, NonceValue);
var DGrup  = Ucrypt.decrypt(EGrup, NonceValue);





$(".ui.dropdown").dropdown();
$(".menu .item").tab();
$('.ui.accordion').accordion();


