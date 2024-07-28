<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$ShowPhpErrorCode = false;

include_once("justyn_link.php");
include_once("justyn_config.php");
include_once("justyn_ssn.php");
?>

<!DOCTYPE html>
<html>

<head>
    <title>Add News</title>

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

        #webtitle:hover {
            background-color: #3d67c4;
            transition-duration: 1s;
            cursor: pointer;
        }
    </style>
</head>

<body>

    <div class="ui fixed inverted menu" style="margin-bottom: -1%;">

        <div class="item" id="webtitle">
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
    <form class="ui form" style="width: 40%; margin-left:2%;">
        <label>Writer's name</label>
        <div class="two fields">
            <div class="field">
                <input type="text" name="name" placeholder="Name" id="name">
            </div>
        </div>
        <label>Date of writing</label>
        <br />
        <div class="ui input small icon validformdate ECNDate">
            <input class="newinput mandatoryclass ResetValues" type="datetime-local" id="date_post" max="2030-12-30" data-toggle="datepicker" autocomplete="off" style="width: 100%;">
        </div>
        </br>
        </br>

        <label>Headline</label>
        <div class="field">
            <input type="text" name="headline" placeholder="Headline" style="width: 100%;" id="headline">
        </div>
    </form>
    <br />
    <label style="margin-left: 2%;">Picture</label>
    <div class="field">
        <input type="file" name="picture" id="picture" style="margin-left: 2%;">
    </div>
    <br />
    <form class="ui form" style="width: 40%; margin-left:2%;">
        <label>Contents</label>
        <div class="field" style="height: 200%;">
            <textarea type="text" name="contents" placeholder="Contents" style="width: 150%; height:100%" id="contents"></textarea>
        </div>



        <div class="ui button" id="submit_button" style="width:30%">Submit</div>

    </form>
    </div>
    <br />
    <script src="./_js/Axeswell_global.js"></script>
    <script src="./_js/notif.js"></script>
    <script src="./_js/addnews.js"></script>
</body>

</html>