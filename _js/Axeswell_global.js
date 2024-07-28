//ACTIVATE DROP-DOWN POPUP LARGE MENU
$("a.browse.item").popup({
  popup: $(".ui.popup"), //Popup Content selector
  on: "click", //event trigger
  position: "bottom left",
  lastResort: true,
  inline: true,
});

//FUNCTION CEK JSON EMPTY
function isEmpty(obj) {
  for (var status in obj) {
    if (obj.hasOwnProperty(status)) return false;
  }
  return true;
}

//COOKIE
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

function validasiinputnik() {
  var nik = $("#nikuser").val();
  if (nik === "") {
    $("#nikuser").css("backgroundColor", "#ffeded");
    return false;
  } else {
    $("#nikuser").css("backgroundColor", "#edffe8");
    return false;
  }
}

function validasiinputpass1() {
  var passone = $("#passone").val();
  if (passone === "") {
    $("#passone").css("backgroundColor", "#ffeded");
    return false;
  } else {
    $("#passone").css("backgroundColor", "#fff");
    return false;
  }
}

function validasiinputpass2() {
  var passtwo = $("#passtwo").val();
  if (passtwo === "") {
    $("#passtwo").css("backgroundColor", "#ffeded");
    return false;
  } else {
    $("#passtwo").css("backgroundColor", "#fff");
    return false;
  }
}

function validasipassword() {
  var passone = $("#passone").val();
  var passtwo = $("#passtwo").val();
  if (passone !== passtwo) {
    $("#passtwo").css("backgroundColor", "#ffeded");
    $("#passone").css("backgroundColor", "#ffeded");
    return false;
  } else {
    $("#passone").css("backgroundColor", "#edffe8");
    $("#passtwo").css("backgroundColor", "#edffe8");
    return false;
  }
}
