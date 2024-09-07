const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
console.log($("#idReg").val());

let username = getCookie("username");
console.log(username);
$(document).ready(function () {
  $("#submit_button").on("click", function () {
    submit();
  });

$(".ui.dropdown").dropdown();
$("#add_account").on("click", function () {
  window.location.href = "./?link=register2";
});

$("#log_out").on("click", function () {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "./?link=login2";
});

$("#acc_set").on("click", function () {
  const username = getCookie("username");

console.log(username);

var result = md5(username);
let fullUrl = "http://localhost/Justyn/?link=accset" + "&" + "p=" + encodeURIComponent(result);

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
