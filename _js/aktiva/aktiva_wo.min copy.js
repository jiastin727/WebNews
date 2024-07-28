$(function () {

    $("#btnEditHeaderWO").click(function () {
        window.location.href = "./?link=aktivaCreateWriteoff";
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

    $('#btnCreateWriteoff').click(function () {
        // $("#createWriteoffModel").modal('show');
        window.location.href = "./?link=aktivaCreateWriteoff";
    });

    $('#createTempWO').on('click', function () {
        var noAktiva = $("#inputNoAktivaWO").val();
        var materialNumber = $("#inputMaterialNumberWO").val();
        var description = $("#inputDescriptionWO").val();
        var merk = $("#inputMerkWO").val();
        var vMaterialNumber = $("#inputVendorMNWO").val();
        var currPIC = $("#inputCurrPIC").val();
        var statusWO = $("#statusWO").val();
        var note = $("#inputNotesWriteoff").val();
        console.log(statusWO);
        if (noAktiva && currPIC) {
            $.ajax({
                type: 'POST',
                data:{
                    nmrAktiva : noAktiva,
                    currPIC : currPIC,
                    newPIC : null,
                    note : note,
                    statusWO : statusWO
                },
                url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/insertTempWO',
                success: function(data){
                    $("#tbTempWriteoff").find("tbody").append(
                        "<tr><td><span class='btnDeleteRow' onclick='deleteRow(this)'><i class='trash alternate iconcolordelete icon'></i></span></td><td>" + noAktiva + "</td><td>" + materialNumber + "</td><td>" + description + "</td><td>" + merk + "</td><td>" + vMaterialNumber + "</td><td>" + statusWO + "</td></tr>"
                    );
                }
            });
            
        } else {
            Swal.fire("Error", "Mandatory Field Empty", "error");
        }
    });
    
    $("#tableWriteoff").DataTable({
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
                    $("#tableWriteoff").DataTable().page.len(10).draw();
                },
            },
            {
                text: "25",
                action: function (e, dt, node, config) {
                    $("#tableWriteoff").DataTable().page.len(25).draw();
                },
            },
            {
                text: "50",
                action: function (e, dt, node, config) {
                    $("#tableWriteoff").DataTable().page.len(50).draw();
                },
            },
            {
                text: "100",
                action: function (e, dt, node, config) {
                    $("#tableWriteoff").DataTable().page.len(100).draw();
                },
            },
            {
                text: "1000",
                action: function (e, dt, node, config) {
                    $("#tableWriteoff").DataTable().page.len(1000).draw();
                },
            },
        ],
        searching: false,
        pageLength: 10,
        ajax: {
            type: "POST",
            url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/getWriteoff',
            dataSrc: ''
        },
        rowId: 'id',
        autoWidth: true,
        columnDefs: [{
            targets: 1,
            render: function (data, type, row) {
                if (type === 'display') {
                    return renderedData = $.fn.dataTable.render.ellipsis(40)(data, type, row);
                }
                return data;
            }
        }],
        columns: [
            {
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="signItemWriteoff" eid = "${data['nmr_aktiva']}">${data['material_number']}</span>`;
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
                'data': 'peminta'
            },
            {
                'data': 'detail_status'
            },
            {
                'data': 'detail_progress'
            },
        ]
    });

    $("#tableApprovalWO").on("click", ".btnDownloadPDf", function () {
        // window.location.href = "./?link=signAdd";
        alert("PDF DOWNLOAD");
    });

    $("#tableApprovalWO").DataTable({
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
                    $("#tableApprovalWO").DataTable().page.len(10).draw();
                },
            },
            {
                text: "25",
                action: function (e, dt, node, config) {
                    $("#tableApprovalWO").DataTable().page.len(25).draw();
                },
            },
            {
                text: "50",
                action: function (e, dt, node, config) {
                    $("#tableApprovalWO").DataTable().page.len(50).draw();
                },
            },
            {
                text: "100",
                action: function (e, dt, node, config) {
                    $("#tableApprovalWO").DataTable().page.len(100).draw();
                },
            },
            {
                text: "1000",
                action: function (e, dt, node, config) {
                    $("#tableApprovalWO").DataTable().page.len(1000).draw();
                },
            },
        ],
        searching: false,
        pageLength: 10,
        ajax: {
            type: "POST",
            url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/getApprovalWriteOff',
            dataSrc: ''
        },
        rowId: 'id',
        autoWidth: true,
        columnDefs: [{
            targets: 3,
            render: function (data, type, row) {
                if (type === 'display') {
                    return renderedData = $.fn.dataTable.render.ellipsis(40)(data, type, row);
                }
                return data;
            }
        }],
        columns: [{
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="btnDownloadPDf"><i class="file pdf iconcolordelete icon"></i></span>`;
                }
            },
            {
                'data': null,
                'render': function (data, type, row, meta) {
                    return `<span class="signItemWO" eid = "${data['no_writeoff']}">${data['no_writeoff']}</span>`;
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

    $("#tableApprovalWO").on("click", ".signItemWO", function () {
        var eid = $(this).attr("eid");
        window.location.href = "./?link=aktivaSignApprovalWriteoff&n=" + eid;
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

    $('#btnInsertWriteoff').click(function () {
        $.ajax({
            type: "POST",
            url: 'http://10.8.15.42/RND_BackEnd/backend_aktiva/insertWriteoff',
            success: function(response){
                window.location.href = "./?link=aktivaWOItem";
                console.log("Success");
            }
        });
    });

    var typeWO = 'wo';

    $('.nmrAktivaWO')
        .search({
            apiSettings: {
                url: '3_aktiva/_autocompletenoaktiva.php?q={query}&ty=' + typeWO
            },
            fields: {
                results: 'data',
                title: 'nomor_aktiva',
            },
            minCharacters: 1
        });

    $('#inputNoAktivaWO').keyup(function (event) {
        if (event.keyCode == 13) {
            loadDataWO();
        }
    });

    function loadDataWO() {
        var noAktiva = $("#inputNoAktivaWO").val();
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
                    console.log(obj[0]['material_number']);
                    $('#inputMaterialNumberWO').val(obj[0]['material_number']);
                    $('#inputDescriptionWO').val(obj[0]['description']);
                    $('#inputMerkWO').val(obj[0]['merk']);
                    $('#inputVendorMNWO').val(obj[0]['vendor_material_number']);
                    $('#inputNoSeriWO').val(obj[0]['no_seri']);
                }
            });
        }
    };

    $('.ui.dropdown').dropdown();

});