$(".ui.dropdown").dropdown();
$(".menu .item").tab();

// Global Variable
const NonceValue = "rdsystem2020";
var vusrnm = getCookie("usrnm");
var vtoken = getCookie("token");
var restlocbonkas = decodeURIComponent(getCookie("restlocbonkas"));
var d = new Date();
var day = d.getDate() + "";
var month = d.getMonth() + 1 + "";
if (day.length < 2) { day = "0" + day; }
if (month.length < 2) { month = "0" + month; }
var mdnow = month+day;
var enc = new Encryption();
var erl = enc.encrypt("1"+mdnow, NonceValue);

function BonkasListFunc(FSearch,FYear){
  var d1 = enc.decrypt(EncR, NonceValue);
  var d2 = enc.decrypt(erl, NonceValue);
  $('#BonkasTable').DataTable({
    dom : 
      "<'ui stackable grid'"+
      "<'row'"+
      "<'left aligned ten wide column'>"+
      ">"+
      "<'row dt-table'"+
      "<'sixteen wide column'tr>"+
      ">"+
      "<'row'"+
      "<'left aligned eight wide column'B>"+
      "<'right aligned eight wide column'p>"+
      ">"+
      ">",
    buttons: [
      {
        text: '10',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 10 ).draw();
        }
      },
      {
        text: '25',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 25 ).draw();
        }
      },
      {
        text: '50',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 50 ).draw();

        }
      },
      {
        text: '100',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 100 ).draw();

        }
      },
      {
        text: '500',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 500 ).draw();
        }
      },
      {
        text: '1000',
        action: function ( e, dt, node, config ) {
          $('#BonkasTable').DataTable().page.len( 1000 ).draw();
        }
      }
    ],
    destroy: true,
    stateSave: true,
    processing: true,
    deferRender: true,
    serverSide: true,
    orderClasses: false,
    pageLength: 10,
    data: [],
    language: {
      sLengthMenu: "_MENU_",
      search: "",
      searchPlaceholder: "Search..",
      processing: '<i class="circle notch loading icon huge"></i>',
    },
    order: [[0, "desc"]],
    columns: [
      { data  : 0 },
      { data  : 2 }, 
      { data  : 4 }, 
      { data  : 5 }, 
      { data  : 6 }, 
      { data  : 7 }, 
      { data  : 8 }, 
      { data  : 9 }, 
      { data  : 10 }, 
      { data  : 11 },
      { data  : 12 },
      { data  : null, 
        render    : function(data, type, row) { 
          if ((data[0]!="") && (d1 === d2)){
            return '<i class="edit outline actedit iconcoloredit icon" eid="'+data[15]+'"></i>';
          } else {
            return ''; 
          }
        }
      },
      { data  : null, 
        render    : function(data, type, row) { 
          if ((data[0]!="") && (d1 === d2)){
            return '<i class="print actprint iconcoloredit icon" eid="'+data[15]+'"></i>';
          } else {
            return ''; 
          }
        }
      }
    ],
    columnDefs: [{ className: "center aligned", targets: [4,11,12] }],
    ajax        : {
      url     : `${restlocbonkas}table_bonkas`,
      type    : 'POST',
      headers : {
        user  : vusrnm,
        token : vtoken
      },
      data    : {
        FSearch : FSearch,
        FYear   : FYear,
      },
    
    error: function () {
      //window.location.href = "./?link=loclogout";
      Swal.fire(
        "Error",
        "Server tidak merespon, segera hubungi Administrator di ext. 3553 !",
        "error"
      );
    },
  }
  });
}

