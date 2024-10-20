const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
console.log($("#idReg").val());

const username = getCookie("username");

function submitprofile() {
  $.ajax({
    type: "POST",
    url: `${RESTLOC}submitprofile`,
    data: {
      first_name: $("#first_name").val(),
      last_name: $("#last_name").val(),
      birth_date: $("#ECNDate").val(),
      place_of_birth: $("#place_of_birth").val(),
      address: $("#address").val(),
      gender: $("#gender").val(),
      phone_number: $("#phone_number").val(),
      email: $("#email").val(),
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

console.log(document.querySelector("#NilaiP").value);

$(document).ready(function () {
  $("#submit_profile_button").on("click", function () {
    submitprofile();
  });
});

$(".ui.dropdown").dropdown();
$("#add_account").on("click", function () {
  window.location.href = "./?link=register2";
});

$("#log_out").on("click", function () {
  window.location.href = "./?link=login2";
});

$("#dashboard").on("click", function () {
  window.location.href = "./?link=dashboard";
});
