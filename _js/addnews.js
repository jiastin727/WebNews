const NonceValue = "justyn321";
const LogoutProtect = false;
var RESTLOC = decodeURIComponent(getCookie("restloc"));
console.log($("#idReg").val());

function submit() {
  $.ajax({
    type: "POST",
    url: `${RESTLOC}submit`,
    data: {
      nama_penulis: $("#name").val(),
      tanggal: $("#date_post").val(),
      headline: $("#headline").val(),
      gambar: $("#picture").val(),
      isi_berita: $("#contents").val(),
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
  $("#submit_button").on("click", function () {
    submit();
  });
  var today = new Date().toISOString().split("T")[0];
  $("#date_post")[0].setAttribute("max", today);
});
$("#add_account").on("click", function () {
  window.location.href = "./?link=register2";
});

$("#log_out").on("click", function () {
  window.location.href = "./?link=login2";
});

$("#dashboard").on("click", function () {
  window.location.href = "./?link=dashboard";
});
$("#webtitle").on("click", function () {
    window.location.href = "./?link=dashboard";
  });