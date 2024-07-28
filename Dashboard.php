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
  <title>Welcome!</title>

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

.item{
  transition-duration: 0.8s !important;
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



.section{
  transition: 0.8s;
}

    .section:hover {
      background-color: #E5DDDB !important;
      cursor: pointer;
      text-decoration: underline;
      color: #758ec6;
      transition-duration: 0.5s;
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


    <div class="ui simple dropdown link item" id="topdropdown">
      <div>Others </div><i class="chevron down icon"></i>
      <div class="menu">
        <a class="item" id="hot_news" href="#latest_news"><i class="fire icon"></i>Find Out Hot and Updated News</a>
        <a class="item" id="recommended4u" href="#recommended"><i class="thumbs up icon"></i>Recommended For You</a>
        <a class="item" id="more_news" href="#moree"><i class="plus icon"></i>More News</a>
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
          <div class="item " id="log_out"><i class="sign out alternate icon"></i>Log out</div>
        </div>
      </div>

    </div>
  </div>
  <br />
  <br />
  <br />
  <br />


  <h1 style="color:#758ec6; margin-left:5%; margin-bottom:auto; font-size:300%">Top News</h1>
  <div style="margin:auto;background-color: #758ec6; height:0.5%; width:90%;"></div>
  <div class="ui horizontal segments section" style="width:60%; margin-left:auto; margin-right:auto; border-radius:0px; box-shadow:none;border:none; ">

    <div class="ui segment" id="news1" style="cursor: pointer; border-radius:0px; width:40%;box-shadow:none; border-style:solid; border-width:1px; border-color:darkgrey">
      <img class="ui small left floated image" src="https://ichef.bbci.co.uk/news/1536/cpsprodpb/4A01/production/_133154981_bishopstab.jpg.webp"; style="width:50%">
      <p style=" font-size:150%">Sydney church stabbing: Bishop stabbed during sermon - reports</p>
      <p class="desc" style="color:black;">A 16-year-old boy has been arrested after a bishop and several churchgoers were stabbed during a sermon in Sydney.</p>
    </div>
  </div>


  <h1 style="color:#758ec6; margin-left:5%; margin-bottom:auto; font-size:300%" id="latest_news">Latest News</h1>
  <div style="margin:auto;background-color: #758ec6; height:0.5%; width:90%;"></div>
  <div class="ui horizontal segments" style="width:90%; margin-left:5%; margin-right:auto; border-radius:0px; box-shadow:none;border:none; ">

    <div class="ui segment section" style="cursor: pointer; border-radius:0px; width:50%;box-shadow:none;">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C91F/production/_132678415_thaksin_getty.jpg.webp" class="limg"><br />
      <span style=" font-size:150%">Thaksin Shinawatra: Former Thai prime minister released on parole</span>
    </div>
    <div class="ui segment section" style="cursor: pointer; border-radius:0px; max-width:50%;">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C91F/production/_132678415_thaksin_getty.jpg.webp" class="limg"><br />
      <span style="font-size:150%">Thaksin Shinawatra: Former Thai prime minister released on parole</span>
    </div>
  </div>

  <div class="ui segments" style="width:90%; margin-left:5%; margin-right:auto; border-radius:0px; box-shadow:none;border:none; ">
    <div class="ui segments" style="border-width:0px; box-shadow:none;">
      <div class="ui horizontal segments" style=" border-radius:0px; border:none; box-shadow:none;">
        <div class="ui segment section" style="border-radius:0px; max-width:33.4%; cursor:pointer;">
          <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="rimg"><br />
          <span style="font-size: 120%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
        </div>
        <div class="ui segment section" style="border-radius:0px; max-width:33.4%; ">
          <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1453E/production/_132726238_gabbardnoemandstefanik-getty1.png.webp" class="rimg"><br />
          <span style="font-size: 120%; text-align:justify">Noem and Ramaswamy top CPAC straw poll on who should be Trump’s VP pick</span>
        </div>
        <div class="ui segment section" style="border-radius:0px; max-width:33.4%; ">
          <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="rimg"><br />
          <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
        </div>
      </div>

      <div class="ui horizontal segments" style="margin:auto; border-radius:0px; border:none; box-shadow:none; margin-top:5%">
        <div class="ui segment section" style="border-radius:0px; max-width:33.3%">
          <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/992D/production/_132731293_navalny.jpg.webp" class="rimg"><br />
          <span style="font-size: 120%;">Alexei Navalny: Dissent is dangerous in Russia, but activists refuse to give up</span>
        </div>
        <div class="ui segment section" style="border-radius:0px; max-width:33.3%">
          <img src="https://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/11D20/production/_132729927_gettyimages-2035513456.jpg" class="rimg"><br />
          <span style="font-size: 120%;">Glasner wins first game as Palace boss against Burnley</span>
        </div>
        <div class="ui segment section" style="border-radius:0px; max-width:33.3%">
          <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1322C/production/_132708387_capture.jpg.webp" class="rimg"><br />
          <span style="font-size: 120%;">Nikkei: Japan's main stock index closes above 1989 record high</span>
        </div>
      </div>
    </div>





  </div>
  </div>
  <div style="margin:auto;background-color: #758ec6; height:0.2%; width:90%;"></div>

  <br />
  <h1 style="color:#758ec6; margin-left:5%; margin-bottom:auto; font-size:300%" id="recommended">Recommended For You</h1>
  <div style="margin:auto;background-color: #758ec6; height:0.5%; width:90%;"></div>
  <br />
  <div class="ui horizontal segments bottom" style="margin:auto; border:none; box-shadow:none; width:90%">
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1453E/production/_132726238_gabbardnoemandstefanik-getty1.png.webp" class="bimg"><br />
      <span style="font-size: 120%; text-align:justify">Noem and Ramaswamy top CPAC straw poll on who should be Trump’s VP pick</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
  </div>

  <div class="ui horizontal segments bottom" style="margin:auto; border:none; box-shadow:none; width:90%">
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1453E/production/_132726238_gabbardnoemandstefanik-getty1.png.webp" class="bimg"><br />
      <span style="font-size: 120%; text-align:justify">Noem and Ramaswamy top CPAC straw poll on who should be Trump’s VP pick</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
  </div>

  <br />

  </div>
  </div>
  <div style="margin:auto;background-color: #758ec6; height:0.2%; width:90%;"></div>

  <br />
  <h1 style="color:#758ec6; margin-left:5%; margin-bottom:auto; font-size:300%" id="moree">More News</h1>
  <div style="margin:auto;background-color: #758ec6; height:0.5%; width:90%;"></div>
  <br />
  <div class="ui horizontal segments bottom" style="margin:auto; border:none; box-shadow:none; width:90%">
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1453E/production/_132726238_gabbardnoemandstefanik-getty1.png.webp" class="bimg"><br />
      <span style="font-size: 120%; text-align:justify">Noem and Ramaswamy top CPAC straw poll on who should be Trump’s VP pick</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
  </div>

  <div class="ui horizontal segments bottom" style="margin:auto; border:none; box-shadow:none; width:90%">
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/800/cpsprodpb/90DB/production/_132938073_gettyimages-1153125976.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">Hong Kong: Actor Gregory Wong among 12 jailed over 2019 protest</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/1453E/production/_132726238_gabbardnoemandstefanik-getty1.png.webp" class="bimg"><br />
      <span style="font-size: 120%; text-align:justify">Noem and Ramaswamy top CPAC straw poll on who should be Trump’s VP pick</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
    <div class="ui segment section" style="border-radius:0px; max-width:25%; ">
      <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/2407/production/_132732290_crgettyimages-2036678208.jpg.webp" class="bimg"><br />
      <span style="font-size: 120%;">SAG Awards 2024: Oppenheimer dominates ahead of Oscars</span>
    </div>
  </div>
  <br />
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