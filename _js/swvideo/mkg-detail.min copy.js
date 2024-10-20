//Const
const NonceValue = "rdsystem2020";
const LogoutProtect = false;

//Activate dropdown & tab
$(".ui.dropdown").dropdown();
$(".menu .item").tab();


// Global Variable for Header Authorization
var vusrnm = getCookie("usrnm");
var vtoken = getCookie("token");
var restlocupo = decodeURIComponent(getCookie("restlocupo"));
var restlocmkg = decodeURIComponent(getCookie("restlocmkg"));
var restlocemail = decodeURIComponent(getCookie("restlocemail"));

//Read Encryption Data Value
var EncValue = $("#EncValue").val();
var IdUrl = $("#IdUrl").val();
let EDCrypt = new Encryption();
var ValuesCode = EDCrypt.decrypt(EncValue, NonceValue);
var Values = ValuesCode.split("|");
var USERNAME = Values[0];
var MKG_ID = Values[1];
var MKG_NUMBER = Values[2];
var MKG_ROLE = Values[3];
var MKG_SECT = Values[4];
var DJbtn  = EDCrypt.decrypt(EncJ, NonceValue);
setCookie("MKG_ID", MKG_ID, 5);

//fungsi merubah null jadi string kosong
function AvoidNull(a) {
  return (a == null) ? "" : a;
} 


