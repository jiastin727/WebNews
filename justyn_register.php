<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }
// $ShowPhpErrorCode = false;
include_once("justyn_link.php");
include_once("justyn_config.php");
?>
<!DOCTYPE html>
<html><head>
  <!-- Standard Meta -->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Register</title>
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
  <!-- Site Properties -->
 

  <style type="text/css">
    body {
      background-color: #DADADA;
    }
    body > .grid {
      height: 100%;
    }
    .image {
      margin-top: -100px;
    }
    .column {
      max-width: 450px;
    }
  </style>
 
</head>
<body data-new-gr-c-s-check-loaded="14.1138.0" data-gr-ext-installed="">

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="../img/bird_2-removebg-preview.png" class="image">
      <div class="content">
      Register Account
      </div>
    </h2>
    <form class="ui large form">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input id="username" type="text" name="username" placeholder="Username">
            
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input id="password" type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui fluid large teal submit button" id="btnreg">Register</div>
        
      </div>

      <div class="ui error message"></div>

    </form>

    <div class="ui message">
      Have one ? <a href="#">Login</a>
    </div>
  </div>
</div>
<script src="./_js/Axeswell_global.js"></script>
<script src="./_js/notif.js"></script>
<script src="./_js/login.js"></script>


</body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html/notif.js