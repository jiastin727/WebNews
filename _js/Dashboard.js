const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
console.log($("#idReg").val());

const username = getCookie("username");

$(document).ready(function () {
  $("#submit_button").on("click", function () {
    submit();
  });

$(".ui.dropdown").dropdown();
$("#add_account").on("click", function () {
  window.location.href = "./?link=register2";
});

$("#log_out").on("click", function () {
  window.location.href = "./?link=login2";
});

$("#acc_set").on("click", function () {
let fullUrl = "http://localhost/Justyn/?link=accset" + "&" + encodeURIComponent(username);
console.log(fullUrl);
// Current URL: http://localhost/Justyn/?link=accset
window.location.assign(fullUrl);
});

$("#news1").on("click", function () {
  window.location.href = "./?link=news1";
});
$("#webtitle").on("click", function () {
  window.location.href = "./?link=dashboard";
});
$("#add_news").on("click", function () {
  window.location.href = "./?link=add_news";
});
$("#webtitled").on("click", function () {
  window.location.href = "./?link=dashboard_dark";
});
$("#darkmode").on("click", function () {
  window.location.href = "./?link=dashboard_dark";
});
$("#lightmode").on("click", function () {
  window.location.href = "./?link=dashboard";
});
$("#bottom_profile").on("click", function () {
  window.location.href = "./?link=dashboard";
});
});
