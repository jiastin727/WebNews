<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}
$url = htmlentities($_GET["link"],ENT_QUOTES);
// var_dump($url);
$maintenance= false; //pilihan: true; false;

if($maintenance){
  $url = "maintenanceserverforbetterexp";
}

$connectlink  = new mysqli('localhost','root','','user_management');
$sqlx         = "SELECT * FROM `link` WHERE `url_name` = '$url' ";
$queryx       = mysqli_query($connectlink,$sqlx);
$result       = @mysqli_num_rows($queryx);

while ($rowx   = mysqli_fetch_array($queryx))  {

  $url_name   = $rowx[1];
  $link_folder= $rowx[2];
  $link_file  = $rowx[3];
  $link_note  = $rowx[4];
  $link_target= $rowx[5];
}


if ($url == "")              { include '';        exit;
}

else {
  if($link_target == "DOC"){
    // include './rnd_dashbrd.php';
    // echo '<script type="text/javascript">window.open("'.$link_folder.$link_file.'?id='.$randz.'", "_blank");</script>';    
    exit;
  } else if($link_target =="PAGE") {
    include $link_folder.$link_file;
    exit;
  } else {
    
    // include './rnd_logout.php';               
    exit;
  }
}
  
//----- URL LINK SUDAH MENGGUNAKAN DATABASE, UNTUK PERUBAHAN DAN PENAMBAHAN SILAKAN BUKA DI PHPMYADMIN -> USERMANAGEMENT -> TABLE_LINK
