 
function removeLastComma(str) {
  return str.replace(/,(\s+)?$/, '');   
}

function IsTimeOut(a) {
  if (a){
    window.location.href = "./?link=loclogout";
  } else {
    Swal.fire({
      text: 'Server tidak merespon, segera hubungi Administrator di ext. 3553 !',
      timer: 3500,
      position: 'center',
      toast: true,
      showConfirmButton: false
    });
  }
}

function IsResponseFalse(msg) {
  Swal.fire({
    text: msg,
    timer: 3500,
    icon: 'warning',
    showConfirmButton: false
  });
}

function IsResponseTrue(msg) {
  Swal.fire({
    text: msg,
    timer: 1500,
    icon: 'success',
    showConfirmButton: false
  });
}

function IsResponseEmptyObj() {
  console.log('Gagal Simpan mas brooo, data kosong');
}

function IsResponseErrorElse() {
  Swal.fire({
    text: 'Ada kendal di koneksi/database, data tidak tersimpan !',
    timer: 3500,
    showConfirmButton: false
  });
}

function IsResponseFalse2(msg) {
  Swal.fire({
    title: 'Notice',
    text: msg,
    timer: 3500,
    showConfirmButton: false
  });
}


function IsNull(a) {
  return (a == null || a == 'null') ? "" : a;
} 

function IsNullStrip(a) {
  return (a == null) ? "-" : a;
} 

function IsNullZero(a) {
  return (a == '' || a == null || a == 'null') ? 0 : a;
}

function IsNotNullZero(a) {
  return (a == null || a == 'null' || a == '0' || a == 0 ) ? "" : a;
}

function IsUndefined(a) {
  return (typeof a !== 'undefined' && a !== null && a !== 'null' ) ? a : '';
}

function IsUndefinedMoment(a) {
  return (typeof a !== 'undefined' && a !== null && a !== 'null' ) ? moment(a).format("DD MMM YYYY") : '';
}