$(document).ready(function () {

  $("#BonkasTable").on("click", ".actedit", function(){
    var eid = $(this).attr('eid');
    let encryption = new Encryption();
    var eidENC = encryption.encrypt(eid, NonceValue);
    window.location.href = "./?link=editbon&i="+eidENC;
  });

  //HANDLER UNTUK KLIK ICON PRINT
  $("#BonkasTable").on("click", ".actprint", function(){
    Swal.fire({
      title: 'Pilih yang akan dicetak',
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: `Bon Kas`,
      denyButtonText: `Bukti Pengeluaran`,
      cancelButtonText: 'Semua'
    }).then((result) => {
      //var nonceValue = '<?php echo $nonceValue; ?>';
      let encryption = new Encryption();
      var eid = $(this).attr('eid');
      var eidENC = encryption.encrypt(eid, NonceValue);
      if (result.isConfirmed) {
        //window.location.href = "./?link=bkdwnldpdf&t=bk&i="+eidENC;
        $.redirect(
          "./?link=bkdwnldpdf",
          { t: "bk", i: eidENC },
          "POST",
          "_blank"
        );
      } else if (result.isDenied) {
        //window.location.href = "./?link=bkdwnldpdf&t=bp&i="+eidENC;
        $.redirect(
          "./?link=bkdwnldpdf",
          { t: "bp", i: eidENC },
          "POST",
          "_blank"
        );
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        //window.location.href = "./?link=bkdwnldpdf&t=all&i="+eidENC;
        $.redirect(
          "./?link=bkdwnldpdf",
          { t: "all", i: eidENC },
          "POST",
          "_blank"
        );
      } else {

      } 
    })
  });


  $("#PrintIHPPDFApproved").on("click", function (e) {
    var idpss = $("#PSSidx").val();
    var iditem = $("#IHPIdItem").val();
    $.redirect(
      "./?link=viewihppdf",
      { idpss: idpss, iditem: iditem },
      "POST",
      "_blank"
    );
  });


  $('#HeaderButtonBack').on('click', function() {
    window.location.href = "./?link=bonkas";
  });
  
  $("#HeaderButtonSave").click(function(){
    var vusrnm  = getCookie('usrnm');
    var vtoken  = getCookie('token');
    $.ajax({
      type: "POST",
      //url: "<?php echo $RESTLOCBONKAS; ?>create_bonkas_main",
      url     : `${restlocbonkas}create_bonkas_main`,
      headers: {
        user  : vusrnm,
        token : vtoken
      },
      data: {
        no_surat_tugas: $('#nomor_surat_tugas').val(),
        nik: $('#nik').val(),
        nama: $('#nama').val(),
        bagian: $('#bagian').val(),
        rekening: $('#rekening').val(),
        tgl_tugas: $('#tgl_tugas').val(),
        lama_tugas: $('#lama_tugas').val(),
        tgl_bon_kas: $('#tgl_bon_kas').val(),
        due_date: $('#due_date').val(),
        bayar_kpd: $('#bayar_kepada').val(),
        keperluan: $('#keperluan').val(),
        keterangan: $('#keterangan').val(),
        disetujui: $('#disetujui').val(),
        tgl_buat: $('#tgl_buat').val(),
        tgl_cetak: $('#tgl_cetak').val(),
        dicetak_oleh: $('#dicetak_oleh').val(),
        dibuat_oleh: $('#dibuat_oleh').val()
      },
      cache: false,
      success: function (response){
        var obj = JSON.parse(JSON.parse(response));
        if(isEmpty(obj)) {
          console.log('Gagal save Bonkas, data kosong');
        } else if(obj) {
          if (obj.status == false){
            Swal.fire({
              text: obj.message,
              timer: 1500,
              icon: 'error',
              showConfirmButton: false
            })
          } else {
            Swal.fire({
              title: 'Berhasil',
              text: obj.message,
              timer: 1500,
              icon: 'success',
              showConfirmButton: false
            })
            var eid = obj.insert_id;
            var eidENC = enc.encrypt(eid.toString(), NonceValue);
            window.location.href = "./?link=editbon&i="+eidENC;
          }
        } else {
          Swal.fire('Error','Bonkas Error ?.','error')
        }
      },
      error: function(){
        //window.location.href = "./?link=loclogout";
        console.log('Server tidak merespon, segera hubungi Administrator di ext. 3553 !');
      }
    });
  });

  //SET TOKEN ARTEMIS
  $.ajax({
    type: "GET",
    url: "3_bonkas/_artemis.php",
    cache: false,
    success: function (response){
      setCookie('atoken', response, 1/24);
    },
    error: function(){
      Swal.fire({
        text : `Server tidak merespon, segera hubungi Administrator di ext. 3553 !`
      })
    }
  });

  $('#tabbonkas').on('click', function() {
    window.location.href = "./?link=bonkas";
  });
  $("#bkprint").on("click", function(){
    window.location.href = "./?link=bkdwnldpdf";
  });
  $("#bkcancel").on("click", function(){
    window.location.href = "./?link=bonkas";
  });

  //nik autocomplete
  $("#nik").focus(function(){
    $('#nik_autocomplete').search({
      minCharacters : 1,
      apiSettings   : {
        url: '3_bonkas/_autocompletenik.php?q={query}'
      },
      fields: {
        results : 'data',
        title   : 'nik',
        description : 'name'
      },
      onSelect: function(result, response) {
        $('#nama').val(result.name);
      }
    });
  });

  //nik autocomplete
  $("#nama").focus(function(){
    $('#nama_autocomplete').search({
      minCharacters : 1,
      apiSettings   : {
        url: '3_bonkas/_autocompletenama.php?q={query}'
      },
      fields: {
        results : 'data',
        title   : 'name',
        description : 'nik'
      },
      onSelect: function(result, response) {
        $('#nik').val(result.nik);
      }
    });
  });

  $('#date1').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return "";
        var day = date.getDate() + "";
        if (day.length < 2) {
          day = "0" + day;
        }
        var month = date.getMonth() + 1 + "";
        if (month.length < 2) {
          month = "0" + month;
        }
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
        // return year + "-" + month + "-" + day;
      }
    }
  });

  $('#date2').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return "";
        var day = date.getDate() + "";
        if (day.length < 2) {
          day = "0" + day;
        }
        var month = date.getMonth() + 1 + "";
        if (month.length < 2) {
          month = "0" + month;
        }
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
        // return year + "-" + month + "-" + day;
      }
    }
  });

  $('#date3').calendar({
    type: 'date',
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return "";
        var day = date.getDate() + "";
        if (day.length < 2) {
          day = "0" + day;
        }
        var month = date.getMonth() + 1 + "";
        if (month.length < 2) {
          month = "0" + month;
        }
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
        // return year + "-" + month + "-" + day;
      }
    }
  });



});

