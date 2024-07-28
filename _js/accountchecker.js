const LogoutProtectCond = true;
var restlocaccountchecker = "../RND_BackEnd/backend_accountchecker/";

function getKeepCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function LoadChecker(){

  var UCookie = getKeepCookie("usrnm");
  var TCookie = getKeepCookie("token");
  $.ajax({
    type: "POST",
    url : `${restlocaccountchecker}account_checker`,
    headers: {
      user: UCookie,
      token: TCookie,
    },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      $("#countuseronline").html(obj);
      $("#qtyusersonline").html(obj);
      setTimeout("LoadChecker()", 5000);
    },
    error: function () {
      if (LogoutProtectCond){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
} 

$(function(){ 
  LoadChecker();  
});