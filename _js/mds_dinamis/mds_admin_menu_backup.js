const fungsilogout = false;
$('.ui.dropdown').dropdown({
    forceSelection:false
});
$(".menu .item").tab();

const NonceValue = "rdsystem2020";
var vusrnm = getCookie("usrnm");
var vtoken = getCookie("token");
var restlocmds = decodeURIComponent(getCookie("restlocmdsdinamis"));
let table_setting_this="";


// >>> FUNGSI MENJALANKAN FUNGSI KETIKA HALAMAN LOAD (READY)
$( document ).ready(function() {

    view_list_tab("");
});

// >>> FUNGSI KLIK DROPDOWN

// DROPDOWN PILIH NAMA TAB YANG INGIN DISETTING
    $("#drop_namatab").on("change", function(){
        
        let id_namatab=$("#drop_namatab").dropdown("get value");
        let text_namatab=$("#drop_namatab").dropdown("get text");
        // remove semua setting yang ada sebelumnya
        $("#tb_pilih_tab").find(".class_setting").each(function(){
            $(this).remove();
        });
        

        if(id_namatab!==null||id_namatab!==""||id_namatab!=="none"){
            // JIKA YANG DIPILIH ADALAH TAB VALID --> CEK ULANG DI DB
            $("#stored_id_tab").val(id_namatab);
            $("#stored_nama_tab").val(text_namatab);
            
            cek_ada_tab(id_namatab,text_namatab);

        }
        
        
    });


    // dropdown pilih revisi berdasarkan data upload atau dari kolom tertentu

    $("#tb_pilih_tab").on("change",".drop_revisi_base", function(){
        
        let val_base=$(".drop_revisi_base").dropdown("get value");
        // let text_namatab=$("#drop_namatab").dropdown("get text");

        if(val_base=="FILE"){
            // JIKA BASE ON FILE
            $("#tb_pilih_tab").find("tr#tr_input_revisi_base").remove();
        }else{
            // JAIKA BASE ON SUATU KOLOM

             let html_baris_base=`

                <tr id="tr_input_revisi_base" class="class_setting setting_revisi_base">
                    <td>
                    kolom dasar revisi
                    </td>
                    <td>
                        <div class="ui input fluid small mandatoryclass">
                        <input type="text" id="kolom_base_revisi_in" class="mandatoryclass"  placeholder="NAMA KOLOM">
                        </div>
                    </td>
                    
                </tr>
                
            `;


            $("#tb_pilih_tab").find("tbody").append(html_baris_base);

            


        }
        
        console.log(val_base);
        
        
    });

// END OF FUNGSI KLIK DROPDOWN
// ###########################



// >>> FUNGSI KLIK TOMBOL

    // tombol tab
    $("#mds_set_submenu").on("click", function(){

        window.location.href = "./?link=mdsd_direct&linkmds=mds_set_submenu";
    })

    // tombol menambah baris setting kolom
    $(document).on('click','#btn_tambah_kolom', function(){

        tambah_baris_baru();

    })
    // ##


    // tombol menghapus baris tambah kolom
    
    $('#tb_container_setting_table').on('click','.delete_baris_kolom', function () {
        let tombol = this;
        console.log(tombol);
        hapus_baris_setting(tombol);
        // $(this).closest('tr').remove();
    });


    // tombol simpan data setting
    $(document).on('click','#btn_simpan_setting', function(){

        let hasil_setting=cek_data_setting();
        // console.log

        setTimeout(function() {
            if(!hasil_setting){
                $("#tb_container_setting_table").find("#td_simpan_setting").html(`
                <button class="ui labeled icon small green button" id="btn_simpan_setting">
                    <i class="save icon"></i>
                        simpan setting
                </button>
                `)
            }else{
                // gagal masukkan data 
                $("#tb_container_setting_table").find("#td_simpan_setting").html(`
                <button class="ui labeled icon small green button" id="btn_simpan_setting">
                    <i class="save icon"></i>
                        simpan setting
                </button>
                `)
                let fixed_arr = Object.assign({},hasil_setting);
                console.log(">>hasil>>", fixed_arr)
                simpan_data_setting(hasil_setting,"new");
            }
          }, 1000);

        

        

    })
    // ##


    // KLIK CHECK MENGGUNAKAN UPLOAD FILE
    $('#tb_pilih_tab').on('change', '#chk_status_upl', function() {
        // console.log(this.checked)
        let is_checked=this.checked;
        let state = $(this).attr("state");

        if(state=="new"){
            // JIKA MERUPAKAN SETTING BARU --> BELUM PERNAH DI SAVE
            if(is_checked){
                // JIKA CHECKED --> RENDER BARIS KOLOM + OPSI REVISI
                console.log("new")
                // render_opsi_revisi("new");
                render_baris_file("new");
                cek_base_revisi(true);
                
            }else{
                $("#tb_pilih_tab").find('#setting_revisi').remove();
                remove_baris_file("new");
                cek_base_revisi(false);
                // JIKA UNCHECK

            }
            

        }



    });


    $('#tb_pilih_tab').on('change', '#chk_revisi', function() {
        // console.log(this.checked)
        let is_checked=this.checked;
        let state = $(this).attr("state");

        if(state=="new"){
            // JIKA MERUPAKAN SETTING BARU --> BELUM PERNAH DI SAVE
            if(is_checked){
                // JIKA CHECKED --> RENDER BARIS KOLOM + OPSI REVISI
                console.log("new")
                render_baris_revisi("new");
                render_base_revisi("new");
            }else{
                // JIKA UNCHECK
                remove_baris_revisi("new");
                remove_base_revisi("new");

            }
            

        }



    });

    // $(".delete_baris_kolom").on('click', function () {
    //     let tombol = this;
    //     console.log(tombol);
    //     hapus_baris_setting(tombol);
    //     // $(this).closest('tr').remove();
    // });

    

