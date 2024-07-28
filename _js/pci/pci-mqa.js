const LogoutProtect = false;


function TableListFunc() {

  //Get isi cookies
  var json_str = getCookie('FilterEANRequest');
  var arr = JSON.parse(json_str);
  if(json_str){
    var sfilter   = arr[0];
    var mfilter   = arr[1];
    var stfilter  = arr[2];
  } else {
    var sfilter   = "";
    var mfilter   = "ALL";
    var stfilter  = "ALL";
  }
  if (sfilter) {
    $("#fcari_ean").val(sfilter);
    var sfilterstart = sfilter;
  } else {
    var sfilterstart = "";
  }
  if (mfilter) {
    $("#fmn_ean").dropdown("set selected", mfilter);
    var mfilterstart = mfilter;
  } else {
    var mfilterstart = "ALL";
  }
  if (stfilter) {
    $("#fsts_ean").dropdown("set selected", stfilter);
    var stfilterstart = stfilter;
  } else {
    var stfilterstart = "ALL";
  }

  //Simpan Cookies
  var FiterArry = [sfilterstart, mfilterstart, stfilterstart];
  var JsonFilter = JSON.stringify(FiterArry);
  setCookie("FilterEANRequest", JsonFilter, 5);


  var DTables = $("#TableList").DataTable({
    dom:
      "<'ui stackable grid'" +
      "<'row'" +
      "<'left aligned sixteen wide column'>" +
      ">" +
      "<'row dt-table'" +
      "<'sixteen wide column'tr>" +
      ">" +
      "<'row'" +
      "<'left aligned seven wide column'B>" +
      "<'left aligned two wide column'i>" +
      "<'right aligned seven wide column'p>" +
      ">" +
      ">",
    buttons: [
      {
        text: "10",
        action: function (e, dt, node, config) {
          $("#TableList").DataTable().page.len(10).draw();
        },
      },
      {
        text: "25",
        action: function (e, dt, node, config) {
          $("#TableList").DataTable().page.len(25).draw();
        },
      },
      {
        text: "50",
        action: function (e, dt, node, config) {
          $("#TableList").DataTable().page.len(50).draw();
        },
      },
      {
        text: "100",
        action: function (e, dt, node, config) {
          $("#TableList").DataTable().page.len(100).draw();
        },
      },
      {
        text: "1000",
        action: function (e, dt, node, config) {
          $("#TableList").DataTable().page.len(1000).draw();
        },
      },
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
      searchPlaceholder: "Pencarian..",
      processing: '<i class="circle notch loading icon huge"></i>',
      info: "_START_ sampai _END_ dari _TOTAL_ total data",
      paginate: {
        "first":      "Awal",
        "last":       "Akhir",
        "next":       "Berikutnya",
        "previous":   "Sebelumnya"
      },
      infoEmpty:      "Tidak ada data",
      select: {
        rows: ""
      }
    },
    order: [[0, "desc"]],
    columns: [
      { data: null,
        render: function (data) {
          return `<span class="ItemPCI" id="${data['id']}" data-tooltip="View Detail/Edit PCI" data-inverted="" data-position="right center"><i class="pencil alternate link circular blue icon "></i></span>`;
        },
      },
      { data: 'tgl' },
      { data: 'no_pci' },
      { data: null,
        render: function (data) {
          if(data['upload']){
            return `<span class="itemmpp" id="${data['id']}" data-tooltip="Download PCI Request Sheet" data-inverted="" data-position="left center"><i class="file alternate outline  link download icon"></i></span>`;
          } else {
            return ``;
          }
        },
      },
      { data: null,
        render: function (data) {
          if(data['title']){
            return `<b>${data['title']}</b><br><i>${data['descript']}</i>`;
          } else {
            return data['descript'];
          }
        },
      },
      { data: 'peminta' },
      { data: 'bagian' },
      { data: null,
        render: function (data) {
          if(data['mqa_note']){
            return `${data['note']}<br><br><i>MQA:${data['mqa_note']}</i>`;
          } else {
            return `${data['note']}`;
          }
        },
      },
      { data: 'status' },
      { data: null,
        render: function (data) {
          return `<span class="itemmpp" id="${data['id']}" data-tooltip="View timeline PCI" data-inverted="" data-position="left center"><i class="map outline link circular blue icon "></i></span>`;
        },
      },
    ],
    columnDefs: [
      { className: "right aligned", targets: [1] },
      { className: "center aligned", targets: [0,2,3] },
      { className: "collapsing", targets: [8] },
      { orderable: false, targets: [8] },
      {
        targets: [1],
        render: function (data, type, row) {
          var dateObj = new Date(data);
          var momentObj = moment(dateObj);
          var regdate = moment(dateObj, "YYYY-MM-DD");
          var tglcurrent = moment().startOf('day');
        if(regdate.diff(tglcurrent, 'days') < 0){
            return momentObj.format('ddd, DD MMM YY');
          } else {
            return moment(dateObj).fromNow();
          }
        }
      },
      ],

   createdRow: function (row, data, index) {

      //WARNA PROCCESS
      if (data["status"] == "MQA" || data["status"] == "PROGRESS" || data["status"] == "") {
        $(row).find("td").css("color", ColorOwner);
      }

      //WARNA FINISH
      if (data["status"] == "FINISH") {
        $(row).find("td").css("color", ColorFinish);
      }
      if (data["status"] == "DONE") {
        $(row).find("td").css("color", ColorFinish);
      }

      //WARNA CANCEL
      if (data["status"] == "CANCEL" || data["status"] == "PCI RETURN" || data["status"] == "PCI REJECT") {
        $(row).find("td").css("color", ColorCancel);
      }

      $(row).find("td:eq(4)").css("border-left", "none");
      $(row).find("td").css("vertical-align", "top");
      
    },

    ajax: {
      url: `${RestLocPCI}LoadTablePCI`,
      type: "POST",
      headers: {
        user: VUserName,
        token: VToken,
      },
      data: {
        FSearch : sfilterstart,
        FNama   : mfilterstart,
        FStatus : stfilterstart,
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

$("#SaveAddPCI").on("click", function () {
  $.ajax({
    type    : "POST",
    url     : `${RestLocPCI}SaveAddNewPCI`,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      Title   : $("#PCITitle").val().toUpperCase(),
      Descr   : $("#PCIDescript").val().toUpperCase(),
      ReqBy   : $("#PCIReqby").val().toUpperCase(),
      PCIHO   : $("#PCIHO").val().toUpperCase(),
      Sectn   : $("#PCISection").val().toUpperCase(),
      Email   : $("#PCICCEmail").val(),
      Notee   : $("#PCINote").val().toUpperCase(),
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".WindowAddNewPCI").modal("hide");
          TableListFunc();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
});

$("#SaveEditPCI").on("click", function () {
  $.ajax({
    type    : "POST",
    url     : `${RestLocPCI}SaveEditPCI`,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      IdPCI   : $("#EditPCIId").val(),
      Title   : $("#EditPCITitle").val().toUpperCase(),
      Descr   : $("#EditPCIDescript").val().toUpperCase(),
      ReqBy   : $("#EditPCIReqby").val().toUpperCase(),
      PCIHO   : $("#EditPCIHO").val().toUpperCase(),
      Sectn   : $("#EditPCISection").val().toUpperCase(),
      Email   : $("#EditPCICCEmail").val(),
      Notee   : $("#EditPCINote").val().toUpperCase(),
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".WindowEditPCI").modal("hide");
          TableListFunc();
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
});

//Upload File Attachment PCI
$('#BtnUploadFile').on('click', function() {
  var IdPCI     = $('#InfoId').val();
  var FileData  = $("#InputUploadFilePCI").prop("files")[0];
  var form_data  = new FormData();
  form_data.append("file", FileData);
  form_data.append("IdPCI", IdPCI);
  $.ajax({
    type    : "POST",
    dataType: "text",
    contentType: false,
    processData: false,
    url     : `${RestLocPCI}UploadFilePCI`,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data    : form_data,
    cache   : false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        console.log('Gagal Simpan mas brooo, data kosong');
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          IsResponseTrue(obj.message);
          $(".WindowUploadPCI").modal("hide");
          TableListFunc();
          $(".WindowEditPCI").modal({ autofocus: false }).modal("show");
          LoadItemPCI(IdPCI);
        }
      } else {
        IsResponseErrorElse();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
});

$("#SendPCI").on("click", function () {
  Swal.fire({
    title: "<h3>Kirim permintaan PCI ini ke MQA ?</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url     : `${RestLocPCI}SendPCI`,
        headers : {
          user  : VUserName,
          token : VToken
        },
        data: {
          IdPCI   : $("#EditPCIId").val()
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            $(".WindowEditPCI").modal("hide");
            TableListFunc();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
});

function LoadDataHRIS() {
  $('.ui.search.dropdown.namaho').dropdown({
    apiSettings: {
      url: '2_pci/_autocompletenamaho.php?q={query}'
    },
    fields: {
      remoteValues : 'results',
      name         : 'name',
      value        : 'name'
    },
    filterRemoteData : false,
    saveRemoteData : false,
    "clearable": true
  });

  $('.ui.search.dropdown.nama').dropdown({
    apiSettings: {
      url: '2_pci/_autocompletenama.php?q={query}'
    },
    fields: {
      remoteValues : 'results',
      name         : 'name',
      value        : 'name'
    },
    filterRemoteData : false,
    saveRemoteData : false,
    "clearable": true
  });

  $.ajax({
    type: "GET",
    url: "2_pci/_artemis.php",
    cache: false,
    success: function (response) {
      setCookie('atoken', response, 1 / 24);
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function LoadItemPCI(id) {
  $.ajax({
    type    : "POST",
    url     : `${RestLocPCI}LoadItemPCI`,
    headers : {
      user  : VUserName,
      token : VToken
    },
    data: {
      Id   : id,
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if(obj) {
        if (obj.status == false){
          IsResponseFalse(obj.message);
        } else {
          var SelOption = "";
          var CCEmail = obj.data[0]['pci_ccemail'].split("; ");
          if(obj.data[0]['upload']){
            var FileUpload = obj.data[0]['upload'];
          } else {
            var FileUpload = "<i>Belum Upload file attachmant PCI.</i>";
          }
          LoadDataHRIS();
          $("#EditPCIReqby").dropdown("clear");
          $("#EditPCIHO").dropdown("clear");
          $("#EditPCICCEmail").dropdown("clear");
          $("#EditPCIReqby").dropdown("refresh");
          $('#EditPCIReqby').append( '<option selected value="'+obj.data[0]['peminta']+'">'+obj.data[0]['peminta']+'</option>' );
          $('#EditPCIHO').append( '<option selected value="'+obj.data[0]['pci_headof']+'">'+obj.data[0]['pci_headof']+'</option>' );
          $.each(CCEmail,function(i){
            SelOption += '<option selected value="'+CCEmail[i]+'">'+CCEmail[i]+'</option>'; 
          });
          $('#EditPCICCEmail').append(SelOption);
          $("#EditPCINo").val(obj.data[0]['no_pci']);
          $("#EditPCITitle").val(obj.data[0]['title']);
          $("#EditPCIId").val(obj.data[0]['id']);
          $("#EditPCIDescript").val(obj.data[0]['descript']);
          $("#EditPCINote").val(obj.data[0]['note']);
          $("#EditPICUploadedFile").html(FileUpload);
          console.log(obj.data[0]['status']);
          
          if(obj.data[0]['status'] === 'DRAFT'){

            $("#FeatSave").html('<div id="SaveEditPCI" class="ui blue small compact button" data-tooltip="Simpan perubahan" data-position="top left" data-inverted="">Save Data</div>');
            $("#FeatUpload").html('<div id="UploadFilePCI" class="ui blue small compact button" data-tooltip="Upload File PCI" data-position="top left" data-inverted="">Upload File Attachment</div>');
            $("#FeatSend").html('<div id="SendPCI" class="ui blue small compact button" data-tooltip="Kirim permintaan PCI ke MQA" data-position="top left" data-inverted="">Send PCI Request</div>');
            $("#FeatCancel").html(' <div id="CancelPCI" class="ui red small compact button right aligned" data-tooltip="Batalkan Permintaan PCI" data-position="top left" data-inverted="">Cancel PCI</div>');

          } else {

            $("#FeatSave").html('<div class="ui disabled small compact button">Save Data</div>');
            $("#FeatUpload").html('<div class="ui disabled small compact button">Upload File Attachment</div>');
            $("#FeatSend").html('<div class="ui disabled small compact button">Send PCI Request</div>');
            $("#FeatCancel").html('<div class="ui disabled small compact button">Cancel PCI</div>');

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


$(document).ready(function () {

  TableListFunc();
  
  $('#AddNewPCI').click(function(){
    $(".WindowAddNewPCI").modal({ autofocus: false }).modal("show");
    LoadDataHRIS();
  });

  $("#TableList").on("click", ".ItemPCI", function () {
    var id = $(this).attr("id");
    $(".WindowEditPCI").modal({ autofocus: false }).modal("show");
    LoadItemPCI(id);
  });

  $("#UploadFilePCI").on("click", function () {
    var id = $("#EditPCIId").val();
    var ti = $("#EditPCITitle").val();
    var de = $("#EditPCIDescript").val();
    $(".WindowUploadPCI").modal({ autofocus: false }).modal("show");
    $("#InfoId").val(id);
    $("#InfoTitle").val(ti);
    $("#InfoDescription").val(de);
  });

  //Hidden modal windows ketika tombol cancel/close di modal window manapun di klik
  $('.CloseModal').click(function(){
    $(".WindowAddNewPCI").modal("hide");
    $(".WindowEditPCI").modal("hide");
    $(".WindowUploadPCI").modal("hide");
  });

  //Fungsi untuk dropdown bisa fullsearch text dimanapun posisi nya, bisa awal tengah atau akhir.
  $('.ui.dropdown.fullsearch').dropdown( {fullTextSearch:'exact', sortSelect: true, match:'text'} );

  //RESPON KETIKA INPUT PENCARIAN DI KETIK
  $("#fcari_ean").on("keyup", function () {
    var FilterCari = $("#fcari_ean").val();
    var FilterNama = $("#fmn_ean").val();
    var FilterStatus = $("#fsts_ean").val();
    var FiterArry = [FilterCari, FilterNama, FilterStatus];
    var JsonFilter = JSON.stringify(FiterArry);
    setCookie("FilterEANRequest", JsonFilter, 5);
    $("#TableList").DataTable().destroy();
    TableListFunc();
    $("#TableList").DataTable().page(0).draw();
  });

  $("#fcari_ean2").on("keyup", function () {
    var FilterCari2 = $("#fcari_ean2").val();
    var FilterStatus2 = $("#fsts_ean2").val();
    var FiterArry2 = [FilterCari2, FilterStatus2];
    var JsonFilter2 = JSON.stringify(FiterArry2);
    setCookie("FilterOSEANRequest", JsonFilter2, 5);
    $("#OS_TableList").DataTable().destroy();
    OSTableListFunc();
    $("#OS_TableList").DataTable().page(0).draw();
  });

  //RESPON KETIKA FILTER STATUS DI RUBAH
  $("#fmn_ean, #fsts_ean").on(
    "change",
    function () {
      var FilterCari = $("#fcari_ean").val();
      var FilterNama = $("#fmn_ean").val();
      var FilterStatus = $("#fsts_ean").val();
      var FiterArry = [FilterCari, FilterNama, FilterStatus];
      var JsonFilter = JSON.stringify(FiterArry);
      setCookie("FilterEANRequest", JsonFilter, 5);
      TableListFunc();
      $("#TableList").DataTable().page(0).draw();
    }
  );

  $("#fsts_ean2").on(
    "change",
    function () {
      var FilterCari2 = $("#fcari_ean2").val();
      var FilterStatus2 = $("#fsts_ean2").val();
      var FiterArry2 = [FilterCari2, FilterStatus2];
      var JsonFilter2 = JSON.stringify(FiterArry2);
      setCookie("FilterOSEANRequest", JsonFilter2, 5);
      // OSTableListFunc();
      $("#OS_TableList").DataTable().page(0).draw();
    }
  );

  //RESET FILTER
  $(".resetfilter").on("click", function () {
    var d = new Date();
    var yearnow = d.getFullYear();
    $("#fcari_ean").val("");
    $("#fcari_ean2").val("");
    $("#fmn_ean").dropdown("set selected", "ALL");
    $("#fsts_ean").dropdown("set selected", "ALL");
    $("#fsts_ean2").dropdown("set selected", "ALL");
    var FiterArry = ["", "ALL", "ALL"];
    var JsonFilter = JSON.stringify(FiterArry);
    var FiterArry2 = ["", "ALL"];
    var JsonFilter2 = JSON.stringify(FiterArry2);
    setCookie("FilterEANRequest", JsonFilter, 5);
    setCookie("FilterOSEANRequest", JsonFilter2, 5);
    $("#TableList").DataTable().destroy();
    $("#OS_TableList").DataTable().destroy();
    TableListFunc();
    // OSTableListFunc();
    $("#TableList").DataTable().page(0).draw();
    $("#OS_TableList").DataTable().page(0).draw();
  });


});