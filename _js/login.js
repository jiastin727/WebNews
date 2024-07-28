const NonceValue = "el2023";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
$(document).ready(function () {
  $("#btnreg").click(function () {
    var nonceValue = "<?php echo $nonceValue; ?>";
    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      type: "POST",
      url: `${RESTLOC}register`,
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
        }
      },
      error: function () {
        IsTimeOut(LogoutProtect);
      },
    });
  });
});
