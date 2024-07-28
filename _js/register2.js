const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
function login(namalengkap, username, password) {
  $.ajax({
    type: "POST",
    url: `${RESTLOC}register`,
    data: {
      nama_lengkap: namalengkap,
      username: username,
      password: password,
    },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == false) {
        IsResponseFalse(obj.message, "gagal", true);
      } else {
        IsResponseTrue(obj.message, "berhasil", true);
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

$(document).ready(function () {
  $("#button_submit").on("click", function () {
    var namalengkap = $("#fullname").val();
    var username = $("#username").val();
    var password = $("#pass").val();
    login(namalengkap, username, password);
  });
  $("#ada_akun").on("click", function (){
    window.location.href = "./?link=login2";
  })
  $("#login").on("click", function (){
    window.location.href = "./?link=login2";
  })
  $(".ui.dropdown").dropdown();
});
