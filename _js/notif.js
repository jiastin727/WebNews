
function removeLastComma(str) {
  return str.replace(/,(\s+)?$/, '');   
}

function IsTimeOut(cond) {
  if (cond){
    Swal.fire({
      text: 'Server tidak merespon, segera hubungi Administrator di ext. 3553 !',
      timer: 3500,
      position: 'center',
      toast: true,
      showConfirmButton: false
    });
  }
}

function IsResponseFalse(primarymsg,secondarymsg,cond) {
  if(cond) {
    Swal.fire({
      html: primarymsg,
      position: 'center',
      timer: 3500,
      showConfirmButton: false
    });
  }
  console.log(secondarymsg);
}

function IsResponseTrue(primarymsg,secondarymsg,cond) {
  if(cond) {
    Swal.fire({
      html: primarymsg,
      timer: 1500,
      showConfirmButton: false
    });
  }
  console.log(secondarymsg);
}

function IsResponseTrueToast(primarymsg,secondarymsg,cond) {
  if(cond) {
    Swal.fire({
      html: primarymsg,
      timer: 1500,
      toast : true,
      showConfirmButton: false
    });
  }
  console.log(secondarymsg);
}

function IsResponseEmptyObj() {
  console.log('Fail, data kosong');
}

function IsResponseErrorElse() {
  Swal.fire({
    text: 'Ada kendal di koneksi/database, data tidak tersimpan !',
    timer: 3500,
    showConfirmButton: false
  });
}

function IsResponseElse() {
  Swal.fire({
    text: 'Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !", "error',
    timer: 3500,
    showConfirmButton: false
  });
}

function IsSyncProcess() {
  Swal.fire({
    text: 'Tunggu, data sedang diselaraskan dengan database',
    timer: 120000,
    showConfirmButton: false,
    backdrop: `rgba(0,0,0,0.5)`,
  });
}

function IsSearchProcess(DBase) {
  Swal.fire({
    text: 'Mohon tunggu, sistem melakukan pencarian dan penyaringan data di database '+DBase,
    timer: 120000,
    showConfirmButton: false,
    backdrop: `rgba(0,0,0,0.5)`,
  });
}

function IsWaitProcess(Msg) {
  Swal.fire({
    text: 'Tunggu, '+Msg,
    timer: 120000,
    showConfirmButton: false,
    backdrop: `rgba(0,0,0,0.5)`,
  });
}

function IsSyncDone(primarymsg,secondarymsg,cond) {
  if(cond) {
    Swal.fire({
      html: primarymsg,
      timer: 1500,
      toast : true,
      showConfirmButton: false
    });
  }
  console.log(secondarymsg);
}

function FixChar(cond,str){
  if (cond === 'IsNull'){
    return (str == null || str == 'null') ? "" : str;
  }
  if (cond === 'IsNullStrip'){
    return (str == null) ? "-" : str;
  }
  if (cond === 'IsNullZero'){
    return (str == '' || str == null || str == 'null') ? 0 : str;
  }
  if (cond === 'IsNotNullZero'){
    return (str == null || str == 'null' || str == '0' || str == 0 ) ? "" : str;
  }
  if (cond === 'IsUndefined'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' ) ? str : '';
  }
  if (cond === 'IsUndefinedMoment'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' ) ? moment(str).format("ddd, DD MMM YYYY") : '';
  }
  if (cond === 'IsUndefinedMomentAll'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' ) ? moment(str).format("ddd, DD MMM YYYY, kk:mm") : '';
  }
  if (cond === 'IsUndefinedYYYYMMDD'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' ) ? moment(str).format("YYYY-MM-DD") : '';
  }
  if (cond === 'IsUndefinedDDMMYY'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' ) ? moment(str).format("DD-MM-YYYY") : '';
  }
  if (cond === 'IsLongtext19'){
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '' && str.length > 19) ? str.substr(0, 19) + '...' : str;
  }
  if(cond === 'Iscomma'){
    // str = str.replace(/,/g, '<br>');
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '') ? str.replace(/,/g, '<br>') : '';
  }
  if(cond === 'FormatEmailName'){
    // str = str.replace(/\./g,' ').toUpperCase();
    return (typeof str !== 'undefined' && str !== null && str !== 'null' && str !== '') ? str.replace(/\./g,' ').toUpperCase() : '';
  }


  //mystring = mystring.replace(/\./g,' ')
}

function SubSect(Sect){
  if(Sect){
    var incStr = Sect.includes(" - ");
    if (incStr) {
      var parts = Sect.split(' - ');
      var firstWord = parts[0];
      return firstWord;
    } else {
      return Sect;
    }
  } else {
    return Sect;
  }
}