// fungsi baca data item upo
function FuncLoadTypeBarangDemand() {
  $.ajax({
    type: "POST",
    url : `${restlocmkg}list_typebarangdemand`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: {
      idmkg: MKG_ID,
    },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      if(obj.data !== undefined){
        jmlData = obj.data.length;
      }
      if (isEmpty(obj)) {
        console.log("-Empty-");
        $("#tb_itemlistupobody").empty();
       
        return false;

      } else if (obj) {
        
          console.log(obj);
        $("#tb_itemlistupobody").empty();
        for (a = 0; a < jmlData; a++) {
          if(MKG_ROLE =="editall"){
            var icondeldoc = "<span class='DelBarangDemand' iddel='"+
            obj.data[a]["id_type"]+"' nmdel='"+obj.data[a]["TypeBarangDemand"]+"'><i class='trash red icon'></i></span>";
          } else {
            var icondeldoc = "";
          }

        $("#tb_itemlistupo").find("tbody").append(
            "<tr><td>"+icondeldoc+
            "</td><td>"+obj.data[a]["TypeBarangDemand"]+
            "</td><td>"+obj.data[a]["project_leader"]+
            "</td><td>"+obj.data[a]["jenis_product"]+
            "</td><td>"+obj.data[a]["brand"]+
            "</td><td>"+obj.data[a]["site"]+
            "</td><td>"+obj.data[a]["product"]+"</td></tr>"
          );
        }
        FuncDelBarangDemand();
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
}


 //type basic autocomplete
 $(".ui.search.tbasic").search({
  minCharacters: 1,
  apiSettings: {
    url: "1_mkg/_autocompletetypebasictype.php?tbarangdemand={query}",
  },
  fields: {
    results: "data",
    title: "type_barang_demand",
    // description: "desc",
  },
});

$('#LoadTypeSupply').on('click', function() {
  AddTypeBarangDemand();
  // LoadDataPTB();
});

function AddTypeBarangDemand(){
  var itype = $('#TypeBarangDemand').val();
  if(itype){
    $('.PTBInput').addClass('loading');
    $.ajax({
      type    : "POST",
      url     : `${restlocmkg}AddTypeBarangDemand`,
      headers : {
        user  : vusrnm,
        token : vtoken
      },
      data: {
        tbarangdemand    : itype,
        usernames  : vusrnm,
        idmkg  : MKG_ID,
      },
      cache: false,
      success: function (response){
        var obj = JSON.parse(response);
        if(obj.status == false){
          IsResponseFalse(obj.message);
        }
        $(".addtypebarangdemand").modal('hide');
        FuncLoadTypeBarangDemand();
        LoadSign();
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  }
}


//fungsi baca data upload document upo
function FuncLoadDoc() {
  $.ajax({
    type: "POST",
    url : `${restlocmkg}list_docmkg`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: {
      idmkg: MKG_ID,
    },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      // console.log(obj);
      if (isEmpty(obj) || obj.status==false) {
        // console.log("-Empty-");
        $("#tb_uploaddocbody").empty();
        return false;
      } else if (obj) {
        jmlData = obj.data.length;
        // console.log(obj.data);
        $("#tb_uploaddocbody").empty();
        for (a = 0; a < jmlData; a++) {
          var file = obj.data[a]["document"];
          var lnk = obj.data[a]["link"];

          if(file){
            var iconfile = "<i class='file blue icon'></i>";
            var docfile = "<a target='_blank' href='../RND_Upload/MKG/"+obj.data[a]["document"]+"'>"+obj.data[a]["description"];
          } else {
            var iconfile = "";
            var docfile = obj.data[a]["description"];
          }

          if (lnk){
            var icolink = "<i class='linkify icon red icon'></i>";
            var doclink = "<a target='_blank' href='"+lnk+"'>DOCUMENT\'S  LINK";
          } else {
            var icolink = "";
            var doclink = "";
          }


          if(MKG_ROLE =="editall"){
            var icondeldoc = "<span class='DelDocUPO' iddel='"+
            obj.data[a]["id_docmkg"]+"' nmdel='"+obj.data[a]["description"]+"'><i class='trash red icon'></i></span>";
          } else {
            var icondeldoc = "";
          }


        $("#tb_uploaddoc").find("tbody").append(
            "<tr><td>"+obj.data[a]["tanggal_doc"]+
            "</td><td>"+iconfile+" "+docfile+"</a>"+
            "</td><td>"+icolink+" "+doclink+"</a>"+
            "</td><td>"+icondeldoc+"</td></tr>"
          );
        }
        FuncDelDoc();
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
}


//fungsi hapus dokumen
function FuncDelDoc() {
  $(".DelDocUPO").on("click", function () {
    var id_doc = $(this).attr("iddel");
    var nm_doc = $(this).attr("nmdel");
    Swal.fire({
      title: "<h3>Delete This Document ?</h3>",
      text: nm_doc,
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocmkg}delete_docmkg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            iddoc : id_doc,
            nmdoc : nm_doc,
            nama  : USERNAME,
            idmkg  : MKG_ID
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              Swal.fire(
                "Error",
                "Ada kendal di koneksi/database, data tidak tersimpan !",
                "error"
              );
            } else {
              Swal.fire({
                text: "Deleted",
                timer: 1500,
                toast: true,
                showConfirmButton: false,
              });
              //reload tabel dokumen
              FuncLoadDoc();
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });
}


//fungsi hapus dokumen
function FuncDelBarangDemand() {
  $(".DelBarangDemand").on("click", function () {
    var id_typemkg = $(this).attr("iddel");
    var nm_demand = $(this).attr("nmdel");
    Swal.fire({
      title: "<h3>Delete This Document ?</h3>",
      text: nm_demand,
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocmkg}delete_typebarangdemand`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            idtypemkg : id_typemkg,
            idmkg  : MKG_ID, 
            nama  : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            console.log(obj);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              FuncLoadTypeBarangDemand();
              LoadSign();
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });
}



//fungsi load daftar PSS ketika add item upo
function TableListFunc() {
  $("#PSSList").DataTable({
    dom:
      "<'ui stackable grid'" +
      "<'row'" +
      "<'right aligned sixteen wide column'f>" +
      ">" +
      "<'row dt-table'" +
      "<'sixteen wide column'tr>" +
      ">" +
      "<'row'" +
      "<'left aligned eight wide column'>" +
      "<'right aligned eight wide column'>" +
      ">" +
      ">",
    destroy: true,
    processing: true,
    serverSide: true,
    pageLength: 10,
    data: [],
    language: {
      sLengthMenu: "_MENU_",
      search: "",
      searchPlaceholder: "Search PSS Title..",
      processing: '',
    },
    order: [[0, "desc"]],
    columns: [
      { data: 2 },
      { data: 7 },
      {
        data: null,
        render: function (data) {
          return `<i class="chevron circle right additempo iconcoloredit icon" idpss="${data[0]}">`;
        },
      },
    ],
    columnDefs: [{ className: "center aligned", targets: [2] }],
    ajax: {
      url: `../RND_BackEnd/backend_upo/list_pss`,
      type: "POST",
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    },
  });
}


//fungsi tampilkan kalender pop-up
function DatePickerETA() {
  var today = new Date();
  $('#CalETAReq, #CalETAConfirm, #CalETANewTarget, #CalTargetMP, #CalMPNewTarget').calendar({
    type: "date",
    //monthFirst: false,
    //minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
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
        return year + "-" + month + "-" + day;
      },
    },
    onChange: function (date, text) {
      const date1 = new Date();
      const date2 = new Date(text);
      const diffTime = (date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if(diffDays<0){
        Swal.fire({
          icon: "warning",
          text: "Tanggal yang dipilih adalah tanggal yang sudah lewat dari hari ini..",
          showConfirmButton: false,
        });
      }
    },
  });
}


//fungsi tampilkan kalender pop-up
// function DatePickerMP() {
//   var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//   $('#CalTargetMP2, #CalMPNewTarget2').calendar({
//     type: 'month',
//     monthFirst: false,
//     formatter: {
//       date: function (date, settings) {
//         if (!date) return "";
//         var month = months[date.getMonth()];
//         var year = date.getFullYear();
//         return month+" "+year;
//       }
//     }
//   });
// }


//fungsi add new target eta
function UpdateOSS() {
  $("#SaveDataOSS").click(function(){
    var oss_number = $("#oss_number").val();
    $.ajax({
      type: "POST",
      url : `${restlocmkg}add-oss`,
      headers: {
        user  : vusrnm,
        token : vtoken,
      },
      data: {
        oss_number  : oss_number,
        idmkg : MKG_ID,
        nama : USERNAME
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (isEmpty(obj)) {
          // console.log("-Empty-");
          IsResponseEmptyObj();
        } else if (obj) {
          IsResponseTrue(obj.message);
          $(".xwinaddnewoss").modal('hide');
          window.location.href = "./?link=mkgindex";

        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });
}


function UpdateNoMKG() {
  $("#SaveDataMKG").click(function(){
    var oss_number = $("#oss_number").val();
    $.ajax({
      type: "POST",
      url : `${restlocmkg}add-mkg`,
      headers: {
        user  : vusrnm,
        token : vtoken,
      },
      data: {
        oss_number  : oss_number,
        idmkg : MKG_ID,
        nama : USERNAME
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (isEmpty(obj)) {
          // console.log("-Empty-");
          IsResponseEmptyObj();
        } else if (obj) {
          IsResponseTrue(obj.message);
          $(".xwinaddnewoss").modal('hide');
          window.location.href = "./?link=mkgindex";

        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });
}

//Function Read All History Sign
function ReadHistorySign() {
  var idupo     = MKG_ID;
  $.ajax({
    type: "POST",
    url: `${restlocupo}table_historysign`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: { idupo: idupo },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      // console.log(obj.data.length);
      if (isEmpty(obj)) {
        console.log("Gagal load, data kosong");
        return false;
      } else if (obj) {
        jmlData = obj.data.length;
        $("#HistorySignChangeTable").empty();
        for (a = 0; a < jmlData; a++) {
          $("#HistorySignChangeList")
            .find("tbody")
            .append(
              "<tr><td>" +
                obj.data[a]["signed_date"] +
                "</td><td class='center'>" +
                obj.data[a]["signed_by"] +
                "</td><td class='center'>" +
                obj.data[a]["signed_role"] +
                "</td></tr>"
            );
        }
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
}



//Function Read All History Sign
function ReadHistoryETA(idx) {
  var idupo     = MKG_ID;
  var iditem     = idx;
  // var iditem     = $("#iditemupo").val();
  
  $.ajax({
    type: "POST",
    url: `${restlocupo}table_historyeta`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: { idupo: idupo, iditem :iditem },
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      // console.log(obj.data.length);
      if (isEmpty(obj)) {
        console.log("Gagal load, data kosong");
        return false;
      } else if (obj) {
        jmlData = obj.data.length;
        $("#HistoryETAChangeTable").empty();
        for (a = 0; a < jmlData; a++) {
          $("#HistoryETAChangeList")
            .find("tbody")
            .append(
              "<tr><td>" +
                obj.data[a]["eta_date"] +
                "</td><td class='center'>" +
                obj.data[a]["time"] +
                "</td><td class='center'>" +
                obj.data[a]["eta_by"] +
                "</td></tr>"
            );
        }
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
}



function ReloadNoPORFP(){
  var vusrnm  = getCookie('usrnm');
  var vtoken  = getCookie('token');
  var user    = $("#PSSUser").val();
    $('.segment').dimmer('show');
  $.ajax({
    type: "PUT",
    url: `${restlocemail}update_gr`,
    headers: {
      user  : vusrnm,
      token : vtoken
    },
    data: { user :user},
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      $('.segment').dimmer('hide');
      if(isEmpty(obj)) {
        console.log('Gagal load, data kosong');
      } else if(obj) {
        Swal.fire({
          text: obj["message"],
          timer: 1500,
          showConfirmButton: false
        })
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
}

// Upload New Dokumen
$("#SaveUploadDoc").on("click", function () {
  var file_data = $("#uploadfiledoc").prop("files")[0];
  var descript  = $("#uploaddescdoc").val();
  var link  = $("#uploadlinkdoc").val();
  var idmkg     = MKG_ID;
  var form_data = new FormData();
  form_data.append("file", file_data);
  form_data.append("descript", descript);
  form_data.append("idmkg", idmkg);
  form_data.append("link", link);
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: false,
    processData: false,
    url: `${restlocmkg}upload_docmkg`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: form_data,
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      if (obj.status == false) {
        Swal.fire({
          text: obj.message,
          timer: 1500,
          icon: "warning",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          text: "Saved !",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });

        $(".uploaddoc").modal("hide");
        FuncLoadDoc();
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
});

// Upload New Dokumen
$("#SaveDataMKG").on("click", function () {
  var file_data = $("#uploadcertificate").prop("files")[0];
  var no_mkg  = $("#mkg_number").val();
  // console.log(no_mkg);
  var idmkg     = MKG_ID;
  var form_data = new FormData();
  form_data.append("nomkg", no_mkg);
  form_data.append("idmkg", idmkg);
  form_data.append("file", file_data);
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: false,
    processData: false,
    url: `${restlocmkg}upload_certificate`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: form_data,
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      if (obj.status == false) {
        Swal.fire({
          text: obj.message,
          timer: 1500,
          icon: "warning",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          text: "Saved !",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });

        $(".xwinaddmkgnumber").modal("hide");
        window.location.href = "./?link=mkgindex";
      }
    },
    error: function () {
      if (LogoutProtect){
        window.location.href = "./?link=loclogout";
      } else {
        Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
      }
    },
  });
});


function LoadSign(){
  $.ajax({
    type: "POST",
    url     : `${restlocmkg}loadSign`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: { idmkg: MKG_ID },
    cache: false,
    success: function (data){
      var obj = JSON.parse(data);
     
      $('#PICMkg').text(obj.Pic);
      if(USERNAME === obj.Pic){
        if(obj.Pic_Signby){
          $('#DateSignPICMkg').text(obj.Pic_Datesign);
          $('#BtnSignPIC').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Signed" data-position="top left">SIGNED</a>');
        } else {
          $('#BtnSignPIC').html('<a class="ui tiny bottom green attached button signrequest" asid="MD1" data-tooltip="Sign setelah melengkapi data" data-position="top left">SIGN</a>');
        }
      } else {
        if(obj.Pic_Signby){
          $('#DateSignPICMkg').text(obj.Pic_Datesign);
          $('#BtnSignPIC').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Signed" data-position="top left">SIGNED</a>');
        } else {
          if(obj.Section === MKG_SECT && DJbtn == "HEAD OF"){
            $('#BtnSignPIC').html('<a class="ui tiny bottom green attached button signrequest" asid="MD1" data-tooltip="Sign setelah melengkapi data" data-position="top left">SIGN</a>');
          }else{
            $('#BtnSignPIC').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">PREPARE</a>');
          } 
        }
      }
      

      if(obj.Approval1){
        $('#approval1').show();
        $('#PICApp1').text(obj.Approval1);
        if(obj.Pic_Signby){
          if(USERNAME === obj.Approval1){
            if(obj.Approval1_Signby){
              $('#DateSignApp1').text(obj.Approval1_DateSign);
              $('#BtnSignApp1').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp1').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app1" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
                // $('#BtnSignApp1').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app1" data-tooltip="Approve MKG" data-position="top left">Approve</div><div class="ui redreject button rejectmkg" asid="Approval 1" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            }
          } else {
            if(obj.Approval1_Signby){
              $('#DateSignApp1').text(obj.Approval1_DateSign);
              $('#BtnSignApp1').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp1').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app1" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
                // $('#BtnSignApp1').html('<a class="ui tiny bottom red attached button BtnRejectNego" asid="App1" data-tooltip="Sign setelah melengkapi data" data-position="top left">REJECT</a>');
              }else{
                $('#BtnSignApp1').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval1_Signby){
            $('#DateSignApp1').text(obj.Approval1_DateSign);
            $('#BtnSignApp1').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp1').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval1').hide();
      }


      if(obj.Approval2){
        $('#approval2').show();
        $('#PICApp2').text(obj.Approval2);
        if(obj.Approval1_Signby){
          if(USERNAME === obj.Approval2){
            if(obj.Approval2_Signby){
              $('#DateSignApp2').text(obj.Approval2_DateSign);
              $('#BtnSignApp2').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              $('#BtnSignApp2').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app2" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
            }
          } else {
            if(obj.Approval2_Signby){
              $('#DateSignApp2').text(obj.Approval2_DateSign);
              $('#BtnSignApp2').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp2').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app2" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
              }else{
                $('#BtnSignApp2').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval2_Signby){
            $('#DateSignApp2').text(obj.Approval2_DateSign);
            $('#BtnSignApp2').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp2').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval2').hide();
      }


      if(obj.Approval3){
        $('#approval3').show();
        $('#PICApp3').text(obj.Approval3);
        if(obj.Approval2_Signby){
          if(USERNAME === obj.Approval3){
            if(obj.Approval3_Signby){
              $('#DateSignApp3').text(obj.Approval3_DateSign);
              $('#BtnSignApp3').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              $('#BtnSignApp3').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app3" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
            }
          } else {
            if(obj.Approval3_Signby){
              $('#DateSignApp3').text(obj.Approval3_DateSign);
              $('#BtnSignApp3').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp3').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app3" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
              }else{
                $('#BtnSignApp3').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval3_Signby){
            $('#DateSignApp3').text(obj.Approval3_DateSign);
            $('#BtnSignApp3').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp3').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval3').hide();
      }


      if(obj.Approval4){
        $('#approval4').show();
        $('#PICApp4').text(obj.Approval4);
        if(obj.Approval3_Signby){
          if(USERNAME === obj.Approval4){
            if(obj.Approval4_Signby){
              $('#DateSignApp4').text(obj.Approval4_DateSign);
              $('#BtnSignApp4').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              $('#BtnSignApp4').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app4" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
            }
          } else {
            if(obj.Approval4_Signby){
              $('#DateSignApp4').text(obj.Approval4_DateSign);
              $('#BtnSignApp4').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp4').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app4" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
              }else{
                $('#BtnSignApp4').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval4_Signby){
            $('#DateSignApp4').text(obj.Approval4_DateSign);
            $('#BtnSignApp4').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp4').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval4').hide();
      }

      if(obj.Approval5){
        $('#approval5').show();
        $('#PICApp5').text(obj.Approval5);
        if(obj.Approval4_Signby){
          if(USERNAME === obj.Approval5){
            if(obj.Approval5_Signby){
              $('#DateSignApp5').text(obj.Approval5_DateSign);
              $('#BtnSignApp5').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              $('#BtnSignApp5').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app5" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
            }
          } else {
            if(obj.Approval5_Signby){
              $('#DateSignApp5').text(obj.Approval5_DateSign);
              $('#BtnSignApp5').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp5').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app5" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
              }else{
                $('#BtnSignApp5').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval5_Signby){
            $('#DateSignApp5').text(obj.Approval5_DateSign);
            $('#BtnSignApp5').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp5').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval5').hide();
      }


      if(obj.Approval6){
        $('#approval6').show();
        $('#PICApp6').text(obj.Approval6);
        if(obj.Approval5_Signby){
          if(USERNAME === obj.Approval6){
            if(obj.Approval6_Signby){
              $('#DateSignApp6').text(obj.Approval6_DateSign);
              $('#BtnSignApp6').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              $('#BtnSignApp6').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app6" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
            }
          } else {
            if(obj.Approval6_Signby){
              $('#DateSignApp6').text(obj.Approval6_DateSign);
              $('#BtnSignApp6').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
            } else {
              if(obj.Section === MKG_SECT && MKG_ROLE == "editall" && DJbtn == "PROJECT LEADER"){
                $('#BtnSignApp6').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signapp" asid="app6" data-tooltip="Approve MKG" data-position="top left">Approve</div></div>');
              }else{
                $('#BtnSignApp6').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
              }
            }
          }
        } else {
          if(obj.Approval6_Signby){
            $('#DateSignApp6').text(obj.Approval6_DateSign);
            $('#BtnSignApp6').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">APPROVED</a>');
          } else {
            $('#BtnSignApp6').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">WAIT</a>');
          }
        }
      } else {
        $('#approval6').hide();
      }


      if(obj.HoGroupProduct){
        $('#HOGroupProduct').text(obj.HoGroupProduct);

        if(obj.Approval6){

          if(obj.Approval6_Signby && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }

        } else if(obj.Approval5){

          if(obj.Approval5_Signby && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }

        } else if(obj.Approval4){

          if(obj.Approval4_Signby && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }

        } else if(obj.Approval3){

          if(obj.Approval3_Signby && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }
        } else if(obj.Approval2){

          if(obj.Approval2_Signby  && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }

        } else if(obj.Approval1){
          if(obj.Approval1_Signby && Progress === "HEAD OF GROUP PRODUCT"){
            if(USERNAME === obj.HoGroupProduct){
              // console.log("B");
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhog" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of Group Product" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }
            } else {
              if(obj.HOGroupProductSignby){
                $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
              } else {
                $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.HOGroupProductSignby){
              $('#DateSignHOGroupProduct').text(obj.HOGroupProductDateSign);
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHOGroupProduct').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }

        } 


      } 
      
      if(obj.HODQARegulasi){
        $('#HODQAReg').text(obj.HODQARegulasi);

        if(obj.HOGroupProductSignby){
          if(USERNAME === obj.HODQARegulasi){
            if(obj.HODQARegulasiSignby){
              console.log("SIGN");
              $('#DateSignHODQAreg').text(obj.HODQARegulasiDateSign);
              $('#BtnSignHODQAReg').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHODQAReg').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signhoreg" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of DQA Regulasi" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
            }
          } else {
            if(obj.HODQARegulasiSignby){
              $('#DateSignHODQAreg').text(obj.HODQARegulasiDateSign);
              $('#BtnSignHODQAReg').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignHODQAReg').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }
        }else{
          $('#BtnSignHODQAReg').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
        }
      }
      
      
      if(obj.PICDQARegulasi){
        $('#DQAReg').text(obj.PICDQARegulasi);

        if(obj.HODQARegulasiSignby){
          if(USERNAME === obj.PICDQARegulasi){
            if(obj.PICDQARegulasiSignby){
              $('#DateSignDQAreg').text(obj.PICDQARegulasiDateSign);
              $('#BtnSignDQAReg').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              if(OSS){
                $('#BtnSignDQAReg').html('<div class="ui tiny two bottom attached buttons"><div class="ui green button signpicreg" asid="app1" data-tooltip="Confirm MKG" data-position="top left">Confirm</div><div class="ui redreject button rejectmkg" asid="Head of DQA Regulasi" data-tooltip="Reject/Return MKG" data-position="top left">Reject/Return</div></div>');
              }else{
                $('#BtnSignDQAReg').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
              }
            }
          } else {
            if(obj.PICDQARegulasiSignby){
              $('#DateSignDQAreg').text(obj.PICDQARegulasiDateSign);
              $('#BtnSignDQAReg').html('<a class="ui tiny bottom basic green attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRMED</a>');
            } else {
              $('#BtnSignDQAReg').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
            }
          }
        }else{
          $('#BtnSignDQAReg').html('<a class="ui tiny disabled bottom attached button" asid="MD1" data-tooltip="Masih dalam proses" data-position="top left">CONFIRM</a>');
        }
      }

      
      // if(obj.ProjectLeader){
      //   $('#ProjLeader').text(obj.ProjectLeader);
      //   if(obj.SignByHoID){
      //     if(DUser === obj.ProjectLeader){
      //       if(obj.SignByPL){
      //         $('#SignPL').html('SIGNED<br><span class="DateSign"> '+obj.DateSignPL+'</span>');
      //       } else {
      //         $('#SignPL').html('<a class="ui mini label blue signdesigner" asid="PL" data-tooltip="Sign setelah melengkapi data kebutuhan" data-position="top left">SIGN</a>');
      //       }
      //     } else {
      //       if(obj.SignByPL){
      //         $('#SignPL').html('SIGNED<br><span class="DateSign"> '+obj.DateSignPL+'</span>');
      //       } else {
      //         $('#SignPL').html('SIGN PROCESS');
      //       }
      //     }
      //   } else {
      //     $('#SignPL').html('WAIT');
      //   }
      // } else {
      //   $('#SignPL').html('BYPASSED');
      // }
      
      SignRequestDesigner();
      SignApprove();
      SignHoGroupProduct();
      SignHoDQAReg();
      SignPicDQAReg();
      RejectMKG();
      // SignApproveHeadOf(a);
      // SignConfirmNegotiator(a);

      // SignRejectHO(a);
      // SignRejectNego(a);
      // SignReturnNego(a);

      // LoadDataHeaderMPP(IdMPP);
      // var ssts = getCookie("mppsts");
      // var pprg = getCookie("mppprg");


      // if(DSect ==='MECHANICAL DESIGN+PROTOTYPE' && DJbtn !=='PROJECT LEADER' ){
      //   if((obj.DateSignHoMD===null && obj.SignByHoMD === null ) || ((obj.DateSignHoMD !==null && obj.SignByHoMD !== null) && (ssts ==='MPP-RETURN' || ssts ==='MPP-REJECT'))){
      //     TableListFunc();
      //   } else {
      //     TableListFuncDisabled();
      //   }
      // } else if(DSect ==='INDUSTRIAL DESIGN' && DJbtn !=='PROJECT LEADER'){
      //   if((obj.DateSignHoID===null && obj.SignByHoID === null && ssts ==='DRAFT') ){
      //     TableListFunc();
      //   } else {
      //     TableListFuncDisabled();
      //   }
      // } else if(DUser ===obj.ProjectLeader && DJbtn ==='PROJECT LEADER'){
      //   if(obj.DateSignPL===null && obj.SignByPL === null ){
      //     TableListFunc();
      //   } else {
      //     TableListFuncDisabled();
      //   }
      // } else if(DUser ===obj.Negotiator && DSect ==='MULTI SOURCING'){
      //   if(obj.DateSignNego===null && obj.SignByNego === null ){
      //     TableListFunc();
      //   } else {
      //     TableListFuncDisabled();
      //   }
      // } else {
      //   TableListFuncDisabled();
      // }

    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function SignRequestDesigner(){
  $(".signrequest").on("click", function () {
    var dlink = EDCrypt.encrypt(MKG_ID, NonceValue);
    Swal.fire({
      title: "<h3>Sign MKG ini ?</h3>",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_mkg/sign-pic`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: { 
            idmkg: MKG_ID,
            dlink: dlink,
            user : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSign();
              FuncLoadTypeBarangDemand();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });
}

function SignApprove(){
  $(".signapp").on("click", function () {
    var dlink = EDCrypt.encrypt(MKG_ID, NonceValue);
    var SignAs = $(this).attr("asid");
    Swal.fire({
      title: "<h3>Sign MKG ini ?</h3>",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_mkg/sign-approval`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: { 
            idmkg: MKG_ID,
            dlink: dlink,
            user : USERNAME,
            app  : SignAs
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSign();
              FuncLoadTypeBarangDemand();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });
}


function SignHoGroupProduct(){
  $(".signhog").on("click", function () {
    var dlink = EDCrypt.encrypt(MKG_ID, NonceValue);
    Swal.fire({
      title: "<h3>Sign MKG ini ?</h3>",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_mkg/sign-hog`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: { 
            idmkg: MKG_ID,
            dlink: dlink,
            user : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSign();
              FuncLoadTypeBarangDemand();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });
}


function SignHoDQAReg(){
  $(".signhoreg").on("click", function () {
    var dlink = EDCrypt.encrypt(MKG_ID, NonceValue);
    Swal.fire({
      title: "<h3>Sign MKG ini ?</h3>",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_mkg/sign-horeg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: { 
            idmkg: MKG_ID,
            dlink: dlink,
            user : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSign();
              FuncLoadTypeBarangDemand();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });
}

function SignPicDQAReg(){
  $(".signpicreg").on("click", function () {
    var dlink = EDCrypt.encrypt(MKG_ID, NonceValue);
    Swal.fire({
      title: "<h3>Sign MKG ini ?</h3>",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_mkg/sign-picreg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: { 
            idmkg: MKG_ID,
            dlink: dlink,
            user : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSign();
              FuncLoadTypeBarangDemand();
              window.location.href = "./?link=mkgindex";
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });
}

function RejectMKG(){
  $(".rejectmkg").on("click", function () {
    $(".xwinrejectmkg").modal('show');
    var SignAs = $(this).attr("asid");
    $("#asid").val(SignAs);
  });
}

$(document).ready(function() {
 
  //Load dokumen upload upo
  FuncLoadDoc();
  FuncLoadTypeBarangDemand();
  LoadSign();
  UpdateOSS();

  $('#tabmkglist').on('click', function() {
    window.location.href = "./?link=mkgindex";
  });

  $('#userguidemkg').on('click', function() {
    window.location.href = "./?link=guidemkg";
  });

  
  
  $('#HeaderButtonSave').on('click', function() {
    window.location.href = "./?link=upolist";
  });

  $('#HeaderButtonBack').on('click', function() {
    window.location.href = "./?link=upolist";
  });

  $("#EditHeader").on("click", function () {
    var nonceValue = decodeURIComponent(getCookie("nonceValue"));
    let encryption = new Encryption();
    var eidupoENC = encryption.encrypt(MKG_ID, nonceValue);
    window.location.href = "./?link=mkgreqnew&i=" + eidupoENC;
  });

  $("#EditOSS").on("click", function () {
    $(".xwinaddoss").modal('show');
  });

  $("#EditNoMKG").on("click", function () {
    $(".xwinaddmkgnumber").modal('show');
  });

  $("#UploadNewDoc").click(function(){
    $(".uploaddoc").modal('show');
  });
  
  $(".edititem").click(function(){
    $(".edititempo").modal('show');
  });

  $("#AddPOItem").click(function(){
    $(".addpoitem").modal('show');
    TableListFunc();
  });


  //Add Item UPO (manual)
  $("#AddPOItemmanual").click(function(){
    $(".addtypebarangdemand").modal('show');
    $('#addmqtyorder').number( true, 2 );
    $("#addmdescript").removeAttr("disabled",true);
    $("#addmmatnum").removeAttr("disabled",true);
    $("#addmvmatnum").removeAttr("disabled",true);


    $("#addmdescript").val('');
    $("#addmmatnum").val('');
    $("#addmnomodif").val('');
    $("#addmvmatnum").val('');
    $("#addmvendor").val('');
    $("#addmplant").dropdown("clear");
    
    $("#addmsloc").val('');
    $("#addmchassis").dropdown("clear");
   
    $("#addmtype").val('');
    $("#addmlt").val('');
    $("#addmetarequest").val('');
    $("#addmetaconfirm").val('');
    $("#addmqtyorder").val('');
    $("#addmbase").val('');
    $("#addmwos").dropdown("clear");

    $("#addmpayment").val('');
    $("#addmnomodif").val('');
    $("#addmnote").val('');
    $("#iditemUPO").val('');

    

    //vendor autocomplete
    $(".ui.search.vendor").search({
      minCharacters: 1,
      apiSettings: {
        url: "2_psonline/_autocompleteDNSN.php?q={query}",
      },
      fields: {
        results: "data",
        title: "id",
        description: "desc",
      },
    });
    
    $(".ui.search.vendorname").search({
      minCharacters: 1,
      apiSettings: {
        url: "2_psonline/_autocompletevendorname.php?q={query}",
      },
      fields: {
        results: "data",
        title: "id",
        description: "desc",
      },
    });

    //sloc autocomplete base-on plant
    $("#addmsloc").focus(function () {
      var plant = $("#addmplant").val();
      var splant = plant.toString();
      $(".ui.search.sloc").search({
        minCharacters: 1,
        apiSettings: {
          url: "2_psonline/_autocompletesloc.php?q={query}&p=" + splant,
        },
        fields: {
          results: "data",
          title: "value",
          description: "storage_location_name",
        },
      });
    });

    //baseunit autocomplete
    $(".ui.search.baseunit").search({
      minCharacters: 1,
      apiSettings: {
        url: "2_psonline/_autocompletebaseunit.php?q={query}",
      },
      fields: {
        results: "data",
        title: "sap",
        description: "description",
      },
    });
    //load kalender
    DatePickerETA();
    //DatePickerMP();
  });

  //Sign Negosiator
  $("#BtnSignNego").click(function(){
    let encryption = new Encryption();
    var idupo = MKG_ID;
    var dlink = encryption.encrypt(idupo, NonceValue);
    $.ajax({
      type: "POST",
      dataType: "text",
      url: `${restlocupo}sign_negosiator`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idupo : idupo,
        dlink : 'upoitem&i='+dlink
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (obj.status == false) {
          Swal.fire({
            text: obj.message,
            timer: 1500,
            icon: "warning",
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Confirmed !",
            timer: 1500,
            icon: "success",
            position: 'center',
            showConfirmButton: false,
          });
          
          $("#BtnSignNego").addClass("basic");
          $("#BtnSignNego").text("Confirmed");
          $("#BtnRejectNego").hide();
          window.location.href = "./?link=upoitem&i=" + IdUrl;
        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  })  

  //Reject Approval
  $(".BtnReject").on("click", function () {
    var idupo = MKG_ID;
    var lv = $(this).attr("lv");
    (async () => {
      const { value: reason } = await Swal.fire({
        title: "Reason",
        input: "text",
        inputPlaceholder: "Alasan Pembatalan Permintaan UPO",
      });
      if (reason) {
        $.ajax({
          type: "POST",
          dataType: "text",
          url: `${restlocupo}reject_upo`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            idupo   : idupo,
            lvapp   : lv,
            reason  : reason
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              Swal.fire({
                text: obj.message,
                timer: 1500,
                icon: "warning",
                showConfirmButton: false,
              });
            } else {
              Swal.fire({
                title: "Rejected !",
                timer: 1500,
                icon: "warning",
                position: 'center',
                showConfirmButton: false,
              });
              
              $(".BtnReject").addClass("basic");
              $(".BtnReject").addClass("red");
              $(".BtnReject").text("Rejected");
              $(".BtnSign").hide();
              window.location.href = "./?link=upoitem&i=" + IdUrl;
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    })();
  });


  //Change Negosiator
  $("#SaveNego").click(function(){
    var idupo = MKG_ID;
    var nego  = $("#UPONegotiator").val();
    $.ajax({
      type: "POST",
      dataType: "text",
      url: `${restlocupo}change_negosiator`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idupo   : idupo,
        nego    : nego,
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (obj.status == false) {
          Swal.fire({
            text: obj.message,
            timer: 1500,
            icon: "warning",
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Saved !",
            timer: 1500,
            icon: "success",
            position: 'center',
            showConfirmButton: false,
          });
          
          $(".windownegosiator").hide();
          window.location.href = "./?link=upolist";

        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  })  

  //Show Negosiator
  $("#EditNego").on("click", function (e) {
    $(".windownegosiator").modal("show");
    $(".TitleNegoList").html(
      'CHANGE NEGOSIATOR <br><span class="infoheader">Tabel Nama Negosiator dan Handling Part-nya</span>'
    );
    //Master();
  });






  //aksi edit item upo
  $("#tb_itemlistupo").on("click", ".EdittemUPO", function () {
    var id_itemupo = $(this).attr("idedititemupo");
    var nm_itemupo = $(this).attr("nmeditupo");
    $.ajax({
      type: "POST",
      url : `${restlocupo}read_itemupo`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idupo: MKG_ID,
        iditemupo: id_itemupo,
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (isEmpty(obj)) {
          // console.log("-Empty-");
          return false;
        } else if (obj) {
          jmlData = obj.data.length;
          $(".addtypebarangdemand").modal('show');
          var plantss = obj.data[0]["plant"];
          var plantarray = plantss.split(",");
          var nopss = obj.data[0]["no_ps"];
          
          $('#addmqtyorder').number( true, 2 );

          $("#addmdescript").val(obj.data[0]["description"]);
          $("#addmmatnum").val(obj.data[0]["no_gudang"]);
          $("#addmnomodif").val(obj.data[0]["no_modif"]);
          $("#addmvmatnum").val(obj.data[0]["vendor_mat_number"]);
          $("#addmvendor").val(obj.data[0]["vendor"]);
          $("#addmplant").dropdown("clear");
          $("#addmplant").dropdown("set selected", plantarray);

          $("#addmsloc").val(obj.data[0]["sloc"]);
          $("#addmchassis").dropdown("clear");
          $("#addmchassis").dropdown("set selected", obj.data[0]["chasis"]);

          $("#addmcostcenter").dropdown("clear");
          $("#addmcostcenter").dropdown("set selected", obj.data[0]["cost_center"]);

          $("#addmtype").val(obj.data[0]["type"]);

          $("#addminventory").dropdown("clear");
          $("#addminventory").dropdown("set selected", obj.data[0]["inventory"]);

          // $("#addminventory").val(obj.data[0]["inventory"]);
          $("#addmlt").val(obj.data[0]["lead_time"]);
          $("#addmetarequest").val(obj.data[0]["target_eta"]);
          $("#addmetaconfirm").val(obj.data[0]["eta_confirm"]);
          $("#addmqtyorder").val(obj.data[0]["qty_order"]);
          $("#addmbase").val(obj.data[0]["base_unit"]);
          $("#addmwos").dropdown("clear");
          $("#addmwos").dropdown("set selected", obj.data[0]["wos"]);

          $("#addmpayment").val(obj.data[0]["payment"]);
          $("#addmnomodif").val(obj.data[0]["no_modif"]);
          $("#addmnote").val(obj.data[0]["note"]);
          $("#iditemUPO").val(obj.data[0]["id_item"]);

          //autocomplete vendor
          $(".ui.search.vendor").search({
            minCharacters: 1,
            apiSettings: {
              url: "2_psonline/_autocompleteDNSN.php?q={query}",
            },
            fields: {
              results: "data",
              title: "id",
              description: "desc",
            },
          });

          //autocomplete vendor name
          $(".ui.search.vendorname").search({
            minCharacters: 1,
            apiSettings: {
              url: "2_psonline/_autocompletevendorname.php?q={query}",
            },
            fields: {
              results: "data",
              title: "id",
              description: "desc",
            },
          });
      
          //sloc autocomplete base-on plant
          $("#addmsloc").focus(function () {
            var plant = $("#addmplant").val();
            var splant = plant.toString();
            $(".ui.search.sloc").search({
              minCharacters: 1,
              apiSettings: {
                url: "2_psonline/_autocompletesloc.php?q={query}&p=" + splant,
              },
              fields: {
                results: "data",
                title: "value",
                description: "storage_location_name",
              },
            });
          });
      
          //baseunit autocomplete
          $(".ui.search.baseunit").search({
            minCharacters: 1,
            apiSettings: {
              url: "2_psonline/_autocompletebaseunit.php?q={query}",
            },
            fields: {
              results: "data",
              title: "sap",
              description: "description",
            },
          });
          //load kalender
          DatePickerETA();
          //DatePickerMP();

          if(nopss){
            $("#addmdescript").attr("disabled",true);
            $("#addmmatnum").attr("disabled",true);
            $("#addmvmatnum").attr("disabled",true);
          } else {
            $("#addmdescript").removeAttr("disabled",true);
            $("#addmmatnum").removeAttr("disabled",true);
            $("#addmvmatnum").removeAttr("disabled",true);
          }


        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });


  

  //aksi view detail item upo
  //--------------------------------------------------------------detail disable atas permintaan negosiator
  // $("#tb_itemlistupo").on("click", ".detailitem", function () {
  //   var id_itemupo = $(this).attr("iddetailupo");
  //   $.ajax({
  //     type: "POST",
  //     url : `${restlocupo}read_itemupo`,
  //     headers: {
  //       user: vusrnm,
  //       token: vtoken,
  //     },
  //     data: {
  //       idupo: MKG_ID,
  //       iditemupo: id_itemupo,
  //     },
  //     cache: false,
  //     success: function (response) {
  //       var obj = JSON.parse(response);
  //       if (isEmpty(obj)) {
  //         // console.log("-Empty-");
  //         return false;
  //       } else if (obj) {
  //         jmlData = obj.data.length;
  //         $(".viewdetail").modal('show');
  //         // var plantss = obj.data[0]["plant"];
  //         // var plantarray = plantss.split(",");
  //         // var nopss = obj.data[0]["no_ps"];
          
  //         // $('#addmqtyorder').number( true, 2 );

  //         $("#view_matnum").text(obj.data[0]["no_gudang"]);
  //         $("#view_desc").text(obj.data[0]["description"]);
  //         $("#view_vmatnum").text(obj.data[0]["vendor_mat_number"]);
  //         $("#view_vendor").text(obj.data[0]["vendor"]);
  //         $("#view_plant").text(obj.data[0]["plant"]);
  //         $("#view_sloc").text(obj.data[0]["sloc"]);
  //         $("#view_chs").text(obj.data[0]["chasis"]+" / "+obj.data[0]["type"]);
  //         $("#view_invent").text(obj.data[0]["inventory"]);
  //         // $("#view_lt").text(obj.data[0]["lead_time"]);
  //         $("#view_cost").text(obj.data[0]["cost_center"]);
  //         $("#view_qtyr").text(obj.data[0]["qty_order"]);
  //         $("#view_qtyc").text(obj.data[0]["qty_confirm"]);
  //         $("#view_baser").text(obj.data[0]["base_unit"]);
  //         $("#view_basec").text(obj.data[0]["base_unitconf"]);
  //         $("#view_target").text(obj.data[0]["target_eta"]);
  //         $("#view_targetc").text(obj.data[0]["eta_confirm"]);
  //         $("#view_wos").text(obj.data[0]["wos"]);
  //         $("#view_targetmp").text(obj.data[0]["target_mp"]);
  //         $("#view_note").text(obj.data[0]["note"]);
  //         $("#view_nops").text(obj.data[0]["no_ps"]);
  //         $("#view_nopo").text(obj.data[0]["no_po"]);
  //         $("#iditemupo").val(id_itemupo);


  //       }
  //     },
  //     error: function () {
  //       if (LogoutProtect){
  //         window.location.href = "./?link=loclogout";
  //       } else {
  //         Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
  //       }
  //     },
  //   });
  // });

  //aksi negosiator edit item upo
  $("#tb_itemlistupo").on("click", ".NegoEdittemUPO", function () {
    var id_itemupo = $(this).attr("idedititemupo");
    var nm_itemupo = $(this).attr("nmeditupo");
    var type_no    = $(this).attr("tipeeditupo");
    var jenisupo   = $('#typeupo').val();

    $.ajax({
      type: "POST",
      url : `${restlocupo}read_itemupo`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idupo: MKG_ID,
        iditemupo: id_itemupo,
        type_no: type_no
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (isEmpty(obj)) {
          // console.log("-Empty-");
          return false;
        } else if (obj) {
          jmlData = obj.data.length;
          $(".negoedititem").modal('show');

          $('#negoe_qty').number( true, 2 );
          $('#negoe_qtyr').number( true, 2 );

          if (jenisupo =="NON COMM"){
            $("#negoe_matnum").val(obj.data[0]["no_gudang"]);
          } else {
            $("#negoe_matnum").text(obj.data[0]["no_gudang"]);
          }
          $("#negoe_desc").text(obj.data[0]["description"]);
          $("#negoe_vmatnum").text(obj.data[0]["vendor_mat_number"]);
          $("#negoe_vendor").text(obj.data[0]["vendor"]);
          $("#negoe_plant").text(obj.data[0]["plant"]);
          $("#negoe_sloc").text(obj.data[0]["sloc"]);
          $("#negoe_chs").text(obj.data[0]["chasis"]+" / "+obj.data[0]["type"]);
          $("#negoe_invent").text(obj.data[0]["inventory"]);
          $("#negoe_targetmp").text(obj.data[0]["target_mp"]);
          $("#negoe_lt").text(obj.data[0]["lead_time"]);
          $("#negoe_nopo").val(obj.data[0]["no_po"]);
          $("#negoe_qtyr").text(obj.data[0]["qty_order"]);
          $("#negoe_qty").val(obj.data[0]["qty_confirm"]);
          $("#negoe_vendsupp").val(obj.data[0]["vendor_confirm"]);
          $("#negoe_baser").text(obj.data[0]["base_unit"]);
          $("#negoe_base").val(obj.data[0]["base_unitconf"]);
          $("#negoe_target").text(obj.data[0]["target_eta"]);
          $("#negoe_etaconfirm").val(obj.data[0]["eta_confirm"]);

          $("#negoe_wos").dropdown("clear");
          $("#negoe_wos").dropdown("set selected", obj.data[0]["wos"]);
          $("#negoe_porfp").dropdown("clear");
          $("#negoe_porfp").dropdown("set selected", obj.data[0]["tipe_nopo"]);

          $("#negoe_pay").val(obj.data[0]["payment"]);
          $("#negoe_note").val(obj.data[0]["note"]);
          $("#negoe_iditem").val(obj.data[0]["id_item"]);

          var jnspo = $("#negoe_porfp").val();
          NoPOSearch(jnspo);
          
          //baseunit autocomplete
          $(".ui.search.baseunit").search({
            minCharacters: 1,
            apiSettings: {
              url: "2_psonline/_autocompletebaseunit.php?q={query}",
            },
            fields: {
              results: "data",
              title: "sap",
              description: "description",
            },
          });

          $(".ui.search.vendorname").search({
            minCharacters: 1,
            apiSettings: {
              url: "2_psonline/_autocompletevendorname.php?q={query}",
            },
            fields: {
              results: "data",
              title: "id",
              description: "desc",
            },
          });


          //load kalender
          DatePickerETA();
          //DatePickerMP();

        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });
  
  //onchange No PO/RFP
  $('#negoe_porfp').on('change', function() {
    var jn = $("#negoe_porfp").val();
    NoPOSearch(jn);
  });

  //fungsi search No PO
  function NoPOSearch(a){
    //nomerpo autocomplete
    if(a =="PO"){
    $(".ui.search.nopo").search({
      minCharacters: 1,
      apiSettings: {
        url: "2_usulanpo/_autocompletenopo.php?q={query}&j="+a,
      },
      fields: {
        results: "data",
        title: "EBELN",
        description: "MJAHR",
      },
    });
  } else {
    $(".ui.search.nopo").search({
      minCharacters: 1,
      apiSettings: {
        url: "2_usulanpo/_autocompletenopo.php?q={query}&j="+a,
      },
      fields: {
        results: "data",
        title: "BELNR",
        description: "OJAHR",
      },
    });
  }
  }

  //aksi hapus item upo
  $("#tb_itemlistupo").on("click", ".DelItemUPO", function () {
    var id_itemupo = $(this).attr("iddelitemupo");
    var nm_itemupo = $(this).attr("nmdelupo");
    Swal.fire({
      title: "<h3>Delete Item UPO ?</h3>",
      text: nm_itemupo,
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocupo}delete_itemupo`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            iditemupo : id_itemupo
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              Swal.fire(
                "Error",
                "Ada kendal di koneksi/database, data tidak tersimpan !",
                "error"
              );
            } else {
              Swal.fire({
                text: "Deleted",
                timer: 1500,
                toast: true,
                showConfirmButton: false,
              });
              //reload tabel upo
              FuncLoadTypeBarangDemand();
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });



  
  //Finish item upo by negosiator
  $("#tb_itemlistupo").on("click", ".FinishItemUPO", function () {
    var id_itemupo = $(this).attr("idfinitemupo");
    var nm_itemupo = $(this).attr("nmfinupo");

    (async () => {
    const { value: email } = await Swal.fire({
      title: "<h3>Set to Finish Item UPO ini?</h3>",
      input: 'text',
      inputPlaceholder: 'Alasan di Finish oleh Negosiator',
      text: nm_itemupo,
      icon: "warning",
      confirmButtonText: "Set to Finish",
      showCancelButton: true,
    })
    
    if (email) {
      $.ajax({
        type: "POST",
        url: `${restlocupo}finish_itemupo`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          idupo: MKG_ID,
          iditemupo : id_itemupo,
          reason : email
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            Swal.fire(
              "Error",
              "Ada kendal di koneksi/database, data tidak tersimpan !",
              "error"
            );
          } else {
            Swal.fire({
              text: "Finished",
              timer: 1500,
              toast: true,
              showConfirmButton: false,
            });
            //reload tabel upo
            FuncLoadTypeBarangDemand();
          }
        },
        error: function () {
          if (LogoutProtect){
            window.location.href = "./?link=loclogout";
          } else {
            Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
          }
        },
      });
    } else {
      Swal.fire({
        text: "Alasan tidak boleh kosong!",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
    }

  })();



    // Swal.fire({
    //   title: "<h3>Set to Finish Item UPO ini?</h3>",
    //   input: 'text',
    //   inputPlaceholder: 'Alasan di Finish oleh Negosiator',
    //   text: nm_itemupo,
    //   icon: "warning",
    //   confirmButtonText: "Ya",
    //   showCancelButton: true,
    // }).then((result) => {
    //   if (result.value) {

    //     $.ajax({
    //       type: "POST",
    //       url: `${restlocupo}finish_itemupo`,
    //       headers: {
    //         user: vusrnm,
    //         token: vtoken,
    //       },
    //       data: {
    //         iditemupo : id_itemupo,
    //         reason : id_itemupo
    //       },
    //       cache: false,
    //       success: function (response) {
    //         var obj = JSON.parse(response);
    //         if (obj.status == false) {
    //           Swal.fire(
    //             "Error",
    //             "Ada kendal di koneksi/database, data tidak tersimpan !",
    //             "error"
    //           );
    //         } else {
    //           Swal.fire({
    //             text: "Deleted",
    //             timer: 1500,
    //             toast: true,
    //             showConfirmButton: false,
    //           });
    //           //reload tabel upo
    //           FuncLoadTypeBarangDemand();
    //         }
    //       },
    //       error: function () {
    //         if (LogoutProtect){
    //           window.location.href = "./?link=loclogout";
    //         } else {
    //           Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
    //         }
    //       },
    //     });
    //   }
    // });


    
  });


  // aksi load table item pss dari pss title diklik
  $("#PSSList").on("click", ".additempo", function () {
    var idpss = $(this).attr("idpss");
    var idupo = $("#idupo").val();
    $.ajax({
      type: "POST",
      url: `../RND_BackEnd/backend_upo/list_itempss`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idpss: idpss,
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (isEmpty(obj)) {
          // console.log("-Empty-");
          $("#ItemListtbody").empty();
          return false;
        } else if (obj) {
          jmlData = obj.data.length;
          // console.log(obj.data)
          $("#ItemListtbody").empty();
          for (a = 0; a < jmlData; a++) {
          $("#ItemList").find("tbody").append(
            " <tr><td><span class='insertitem' idupo2='"+idupo+"' iditem='"+obj.data[a]["id_item"]+"' idpss='"+idpss+"'>"+obj.data[a]["description_item"]+"</span>"+
            "</td><td><span class='insertitem' idupo2='"+idupo+"' iditem='"+obj.data[a]["id_item"]+"' idpss='"+idpss+"'>"+obj.data[a]["vendor_material_number"]+"</span>"+
            "</td><td><span class='insertitem' idupo2='"+idupo+"' iditem='"+obj.data[a]["id_item"]+"' idpss='"+idpss+"'>"+obj.data[a]["vendor"]+"</span></td></tr>"
            );
          }
        }
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });


  //aksi insert item upo ke tabel
  $("#ItemList").on("click", ".insertitem", function () {
    var id_item = $(this).attr("iditem");
    var id_pss  = $(this).attr("idpss");
    var id_upo  = $(this).attr("idupo2");
    $.ajax({
      type: "POST",
      url: `${restlocupo}add_itemupo`,
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        idpss   : id_pss,
        iditem  : id_item,
        idupo   : id_upo
      },
      cache: false,
      success: function (response) {
        var obj = JSON.parse(response);
        if (obj.status == false) {
          Swal.fire({
            text: obj.message,
            timer: 1500,
            icon: "warning",
            showConfirmButton: false,
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          })
          Toast.fire({
            icon: 'success',
            html: '&nbsp;&nbsp;Berhasil menambahkan item PO'
          })
        }
        FuncLoadTypeBarangDemand();
      },
      error: function () {
        if (LogoutProtect){
          window.location.href = "./?link=loclogout";
        } else {
          Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
        }
      },
    });
  });


  //reject upo oleh negosiator
  $("#RejectMKG").on("click", function (e) {
    var mkgnumber =MKG_NUMBER;
    var idmkg = MKG_ID;
    var reason = $("#rejectreason").val();
    var asid = $("#asid").val();
    Swal.fire({
      title: "<h3>Reject "+mkgnumber+" ?</h3>",
      text: reason,
      icon: "warning",
      confirmButtonText: "Reject!",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocmkg}reject_mkg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            idmkg : idmkg,
            reason: reason,
            asid: asid,
            nama: USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              window.location.href = "./?link=mkgitem&i=" + IdUrl;
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });


  //reject upo oleh negosiator
  $("#ReturnMKG").on("click", function (e) {
    var mkgnumber =MKG_NUMBER;
    var idmkg = MKG_ID;
    var reason = $("#rejectreason").val();
    var asid = $("#asid").val();
    Swal.fire({
      title: "<h3>Return "+mkgnumber+" ?</h3>",
      text: reason,
      icon: "warning",
      confirmButtonText: "Return!",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocmkg}return_mkg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            idmkg : idmkg,
            reason: reason,
            asid: asid,
            nama: USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              window.location.href = "./?link=mkgitem&i=" + IdUrl;
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });

  //Cancel UPO ( by PIC/designer ) 
  $("#cancelmkg").on("click", function (e) {
    var mkgnumber =MKG_NUMBER;
    var idmkg    = MKG_ID;

    Swal.fire({
      title: "<h3>CANCEL " + mkgnumber + "</h3>",
      text: "Are you sure ?",
      icon: "warning",
      confirmButtonText: "Yes",
      cancelButtonColor: "#8b9da4",
      cancelButtonText: "Back",
      showCancelButton: true,
      allowEnterKey: false,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocmkg}cancel_mkg`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            idmkg: idmkg,
            nama : USERNAME
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (isEmpty(obj)) {
              console.log("Gagal Cancel, data kosong");
            } else if (obj) {
              if (obj.status == false) {
                Swal.fire({
                  text: obj.message,
                  timer: 1500,
                  icon: "warning",
                  showConfirmButton: false,
                });
              } else {
                Swal.fire({
                  text: "UPO sudah berubah status menjadi CANCEL",
                  icon: "success",
                  showConfirmButton: true,
                }).then((result) => {
                  if (result.value) {
                    window.location.href = "./?link=mkgindex";
                  }
                });
              }
            } else {
              Swal.fire("Error", "Data Error ?.", "error");
            }
          },
          error: function () {
            if (LogoutProtect){
              window.location.href = "./?link=loclogout";
            } else {
              Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
            }
          },
        });
      }
    });
  });


  //Show History Sign
  $("#HistorySign").on("click", function (e) {
    $(".windowhistorysign").modal("show");
    ReadHistorySign();
  });

  //Show History ETA 1
  $("#etahistory1").on("click", function (e) {
    $(".windowhistoryeta").modal("show");
    var iditem     = $("#negoe_iditem").val();
    ReadHistoryETA(iditem);
  });

  //Show History ETA 2
  $("#etahistory2").on("click", function (e) {
    $(".windowhistoryeta").modal("show");
    var iditem     = $("#iditemupo").val();
    ReadHistoryETA(iditem);
  });

  //Reject nego
  $("#BtnRejectNego").on("click", function (e) {
    $(".rejectnego").modal("show");
    //RejectNego();
  });

  $("#RejectAfterConfirm").on("click", function (e) {
    $(".rejectnego").modal("show");
    //RejectNego();
  });

  $('#ReloadPORFP').on('click', function(e){
    ReloadNoPORFP();
  });

  $("#tb_itemlistupo").on("click", ".DetailGR", function () {

    var nogrs = $(this).attr('nogr');
 
    $(".windowdetailgr").modal('show');
    $("#nogrlist").text(nogrs);


  });

  $('#addmplant').on('change', function() {
    var p = $('#addmplant').val();
    if( p =="SKM"){
      $('#addmsloc').removeClass("mandatoryclass");
    } else {
      $('#addmsloc').addClass("mandatoryclass");
    }
  });

  // $('#newsup_jenisitem').on('change', function() {
  //   var ji = $('#newsup_jenisitem').val();
  //   console.log(ji);
  //   if(ji =="NEW SUPPLIER"){
  //     $('#newsup_target').val('2021-01-01');
  //   } else {
  //     $('#newsup_target').val('');
  //   }
  // });

  //role
  if(MKG_ROLE =="editall"){
    $("#EditHeader").show();
    $("#UploadNewDoc").show();
    $("#AddPOItem").show();
    $("#AddPOItemmanual").show();
  } else {
    $("#EditHeader").hide();
    $("#UploadNewDoc").hide();
    $("#AddPOItem").hide();
    $("#AddPOItemmanual").hide();

  }

  if(MKG_ROLE =="edithodqa"){
    $("#EditOSS").show();
  } else {
    $("#EditOSS").hide();

  }

  if(MKG_ROLE =="editdqareg"){
    $("#EditNoMKG").show();
  } else {
    $("#EditNoMKG").hide();

  }

  if(Progress =="WAIT FINISH"){
    $("#CustFeedback").show();
  } else {
    $("#CustFeedback").hide();

  }

  //aksi ketika button hide,batal,cancel diklik
  $(".CancelData").on("click", function (e) {
    $(".uploaddoc").modal("hide");
    $(".addtypebarangdemand").modal("hide");
    $(".addpoitem").modal("hide");
    $(".xwinaddoss").modal("hide");
    $(".xwinaddmkgnumber").modal("hide");
    $(".xwinrejectmkg").modal("hide");
    $(".windownegosiator").modal("hide");
    $(".negoedititem").modal("hide");
    $(".rejectnego").modal("hide");
    $(".viewdetail").modal("hide");
  });


});