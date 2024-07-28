

$(function () {
    
    $("#signApprovalMutasi").click(function () {
        window.location.href = "./?link=aktivaSignApprovalMutasi";
    });

    $("#btnEditHeaderMutasi").click(function () {
        window.location.href = "./?link=aktivaCreateMutasi";
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

    $('#btnCreateMutasi').click(function () {
        window.location.href = "./?link=aktivaCreateMutasi";
    });

    $("#tableMutasi").DataTable({
        // bInfo: false,
        dom: "<'ui stackable grid'" +
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
        buttons: [{
                text: "10",
                action: function (e, dt, node, config) {
                    $("#tableMutasi").DataTable().page.len(10).draw();
                },
            },
            {
                text: "25",
                action: function (e, dt, node, config) {
                    $("#tableMutasi").DataTable().page.len(25).draw();
                },
            },
            {
                text: "50",
                action: function (e, dt, node, config) {
                    $("#tableMutasi").DataTable().page.len(50).draw();
                },
            },
            {
                text: "100",
                action: function (e, dt, node, config) {
                    $("#tableMutasi").DataTable().page.len(100).draw();
                },
            },
            {
                text: "1000",
                action: function (e, dt, node, config) {
                    $("#tableMutasi").DataTable().page.len(1000).draw();
                },
            },
        ],
        searching: false,
        pageLength: 10,
        ajax: {
            type: "POST",
            url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/getMutasi',
            dataSrc: ''
        },
        rowId: 'id',
        columns: [{
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="" eid = "${data['nmr_aktiva']}">${data['material_number']}</span>`;
                }
            },
            {
                'data': 'description'
            },
            {
                'data': 'merk'
            },
            {
                'data': 'vendor_material_number'
            },
            {
                'data': 'no_seri'
            },
            {
                'data': 'vendor'
            },
            {
                'data': 'pic_baru'
            },
            {
                'data': 'detail_status'
            },
            {
                'data': 'detail_progress'
            },
        ]
    });

    $("#tableMutasi").on("click", ".btnDownloadPDf", function () {
        // window.location.href = "./?link=signAdd";
        alert("PDF DOWNLOAD");
    });

    $("#tableApprovalMutasi").DataTable({
        // bInfo: false,
        dom: "<'ui stackable grid'" +
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
        buttons: [{
                text: "10",
                action: function (e, dt, node, config) {
                    $("#tableApprovalMutasi").DataTable().page.len(10).draw();
                },
            },
            {
                text: "25",
                action: function (e, dt, node, config) {
                    $("#tableApprovalMutasi").DataTable().page.len(25).draw();
                },
            },
            {
                text: "50",
                action: function (e, dt, node, config) {
                    $("#tableApprovalMutasi").DataTable().page.len(50).draw();
                },
            },
            {
                text: "100",
                action: function (e, dt, node, config) {
                    $("#tableApprovalMutasi").DataTable().page.len(100).draw();
                },
            },
            {
                text: "1000",
                action: function (e, dt, node, config) {
                    $("#tableApprovalMutasi").DataTable().page.len(1000).draw();
                },
            },
        ],
        searching: false,
        pageLength: 10,
        ajax: {
            type: "POST",
            url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/getApprovalMutasi',
            dataSrc: ''
        },
        rowId: 'id',
        columns: [{
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="btnDownloadPDf"><i class="file pdf iconcolordelete icon"></i></span>`;
                }
            },
            {
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="signItemMutasi" eid = "${data['no_mutasi']}">${data['no_mutasi']}</span>`;
                }
            },
            {
                'data': 'nmr_aktiva'
            },
            {
                'data': 'descItem'
            },
            {
                'data': 'peminta'
            },
            {
                'data': 'pic_baru'
            },
            {
                'data': 'notes'
            },
            {
                'data': 'detail_status'
            },
            {
                'data': 'detail_progress'
            },
        ]
    });

    $("#tableApprovalMutasi").on("click", ".signItemMutasi", function () {
        var eid = $(this).attr("eid");
        window.location.href = "./?link=aktivaSignApprovalMutasi&n=" + eid;
    });

    $('[data-toggle="datepicker"]').datepicker({
        format: 'yyyy-mm-dd',
        autoHide: true,
        weekStart: 1
    });

    var typeM = 'm'

    $('.nmrAktivaMutasi')
        .search({
            apiSettings: {
                url: '3_aktiva/_autocompletenoaktiva.php?q={query}&ty=' + typeM
            },
            fields: {
                results: 'data',
                title: 'nomor_aktiva',
            },
            minCharacters: 1
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
        // error: function () {
        //     if (fungsilogout) {

        //         window.location.href = "./_logout.php";
        //     } else {
        //         console.log("error session")
        //     }
        // }
    });

    $('#inputNoAktivaMutasi').keyup(function (event) {
        if (event.keyCode == 13) {
            loadDataMutasi();
        }
    });

  
    // $('#createTempMutasi').on("click", function () {
    //     var noAktiva = $("#inputNoAktivaMutasi").val();
    //     var materialNumber = $("#inputMaterialNumberMutasi").val();
    //     var description = $("#inputDescriptionMutasi").val();
    //     var merk = $("#inputMerkMutasi").val();
    //     var vMaterialNumber = $("#inputVendorMNMutasi").val();
    //     var picBaru = $("#inputPICMutasi").val();
    //     var notes = $("#inputNotesMutasi").val();
    //     console.log("TEST");
    //     // if(noAktiva !== ""){
    //     //     $("#tbTempMutasi").find("tbody").append(
    //     //         "<tr><td><span class=''><i class='trash alternate iconcolordelete icon'></i></span></td><td>"+noAktiva+"</td><td>"+materialNumber+"</td><td>"+description+"</td><td>"+merk+"</td><td>"+vMaterialNumber+"</td><td>"+picBaru+"</td></tr>"
    //     //     );
    //     // }
    //     // else{
    //     //     alert("Empty Manadatory Field");
    //     // }
    //     // window.location.href = "./?link=aktiva";
    // });

    $('#btnInsertMutasi').click(function () {
        console.log($('#inputMaterialNumberMutasi').val());
        console.log($('#inputPICMutasi').val());
        window.location.href = "./?link=aktivaMutasiItem";
    });

    function loadDataMutasi() {
        var noAktiva = $("#inputNoAktivaMutasi").val();
        if (noAktiva) {
            $.ajax({
                type: "POST",
                url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/getItemByNoAktiva',
                data: {
                    nmrAktiva: noAktiva,
                },
                cache: false,
                success: function (response) {
                    var obj = JSON.parse(response);
                    $('#inputMaterialNumberMutasi').val(obj[0]['material_number']);
                    $('#inputDescriptionMutasi').val(obj[0]['description']);
                    $('#inputMerkMutasi').val(obj[0]['merk']);
                    $('#inputVendorMNMutasi').val(obj[0]['vendor_material_number']);
                    $('#inputNoSeriMutasi').val(obj[0]['no_seri']);
                }
            });
        }
    };

    $('.ui.dropdown').dropdown();

});