// END OF FUNGSI KLIK TOMBOL
// #########################



// >>> FUNGSI DATATABLE LIST TAB
function view_list_tab(FSearch) {
        

    $('#tb_list_tab').DataTable({

        dom: "<'ui stackable grid'" +
            "<'row'" +
            "<'left aligned ten wide column'>" +
            ">" +
            "<'row dt-table'" +
            "<'sixteen wide column'tr>" +
            ">" +
            "<'row'" +
            "<'left aligned eight wide column'B>" +
            "<'right aligned eight wide column'p>" +
            ">" +
            ">",

        buttons: 
        [
            {
                text: '10',
                action: function (e, dt, node, config) {
                    $('#tb_list_tab').DataTable().page.len(10).draw();
                }
            },
            {
                text: '25',
                action: function (e, dt, node, config) {
                    $('#tb_list_tab').DataTable().page.len(25).draw();
                }
            },
            {
                text: '50',
                action: function (e, dt, node, config) {
                    $('#tb_list_tab').DataTable().page.len(50).draw();

                }
            },
            {
                text: '100',
                action: function (e, dt, node, config) {
                    $('#tb_list_tab').DataTable().page.len(100).draw();

                }
            },
            // {
            //     text: '500',
            //     action: function (e, dt, node, config) {
            //         $('#tb_list_tab').DataTable().page.len(500).draw();
            //     }
            // },
            // {
            //     text: '1000',
            //     action: function (e, dt, node, config) {
            //         $('#tb_list_tab').DataTable().page.len(1000).draw();
            //     }
            // }
        ],


    destroy: true,
    stateSave: false,
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
        emptyTable: 'tidak ada data yang ditampilkan',
    },

    order: [[0, "desc"]],

    columns: [
        
        { data  : 'namatab' },
        { data  : 'keterangantab' },
        { data  : null,
            render: function(data,row){

                    //return `<i class="book icon editdata">`;

                    return `<span class='docicon' style='white-space: nowrap !important; word-spacing:5px !important;'><i class="ui edit outline icon iconcoloredit edit_tab" btnid="${data['idtab']}"></i>&nbsp;<i class="ui trash icon iconcoloredit delete_tab" btnid="${data['idtab']}"></i></span>`;
                    //return '<i class="edit icon editdata" idedit="${data[0]}">
            }
            
        },

    ],

    


    
    ajax: {
        
        url     : `${restlocmds}table_tab`,
        type    : 'POST',
        //PENTING!! error uncaught lenght
        headers: {
            user: vusrnm,
            token: vtoken,
        },
        // data search
        data    : {
        // FStatus : FStatus,
        FSearch : FSearch,
        user    : userName1,
        },
        
        error: function(){
            if(fungsilogout){
    
                window.location.href="./_logout.php";
            }else{
                console.log("error session")
            }
        },

    },

    
    //STYLING KOLOM

    columnDefs: [
        { className: "center aligned", targets: [2] },
        // { className: "right aligned", targets: [5] },
        // {className : "collapsing", targets: [1,2,5,11,12]},
        // { "orderable": false, "targets": 13 },
    ],

// "columnDefs": [
//     { "orderable": false, "targets": 10 }
//   ],
    });
    

}
// END OF DATATABLE LIST NAMA TAB


// >>> FUNGSI HANDLER FILTER
function filter_handler_tb_tab(){

    let serchval = $("#search_list_tab").val();

    view_list_tab(serchval);
}

// FILTER SEARCH
$('#search_list_tab').keyup( function() {

    filter_handler_tb_tab();
})
// #### END OF FUNGSI FILTER HANDLER



// >>> FUNGSI KLIK TOMBOL SIMPAN NAMA TAB DAN KETERANGAN 
$("#simpan_nama_tab").on("click",function(){
    let nama_val=$("#nama_tab_in").val();
    let keterangan_val=$("#keterangan_tab_in").val();

    if(nama_val==null||nama_val==""){
        // JIKA NAMA VAL NULL ATAU KOSONG -> TOLAK

        Swal.fire({
            title: "Nama tab tidak boleh kosong",
            text: "",
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Ya',
        });

    }else{

        simpan_nama_tab(nama_val,keterangan_val);

    }
});
// #### END OF KLIK TOMBOL SIMPAN NAMA TAB




// >>> FUNGSI UNTUK MENYIMPAN NAMA TAB DAN KETERANGANNYA
function simpan_nama_tab(namatab,keterangan){


        $.ajax({
        type: "POST",
        url: `${restlocmds}create_tab`,

        headers: {
            user: vusrnm,
            token: vtoken,
        },
        data:{
            namatab: namatab,
            keterangantab:keterangan,
        },
            success: function (response){
                var obj = JSON.parse(response);
                console.log(obj);
                if(isEmpty(obj)) {
                    
                    Swal.fire({
                        title: "Gagal menyimpan nama tab",
                        text: "",
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: 'Ya',
                    });
                
                
                } else if(obj.status==false) {
                // tableType();
                    Swal.fire({
                        title: obj.message,
                        text: "",
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: 'Ya',
                    });
                
                } else {
                
                    Swal.fire({
                        title: 'berhasil menyimpan tab baru',
                        icon: 'success',
                        text: "klik refresh untuk melihat perubahan",
                        // showDenyButton: true,
                        // showCancelButton: true,
                        confirmButtonText: 'refresh',
                        // denyButtonText: `tumpuk data lama`,
                        // confirmButtonColor: '#21ba45',
                        // confirmButtonColor: '#3085d6',
                      }).then((result) => {
                        
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    
                      })

                      view_list_tab("");

                }
            },
            error: function(){
                if(fungsilogout){

                    window.location.href="./_logout.php";
                }else{
                    console.log("error session")
                }
            }
        });
    

}




//>>> FUNGSI CEK ULANG APAKAH DATA TAB ADA DAN TERDAFTAR

