<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

$dbhost = 'localhost'; 
$dbuser = 'root';       
$dbpass = '';    

// KONEKSI KE DATABASE
$connect       = new mysqli($dbhost,$dbuser,$dbpass,'user_management');

// CEK KONEKSI
if ($connect->connect_error) {
   die('Maaf koneksi gagal: '. $connect->connect_error);
}



//LOAD ENCRYPTION
include_once ("./_encryption.php");

//LOKASI REST API
$RESTLOC      = "../Justyn_backend/backend_Login/";

$nonceValue       = "justyn123";

$randz            = rand();

//SETCOOKIES REST LOCATIONS
setcookie("nonceValue", htmlentities($nonceValue));
setcookie("restloc",htmlentities($RESTLOC));

//ENCRYPT USER AUTH
 $Encryption = new Encryption();
// $passuserauth = $Encryption->encrypt('el2023', $nonceValue);

//FOOTER
$footer = "Axeswell<br>&nbsp;";


//CONTROL BOOKING SN TAB MENU ( DESCRIPT VERIFICATION - ADDITIONAL CHECK - SN ERROR)
$sntabfeatures = "disable";

$ip_server = $_SERVER['SERVER_ADDR'];

if($ip_server == "102.0.0.1"){
  $textlogin = "Server Trial";
  $sufix1 = "trial";
} else {
  $textlogin = "";
  $sufix1 = "";
}

?>