const LogoutProtect = false;
var CookieName = 'FilterSWRelease';
var VUserName = getCookie("usrnm");
var VToken = getCookie("token");
var restlocswrelease = decodeURIComponent(getCookie("restlocswrelease"));

$(".ui.dropdown").dropdown();
$(".menu .item").tab();
$(document).ready(function () {
  LoadBahasa();
  LoadStatus();
  LoadSupplier();
  LoadSystem();
  LoadMCU();
  LoadSpeaker();

  $('#tabappsetting').on('click', function() { 
    window.location.href = "./?link=swappsetting";
  });

  $('#tabcreateproject').on('click', function() { 
    window.location.href = "./?link=swvideoindex";
  });

  $('#tabchangepic').on('click', function() { 
    window.location.href = "./?link=swchangepic";
  });

  $("#AddBahasa").on("click", function (e) {
    $(".WindowAddNewBahasa").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveBahasa").on("click", function (e) {
    SaveBahasa();
  });


  $("#TbSpeaker").on("click", ".DelGroupTest", function () {
    var IdSpk = $(this).attr("IdSpk");
    var NmSpk = $(this).attr("NmSpk");
    DeleteSpeaker(IdSpk,NmSpk);
  });

  $("#AddSpeaker").on("click", function (e) {
    $(".WindowAddNewSpeaker").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveSpeaker").on("click", function (e) {
    SaveSpeaker();
  });


  $("#TbBahasa").on("click", ".DelJenisTest", function () {
    var IdJns = $(this).attr("IdJns");
    var NmJns = $(this).attr("NmJns");
    DeleteBahasa(IdJns,NmJns);
  });

  $("#TbSupplier").on("click", ".DelSup", function () {
    var IdSup = $(this).attr("IdSup");
    var NmSup = $(this).attr("NmSup");
    DeleteSupplier(IdSup,NmSup);
  });

  $("#AddStatus").on("click", function (e) {
    $(".WindowAddNewStatus").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveStatus").on("click", function (e) {
    SaveStatus();
  });

  $("#TbStatus").on("click", ".DelStatus", function () {
    var IdSts = $(this).attr("IdSts");
    var NmSts = $(this).attr("NmSts");
    DeleteStatus(IdSts,NmSts);
  });

  $("#AddSystem").on("click", function (e) {
    $(".WindowAddNewSystem").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveSystem").on("click", function (e) {
    SaveSystem();
  });

  $("#AddMCU").on("click", function (e) {
    $(".WindowAddNewMcu").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveMCU").on("click", function (e) {
    SaveMCU();
  });

  $("#AddSupplier").on("click", function (e) {
    $(".WindowAddNewSupplier").modal("show");
    $(".resetvalue").val('');
  });

  $("#SaveSupplier").on("click", function (e) {
    SaveSupplier();
  });

  $("#TbSystem").on("click", ".DelSystem", function () {
    var IdSys = $(this).attr("IdSys");
    var NmSys = $(this).attr("NmSys");
    DeleteSystem(IdSys,NmSys);
  });


  $("#TbMCU").on("click", ".DeleteMCU", function () {
    var IdMcu = $(this).attr("IdMcu");
    var NmMcu = $(this).attr("NmMcu");
    DeleteMCU(IdMcu,NmMcu);
  });
  
  

  $(".CloseModal").on("click", function (e) {
    $(".UiModal").modal("hide");
  });

});




