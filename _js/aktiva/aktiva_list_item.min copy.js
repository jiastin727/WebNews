

const NonceValue = "rdsystem2020";
const LogoutProtect = false;

const ColorSignNo  = "#00139f";
const ColorOwner  = "#00139f";
const BgColorOwner  = "#eff0ff";
const ColorRelease= "#505050";
const ColorCancel = "#be0000";
const ColorLock = "#860954";
const BgColorLock = "#f3ebeb";

var restlocactiva = decodeURIComponent(getCookie("restlocactiva"));
var vusrnm = getCookie("usrnm");
var vtoken = getCookie("token");
let Ucrypt = new Encryption();
var Udecrypt = Ucrypt.decrypt(EncU, NonceValue);
var Jdecrypt = Ucrypt.decrypt(EncJ, NonceValue);


function TableListFunc(FilterCariItem,FilterPICItem, FilterJenisItem) {
    var DTables = $("#tableListItem").DataTable({
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
            $("#tableListItem").DataTable().page.len(10).draw();
          },
        },
        {
          text: "25",
          action: function (e, dt, node, config) {
            $("#tableListItem").DataTable().page.len(25).draw();
          },
        },
        {
          text: "50",
          action: function (e, dt, node, config) {
            $("#tableListItem").DataTable().page.len(50).draw();
          },
        },
        {
          text: "100",
          action: function (e, dt, node, config) {
            $("#tableListItem").DataTable().page.len(100).draw();
          },
        },
        {
          text: "1000",
          action: function (e, dt, node, config) {
            $("#tableListItem").DataTable().page.len(1000).draw();
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
        {
          data: null,
          render: function (data) {
            return `<span class="signItemAdd" eid = "${data['nmr_aktiva']}">${data['nmr_aktiva']}</span>`;
          },
        },
        { data: 'material_number' },
        { data: 'description' },
        { data: 'peminta' },
        { data: 'status' },
        { data: 'progress' },
        // { data: 'qty' },
        // { data: 'currency' },
        // { data: 'harga' },
        // { data: 'asset' },
        // { data: 'peminta' },
        
      ],
      columnDefs: [
        { className: "center aligned", targets: [2] },
        { className: "collapsing", targets: [3,7,8] },
        { targets: [0,8], orderable: false },
        ],
  
     createdRow: function (row, data, index) {
  
        //WARNA OWNER & STATUS ACTIVE/DRAFT
        if (data["peminta"] == Udecrypt) {
          $(row).find("td").css("color", ColorOwner);
        }
  
      },
  
      ajax: {
        url: `${restlocactiva}getListItemsss`,
        type: "POST",
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          FSearch: FilterCariItem,
          FNama: FilterPICItem,
          FJenis: FilterJenisItem,
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


  $(document).ready(function () {

    $('#btnCancelAdd').click(function () {
        window.location.href = "./?link=aktiva";
    });

    $('#btnUpdateItem').click(function () {
        window.location.href = "./?link=aktivaListItem";
    });

    $('#btnEditHeaderAdd').click(function () {
        window.location.href = "./?link=aktivaEditItem";
    });

    $('#btnUploadAddPDF').click(function () {
        $('.xwinuploadaddpdf').modal('show');
    });

    $('.btnSign').click(function () {
        $('.xwinaddheadof').modal('show');
    });

    $('.CancelData').click(function () {
        $(".ui.modal").modal("hide");
    });

        //Read Filter Cookies
        var d = new Date();
        var yearnow = d.getFullYear();
    
        var json_str = getCookie('FilterItemActiva');
        var arr = JSON.parse(json_str);
        if(json_str){
            var sfilter = arr[0];
            var pfilter = arr[1];
            var jfilter = arr[2];
        } else {
            var sfilter = "";
            var pfilter = "ALL";
            var jfilter = "ALL";
        }
    
        if (sfilter) {
            $("#fcariitem").val(sfilter);
            var sfilterstart = sfilter;
        } else {
            var sfilterstart = "";
        }
        if (pfilter) {
            $("#filterPICItem").dropdown("set selected", pfilter);
            var pfilterstart = pfilter;
        } else {
            var pfilterstart = "ALL";
        }
        if (jfilter) {
            $("#filterJenisItem").dropdown("set selected", jfilter);
            var jfilterstart = jfilter;
        } else {
            var jfilterstart = "ALL";
        }
    
        var FiterArry = [sfilterstart, pfilterstart, jfilterstart];
        var JsonFilter = JSON.stringify(FiterArry);
        setCookie("FilterItemActiva", JsonFilter, 5);
    
        TableListFunc(sfilterstart, pfilterstart, jfilterstart);

    
    //RESPON KETIKA INPUT PENCARIAN DI KETIK
    $("#fcariitem").on("keyup", function () {
        var FilterCariItem = $("#fcariitem").val();
        var FilterPICItem = $("#filterPICItem").val();
        var FilterJenisItem = $("#filterJenisItem").val();
        var FiterArry = [FilterCariItem,FilterPICItem, FilterJenisItem];
        var JsonFilter = JSON.stringify(FiterArry);
        setCookie("FilterItemActiva", JsonFilter, 5);
        $("#tableListItem").DataTable().destroy();
        TableListFunc(FilterCariItem,FilterPICItem, FilterJenisItem);
        $("#tableListItem").DataTable().page(0).draw();
        
    });

    //RESPON KETIKA FILTER TAHUN DI RUBAH
    $("#filterPICItem, #filterJenisItem").on(
        "change",
        function () {
        var FilterCariItem = $("#fcariitem").val();
        var FilterPICItem = $("#filterPICItem").val();
        var FilterJenisItem = $("#filterJenisItem").val();
        var FiterArry = [FilterCariItem,FilterPICItem, FilterJenisItem];
        var JsonFilter = JSON.stringify(FiterArry);
        setCookie("FilterItemActiva", JsonFilter, 5);
        TableListFunc(FilterCariItem,FilterPICItem, FilterJenisItem);
        // var table = $("#PSSList").DataTable();
        // var inff = table.page.info();
        // console.log(inff);
        $("#tableListItem").DataTable().page(0).draw();

        }
    );

    // //RESET FILTER
    $(".resetfilter").on("click", function () {
        var d = new Date();
        var yearnow = d.getFullYear();
        $("#fcariitem").val("");
        $("#filterPICItem").dropdown("set selected", "ALL");
        $("#filterJenisItem").dropdown("set selected", "ALL");
        var FiterArry = ["", "ALL", "ALL"];
        var JsonFilter = JSON.stringify(FiterArry);
        setCookie("FilterItemActiva", JsonFilter, 5);
        $("#tableListItem").DataTable().destroy();
        TableListFunc("", "ALL", "ALL");
        $("#tableListItem").DataTable().page(0).draw();

    });

    $("#tableListItem").on("click", ".signItemAdd", function () {
        var eid = $(this).attr("eid");
        window.location.href = "./?link=aktivaSignAdd&n=" + eid;
    });

    $('[data-toggle="datepicker"]').datepicker({
        format: 'yyyy-mm-dd',
        autoHide: true,
        weekStart: 1
    });

    $('.ui.search.nama')
        .search({
            apiSettings: {
                url: '3_aktiva/_autocompletenama.php?q={query}'
            },
            fields: {
                results: 'data',
                title: 'name',
                description: 'nik'
            },
            minCharacters: 1
        });

    $.ajax({
        type: "GET",
        url: "3_aktiva/_artemis.php",
        cache: false,
        success: function (response) {
            setCookie('atoken', response, 1 / 24);
        },
        error: function () {
            if (fungsilogout) {

                window.location.href = "./_logout.php";
            } else {
                console.log("error session")
            }
        }
    });

    $('.ui.dropdown').dropdown();

});