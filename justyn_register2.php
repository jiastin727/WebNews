<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
//$ShowPhpErrorCode=false;
include_once("justyn_link.php");
include_once("justyn_config.php");
?>

<!DOCTYPE html>
<html>

<head>
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

    <style>
        #header {
            margin-top: 5%;
            scale: 90%;
        }

        #form {
            margin-left: 25%;
            margin-right: 25%;
        }

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
                <div class="item active" id="add_account"><i class="user plus icon"></i>Sign in</div>
                <div class="item " id="login"><i class="sign in alternate icon"></i>Log in</div>
            </div>
        </div>
    </div>

    <h2 class="ui icon header" style="display:block;" id="header">
        <i class="pencil alternate icon"></i>
        <div class="content">
            Register
            <div class="sub header">Make an Account to Proceed</div>
        </div>
    </h2>

    <form class="ui form segment" id="form">
        <div class="field">
            <label>Name</label>
            <input placeholder="Enter Your Full Name" name="name" type="text" id="fullname">
        </div>


        <div class="field">
            <label>Username</label>
            <input placeholder="Username" name="username" type="text" id="username">
        </div>
        <div class="field">
            <label>Password</label>
            <input placeholder="Password" name="password" type="password" id="pass">
        </div>
        <div class="two fields">
            <div class="field">
                <div class="ui primary submit button" id="button_submit">Submit</div>
            </div>
            <div class="field">
                <a href="#" style="text-decoration:underline; text-align:right; display:block" id="ada_akun">I have an account</a>
            </div>
        </div>
    </form>

    <script src="./_js/Axeswell_global.js"></script>
    <script src="./_js/notif.js"></script>
    <script src="./_js/register2.js"></script>
</body>

</html>