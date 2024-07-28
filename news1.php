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
  <title></title>

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

    #search_bar {

      background-color: white !important;
      color: black;
    }



    .ui.inverted.menu .item:before {
      background: #758ec6;
    }

    .rimg {
      width: 100%;
      margin-top: 0px;
      margin-right: 20%;
      text-align: center;
      height: 75%;
      object-fit: cover;
    }

    .limg {
      margin: auto;
      width: 100%;
    }

    .bimg {
      width: 100%;
      text-align: center;
      object-fit: cover;

    }

    .section:hover {
      background-color: #E5DDDB !important;
      cursor: pointer;
      text-decoration: underline;
      color: #758ec6;
    }

    #webtitle:hover {
      background-color: #4a81b7;
    }

    .bottom_menu:hover {
      color: #1152F2 !important;
    }

    .desc{
      text-decoration: none !important;
    }
  </style>
</head>

<body>

  <div class="ui fixed inverted menu" style="margin-bottom: -1%; width:100%;">
    <a class="item" id="webtitle">
      <img src="../Justyn/image/birdlogo.png" style="display: inline-block;
    vertical-align: middle;
    margin-left: 0.5em;
    margin-right:0.5em;
    width: 3em;">
      <div style="font-family:'Times New Roman', Times, serif; font-size:medium; vertical-align: middle !important; color:white;">JustynWeb</div>
    </a>


    <a class="item">Trending</a>

    <a class="item">Hobbies</a>

    <a class="item">Economic</a>

    <a class="item">Political</a>

    <a class="item">Health</a>


    <div class="ui simple dropdown link item">
      <div>Others </div><i class="chevron down icon"></i>
      <div class="menu">
        <div class="item" id="hot_news"><i class="fire icon"></i>Find Out Hot and Updated News</div>
        <div class="item" id="recommended"><i class="thumbs up icon"></i>Recommended For You</div>
        <div class="item" id="more_news"><i class="plus icon"></i>More News</div>
        <div class="item" id="add_news"><i class="edit icon"></i>Add News</div>
      </div>
    </div>

    <div class="right menu">
      <div class="item">
        <div class="ui action left icon input">
          <i class="search icon"></i>
          <input type="text" placeholder="Search" id="search_bar">
          <button class="ui button" id="go_button">Go</button>
        </div>

      </div>
      <div class="ui simple dropdown link item">
        <i class="bars icon"></i>
        <div class="menu">
          <div class="header" style="text-align: center;"><i class="user circle icon"></i><br>Name</div>
          <br />
          <div class="item " id="acc_set"><i class="settings icon"></i>Account Settings</div>
          <div class="item " id="add_account"><i class="user plus icon"></i>Sign in</div>
          <div class="item " id="log_out"><i class="sign in alternate icon"></i>Log in</div>
        </div>
      </div>

    </div>
  </div>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  
  <div style="text-align:left; font-size: 300%; font-weight:1000; line-height:105%;font-family:'Times New Roman', Times, serif; margin-left:20%; margin-right:20%">Sydney church stabbing: Boy, 16, arrested after Bishop attacked</div>
  <br/>
  <div style="margin-left:20%; margin-top:-0.5%; color:#5f6569">Written on 15 April 2024</div>
  <br/>
  <img src="https://ichef.bbci.co.uk/news/1536/cpsprodpb/4A01/production/_133154981_bishopstab.jpg.webp" style="width:60%; display:block; margin-left: 20%; margin-right:20%">
  <br />
  <br />
  <br />

  <div style="margin-left: 20%; line-height:110%;text-indent:5%; margin-right:20%; text-align:justify; font-size: 150%; font-family:'Times New Roman', Times, serif">The incident happened on Monday evening at the Christ The Good Shepherd Church in the suburb of Wakeley.
At least four people were stabbed but police said none of their injuries were life-threatening.
The incident triggered unrest as hundreds gathered outside the church, clashing with police - two of whom were injured.
Vehicles were damaged as people threw stones, bricks and bottles and, according to Reuters news agency, police fired pepper spray.
Witnesses said the people gathered were demanding for the attacker to be brought outside.
Police said they had responded in numbers to the incident and urged the public to keep away from the area.
New South Wales acting assistant commissioner Andrew Holland said the 16-year-old suspect was being treated for wounds to his hand. He added he had been taken to a secure location.
The stabbing comes days after six people were killed at a shopping mall in Sydney. The attacker was later shot dead by a police officer.
There is no suggestion the two events are linked.
The bishop attacked on Monday was named by local media as Mar Mari Emmanuel.
Ordained by the Assyrian Orthodox Church in 2011, he is seen as a popular and controversial figure. His sermons have received millions of views on social media.
"There was so much anger because the bishop is loved by them, he's loved by myself as well, he preaches about the lord and we love the lord," local resident Canny told Reuters.</div>
  <br />
  <br />
  <div style="text-align:left; font-size: 300%; font-weight:1000; line-height:105%;font-family:'Times New Roman', Times, serif; margin-left:20%; margin-right:20%">Other News</div>
  <div class="ui horizontal segments" style="width:60%; margin-left:20%; margin-right:20%; border-radius:0px; box-shadow:none;border:none; ">
  <div class="ui segment section" style="cursor: pointer; border-radius:0px; width:100%;box-shadow:none;">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C91F/production/_132678415_thaksin_getty.jpg.webp" class="limg"><br />
      <span style=" font-size:150%">Thaksin Shinawatra: Former Thai prime minister released on parole</span>
    </div>
    <div class="ui segment section" style="cursor: pointer; border-radius:0px; width:100%;box-shadow:none;">
    <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="limg"><br />
    <span style="font-size: 150%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
    </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  </div>
  <br />
  <br />
  <br />
<br/>

<div class="bottom_box" style="background-color:#4a81b7; color:white;padding-top:1%;">
    <a href id="webtitle">
      <img src="../Justyn/image/birdlogo.png" style="display:inline;float:left;
    vertical-align: middle;
    margin-left: 0.5em;
    margin-right:0.5em;
    width: 3em;">
      <span style="font-family:'Times New Roman', Times, serif; font-size:medium; line-height:2.5em;vertical-align:middle; color:white;">JustynWeb</span>
    </a>
    <br />
    <br />
    <hr style="border-top: 2px solid white;">
    <br />
    <br />
    <div style="background-color:#4a81b7; color:white; text-align:center">
      <div style="margin-top:-3em; color: white;">
        <span>-</span>
        <a class="bottom_menu" href style="color:white"> Trending </a>
        <span>-</span>
        <a class="bottom_menu" href style="color:white"> Hobbies </a>
        <span>-</span>
        <a class="bottom_menu" href style="color:white"> Economic </a>
        <span>-</span>
        <a class="bottom_menu" href style="color:white"> Political </a>
        <span>-</span>
        <a class="bottom_menu" href style="color:white"> Health </a>
        <span>-</span>
        <br />
        <br />
      </div>
      <div style="text-align: center;">Copyright 2024 JustynWeb. All rights reserved</div>
      <br />
    </div>
  </div>
  <script src="./_js/Axeswell_global.js"></script>
  <script src="./_js/notif.js"></script>
  <script src="./_js/Dashboard.js"></script>
</body>

</html>