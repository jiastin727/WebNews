const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));

function login(username, password) {
  $.ajax({
    type: "POST",
    url: `${RESTLOC}login`,
    data: {
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
        window.location.href = "./?link=dashboard";
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function sssn(username) {
  $.ajax({
    type: "POST",
    url: "./justyn_ssn.php",
    data: {
      name: username,
    },
    cache: false,
    success: function (response) {},
    error: function () {
      Swal.fire({
        text: `Server tidak merespon, segera hubungi Administrator di ext. 3553 !`,
      });
    },
  });
}

$(document).ready(function () {
  $("#button_submit").on("click", function () {
    var username = $("#username").val();
    var password = $("#pass").val();
    login(username, password);
    sssn(username);
  });

  $("#noakun").on("click", function () {
    window.location.href = "./?link=register2";
  });

  $("#register").on("click", function () {
    window.location.href = "./?link=register2";
  });

  $("#add_account").on("click", function () {
    window.location.href = "./?link=register2";
  });


  $(".ui.dropdown").dropdown();
});
