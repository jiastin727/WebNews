<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();

}
$p = isset($_GET['p']) ? $_GET['p'] : '';

    $pValue = $_GET['p'];

//$ShowPhpErrorCode = false;
//a
include_once("justyn_link.php");
include_once("justyn_config.php");
include_once("justyn_ssn.php");
?>

<!DOCTYPE html>
<html>

<head>
  <title>Account Settings</title>

  <script type="text/javascript" src="./_framework/_jquery-3.4.1/dist/jquery.min.js"></script>
  <script type="text/javascript" src="./_framework/jquery-ui.js"></script>
  <script type="text/javascript" src="./_framework/_semantic-ui-2.4.0/semantic.js"></script>
  <script type="text/javascript" src="./_framework/_sweetalert2-9.5.4/sweetalert2.js"></script>
  <script type="text/javascript" src="./_framework/_crypto-js-3.1.9-1/crypto-js.js"></script>
  <script type="text/javascript" src="./_js/encryption.js"></script>
  <script type="text/javascript" src="./_js/jquery.redirect.js"></script>
  <script type="text/javascript" src="./_framework/_sweetalert2-9.5.4/sweetalert2.js"></script>
  <script type="text/javascript" src="./_js/moment.min.js"></script>
  <script type="text/javascript" src="./_framework/jquery-ui.js"></script>
  <link rel="stylesheet" type="text/css" href="./_framework/_semantic-ui-2.4.0/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="./_framework/_sweetalert2-9.5.4/">
  <link rel="stylesheet" type="text/css" href="./_framework/_sweetalert2-9.5.4/sweetalert2.css">
  <style>
    .ui.inverted.menu {
      border: 0 solid transparent;
      background: #4a81b7;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  </style>
</head>

<body>

  <div class="ui fixed inverted menu" style="margin-bottom: -1%;">
    <div class="item">
      <img src="../Justyn/image/birdlogo.png" style="display: inline-block;
    vertical-align: middle;
    margin-left: 0.5em;
    margin-right:0.5em;
    width: 3em;">
      <div style="font-family:'Times New Roman', Times, serif; font-size:medium; vertical-align: middle !important; color:white;">JustynWeb</div>
    </div>
    <div class="ui simple right dropdown item">
      <i class="bars icon" style="display:block"></i>
      <div class="menu">
        <div class="header" style="text-align: center;"><i class="user circle icon"></i><br>Name</div>
        <br />
        <div class="item " id="dashboard"><i class="laptop icon"></i>Dashboard</div>
        <div class="item " id="add_account"><i class="user plus icon"></i>Sign in</div>
        <div class="item " id="log_out"><i class="sign out alternate icon"></i>Log in</div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
  <div>
    <form class="ui form" style="width: 40%; margin-left:2%;">
      <label>Name</label>
      <div class="two fields">
        <div class="field">
          <input type="text" name="first-name" placeholder="First Name" id="first_name">
        </div>
        <div class="field">
          <input type="text" name="last-name" placeholder="Last Name" id="last_name">
        </div>
      </div>
      <label>Birth Date</label>
      <br />
      <div class="ui input small icon validformdate ECNDate">
        <input class="newinput mandatoryclass ResetValues" type="date" id="ECNDate" data-toggle="datepicker" autocomplete="off" style="width: 100%;">
      </div>
      </br>
      </br>

      <label>Place of Birth</label>
      <div class="field">
        <input type="text" name="place-of-birth" placeholder="Place of Birth (City, Province, Country)" style="width: 100%;" id="place_of_birth">
      </div>

      <label>Address</label>
      <div class="field">
        <input type="text" name="address" placeholder="Address (Street, Number, District, City, Province, Country)" style="width: 100%;" id="address">
      </div>

      <label>Gender</label>
      <div class="field">
        <input type="text" name="gender" placeholder="Gender" style="width: 100%;" id="gender">
      </div>

      <label>Phone Number</label>
      <div class="field">
        <input type="number" name="phone" placeholder="Phone Number" style="width: 100%;" id="phone_number">
      </div>

      <label>Email</label>
      <div class="field">
        <input type="email" name="email" placeholder="Email" style="width: 100%;" id="email">
      </div>

      <div class="field">
      </div>
      <div class="ui button" id="submit_profile_button" style="width:30%">Submit</div>
      <input type="hidden" id="NilaiP" value="<?php echo $pValue; ?>">
    </form>
  </div>
  <script src="./_js/global.js"></script>
  <script src="./_js/notif.js"></script>
  <script src="./_js/accset.js"></script>
</body>

</html>