function cek_ada_tab(id_tab,text_namatab){

        $.ajax({
            type: "POST",
            url: `${restlocmds}cek_ada_tab`,

            headers: {
                user: vusrnm,
                token: vtoken,
            },
            data:{
                id_tab:id_tab,
            },
                success: function (response){
                    var obj = JSON.parse(response);
                    console.log(obj);
                    if(isEmpty(obj)) {
                        
                        Swal.fire({
                            title: "error koneksi dengan database",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        });
                    
                    
                    } else if(obj.status==false) {
                    // tableType();

                        Swal.fire({
                            title: obj.message,
                            text: "refresh untuk melihat data terbaru",
                            icon: 'error',
                            // showDenyButton: true,
                            // showCancelButton: true,
                            confirmButtonText: 'refresh',
                            
                        }).then((result) => {
                            
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        
                        })
                    
                    } else {

                        // status sudah ada setting atau tidak di tab
                        
                        let status_setting=obj.setting; //boolean

                        if(status_setting){
                            // jika ada setting
                            $("#title_setting_tab").html("pengaturan kolom "+text_namatab+`
                            <a class="ui medium green label">
                                    <i class="database icon"></i>
                                    tersimpan di database

                                </a>
                            `);
                            render_setting_tab('saved',id_tab,JSON.parse(obj.data));

                        }else{
                            $("#title_setting_tab").html("pengaturan kolom "+text_namatab);
                            render_setting_tab('new',id_tab,"");
                            render_opsi_file('new',id_tab,"");
                            render_opsi_revisi('new',id_tab,"")
                        }
                    
                        // Swal.fire({
                        //     title: 'berhasil menyimpan tab baru',
                        //     icon: 'success',
                        //     text: "klik refresh untuk melihat perubahan",
                        //     // showDenyButton: true,
                        //     // showCancelButton: true,
                        //     confirmButtonText: 'refresh',
                        //     // denyButtonText: `tumpuk data lama`,
                        //     // confirmButtonColor: '#21ba45',
                        //     // confirmButtonColor: '#3085d6',
                        // }).then((result) => {
                            
                        //     if (result.isConfirmed) {
                        //         location.reload();
                        //     }
                        
                        // })

                    }
                },
                error: function(){
                    if(fungsilogout){

                        window.location.href="./_logout.php";
                    }else{
                        console.log("error session")
                    }
                }
            });


}
// END OF FUNGSI CEK ULANG NAMA TAB
// ################################