function LoadSpeaker() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadSpeaker`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdSpeaker").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
              $("#TbSpeaker").find("tbody").append(
                "<tr>"+
                  "<td>"+obj['data'][a]['suara']+"</td>"+
                  "<td><span class='DelGroupTest' IdSpk='"+obj['data'][a]['id']+"' NmSpk='"+obj['data'][a]['suara']+"'><i class='trash alternate outline circular orange link icon'></i></td>"+
                "</tr>"
              );   
            
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function SaveStatus(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveStatus`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      Sts  : $("#NamaStatus").val(),
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadStatus();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteSpeaker(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus Speaker<br>- "+Nm+" -</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteSpeaker`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdSpk : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSpeaker();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function LoadSupplier() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadSupplier`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdSupplier").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            $("#TbSupplier").find("tbody").append(
              "<tr>" +
              "<td>" + obj['data'][a]['supplier'] + "</td>" +
                "<td><span class='DelSup' IdSup='" + obj['data'][a]['id'] + "' NmSup='" + obj['data'][a]['supplier'] + "'><i class='trash alternate outline circular red link icon'></i></td>" +
              "</tr>"
            );
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function LoadBahasa() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadBahasa`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdBahasa").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            $("#TbBahasa").find("tbody").append(
              "<tr>" +
              "<td>" + obj['data'][a]['bahasa'] + "</td>" +
                "<td><span class='DelJenisTest' IdJns='" + obj['data'][a]['id'] + "' NmJns='" + obj['data'][a]['bahasa'] + "'><i class='trash alternate outline circular red link icon'></i></td>" +
              "</tr>"
            );
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function SaveSpeaker(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveSpeaker`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      NamaSpeaker  : $("#NamaSpeaker").val()
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadSpeaker();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteBahasa(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus Bahasa<br>- "+Nm+" -</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteBahasa`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdBhs : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadBahasa();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function LoadStatus() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadStatus`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdStatus").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            $("#TbStatus").find("tbody").append(
              "<tr>"+
                "<td>"+obj['data'][a]['status']+"</td>"+
                "<td><span class='DelStatus' IdSts='"+obj['data'][a]['id']+"' NmSts='"+obj['data'][a]['status']+"'><i class='trash alternate outline circular orange link icon'></i></td>"+
              "</tr>"
            );   
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function SaveMCU(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveMCU`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      NamaMCU  : $("#NamaMCU").val(),
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadMCU();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteStatus(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus Status<br>- "+Nm+" -</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteStatus`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdSts : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadStatus();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function LoadSystem() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadSystem`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdSystem").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            $("#TbSystem").find("tbody").append(
              "<tr>"+
                "<td>"+obj['data'][a]['sistem']+"</td>"+
                "<td><span class='DelSystem' IdSys='"+obj['data'][a]['id']+"' NmSys='"+obj['data'][a]['sistem']+"'><i class='trash alternate outline circular orange link icon'></i></td>"+
              "</tr>"
            );   
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function SaveBahasa(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveBahasa`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      NamaBahasa  : $("#NamaBahasa").val(),
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadBahasa();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteJenisPrd(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus Jenis Produk<br>- "+Nm+" -</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteJenisPrd`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdJns : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSystem();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function LoadMCU() {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadMCU`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdMCU").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            $("#TbMCU").find("tbody").append(
              "<tr>" +
              "<td>" + obj['data'][a]['mcu'] + "</td>" +
                "<td><span class='DeleteMCU' IdMcu='" + obj['data'][a]['id'] + "' NmMcu='" + obj['data'][a]['mcu'] + "'><i class='trash alternate outline circular red link icon'></i></td>" +
              "</tr>"
            );
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function LoadJenisTestMap(Nm) {
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}LoadJenisTestMap`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken,
    },
    data    : {
      JnsTest : Nm,
    },
    success : function (response) {
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          $("#BdMapJenisPengujian").empty();
          jmlData  = obj['data'].length;
          for (a = 0; a < jmlData; a++) {
            var Grp = obj['data'][a]['GroupUji'];
            var Col = "#000";
            var Cls = "ItemJnsTest InsertMapping";
            if(Grp){
              Col = "#d1d1d1";
              Cls = "";
            }
            $("#TbMapJenisPengujian").find("tbody").append(
              "<tr class='"+Cls+"' Nm='"+obj['data'][a]['JenisTest']+"'>"+
                "<td style='color: "+Col+"'>"+obj['data'][a]['JenisTest']+"</td>"+
              "</tr>"
            );   
          }
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function InsertMapping(Gr,Nm){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}InsertMappingTest`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      GrpUji  : Gr,
      JnsUji  : Nm,
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadMCU();
          LoadGroupTest();
          LoadBahasa();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteMCU(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus MCU </h3></n>"+Nm,
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteMCU`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdMcu : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadMCU();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function SaveSupplier(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveSupplier`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      NamaSupplier  : $("#NamaSupplier").val(),
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadSupplier();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteSupplier(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus Supplier </h3></n>"+Nm,
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteSupplier`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdSupp : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSupplier();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}

function SaveSystem(){
  $.ajax({
    type    : "POST",
    url     : `${restlocswrelease}SaveSystem`,
    cache   : false,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      NamaSystem  : $("#NamaSystem").val(),
    },
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".UiModal").modal("hide");
          LoadSystem();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function DeleteSystem(Id,Nm){
  Swal.fire({
    html: "<h3>Hapus System </h3></n>"+Nm,
    confirmButtonText: "Ya",
    showCancelButton: true,
    backdrop: `rgba(123,0,0,0.3)`,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type    : "POST",
        url     : `${restlocswrelease}DeleteSystem`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data    : {
          IdSys : Id,
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if(isEmpty(obj)) {
            IsResponseEmptyObj();
          } else if(obj) {
            if (obj.status == false){
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              LoadSystem();
            }
          } else {
            IsResponseErrorElse();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
}