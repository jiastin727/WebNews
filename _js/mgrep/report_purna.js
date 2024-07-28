//Activate dropdown & tab
$(".ui.dropdown").dropdown();

$(document).ready(function () {
  var usrnm = getCookie('usrnm')
  var token = getCookie('token')
  setCookie('auth-token', AuthToken)
  if (usrnm == 'agung.s.pranoto'
  || usrnm == 'winata.d.soewondo'
  || usrnm == 'cendra.anang'
  || usrnm == 'benjamin.k.h'
  || usrnm == 'dahnari.yulia'
  || usrnm == 'enik.sukendri'
  || usrnm == 'rudy.mintharaga') {
    window.open('http://10.8.15.42:8000/rnd/hris/purna/index.php?usrnm=' + usrnm, '_parent');
  } else {
    document.write('Unauthorized');
    location.href = '/RND/?link=login.php';
  }
});

//------------------------------------------------------------------------------------