//Read Filter Cookies
var d = new Date();
var yearnow = d.getFullYear();
var sfilter = getCookie("sfilbonkas");
var tfilter = getCookie("tfilbonkas");
if (sfilter) {
  $("#searchfilterbonkas").val(sfilter);
  var sfilterstart = sfilter;
} else {
  setCookie("sfilbonkas", "", 5);
  var sfilterstart = "";
}
if (tfilter) {
  $("#filtertahunbonkas").dropdown("set selected", tfilter);
  var tfilterstart = tfilter;
} else {
  setCookie("tfilbonkas", yearnow, 5);
  var tfilterstart = yearnow;
}

//Load Table
BonkasListFunc(sfilterstart,tfilterstart);

//RESPON KETIKA FILTER MODE DI RUBAH
$('#filtermode').on('change', function() {
  var MOD_filter    = $('#filtermode').val();
  setCookie('mfilbonkas',MOD_filter,5);

  if(MOD_filter === 'surat-tugas') {
    location.href = '/RND/?link=bonkas';
  }
  if(MOD_filter === 'bon-kas') {
    location.href = '/RND/?link=bonkasdetail';
  }
});

//RESPON KETIKA INPUT PENCARIAN DI KETIK
$('#searchfilterbonkas').on('keyup', function() {
  var MOD_filter    = $('#filtermode').val();
  var FilterCari   	= $('#searchfilterbonkas').val();
  var FilterTahun   = $('#filtertahunbonkas').val();
  setCookie('mfilbonkas',MOD_filter,5);
  setCookie('sfilbonkas',FilterCari,5);
  setCookie('tfilbonkas',FilterTahun,5);
  $('#BonkasTable').DataTable().destroy();
  BonkasListFunc(FilterCari,FilterTahun);
});

//RESPON KETIKA FILTER TAHUN DI RUBAH
$('#filtertahunbonkas').on('change', function() {
  var MOD_filter    = $('#filtermode').val();
  var FilterCari   	= $('#searchfilterbonkas').val();
  var FilterTahun   = $('#filtertahunbonkas').val();
  setCookie('mfilbonkas',MOD_filter,5);
  setCookie('sfilbonkas',FilterCari,5);
  setCookie('tfilbonkas',FilterTahun,5);
  $('#BonkasTable').DataTable().destroy();
  BonkasListFunc(FilterCari,FilterTahun);
});

//RESET FILTER
$('.resetfilter').on('click', function() {
  var d = new Date();
  var yearnow = d.getFullYear();
  $('#searchfilterbonkas').val('');
  $('#filtertahunbonkas').dropdown('set selected',yearnow);
  setCookie('mfilbonkas','surat-tugas',5);
  setCookie('tfilbonkas',yearnow,5);
  setCookie('sfilbonkas','',5);
  $('#BonkasTable').DataTable().destroy();
  BonkasListFunc("", yearnow);
});

$('#tabbonlist').on('click', function() {
  window.location.href = "./?link=bonkas";
});
$('#createbonkas').on('click', function() {
  window.location.href = "./?link=createbon";
});
$('#tabcreatebon').on('click', function() {
  window.location.href = "./?link=createbon";
});

//DOWNLOAD DATA ALL / SESUAI FILTER DAN SEARCHING
$('#dwnldxls').on('click', function() {
  var fth   	= $('#filtertahunbonkas').val();
  var src   	= $('#searchfilterbonkas').val();
  window.location.href = "./?link=bkdwnldxls&c=1&t="+fth+"&s="+src;
});
