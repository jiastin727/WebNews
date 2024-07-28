


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