// >>> FUNGSI MEMUNCULKAN SETTING TABEL TAB
function render_opsi_file(state){

    if(state=="new"){

        let html_opsi=`

            <tr id="setting_file" class="class_setting">
                <td>
                PENGATURAN LAIN
                </td>
                <td>
                <div class="ui checkbox">
                    <input type="checkbox" id="chk_status_upl" state="new" name="upl">
                    <label>Tambahkan Upload File</label>
                </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}
// #################


// >>> FUNGSI MENGHILANGKAN BARIS YANG BERKAITAN DENGAN FILE DAN REVISI
function remove_baris_file(state){

    if(state=="new"){

        $("#tb_setting_table").find('.tr_file').remove();

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}

function remove_baris_revisi(state){

    if(state=="new"){

        $("#tb_setting_table").find('.tr_revisi').remove();

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}
// #################

function remove_base_revisi(state){

    if(state=="new"){

        $("#tb_pilih_tab").find('.setting_revisi_base').remove();

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}
// #################

// CEK DROPDOWN DAN INPUT BASE REVISI KETIKA MELAKUKAN PERUBAHAN PADA CHECKBOX FILE
function cek_base_revisi(ischecked){

    
        if ($("#tb_pilih_tab").find(".drop_revisi_base").length > 0) {

            if(ischecked){
                let val_base = $(".drop_revisi_base").dropdown("get value");

                if(val_base=="FILE"){
                    // ketika cek file dan yang terpilih sudah file

                }else{

                    $("#tb_pilih_tab").find(".drop_revisi_base>select").html(`
                        <option value="FILE">Berdasarkan File Upload</option>
                        <option value="KOLOM" selected>Berdasarkan Kolom</option>
                    `);
                    $(".drop_revisi_base").dropdown("refresh");

                    

                }

            }else{

                let val_base = $(".drop_revisi_base").dropdown("get value");

                    if(val_base=="FILE"){
                        // ketika uncheck file tapi yang terplih file
                       $("#tb_pilih_tab").find(".drop_revisi_base>select").html(`
                        
                        <option value="KOLOM" selected>Berdasarkan Kolom</option>
                       `);
                       $(".drop_revisi_base").dropdown("refresh");

                       let html_baris_base=`

                            <tr id="tr_input_revisi_base" class="class_setting setting_revisi_base">
                                <td>
                                kolom dasar revisi
                                </td>
                                <td>
                                    <div class="ui input fluid small mandatoryclass">
                                    <input type="text" id="kolom_base_revisi_in" class="mandatoryclass"  placeholder="NAMA KOLOM">
                                    </div>
                                </td>
                                
                            </tr>
                            
                        `;


                        $("#tb_pilih_tab").find("tbody").append(html_baris_base);

                    }else{
                        // kalau yang terpilih bukan file

                        $("#tb_pilih_tab").find(".drop_revisi_base>select").html(`
                        
                        <option value="KOLOM" selected>Berdasarkan Kolom</option>
                       `);
                       $(".drop_revisi_base").dropdown("refresh");
                        
                    }


            }

        }
    
    

}



// >>> FUNGSI MEMUNCULKAN SETTING TAMBAH REVISI
function render_opsi_revisi(state,id_tab,general_setitng){

    if(state=="new"){

        let html_opsi=`

            <tr id="tr_setting_revisi" class="class_setting setting_revisi">
                <td>
                Pengaturan Revisi
                </td>
                <td>
                <div class="ui checkbox">
                    <input type="checkbox" id="chk_revisi" state="new">
                    <label>Gunakan Sistem Revisi</label>
                </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}


// >>> FUNGSI MEMUNCULKAN ISIAN INFORMASI REVISI BERDASARKAN APA
function render_base_revisi(state){

    if(state=="new"){

        chk_file=$("#tb_pilih_tab").find("#chk_status_upl");
        isfile=chk_file[0].checked;
        let option_text="not set";
        if(isfile){

             option_text=`
                <option value="FILE" selected>Berdasarkan File Upload</option>
                <option value="KOLOM">Berdasarkan Kolom</option>
            `;
            
        }else{

             option_text=`
                
                <option value="KOLOM">Berdasarkan Kolom</option>
            `;

        }

        if(option_text!=="not set"){

            let html_opsi=`

            <tr id="tr_setting_revisi_base" class="class_setting setting_revisi_base">
                <td>
                Pengaturan Revisi
                </td>
                <td>
                <div class="ui left input fluid small" id="div_revisi_base">
                    <select class="ui fluid dropdown drop_revisi_base" >
                        <option value="">NAMA TAB</option>
                        `+option_text+`
                    </select>
                    </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

        $(".drop_revisi_base").dropdown().dropdown("refresh");

        }else{

            let html_opsi=`

            <tr id="tr_setting_revisi_base" class="class_setting setting_revisi_base">
                <td>
                Pengaturan Revisi
                </td>
                <td>
                <div class="ui left input fluid small" id="div_revisi_base">
                    <select class="ui fluid dropdown drop_revisi_base" >
                        <option value="">NAMA TAB</option>
                        <option value="KOLOM">Berdasarkan Kolom</option>
                    </select>
                    </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

        $(".drop_revisi_base").dropdown().dropdown("refresh");
        }

        

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}



// >>> fungsi cek dropdown base
function render_base_revisi__(state){

    if(state=="new"){

        chk_file=$("#tb_pilih_tab").find("#chk_status_upl");
        isfile=chk_file[0].checked;
        let option_text="not set";
        if(isfile){

             option_text=`
                <option value="FILE" selected>Berdasarkan File Upload</option>
                <option value="KOLOM">Berdasarkan Kolom</option>
            `;
            
        }else{

             option_text=`
                
                <option value="KOLOM">Berdasarkan Kolom</option>
            `;

        }

        if(option_text!=="not set"){

            let html_opsi=`

            <tr id="tr_setting_revisi_base" class="class_setting setting_revisi_base">
                <td>
                Pengaturan Revisi
                </td>
                <td>
                <div class="ui left input fluid small" id="div_revisi_base">
                    <select class="ui fluid dropdown drop_revisi_base" >
                        <option value="">NAMA TAB</option>
                        `+option_text+`
                    </select>
                    </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

        $(".drop_revisi_base").dropdown().dropdown("refresh");

        }else{

            let html_opsi=`

            <tr id="tr_setting_revisi_base" class="class_setting setting_revisi_base">
                <td>
                Pengaturan Revisi
                </td>
                <td>
                <div class="ui left input fluid small" id="div_revisi_base">
                    <select class="ui fluid dropdown drop_revisi_base" >
                        <option value="">NAMA TAB</option>
                        <option value="KOLOM">Berdasarkan Kolom</option>
                    </select>
                    </div>
                </td>
                
            </tr>
            
        `;


        $("#tb_pilih_tab").find("tbody").append(html_opsi);

        $(".drop_revisi_base").dropdown().dropdown("refresh");
        }

        

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}





// >>> FUNGSI MEMUNCULKAN BARIS TAMBAHAN UNTUK KEPERLUAN UPLOAD FILE
function render_baris_file(state){

    if(state=="new"){

        let html_baris_file=`

            <tr class="data_wajib tr_file trwarning" tipe_baris="wajib" is_input="no">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="nama_file" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file" >
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan nama file</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [file]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>

            <tr class="data_wajib tr_file trwarning" tipe_baris="wajib" is_input="no">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="path_file" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file" >
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan path data</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [file]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>

            <tr class="data_wajib tr_file trwarning" tipe_baris="wajib" is_input="no">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="base_path" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file">
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan path data</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [file]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>

            <tr class="data_wajib tr_file last_wajib trwarning" tipe_baris="wajib" is_input="no">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="jenis_data" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file">
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan jenis data yang diupload</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [file]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>
            
        `;


        $(document).find("#tb_setting_table").find('tr.data_wajib:last').after(html_baris_file);

        $('.drop_file').dropdown('refresh');

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}




// >>> FUNGSI MEMUNCULKAN BARIS TAMBAHAN UNTUK KEPERLUAN UPLOAD FILE
function render_baris_revisi(state){

    if(state=="new"){

        let html_baris_file=`

            <tr class="data_wajib tr_revisi labelwarning" tipe_baris="wajib">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="revisi" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file" >
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan nama file</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [revisi]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>

            <tr class="data_wajib tr_revisi labelwarning" tipe_baris="wajib">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" id="judul_in" class="mandatoryclass"  placeholder="revisi berdasarkan" value="base_revisi" disabled>
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small" id="div_tipe_kolom">
                    <select class="ui fluid dropdown drop_file" >
                        <option value="">NAMA TAB</option>
                        <option value="TEXT" selected>TEXT</option>
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="default" tipe_setting="deskripsi">menyimpan informasi revisi berdasarkan apa</td>

                <td>
                <a class="ui medium fluid label labelerror">
                    <i class="ui info icon"></i>
                    wajib ada [revisi]

                </a>
                </td>

                <td width="">
                
                </td>
                
            </tr>

            
            
        `;


        $(document).find("#tb_setting_table").find('tr.data_wajib:last').after(html_baris_file);

        $('.drop_file').dropdown('refresh');

    }else{
        // KALAU DARI TAB YANG SUDAH MEMILIKI SETTING


    }

}




// >>> FUNGSI MEMUNCULKAN SETTING TABEL TAB
function render_setting_tab(state,id_tab,data_setting){
    

    if(state=="new"){

        let html_setting=`
            <table class="ui small compact striped collapsing fixed table tb_designinput mdscss" id="tb_setting_table">

                <thead class="tb_designinput">
                    <tr class="centerall">
                    <th class="except" style="min-width:150px">
                        nama kolom
                    </th>

                    <th class="" style="min-width:150px">
                        tipe kolom
                    </th>

                    <th width="250px" class="">
                        deskripsi
                    </th>

                    <th class="">
                        
                    </th>

                    <th class="">
                        action
                    </th>
                    </tr>
                </thead>
                
                <tbody>
                <tr class="data_wajib trwarning" tipe_baris="wajib" is_input="yes">
                    <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                        <div class="ui input fluid small mandatoryclass">
                        <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="judul data">
                        </div>
                    </td>

                    <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                        <div class="ui left input fluid small" id="div_tipe_kolom">
                        <select class="ui fluid dropdown" id="drop_tipe_kolom">
                            <option value="">NAMA TAB</option>
                            <option value="TEXT" selected>TEXT</option>
                        </select>
                        </div>
                    </td>

                    <td class="td_input" tipe_input="default" tipe_setting="deskripsi">untuk judul data yang diupload</td>

                    <td>
                    <a class="ui medium fluid label labelerror">
                        <i class="ui info icon"></i>
                        kolom wajib ada

                    </a>
                    </td>

                    <td width="">
                    
                    </td>
                    
                </tr>

                
                </tbody>

                <tfoot>
                <tr class="centerall">
                    <td colspan=5>
                        <button class="ui labeled icon tiny button" id="btn_tambah_kolom">
                            <i class="plus icon"></i>
                            tambah kolom
                        </button>
                    </td>
                </tr>
                </tfoot>

            </table>
        `;


        $("#tb_container_setting_table").find("#div_container_setting_table").html(html_setting);

        // MUNCULKAN TOMBOL SIMPAN SETTING

        $("#tb_container_setting_table").find("#td_simpan_setting").html(`

            <button class="ui labeled icon small green button" id="btn_simpan_setting">
                <i class="save icon"></i>
                simpan setting
            </button>

        `);

        $('#drop_tipe_kolom').dropdown('refresh');

    }else if(state=="saved"){
        console.log(data_setting);
        console.log(Object.keys(data_setting));
        console.log(Object.keys(data_setting).length);
        let banyak_setting = Object.keys(data_setting).length;
        let general = data_setting['general'];
        console.log(general);
        let html_setting=`
            <table class="ui small compact collapsing fixed table tb_designinput mdscss" id="tb_setting_table">

                <thead class="tb_designinput">
                    <tr class="centerall">
                    <th class="except" style="min-width:150px">
                        nama kolom
                    </th>

                    <th class="" style="min-width:150px">
                        tipe kolom
                    </th>

                    <th width="250px" class="">
                        deskripsi
                    </th>

                    <th class="">
                        
                    </th>

                    <th class="">
                        action
                    </th>
                    </tr>
                </thead>
                
                <tbody>
                `;

        // untuk render baris setting kolom dari data setting
        for(let x=0;x<(banyak_setting-1);x++){
            console.log(data_setting[x]);
            let row=data_setting[x];

            if(row.tipe_baris=="wajib"){
                // baris berupa baris wajib
                if(row.judul=="judul data"){
                    // baris judul
                        html_setting +=`
                            
                                <tr class="data_wajib trwarning" tipe_baris="wajib" is_input="yes">
                                    <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                                        <div class="ui input fluid small mandatoryclass">
                                        <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="judul data">
                                        </div>
                                    </td>

                                    <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                                        <div class="ui left input fluid small" id="div_tipe_kolom">
                                        <select class="ui fluid dropdown" id="drop_tipe_kolom">
                                            <option value="">AdminMA TAB</option>
                                            <option value="TEXT" selected>TEXT</option>
                                        </select>
                                        </div>
                                    </td>

                                    <td class="td_input" tipe_input="default" tipe_setting="deskripsi">untuk judul data yang diupload</td>

                                    <td>
                                    <a class="ui medium fluid label labelerror">
                                        <i class="ui info icon"></i>
                                        kolom wajib ada

                                    </a>
                                    </td>

                                    <td width="">
                                    
                                    </td>
                                    
                                </tr>

                                
                        `;
                }else if((row.judul=="nama_file"||row.judul=="path_file"||row.judul=="base_path"||row.judul=="jenis_data") && general.isfile){


                    html_setting+=`
                        
                        <tr class="data_wajib tr_file trwarning" tipe_baris="wajib" is_input="no">
                            <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                                <div class="ui input fluid small mandatoryclass">
                                <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="${row.judul}" disabled>
                                </div>
                            </td>

                            <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                                <div class="ui left input fluid small" id="div_tipe_kolom">
                                <select class="ui fluid dropdown drop_file" >
                                    <option value="">NAMA TAB</option>
                                    <option value="TEXT" selected>TEXT</option>
                                </select>
                                </div>
                            </td>

                            <td class="td_input" tipe_input="default" tipe_setting="deskripsi">${row.deskripsi}</td>

                            <td>
                            <a class="ui medium fluid label labelerror">
                                <i class="ui info icon"></i>
                                wajib ada [file]

                            </a>
                            </td>

                            <td width="">
                            
                            </td>
                            
                        </tr>

                    `
                }else if(row.tipe_baris=="new"){
                    console.log(row.tipe_baris);

                    html_setting+=`

                        <tr tipe_baris="new" class="newcolumn" is_input="yes">
                            <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                                <div class="ui input fluid small mandatoryclass">
                                <input type="text" class="mandatoryclass judul_in_new"  placeholder="nama kolom">
                                </div>
                            </td>
            
                            <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                                <div class="ui left input fluid small div_tipe_kolom_new">
                                <select class="ui fluid dropdown drop_tipe_kolom_new mandatoryclass">
                                    <option value="">TIPE DATA</option>
                                    <option value="TEXT" >TEXT</option>
                                    <option value="INT" >ANGKA</option>
                                    
                                </select>
                                </div>
                            </td>
            
                            <td class="td_input" tipe_input="input_text" tipe_setting="deskripsi">
                                <div class="ui input fluid small">
                                    <input type="text" class="deskripsi_in_new"  placeholder="deskripsi">
                                </div>
                            </td>
            
                            <td tipe_input="none">
                                <a class="ui medium fluid label labelpositive">
                                    <i class="asterisk icon"></i>
                                    kolom baru
            
                                </a>
                            </td>
            
                            <td style="text-align:center" tipe_input="none">
                                <span class='mdsicon' style='white-space: nowrap !important; word-spacing:5px !important;'>
                                    <i class="ui trash ul icon iconcoloredit delete_baris_kolom" ></i>
                                </span>
                            </td>
                            
                        </tr>

                    `
                }else if((row.judul=="revisi"||row.judul=="base_revisi") && general.isrevisi){
                    // kolom revisi

                    html_setting+=`

                        <tr class="data_wajib tr_revisi trwarning" tipe_baris="wajib">
                            <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                                <div class="ui input fluid small mandatoryclass">
                                <input type="text" id="judul_in" class="mandatoryclass"  placeholder="judul data" value="${row.judul}" disabled>
                                </div>
                            </td>
            
                            <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                                <div class="ui left input fluid small" id="div_tipe_kolom">
                                <select class="ui fluid dropdown drop_file" >
                                    <option value="">NAMA TAB</option>
                                    <option value="TEXT" selected>TEXT</option>
                                </select>
                                </div>
                            </td>
            
                            <td class="td_input" tipe_input="default" tipe_setting="deskripsi">${row.deskripsi}</td>
            
                            <td>
                            <a class="ui medium fluid label labelerror">
                                <i class="ui info icon"></i>
                                wajib ada [revisi]
            
                            </a>
                            </td>
            
                            <td width="">
                            
                            </td>
                            
                        </tr>
                    `;

                }

            }else if(row.tipe_baris=="new"){
                console.log(row.tipe_baris);

                html_setting+=`

                    <tr tipe_baris="new_saved" class="newcolumn labelpositive centerall" is_input="yes">
                        <td class="td_input except" tipe_input="input_text" tipe_setting="judul">
                            ${row.judul}
                        </td>
        
                        <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                            ${row.tipe_kolom}
                        </td>
        
                        <td class="td_input except" tipe_input="input_text" tipe_setting="deskripsi">
                            ${row.deskripsi}
                        </td>
        
                        <td tipe_input="none">
                            <a class="ui medium fluid label labelpositive">
                                <i class="check icon"></i>
                                kolom tersimpan
        
                            </a>
                        </td>
        
                        <td style="text-align:center" tipe_input="none">
                            <span class='mdsicon' style='white-space: nowrap !important; word-spacing:5px !important;'>
                                <i class="ui edit ul icon iconcoloredit edit_kolom_tersimpan" ></i>
                                <i class="ui trash ul icon iconcoloredit delete_kolom_tersimpan" ></i>
                                
                            </span>
                        </td>
                        
                    </tr>

                `
            }
        }

        console.log(html_setting);

        html_setting+=`
                </tbody>

                <tfoot>
                <tr class="centerall">
                    <td colspan=5>
                        <button class="ui labeled icon tiny button" id="btn_tambah_kolom">
                            <i class="plus icon"></i>
                            tambah kolom
                        </button>
                    </td>
                </tr>
                </tfoot>

            </table>
        `;


        $("#tb_container_setting_table").find("#div_container_setting_table").html(html_setting);

        // MUNCULKAN TOMBOL SIMPAN SETTING

        $("#tb_container_setting_table").find("#td_simpan_setting").html(`

            <button class="ui labeled icon small green button" id="btn_update_setting">
                <i class="save icon"></i>
                Update setting
            </button>

        `);

        $('#drop_tipe_kolom').dropdown('refresh');
        $('.drop_file').dropdown('refresh');
        // render_opsi_file('new',id_tab,"");
        // render_opsi_revisi('new',id_tab,"")

        

    }

}



// END OF FUNGSI MEMAUNCULKAN SETTING NAMA TAB
// ###########################################



// >>> FUNGSI MENAMBAH BARIS SETTING KOLOM BARU
function tambah_baris_baru(){

    let html_new_row=`
            <tr tipe_baris="new" class="newcolumn" is_input="yes">
                <td class="td_input" tipe_input="input_text" tipe_setting="judul">
                    <div class="ui input fluid small mandatoryclass">
                    <input type="text" class="mandatoryclass judul_in_new"  placeholder="nama kolom">
                    </div>
                </td>

                <td class="td_input" tipe_input="dropdown" tipe_setting="tipe_kolom">
                    <div class="ui left input fluid small div_tipe_kolom_new">
                    <select class="ui fluid dropdown drop_tipe_kolom_new mandatoryclass">
                        <option value="">TIPE DATA</option>
                        <option value="TEXT" >TEXT</option>
                        <option value="INT" >ANGKA</option>
                        
                    </select>
                    </div>
                </td>

                <td class="td_input" tipe_input="input_text" tipe_setting="deskripsi">
                    <div class="ui input fluid small">
                        <input type="text" class="deskripsi_in_new"  placeholder="deskripsi">
                    </div>
                </td>

                <td tipe_input="none">
                    <a class="ui medium fluid label labelpositive">
                        <i class="asterisk icon"></i>
                        kolom baru

                    </a>
                </td>

                <td style="text-align:center" tipe_input="none">
                    <span class='mdsicon' style='white-space: nowrap !important; word-spacing:5px !important;'>
                        <i class="ui trash ul icon iconcoloredit delete_baris_kolom" ></i>
                    </span>
                </td>
                
            </tr>
        `;

        $(document).find("#tb_setting_table").find('tbody').append(html_new_row);

        $('.drop_tipe_kolom_new').dropdown('refresh');

        

}

// END OF MENAMBAH BARIS SETTING KOLOM BARU
// #######################################



// >>> FUNGSI MENGHAPUS BARIS TABEL SETTING KOLOM
function hapus_baris_setting(tombol){
    // console.log(tombol);
    $(tombol).closest('tr').remove();
}
// END OF HAPUS BARIS TABEL SETTING KOLOM
// ##################################


// >>> FUNGSI MEMASUKKAN DATA KE ARRAY SETTING
function cek_data_setting(){
    console.log($("#tb_container_setting_table").find(".td_simpan_setting"));

    $("#tb_container_setting_table").find("#td_simpan_setting").html(`
        <button class="ui loading small gray button" id="loading_cek_setting">
            simpan setting
        </button>
    `)

    let arr_setting=[];
    let arr_judul=[];
    console.log($("#div_container_setting_table").find("#tb_setting_table tbody tr"));
  $("#div_container_setting_table").find("#tb_setting_table tbody tr").each(function() { // for each row
    let idx = arr_setting.length;// Object.keys(arr_setting).length;// find how many entries in a
    arr_setting[idx]={}; // add a new array
    let tipe_baris=$(this).attr('tipe_baris');
    let is_input=$(this).attr('is_input');

    // obj_setting={
    //     [tipe_setting] : val_setting,
    //     "tipe_baris" : tipe_baris
    // }
    // arr_setting[idx].push(obj_setting); 

    if(tipe_baris=="new"){

        console.log("ini tipe baris>>>>"+tipe_baris);
        $(this).find(".td_input").each(function(i) {
            let tipe_input=$(this).attr("tipe_input");
            let tipe_setting=$(this).attr("tipe_setting"); // juful atau tipe data atau deskripsi
            
            if(tipe_input=="dropdown"){
                // jika input dropdown
                let val_setting=$(this).find(".ui.dropdown").dropdown("get value");

                if(val_setting!==null&&val_setting!==""&&val_setting!=="none"){
                    // INPUT ADA
                    arr_setting[idx][tipe_setting]=val_setting;
                    arr_setting[idx]["tipe_baris"]=tipe_baris;
                    arr_setting[idx]["is_input"]=is_input;
                    
                }else{
                    // PEMBEDA ALERT
                    if(val_setting=="none"){
                        Swal.fire({
                            title: "error: terdapat dropdown tak berisi",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        })
                        
                    }else{
                        Swal.fire({
                            title: "terdapat dropdown yang belum terpilih",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        });
                        arr_setting=false;
                        return false;
                    }
                    
                }
                // console.log(value);


            }else if(tipe_input=="input_text"){

                let val_setting=$(this).find("input").val().trim();
                console.log(val_setting);
                console.log("tipenya>"+tipe_setting);
                console.log("hitung>"+idx);
                if((val_setting!== null &&val_setting!== "" && val_setting.length !== 0 && tipe_setting !=="deskripsi") || tipe_setting =="deskripsi"){

                    if(tipe_setting=="judul"){
                        console.log(tipe_setting);
                        if(jQuery.inArray( val_setting, arr_judul )===-1){
                            // tidak ada duplikat--> input data
                            console.log(tipe_setting);
                            arr_setting[idx][tipe_setting]=val_setting;
                            arr_setting[idx]["tipe_baris"]=tipe_baris;
                            arr_setting[idx]["is_input"]=is_input;
                            arr_judul[idx]=val_setting;

                        }else{
                            // ada duplikat
                            Swal.fire({
                                title: "terdapat kolom dengan nama yang sama",
                                text: "",
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonText: 'Ya',
                            });
                            arr_setting=false;
                            return false;
                        }

                    }else{
                        // INPUT ADA
                        arr_setting[idx][tipe_setting]=val_setting;
                        arr_setting[idx]["tipe_baris"]=tipe_baris;
                        arr_setting[idx]["is_input"]=is_input;
                    }
                    // INPUT ADA
                    // arr_setting[idx][tipe_setting]=val_setting;
                    // arr_setting[idx]["tipe_baris"]=tipe_baris;
                }else{
                    // PEMBEDA ALERT
                        Swal.fire({
                            title: "terdapat field text yang belum terisi2",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        });
                    arr_setting=false;
                    return false;
                }

            }else if(tipe_input=="default"){

                let val_setting=$(this).text();

                arr_setting[idx][tipe_setting]=val_setting;
                arr_setting[idx]["tipe_baris"]=tipe_baris;
                arr_setting[idx]["is_input"]=is_input;
            }
            //  arr_setting[idx].push(this.value); 
        }); // fill the array


// #############################################
    }else if(tipe_baris=="wajib"){

        $(this).find(".td_input").each(function(i) {
            let tipe_input=$(this).attr("tipe_input");
            let tipe_setting=$(this).attr("tipe_setting");

            if(tipe_input=="dropdown"){
                let val_setting=$(this).find(".ui.dropdown").dropdown("get value");

                if(val_setting!==null&&val_setting!==""&&val_setting!=="none"){
                    // INPUT ADA
                    arr_setting[idx][tipe_setting]=val_setting;
                    arr_setting[idx]["tipe_baris"]="wajib";
                    arr_setting[idx]["is_input"]=is_input;
                }else{
                    // PEMBEDA ALERT
                    if(val_setting=="none"){
                        Swal.fire({
                            title: "error: terdapat dropdown tak berisi",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        })
                        
                    }else{
                        Swal.fire({
                            title: "terdapat dropdown yang belum terpilih",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        });
                        arr_setting=false;
                        return false;

                    }
                    
                }
                // console.log(value);


            }else if(tipe_input=="input_text"){

                let val_setting=$(this).find("input").val().trim();
                console.log(val_setting);
                if(val_setting!== null&&val_setting!== "" && val_setting.length !== 0){

                    if(tipe_setting=="judul"){
                        console.log(jQuery.inArray(val_setting,arr_judul));
                        let duplikat_judul=jQuery.inArray(val_setting,arr_judul);
                        if(duplikat_judul === -1){
                            console.log("piyee");
                            // tidak ada duplikat--> input data
                            arr_setting[idx][tipe_setting]=val_setting;
                            arr_setting[idx]["tipe_baris"]="wajib";
                            arr_setting[idx]["is_input"]=is_input;
                            arr_judul[idx]=val_setting;

                        }else{
                            // ada duplikat
                            Swal.fire({
                                title: "terdapat kolom dengan nama yang sama",
                                text: "",
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonText: 'Ya',
                            })
                            arr_setting=false;
                            return false;
                        }
                        

                    }else{
                        // INPUT ADA
                        arr_setting[idx][tipe_setting]=val_setting;
                        arr_setting[idx]["tipe_baris"]="wajib";
                        arr_setting[idx]["is_input"]=is_input;
                    }
                    
                }else{
                    // PEMBEDA ALERT
                        Swal.fire({
                            title: "terdapat field text yang belum terisi",
                            text: "",
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ya',
                        })
                    arr_setting=false;
                    return false;
                }

            }else if(tipe_input=="default"){

                let val_setting=$(this).text();

                arr_setting[idx][tipe_setting]=val_setting;
                arr_setting[idx]["tipe_baris"]="wajib";
                arr_setting[idx]["is_input"]=is_input;
            }
            //  arr_setting[idx].push(this.value); 
        }); // fill the array

    }
    
    
  });  

  return arr_setting;
}
// END OF MEMASUKKAN DATA KE ARRAY SETTING
// ##################################



// KUMPULAN AJAX
// >>> FUNGSI MENYIMPAN DATA SETTING

function simpan_data_setting(arr_final_setting,state){

    if(Object.keys(arr_final_setting).length>0){
        let nama_fungsi="";
        let nama_tab=$("#stored_id_tab").val();
        let text_tab=$("#stored_nama_tab").val();
        let isfile=false;
        let isrevisi=false;
        let val_jenisbase=false;
        let val_kolombase=false;

        if(state=="new"){
            // SETTING DARI TAB BARU --> belum pernah ada setting
            nama_fungsi="simpan_setting_new";

            // STORE DATA SETTING GENERAL
            let arr_setting_general=[];

            if ($("#tb_pilih_tab").find("#chk_status_upl").length > 0) {
                // ada checkbox setting upload file
                chk_file=$("#tb_pilih_tab").find("#chk_status_upl");
                isfile=chk_file[0].checked
                console.log(chk_file)
                

                if(isfile){
                    // menggunakan upload data atau file --> cek revisi

                }else{
                    // tidak menggunakan upload data atau file --> no revisi
                    
                }


              }

              if ($("#chk_revisi").length > 0) {
                isrevisi=$("#tb_pilih_tab").find("#chk_revisi")[0].checked;

                if(isrevisi){
                    // menggunakan revisi
                    val_jenisbase=$(".drop_revisi_base").dropdown("get value");

                    if(val_jenisbase =="KOLOM"){
                        val_kolombase=$("#kolom_base_revisi_in").val();

                    }else{
                        val_kolombase=false;
                    }


                }else{
                    // tidak menggunakan revisi

                }

            }else{


            }
              console.log("lanjut 2")
        }else{
    
            
    
        }

        if(nama_tab!==""||nama_tab!==null){

            console.log(JSON.stringify(arr_final_setting))
            $.ajax({
                type: "POST",
                url: `${restlocmds}${nama_fungsi}`,
        
                headers: {
                    user: vusrnm,
                    token: vtoken,
                },
                data:{
                    arr_setting: JSON.stringify(arr_final_setting),
                    isrevisi : isrevisi,
                    isfile : isfile,
                    nama_tab : nama_tab,
                    val_jenisbase :val_jenisbase,
                    val_kolombase : val_kolombase
                    
                },
                    success: function (response){
                        var obj = JSON.parse(response);
                        console.log(obj);
                        if(isEmpty(obj)) {
                            
                            Swal.fire({
                                title: "Gagal menyimpan nama tab",
                                text: "",
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonText: 'Ya',
                            });
                        
                        
                        } else if(obj.status==false) {
                        // tableType();
                            Swal.fire({
                                title: obj.message,
                                text: "",
                                icon: 'error',
                                showCancelButton: false,
                                confirmButtonText: 'Ya',
                            });
                        
                        } else {
                        
                            // berhasil melakukan simpan setting --> alert --> reset input --> view saved data
                            Swal.fire({
                                title: "Sukses menyimpan pengaturan baru",
                                text: "",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonText: 'Ya',
                            });
                            // remove semua setting yang ada sebelumnya
                            $("#tb_pilih_tab").find(".class_setting").each(function(){
                                $(this).remove();
                            });

                            setTimeout(function() {
                            cek_ada_tab(nama_tab,text_tab);
                            },1000);
                        }
                    },
                    error: function(){
                        if(fungsilogout){
        
                            window.location.href="./_logout.php";
                        }else{
                            console.log("error session")
                        }
                    }
                });

        }else{

            Swal.fire({
                title: "data nama tab kosong",
                text: "",
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ya',
            });
        }
            


    }else{
        // DATA SETTING KOSONG

        Swal.fire({
            title: "data setting kosong",
            text: "",
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Ya',
        });

    }

    
}



// END OF MENYIMPAN DATA SETTING