<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LogOut</title>
  <script src="./_framework/_jquery-3.4.1/dist/jquery.min.js"></script>
</head>
<body>
</body>
<script src="./_js/Axeswell_global.js"></script>

<script type="text/javascript">
  var vusrnm = getCookie('usrnm');
  var vtoken = getCookie('token');
  $(document).ready(function() {
  //SEND REQUEST TO LOGOUT
  $.ajax({
    type: "POST",
    url: "<?php echo $RESTLOC;?>logout",
    data : {
      userlogout : vusrnm
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(JSON.parse(response));
      if(isEmpty(obj)) {
        console.log('Gagal load, data kosong');
      } else if(obj) {
        console.log('berhasil logout');
        window.location.href = "./_logout.php";
      } else {
        console.log('Gagal load tabel');
        window.location.href = "./?link=login";
      }
    },
    error: function(){
      window.location.href = "./?link=loclogout";
      console.log('Server tidak merespon, segera hubungi Administrator di ext. 3553 !');
    }
  });
})
</script>

</html>
