$(".ui.dropdown").dropdown();
$(".menu .item").tab();
$('.ui.accordion').accordion(
  {exclusive : false}
);

// Global Variable
const NonceValue = "rdsystem2020";
const LogoutProtect = false;

const ColorOwner  = "#00139f";
const ColorRelease= "#8d8d8d";

var jmlChecker = 7;
var vusrnm = getCookie("usrnm");
var vtoken = getCookie("token");
var restlocbp = decodeURIComponent(getCookie("restlocbp"));
var restlocpsc = decodeURIComponent(getCookie("restlocpsc"));
let Ucrypt = new Encryption();
var Udecrypt = Ucrypt.decrypt(EncU, NonceValue);
var Sdecrypt = Ucrypt.decrypt(EncS, NonceValue);
var Jdecrypt = Ucrypt.decrypt(EncJ, NonceValue);

var sign_c  = "", sign_e  = "", sign_m  = "", sign_i  = "";
var date_c  = "", date_e  = "", date_m  = "", date_i  = "";

var sign_hc = "", sign_he = "", sign_hm = "", sign_hi = "";
var name_hc = "", name_he = "", name_hm = "", name_hi = "";
var picc_hc = "", picc_he = "", picc_hm = "", picc_hi = "";
var jbtn_hc = "", jbtn_he = "", jbtn_hm = "", jbtn_hi = "";
var sect_hc = "", sect_he = "", sect_hm = "", sect_hi = "";
var date_hc = "", date_he = "", date_hm = "", date_hi = "";
var sign_hog = "", sign_hogsr = "", date_hog = "", sign_hogsts = "", sect_hog = "", jbtn_hog = "";
var sign_pl  = "", sign_plsr  = "", date_pl  = "", sign_plsts  = "", sect_pl  = "", jbtn_pl  = "";
var sign_hod = "", sign_hodsr = "", date_hod = "", sign_hodsts = "";
var sign_release = "", sign_releasesr = "", date_release = "", sign_releasests = "", pic_release ="";


      
      
// function LoadDataSign(){
//   $.ajax({
//     type    : "POST",
//     url     : `${restlocpsc}load_datasign`,
//     headers : {
//       user  : vusrnm,
//       token : vtoken
//     },
//     data: {
//       PSCId    : idbp,
//     },
//     cache: false,
//     success: function (response){
//       var obj = JSON.parse(response);
//       jmlData = obj.length;
//       for (a = 0; a < jmlData; a++) {

//         if(obj[a]['jabatan'] =='ENGINEER' && obj[a]['signed_role'] =='CYCLE UNIT' ){
//           sign_c  = obj[a]['status_sign'];
//           date_c  = obj[a]['signed_date'];
//           pic_c   = obj[a]['pic'];
//         }
//         if(obj[a]['jabatan'] =='ENGINEER' && obj[a]['signed_role'] =='ELECTRONIC HARDWARE' ){
//           sign_e  = obj[a]['status_sign'];
//           date_e  = obj[a]['signed_date'];
//           pic_e   = obj[a]['pic'];
//         }
//         if(obj[a]['jabatan'] =='ENGINEER' && obj[a]['signed_role'] =='MECHANICAL DESIGN' ){
//           sign_m  = obj[a]['status_sign'];
//           date_m  = obj[a]['signed_date'];
//           pic_m   = obj[a]['pic'];
//         }
//         if(obj[a]['jabatan'] =='ENGINEER' && obj[a]['signed_role'] =='INDUSTRIAL DESIGN' ){
//           sign_i  = obj[a]['status_sign'];
//           date_i  = obj[a]['signed_date'];
//           pic_i   = obj[a]['pic'];
//         }

//         if(obj[a]['jabatan'] =='HEAD OF' && obj[a]['signed_role'] =='HEAD OF CYCLE UNIT' ){
//           sign_hc  = obj[a]['status_sign'];
//           date_hc  = obj[a]['signed_date'];
//           picc_hc  = obj[a]['pic'];
//           sect_hc  = obj[a]['rnd_bagian'];
//           jbtn_hc  = obj[a]['jabatan'];
//           $('#cyclepic_h').text(obj[a]['pic']);
//         }
//         if(obj[a]['jabatan'] =='HEAD OF' && obj[a]['signed_role'] =='HEAD OF ELECTRONIC HARDWARE' ){
//           sign_he  = obj[a]['status_sign'];
//           date_he  = obj[a]['signed_date'];
//           picc_he  = obj[a]['pic'];
//           sect_he  = obj[a]['rnd_bagian'];
//           jbtn_he  = obj[a]['jabatan'];
//           $('#electpic_h').text(obj[a]['pic']);
//         }
//         if(obj[a]['jabatan'] =='HEAD OF' && obj[a]['signed_role'] =='HEAD OF MECHANICAL DESIGN' ){
//           sign_hm  = obj[a]['status_sign'];
//           date_hm  = obj[a]['signed_date'];
//           picc_hm  = obj[a]['pic'];
//           sect_hm  = obj[a]['rnd_bagian'];
//           jbtn_hm  = obj[a]['jabatan'];
//           $('#mdpic_h').text(obj[a]['pic']);
//         }
//         if(obj[a]['jabatan'] =='HEAD OF' && obj[a]['signed_role'] =='HEAD OF INDUSTRIAL DESIGN' ){
//           sign_hi  = obj[a]['status_sign'];
//           date_hi  = obj[a]['signed_date'];
//           picc_hi  = obj[a]['pic'];
//           sect_hi  = obj[a]['rnd_bagian'];
//           jbtn_hi  = obj[a]['jabatan'];
//           $('#idpic_h').text(obj[a]['pic']);
//         }

//         if(obj[a]['signed_role'] =='HEAD OF GROUP PRODUCT' ){
//           sign_hog   = obj[a]['status_sign'];
//           date_hog   = obj[a]['signed_date'];
//           sign_hogsr = obj[a]['signed_role'];
//           sect_hog   = obj[a]['rnd_bagian'];
//           jbtn_hog   = obj[a]['jabatan'];
//         }
//         if(obj[a]['signed_role'] =='PROJECT LEADER' ){
//           sign_pl   = obj[a]['status_sign'];
//           date_pl   = obj[a]['signed_date'];
//           sign_plsr = obj[a]['signed_role'];
//           sect_pl   = obj[a]['rnd_bagian'];
//           jbtn_pl   = obj[a]['jabatan'];
//         }
//         if(obj[a]['signed_role'] =='HEAD OF DQA' ){
//           sign_hod   = obj[a]['status_sign'];
//           date_hod   = obj[a]['signed_date'];
//           sign_hodsr = obj[a]['signed_role'];
//         }
//         if(obj[a]['signed_role'] =='RELEASE' ){
//           sign_release  = obj[a]['status_sign'];
//           date_release  = obj[a]['signed_date'];
//           pic_release   = obj[a]['signed_by'];
//         } else {
//           sign_release  = "NOT RELEASE";
//           date_release  = "-";
//           pic_release   = "-";
//         }

        
        
//         //Engineer Sign Check
//         if(sign_c =="NOT SIGN"){
//           if(pic_c === Udecrypt){
//             $('#cyclests_e').html('<a class="ui small label teal ensign" hc="'+picc_hc+'" nm="'+pic_c+'" rl="CYCLE UNIT">SIGN</a>');
//             $('#cycledate_e').text('');
//             EnSign();
//           } else {
//             $('#cyclests_e').html('<label class="ui small label disabled">'+sign_e+'</label>');
//             $('#cycledate_e').text(date_c);  
//           }
//         } else {
//           $('#cyclests_e').html('<label class="ui basic small label teal">Signed</label>');
//           $('#cycledate_e').text(date_c);
//         }
//         if(sign_e =="NOT SIGN"){
//           if(pic_e === Udecrypt){
//             $('#electsts_e').html('<a class="ui small label teal ensign" hc="'+picc_he+'" nm="'+pic_e+'" rl="ELECTRONIC HARDWARE">SIGN</a>');
//             $('#electdate_e').text('');
//             EnSign();
//           } else {
//             $('#electsts_e').html('<label class="ui small label disabled">'+sign_e+'</label>');
//             $('#electdate_e').text(date_e);  
//           }
//         } else {
//           $('#electsts_e').html('<label class="ui basic small label teal">Signed</label>');
//           $('#electdate_e').text(date_e);
//         }
//         if(sign_m =="NOT SIGN"){
//           if(pic_m === Udecrypt){
//             $('#mdsts_e').html('<a class="ui small label teal ensign" hc="'+picc_hm+'" nm="'+pic_m+'" rl="MECHANICAL DESIGN">SIGN</a>');
//             $('#mddate_e').text('');
//             EnSign();
//           } else {
//             $('#mdsts_e').html('<label class="ui small label disabled">'+sign_m+'</label>');
//             $('#mddate_e').text(date_m);  
//           }
//         } else {
//           $('#mdsts_e').html('<label class="ui basic small label teal">Signed</label>');
//           $('#mddate_e').text(date_m);
//         }
//         if(sign_i =="NOT SIGN"){
//           if(pic_i === Udecrypt){
//             $('#idsts_e').html('<a class="ui small label teal ensign" hc="'+picc_hi+'" nm="'+pic_i+'" rl="INDUSTRIAL DESIGN">SIGN</a>');
//             $('#iddate_e').text('');
//             EnSign();
//           } else {
//             $('#idsts_e').html('<label class="ui small label disabled">'+sign_i+'</label>');
//             $('#iddate_e').text(date_i);  
//           }
//         } else {
//           $('#idsts_e').html('<label class="ui basic small label teal">Signed</label>');
//           $('#iddate_e').text(date_i);
//         }

//         //Head Of Sign Check
//         if(sign_hc =="NOT SIGN" && sign_c =="SIGN" ){
//           if((sect_hc === Sdecrypt) && (jbtn_hc === Jdecrypt)){
//             if(picc_hc === Udecrypt){
//               $('#cyclests_h').html('<a class="ui small label teal hosign" nm="'+picc_hc+'" rl="HEAD OF CYCLE UNIT">SIGN</a>');
//               $('#cycledate_h').text('');
//               HOsign();
//             } else {
//               $('#cyclests_h').html('<a class="ui small label purple hosign" nm="'+picc_hc+'" rl="HEAD OF CYCLE UNIT">a.n. SIGN</a>');
//               $('#cycledate_h').text('');
//               HOsign();
//             }
//           } else {
//             $('#cyclests_h').html('<label class="ui small label disabled">'+sign_hc+'</label>');
//             $('#cycledate_h').text(date_hc);
//           }
//         } else if(sign_hc =="SIGN"){
//           $('#cyclests_h').html('<label class="ui basic small label teal">Checked</label>');
//           $('#cycledate_h').text(date_hc);
//         } else {
//           $('#cyclests_h').text('');
//           $('#cycledate_h').text('');
//         }

//         if(sign_he =="NOT SIGN" && sign_e =="SIGN"){
//           if((sect_he === Sdecrypt) && (jbtn_he === Jdecrypt)){
//             if(picc_he === Udecrypt){
//               $('#electsts_h').html('<a class="ui small label teal hosign" nm="'+picc_he+'" rl="HEAD OF ELECTRONIC HARDWARE">SIGN</a>');
//               $('#electdate_h').text('');
//               HOsign();
//             } else {
//               $('#electsts_h').html('<a class="ui small label purple hosign" nm="'+picc_he+'" rl="HEAD OF ELECTRONIC HARDWARE">a.n. SIGN</a>');
//               $('#electdate_h').text('');
//               HOsign();
//             }
//           } else {
//             $('#electsts_h').html('<label class="ui small label disabled">'+sign_he+'</label>');
//             $('#electdate_h').text(date_he);
//           }
//         } else if(sign_he =="SIGN") {
//           $('#electsts_h').html('<label class="ui basic small label teal">Checked</label>');
//           $('#electdate_h').text(date_he);
//         } else {
//           $('#electsts_h').text('');
//           $('#electdate_h').text('');
//         }

//         if(sign_hm =="NOT SIGN" && sign_m =="SIGN"){
//           if((sect_hm === Sdecrypt) && (jbtn_hm === Jdecrypt)){
//             if(picc_hm === Udecrypt){
//               $('#mdsts_h').html('<a class="ui small label teal hosign" nm="'+picc_hm+'" rl="HEAD OF MECHANICAL DESIGN">SIGN</a>');
//               $('#mddate_h').text('');
//               HOsign();
//             } else {
//               $('#mdsts_h').html('<a class="ui small label purple hosign" nm="'+picc_hm+'" rl="HEAD OF MECHANICAL DESIGN">a.n. SIGN</a>');
//               $('#mddate_h').text('');
//               HOsign();
//             }
//           } else {
//             $('#mdsts_h').html('<label class="ui small label disabled">'+sign_hm+'</label>');
//             $('#mddate_h').text(date_hm);
//           }
//         } else if(sign_hm =="SIGN"){
//           $('#mdsts_h').html('<label class="ui basic small label teal">Checked</label>');
//           $('#mddate_h').text(date_hm);
//         } else {
//           $('#mdsts_h').text('');
//           $('#mddate_h').text('');
//         }

//         if(sign_hi =="NOT SIGN" && sign_i =="SIGN"){
//           if((sect_hi === Sdecrypt) && (jbtn_hi === Jdecrypt)){
//             if(picc_hi === Udecrypt){
//               $('#idsts_h').html('<a class="ui small label teal hosign" nm="'+picc_hi+'" rl="HEAD OF INDUSTRIAL DESIGN">SIGN</a>');
//               $('#iddate_h').text('');
//               HOsign();
//             } else {
//               $('#idsts_h').html('<a class="ui small label purple hosign" nm="'+picc_hi+'" rl="HEAD OF INDUSTRIAL DESIGN">a.n. SIGN</a>');
//               $('#iddate_h').text('');
//               HOsign();
//             }
//           } else {
//             $('#idsts_h').html('<label class="ui small label disabled">'+sign_hi+'</label>');
//             $('#iddate_h').text(date_hi);
//           }
//         } else if(sign_hi =="SIGN"){
//           $('#idsts_h').html('<label class="ui basic small label teal">Checked</label>');
//           $('#iddate_h').text(date_hi);
//         } else {
//           $('#idsts_h').text('');
//           $('#iddate_h').text('');
//         }

//         //Head Of Group Product SIGN Check 
//         if((pic_c == "-") || ((pic_c != "-") && (sign_hc =="SIGN"))){
//           $stssign_c = true;
//         } else {
//           $stssign_c = false;
//         }

//         if((pic_e == "-") || ((pic_e != "-") && (sign_he =="SIGN"))){
//           $stssign_e = true;
//         } else {
//           $stssign_e = false;
//         }

//         if((pic_m == "-") || ((pic_m != "-") && (sign_hm =="SIGN"))){
//           $stssign_m = true;
//         } else {
//           $stssign_m = false;
//         }

//         if((pic_i == "-") || ((pic_i != "-") && (sign_hi =="SIGN"))){
//           $stssign_i = true;
//         } else {
//           $stssign_i = false;
//         }

//         if($stssign_c && $stssign_e && $stssign_m && $stssign_i){
//             if(sign_hog === "NOT SIGN"){
//               if(Jdecrypt === "HEAD OF GROUP"){
//                 $('#headofgroupdate').text('');
//                 $('#BtnSignHOG').text('Approve');
//                 $('#BtnSignHOG').removeClass('disabled grey basic');
//                 $('#BtnSignHOG').addClass('green');
//                 $('#BtnRejectHOG').show();
//               } else {
//                 $('#headofgroupdate').text(date_hog);
//                 $('#BtnSignHOG').text('Approve');
//                 $('#BtnSignHOG').addClass('basic grey disabled');
//                 $('#BtnSignHOG').removeClass('green');
//                 $('#BtnRejectHOG').hide();
//               }
//             } else {
//               $('#headofgroupdate').text(date_hog);
//               $('#BtnSignHOG').text('Approved');
//               $('#BtnSignHOG').addClass('green disabled basic');
//               $('#BtnSignHOG').removeClass('grey');
//               $('#BtnRejectHOG').hide();
//             }
//         } else {
//           $('#headofgroupdate').text('-');
//           $('#BtnSignHOG').addClass('basic grey disabled');
//           $('#BtnSignHOG').removeClass('green');
//           $('#BtnRejectHOG').hide();
//         }

//         //Project Leader SIGN Check 
//         if(sign_hog =="SIGN"){
//           if(sign_pl == "NOT SIGN"){
//             if((sect_pl === Sdecrypt) && (Jdecrypt === "PROJECT LEADER")){
//               $('#pldate').text('');
//               $('#BtnSignPL').text('Publish');
//               $('#BtnSignPL').removeClass('disabled grey basic');
//               $('#BtnSignPL').addClass('green');
//               $('#BtnRejectPL').show();
//             } else {
//               $('#pldate').text('');
//               $('#BtnSignPL').text('Publish');
//               $('#BtnSignPL').addClass('basic grey disabled');
//               $('#BtnSignPL').removeClass('green');
//               $('#BtnRejectPL').hide();
//             }
//           } else {
//             $('#pldate').text(date_pl);
//             $('#BtnSignPL').text('Published');
//             $('#BtnSignPL').addClass('green disabled basic');
//             $('#BtnSignHOG').removeClass('grey');
//             $('#BtnRejectPL').hide();
//           }
//         } else {
//           $('#pldate').text('-');
//           $('#BtnSignPL').text('Publish');
//           $('#BtnSignPL').addClass('basic grey disabled');
//           $('#BtnSignPL').removeClass('green');
//           $('#BtnRejectPL').hide();
//         }

//         // DQA Sign Check
//         if(sign_hod =="SIGN"){
//           $('#headofdqadate').text(date_hod);
//           $('#BtnSignHOD').text('Confirmed');
//           $('#BtnSignHOD').addClass('green');
//           $('#BtnSignHOD').removeClass('grey');
//           $('.TRFinalResult').show();
//         } else {
//           $('#headofdqadate').text('-');
//           $('#BtnSignHOD').text('Confirm');
//           $('#BtnSignHOD').addClass('grey');
//           $('#BtnSignHOD').removeClass('green');
//           $('.TRFinalResult').hide();
//         }

//         if(Udecrypt == obj[a]['pic']){
//           setCookie("SignRolePSC", obj[a]['signed_role'], 5);
//         }

//       }

//       // DQA Release PSC Check
//       

      
//     },
//     error: function () {
//       if (LogoutProtect){
//         //window.location.href = "./?link=loclogout";
//       } else {
//         Swal.fire("Error", "Server tidak merespon, segera hubungi Administrator di ext. 3553 !","error" );
//       }
//     },
//   });
// }

        if(progress_bp == "WAIT RELEASE"){
          $('#headofdqappicrelease').text('');
          $('#BtnSignRelease').text('Release');
          $('#BtnSignRelease').removeClass('disabled grey basic');
          $('#BtnSignRelease').addClass('green');
          $('#StsSignRelease').val('');
        } else if(status_bp == "RELEASE"){
          $('#headofdqappicrelease').text(pic_hod);
          $('#releasedate').text(date_release);
          $('#BtnSignRelease').text('Released');
          $('#BtnSignRelease').addClass('green basic');
          $('#BtnSignRelease').removeClass('disabled');
          $('#StsSignRelease').val('released');
          $('.PICcheckerlist').addClass('disabled');
        }else{
          $('#headofdqappicrelease').text('');
          $('#BtnSignRelease').text('-');
          $('#BtnSignRelease').addClass('basic grey disabled');
          $('#BtnSignRelease').removeClass('green');
          $('#StsSignRelease').val('released');
        }

  
var MTable = $('#Master').DataTable({
  "dom"       : "<'ui stackable grid'"+
                    "<'row'"+
                        "<'left aligned ten wide column'<'TitleNegoList'>>"+
                        "<'right aligned six wide column'f>"+
                    ">"+
                    "<'row dt-table'"+
                        "<'sixteen wide column'tr>"+
                    ">"+
                    "<'row'"+
                        "<'left aligned ten wide column'l>"+
                        "<'right aligned four wide column'p>"+
                    ">"+
                ">",
  "stateSave" : false,
  "pageLength"  : 10,
  "data"      : [],
  "order"     : [[ 0, "asc" ]],
  "language"  : { sLengthMenu: "_MENU_", search: "",searchPlaceholder: "Search.." },
  "columnDefs": [
              { type: 'natural', targets: 0 },

            ],
  "columns"   : [
    { "data"    : null, render    : function(data, type, row) 
      { return '<span class="actedit" enm="'+data["Deskripsi"]+'">'+data["Deskripsi"]+'</span>';
      }
    },
    { "data"    : null, render    : function(data, type, row) 
      { return '<span class="actedit" enm="'+data["PIC"]+'">'+data["PIC"]+'</span>';
      }
    },
    { "data"    : null, render    : function(data, type, row) 
      { return '<span class="actedit" enm="'+data["Date"]+'">'+data["Date"]+'</span>';
      }
    },
    { "data"    : null, render    : function(data, type, row) 
      { return '<i class="trash downloadbplengkap file pdf red icon" efile="BP/BPLengkap/'+data["NamaFile"]+'"></i>';
      }
    }
  ]
});

//Function Read Master File BP
function Master(){
  var vusrnm = getCookie('usrnm');
  var vtoken = getCookie('token');
  
  //Load Data Master Negosiator
  $.ajax({
    type: "POST",
    url: `${restlocbp}read_bplengkap`,
    headers: {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      id_bp    : idbp,
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
      
        //DRAW ARRAY KE DATATABLES
        MTable.clear();
        $.each(obj, function(index, value) {
          MTable.row.add(value);
        });
        MTable.draw();

        $("#Master").on("click", ".actedit", function(){
          var enm = $(this).attr('enm');
          $('#HeaderNegosiator').dropdown('set selected',enm);
          Swal.fire({
            text: 'Updated to Negosiator Input (Header)',
            timer: 1000,
            position: 'top-right',
            toast: true,
            showConfirmButton: false
          })
        });
      
      }
    },
    
    //JIKA ERROR TAMPILKAN PESAN ATAU LOGOUT
    error: function(){
      IsTimeOut(LogoutProtect);
    }
  });

}

//Fungsi Load PIC DQA
function LoadDataPICDQA(idc, chk){
  
  var idc = getCookie('IdValueBP');
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}bp/load-datachecker/`+idc,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      id_bp    : idbp,
      id_val  : idc,
      role    : chk
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      jmlobj = obj['read_checker'].length;
      $("#FinalResultDesigner").text(obj['read_result'][0]['result']);
      $("#FinalResultChecker").text(obj['read_result'][0]['result']);
      $("#VersiDesigner").text(obj['read_progress'][0]['no_progress']);
      $("#VersiChecker").text(obj['read_progress'][0]['no_progress']);
      if(obj['read_setting'][0]['kirim'] === "YES"){
        $('#cekwajibid').checkbox('set checked');
      }else{
        $('#cekwajibid').checkbox();
      }
      
      console.log(obj['read_result'][0]['result']);
      // $(".DesignerChecker1").dropdown("set selected", "ACHIRUL RIYADI");
      for (a = 0; a < jmlobj; a++) {
        if(obj['read_checker'][a]['section']==='ELECTRONIC'){
          if(obj['read_checker'][a]['role']==='Designer1'){
            // console.log(obj[a]['pic']);
            $(".DesignerChecker1").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner1").text();
            }else{
              $(".SignDesigner1").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD1").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD1").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD1").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD1").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          } else if(obj['read_checker'][a]['role']==='Designer2'){
            $(".DesignerChecker2").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner2").text();
            }else{
              $(".SignDesigner2").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD2").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD2").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD2").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD2").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          } else if(obj['read_checker'][a]['role']==='Designer3'){
            $(".DesignerChecker3").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner3").text();
            }else{
              $(".SignDesigner3").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD3").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD3").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD3").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD3").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          } else if(obj['read_checker'][a]['role']==='Designer4'){
            $(".DesignerChecker4").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner4").text();
            }else{
              $(".SignDesigner4").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD4").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD4").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD4").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD4").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          } else if(obj['read_checker'][a]['role']==='Designer5'){
            $(".DesignerChecker5").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner5").text();
            }else{
              $(".SignDesigner5").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD5").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD5").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD5").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD5").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          } else if(obj['read_checker'][a]['role']==='Designer6'){
            $(".DesignerChecker6").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner6").text();
            }else{
              $(".SignDesigner6").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD6").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD6").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD6").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD6").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          }else if(obj['read_checker'][a]['role']==='Designer7'){
            $(".DesignerChecker7").dropdown("set selected", obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignDesigner7").text();
            }else{
              $(".SignDesigner7").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultD7").html();
            }else{
              if(obj['read_checker'][a]['status_sign']==='SIGN'){
                $("#BtnFeedbackResultD7").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>&nbsp;&nbsp;");
                $("#UnsignD7").html("<a class='ui teal tiny label BtnUnsign' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'>Unsign</a>");
              }else{
                $("#BtnFeedbackResultD7").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
              }
            }
          }

          if(obj['read_checker'][a]['role']==='Checker1'){
            $("#Checker1").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker1").text();
            }else{
              $(".SignChecker1").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC1").html();
            }else{
              $("#BtnFeedbackResultC1").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          } else if(obj['read_checker'][a]['role']==='Checker2'){
            $("#Checker2").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker2").text();
            }else{
              $(".SignChecker2").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC2").html();
            }else{
              $("#BtnFeedbackResultC2").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          } else if(obj['read_checker'][a]['role']==='Checker3'){
            $("#Checker3").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker3").text();
            }else{
              $(".SignChecker3").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC3").html();
            }else{
              $("#BtnFeedbackResultC3").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          } else if(obj['read_checker'][a]['role']==='Checker4'){
            $("#Checker4").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker4").text();
            }else{
              $(".SignChecker4").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC4").html();
            }else{
              $("#BtnFeedbackResultC4").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          } else if(obj['read_checker'][a]['role']==='Checker5'){
            $("#Checker5").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker5").text();
            }else{
              $(".SignChecker5").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC5").html();
            }else{
              $("#BtnFeedbackResultC5").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          } else if(obj['read_checker'][a]['role']==='Checker6'){
            $("#Checker6").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker6").text();
            }else{
              $(".SignChecker6").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC6").html();
            }else{
              $("#BtnFeedbackResultC6").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          }else if(obj['read_checker'][a]['role']==='Checker7'){
            $("#Checker7").text(obj['read_checker'][a]['pic']);
            if(obj['read_checker'][a]['status_sign']==='NOT SIGN'){
              var sts_sign = 'Progress';
            } else {
              var sts_sign = 'Signed';
            }
            if(obj['read_checker'][a]['result']==='NOT OK'){
              var sts_result = 'NOT OK';
            } else if(obj['read_checker'][a]['result']==='-'){
              var sts_result = 'NOT CHECKED';
            } else{
              var sts_result = 'OK';
            }
            if(obj['read_checker'][a]['pic'] === ""){
              $(".SignChecker7").text();
            }else{
              $(".SignChecker7").text(sts_sign + ", "+ sts_result);
            }
            if(obj['read_checker'][a]['result'] === "-"){
              $("#BtnFeedbackResultC7").html();
            }else{
              $("#BtnFeedbackResultC7").html("<a class='ui teal tiny label BtnSignPIC' idchk='"+obj['read_checker'][a]['id_checker']+"' idvl='"+obj['read_checker'][a]['id_value']+"' role='"+obj['read_checker'][a]['role']+"'><i class='edit icon'></i></a>");
            }
          }
        
        }

        
        FungsiUnsign();
        FungsiSignPIC();
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });

}


function EnSign(){
  $('.ensign').click(function(){
    var rl = $(this).attr('rl');
    var nm = $(this).attr('nm');
    var hc = $(this).attr('hc');
    $(".xwinengineersign").modal({
        autofocus: false,
      }).modal("show");
    $("#PSCHOName").dropdown("clear");
    $("#PSCHOName").dropdown("set selected", hc);
    $('#pscsignrole').val(rl);
    $('#pscsignname').val(nm);
    // if(jmlvalue < 1){
    //   $('.engsigncek').hide();
    //   $('#infoengsign').html('Note: Tidak bisa SIGN krn value masih kosong semua, isikan minimal 1 value agar bisa SIGN dan dilanjutkan ke Proses berikutnya.<br>Jika sudah isi value dan tombol belum juga muncul, silakan refresh halaman ini (tekan F5).')
    // } else {
      $('.engsigncek').show();
      $('#infoengsign').text('');
    // }
  });
}




//Load Data Content ------------------------------
function LoadDataContent(section){

  if(section =="CYCLE"){
    var TC = "#TableContentC";
  } else if(section =="ELECTRONIC"){
    var TC = "#TableContentE";
  } else if(section =="MD"){
    var TC = "#TableContentM";
  } else if(section =="ID"){
    var TC = "#TableContentI";
  } 

  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : section,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if (isEmpty(obj)) {
        IsResponseEmptyObj();
      } else if (obj) {
        $(TC).empty();
        var Finalresult = 0;
        
        //List Level 1
        jmlDataa = obj["read_content"].length;
        jmlvalue = obj["read_value"].length;
        // console.log(jmlvalue);
        // var Sts = obj['read_sectionresult']['status'];
        // var Msg = obj['read_sectionresult']['message'];

        // if(obj['read_sectionprogress'][0]['c_section'] =='CYCLE' ){
        //   $('#VersiCy').text(obj['read_sectionprogress'][0]['no_progress']);
        //   var VCY = obj['read_sectionprogress'][0]['no_progress'];
        //   var RTNCYCLE = obj['read_sectionprogress'][0]['progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='ELECTRONIC' ){
        //   $('#VersiEl').text(obj['read_sectionprogress'][0]['no_progress']);
        //   var VEL = obj['read_sectionprogress'][0]['no_progress'];
        //   var RTNELECTRONIC = obj['read_sectionprogress'][0]['progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='MD' ){
        //   $('#VersiMD').text(obj['read_sectionprogress'][0]['no_progress']);
        //   var VMD = obj['read_sectionprogress'][0]['no_progress'];
        //   var RTNMD = obj['read_sectionprogress'][0]['progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='ID' ){
        //   $('#VersiID').text(obj['read_sectionprogress'][0]['no_progress']);
        //   var VID = obj['read_sectionprogress'][0]['no_progress'];
        //   var RTNID = obj['read_sectionprogress'][0]['progress'];
        // }
        // console.log(RTNCYRTNELECTRONICCLE)
        
        // if(obj['read_sectionprogress'][0]['c_section'] =='CYCLE' ){
        //   var progress_cy = obj['read_sectionprogress'][0]['no_progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='ELECTRONIC' ){
        //   var progress_el = obj['read_sectionprogress'][0]['no_progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='MD' ){
        //   var progress_md = obj['read_sectionprogress'][0]['no_progress'];
        // }
        // if(obj['read_sectionprogress'][0]['c_section'] =='ID' ){
        //   var progress_id = obj['read_sectionprogress'][0]['no_progress'];
        // }

        //status: false ; mess: NULL --> belum ada value / belum ada content
        //status: false ; mess: NA --> sudah ada value tb belum ada checker
        //status: false ; mess: NOT SIGN --> ada value & checker tp checker belum sign
        //status: false ; mess: NOT OK --> sudah ada value sudah di cek da sign tp hasil NOT OK
        //status: true  ; mess: OK --> ada value & checker sign, hasil OK semua

        //hide tombol ReOrder jika cuma 1 item
        if(jmlDataa < 2){
          $("#ID"+section).hide();
        } else {
          $("#ID"+section).show();
        }

        // console.log('Sts '+Sts);
        // console.log('Msg '+Msg);
        // console.log('sign_hog '+sign_hog);

        //cek ketika ada hasil yang masih ada yang NOT OK maka munculkan button sembali ke DQA
        // if(Sts === false && (Msg === 'NOT OK' || Msg === 'NOT SIGN' ) && sign_hog === 'SIGN'){
        //   $('#tablesendback'+section).show();
        // } else {
        //   $('#tablesendback'+section).hide();
        // }


        // if(section === "CYCLE"){
        //   if(RTNCYCLE == "RETURN DESIGNER"){
        //     $('#tablesendbackCYCLE').show();
        //   } else{
        //     $('#tablesendbackCYCLE').hide();
        //   }
        // }

        // if(section === "ELECTRONIC"){
        //   if(RTNELECTRONIC == "RETURN DESIGNER"){
        //     $('#tablesendbackELECTRONIC').show();
        //   } else{
        //     $('#tablesendbackELECTRONIC').hide();
        //   }
        // }

        // if(section === "MD"){
        //   if(RTNMD == "RETURN DESIGNER"){
        //     $('#tablesendbackMD').show();
        //   } else{
        //     $('#tablesendbackMD').hide();
        //   }
        // }

        // if(section === "ID"){
        //   if(RTNID == "RETURN DESIGNER"){
        //     $('#tablesendbackID').show();
        //   } else{
        //     $('#tablesendbackID').hide();
        //   }
        // }

        if(
           
           (Udecrypt === pic_c) ||
           (Udecrypt === pic_e) ||
           (Udecrypt === pic_m) ||
           (Udecrypt === pic_i) ||
           (Udecrypt === pic_hc) ||
           (Udecrypt === pic_he) ||
           (Udecrypt === pic_hm) ||
           (Udecrypt === pic_hi)
           )
        {

          //MODE EDITOR
          //kondisi ketika ada yang NOT OK dan designer diminta untuk meng-edit content value nya.
          $('#addgprlv1'+section).show();
          for (a = 0; a < jmlDataa; a++) {
            if(section === "ELECTRONIC"){
              $(TC).append(
                "<div class='active title'>"+
                  "<i class='dropdown icon'></i>"+obj["read_content"][a]['c_name']+" &nbsp;&nbsp;&nbsp;<span class='EditGroupFieldLv1 BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='edit small whiteicon icon '></i></span>"+
                "</div>"+
                // "<div class='active content'>"+
                // "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button green AddCheckDesigner BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>Designer Checker</span>"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
                // "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button AddCheckDQA BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>DQA Checker</span>"+ 
                // "</div>"+
                "<div class='active content'>"+
                  "<table class='ui very basic very compact table "+section+a+"'>"+
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button green AddCheckDesigner BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>Designer Checker</span>"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
                  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button AddCheckDQA BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>DQA Checker</span>"+
                    "<tbody>"+
                    "</tbody>"+
                  "</table>"+
                "</div>"
                
                );
            }else{
              $(TC).append(
                "<div class='active title'>"+
                  "<i class='dropdown icon'></i>"+obj["read_content"][a]['c_name']+" &nbsp;&nbsp;&nbsp;<span class='EditGroupFieldLv1 BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='edit small whiteicon icon '></i></span>"+
                "</div>"+
                // "<div class='active'>"+
                // "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button green AddCheckDesigner BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>Designer Checker</span>"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + 
                // "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='ui mini button AddCheckDQA BtnEditLv1"+section+"' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus small whiteicon icon '></i>DQA Checker</span>"+ 
                // "</div>"+
                "<div class='active content'>"+
                  "<table class='ui very basic very compact table "+section+a+"'>"+
                    "<tbody>"+
                    "</tbody>"+
                  "</table>"+
                "</div>"
                
                );
            }
            
            
            //List Level 2
            if (typeof obj["read_content"][a]['nodes'] !== "undefined") {
              jmlDatab = obj["read_content"][a]['nodes'].length;
              for (b = 0; b < jmlDatab; b++) {
                var id2 = obj["read_content"][a]['nodes'][b]['c_id'];
                var de2 = obj["read_content"][a]['nodes'][b]['c_name'];
                var at2 = obj["read_content"][a]['nodes'][b]['c_attrib'];
                var in2 = obj["read_content"][a]['nodes'][b]['c_input'];
                var op2 = obj["read_content"][a]['nodes'][b]['c_option'];
                // var do2 = obj["read_content"][a]['nodes'][b]['c_docs'];
                // var ad2 = do2.split(',');
                
                //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                // if($.inArray('NPI', ad2) > -1){
                //   var doc12 = "<div class='ui mini basic label teal'>NPI</div>"; 
                // }else if($.inArray('BP', ad2) > -1){
                //   var doc22 = "<div class='ui mini basic label grey'>BP</div>"; 
                // } else {
                  var doc12 = "";
                  var doc22 = "";
                // }
                
                //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 2
                var val2 = "";
                for (value_a = 0; value_a < jmlvalue; value_a++) {
                  var v_idc = obj["read_value"][value_a]['v_idcontent'];
                  if(id2 == v_idc){
                    var val2   = obj["read_value"][value_a]['v_value'];
                    var v_designer = obj["read_value"][value_a]['v_resultdesigner'];
                    var v_res2 = obj["read_value"][value_a]['v_result'];
                    var v_cek2 = obj["read_value"][value_a]['v_checker'];
                    var v_mainimage2 = obj["read_value"][value_a]['v_mainpic'];
                    break;
                  } else {
                    var v_res2 = "-";
                  }  
                }

                if(v_res2 === "OK"){
                  var iconresult2 = "<i class='check green icon'></i>";
                } else if (v_res2 === "NOT OK"){
                  var iconresult2 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                } else if ((v_res2 === "MODIF") && (v_cek2 !== null)){
                  var iconresult2 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                } else {
                  var iconresult2 = "";
                }

            

                if(at2==="YES"){
                  if(in2==="TEXT"){
                    console.log(section +a);
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                      "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"' ><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='41%' class='left aligned'><input class='inputpsc inputubahvalue' idc='"+id2+"' type='text' value='"+val2+"'></td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                      "<td width='10%' class='left aligned'>"+iconresult2+"</td>"+
                    "</tr>"
                    );

                  } else if(in2==="OPTION") {
                    var arr2 = op2.split(';');
                    var sel2 = "SelectLv2"+id2;
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                      "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"' ><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='41%' class='left aligned'>"+
                        "<select class='selectpsc dropdownubahvalue' id='"+sel2+"' idc='"+id2+"'>"+
                          "<option selected value='-'>-</option>"+
                        "</select>"+
                      "</td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"<input class='inputsection' type='hidden' value='"+section+"'></td>"+
                      "<td width='10%' class='left aligned'>"+iconresult2+"</td>"+
                    "</tr>"
                    );
                    // $('#'+sel2).empty();
                    $.each(arr2, function(key, value) {  
                      if( value === val2){ 
                        $('#'+sel2).append($("<option selected></option>").attr("value", value).text(value)); 
                      } else {
                        $('#'+sel2).append($("<option></option>").attr("value", value).text(value)); 
                      }
                    });
                  } else if(in2==="IMAGE") {
                    if (val2 ===""){
                      var dataimage2 = "Belum upload gambar yang dimaksud.";
                      var textupload2 = "Upload Gambar";
                      var mimg2 = "";
                      var delimg2 = "";
                    } else {
                      var dataimage2 = "<img width='350' src='../RND_Upload/BP/Modul/"+val2+"'>";
                      var textupload2 = "Re-Upload Gambar";
                      var delimg2 = "<div class='ui mini label red hapusgambar' idc='"+id2+"'>Hapus</div>";

                      if (v_mainimage2 =="NO"){
                        var mimg2 = "<div class='ui mini label orange tandaigambar' idc='"+id2+"'>Jadikan gambar utama produk PSC.pdf</div>";
                      } else {
                        var mimg2 = "<div class='ui mini label basic'>Gambar ini sebagai gambar utama</div>";
                      }


                    }

                    
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                      "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"' ><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='41%' class='left aligned'><br>"+dataimage2+"<br><br><div class='ui mini label teal uploadimage' idc='"+id2+"'>"+textupload2+"</div>"+delimg2+mimg2+"</td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                      "<td width='10%' class='left aligned'>"+iconresult2+"</td>"+
                    "</tr>"
                    );
                  } else if(in2==="FILE") {
                    if (val2 ===""){
                      var datafile2 = "Belum upload file yang dimaksud.";
                      var textfile2 = "Upload File";
                    } else {
                      var datafile2 = "<a href='../RND_Upload/BP/Modul/"+val2+"' target='_blank'>"+val2+"</a>";
                      var textfile2 = "Re-Upload File";
                    }
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                      "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"'><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='41%' class='left aligned'><br>"+datafile2+"<br><br><div class='ui mini label teal uploadfile' idc='"+id2+"'>"+textfile2+"</div></td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                      "<td width='10%' class='left aligned'>"+iconresult2+"</td>"+
                    "</tr>"
                    );



                  } else if(in2==="MULTIPLE") {
                    val2x = val2.replaceAll(";", " - ");
                    $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                        "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"' ><span class='sub1'>"+de2+"</span></td>"+
                        "<td width='41%' class='left aligned '><div class='inputmultiple EditInputMultiple'  idc='"+id2+"' idv='"+val2+"'><span>"+val2x+"</span> <div>"+
                        "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                        "<td width='10%' class='left aligned'>"+iconresult2+"</td>"+
                      "</tr>"
                      );
                  }


                } else {
                  $('.'+section+a).find("tbody").append(
                  "<tr>"+
                    "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L3' idx='"+id2+"' nm='"+de2+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                    "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L2' idx='"+id2+"' nm='"+de2+"' atx='"+at2+"' inx='"+in2+"' opx='"+op2+"' ><span class='sub1'>"+de2+"</span></td>"+
                    "<td width='41%' class='left aligned'></td>"+
                    "<td width='15%' class='left aligned'></td>"+
                    "<td width='10%' class='left aligned'></td>"+
                  "</tr>"
                    
                  );
                }

                //List Level 3
                if (typeof obj["read_content"][a]['nodes'][b]['nodes'] !== 'undefined'){
                  jmlDatac = obj["read_content"][a]['nodes'][b]['nodes'].length;
                  for (c = 0; c < jmlDatac; c++) {
                    var id3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_id'];
                    var de3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_name'];
                    var at3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_attrib'];
                    var in3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_input'];
                    var op3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_option'];
                    
                    //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                    
                      var doc13 = "";
                      var doc23 = "";
                    //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 3
                    var val3= "";
                    for (value_a = 0; value_a < jmlvalue; value_a++) {
                      var v_idc = obj["read_value"][value_a]['v_idcontent'];
                      if(id3 == v_idc){
                        var val3   = obj["read_value"][value_a]['v_value'];
                        var v_res3 = obj["read_value"][value_a]['v_result'];
                        var v_cek3 = obj["read_value"][value_a]['v_checker'];
                        var v_mainimage3 = obj["read_value"][value_a]['v_mainpic'];
                        break;
                      } else {
                        var v_res3 = "-";
                      } 
                    }

                    if(v_res3 === "OK"){
                      var iconresult3 = "<i class='check green icon'></i>";
                    } else if (v_res3 === "NOT OK"){
                      var iconresult3 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                    } else if ((v_cek3 === "MODIF") && (v_cek3 !== null)){
                      var iconresult3 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                    } else {
                      var iconresult3 = "";
                    }
                                    
                    if(at3==="YES"){
                      if(in3==="TEXT"){
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                          "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='41%' class='left aligned'><input class='inputpsc inputubahvalue' idc='"+id3+"' type='text' value='"+val3+"'></td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                        "</tr>"
                        );
        
                      } else if(in3==="OPTION") {
                        var arr3 = op3.split(';');
                        var sel3 = "SelectLv2"+id3;
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                          "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='41%' class='left aligned'>"+
                            "<select class='selectpsc dropdownubahvalue' id='"+sel3+"' idc='"+id3+"'>"+
                              "<option selected value='-'>-</option>"+
                            "</select>"+
                          "</td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                        "</tr>"
                        );
                        $.each(arr3, function(key, value) {  
                          if( value === val3){ 
                            $('#'+sel3).append($("<option selected></option>").attr("value", value).text(value)); 
                          } else {
                            $('#'+sel3).append($("<option></option>").attr("value", value).text(value)); 
                          }
                        });
        
                      } else if(in3==="IMAGE") {
                        if (val3 ===""){
                          var dataimage3 = "Belum upload gambar yang dimaksud.";
                          var textupload3 = "Upload Gambar";
                          var mimg3 = "";
                          var delimg3 = "";
                        } else {
                          var dataimage3 = "<img width='350' src='../RND_Upload/BP/Modul/"+val3+"'>";
                          var textupload3 = "Re-Upload Gambar";
                          var delimg3 = "<div class='ui mini label red hapusgambar' idc='"+id3+"'>Hapus</div>";

                          if (v_mainimage3 =="NO"){
                            var mimg3 = "<div class='ui mini label orange tandaigambar' idc='"+id3+"'>Jadikan gambar utama produk PSC.pdf</div>";
                          } else {
                            var mimg3 = "<div class='ui mini label basic'>Gambar ini sebagai gambar utama</div>";
                          }

                        }
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                          "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='41%' class='left aligned'><br>"+dataimage3+"<br><br><div class='ui mini label teal uploadimage' idc='"+id3+"'>"+textupload3+"</div>"+delimg3+mimg3+"</td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                        "</tr>"
                        );
                      } else if(in3==="FILE") {
                        if (val3 ===""){
                          var datafile3 = "Belum upload file yang dimaksud.";
                          var textfile3 = "Upload File";
                        } else {
                          var datafile3 = "<a href='../RND_Upload/BP/Modul/"+val3+"' target='_blank'>"+val3+"</a>";
                          var textfile3 = "Re-Upload File";
                        }
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                          "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='41%' class='left aligned'><br>"+datafile3+"<br><br><div class='ui mini label teal uploadfile' idc='"+id3+"'>"+textfile3+"</div></td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned'>"+iconresult3+"</td>"+
                        "</tr>"
                        );
                      } else if(in3==="MULTIPLE") {
                        val3x = val3.replaceAll(";", " - ");
                        $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                            "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                            "<td width='41%' class='left aligned '><div class='inputmultiple EditInputMultiple'  idc='"+id3+"' idv='"+val3+"'><span>"+val3x+"</span> <div>"+
                            "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                            "<td width='10%' class='left aligned'>"+iconresult3+"</td>"+
                          "</tr>"
                          );
                      }
        
                    } else {
                      $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L4' idx='"+id3+"' nm='"+de3+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                        "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L3' idx='"+id3+"' nm='"+de3+"' atx='"+at3+"' inx='"+in3+"' opx='"+op3+"' ><span class='sub2'>"+de3+"</span></td>"+
                        "<td width='41%' class='left aligned'></td>"+
                        "<td width='15%' class='left aligned'></td>"+
                        "<td width='10%' class='left aligned' ></td>"+
                      "</tr>"
                      );
                    }


                    //List Level 4
                    if (typeof obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'] !== 'undefined'){
                      jmlDatad = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'].length;
                      for (d = 0; d < jmlDatad; d++) {
                        var id4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_id'];
                        var de4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_name'];
                        var at4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_attrib'];
                        var in4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_input'];
                        var op4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_option'];
                        
                          var doc14 = "";
                          var doc24 = "";

                        //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 4
                        var val4= "";
                        for (value_a = 0; value_a < jmlvalue; value_a++) {
                          var v_idc = obj["read_value"][value_a]['v_idcontent'];
                          if(id4 == v_idc){
                            var val4   = obj["read_value"][value_a]['v_value'];
                            var v_res4 = obj["read_value"][value_a]['v_result'];
                            var v_cek4 = obj["read_value"][value_a]['v_checker'];
                            var v_mainimage4 = obj["read_value"][value_a]['v_mainpic'];
                            break;
                          } else {
                            var v_res4 = "-";
                          } 
                        }

                        if(v_res4 === "OK"){
                          var iconresult4 = "<i class='check green icon'></i>";
                        } else if (v_res4 === "NOT OK"){
                          var iconresult4 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                        } else if ((v_cek4 === "MODIF") && (v_cek4 !== null)){
                          var iconresult4 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                        } else {
                          var iconresult4 = "";
                        }

                        if(at4==="YES"){
                          if(in4==="TEXT"){
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                              "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='41%' class='left aligned'><input class='inputpsc inputubahvalue' idc='"+id4+"' type='text' value='"+val4+"'></td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                            "</tr>"
                            );
            
                          } else if(in4==="OPTION") {
                            var arr4 = op4.split(';');
                            var sel4 = "SelectLv2"+id4;
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                              "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='41%' class='left aligned'>"+
                                "<select class='selectpsc dropdownubahvalue' id='"+sel4+"' idc='"+id4+"'>"+
                                  "<option selected value='-'>-</option>"+
                                "</select>"+
                              "</td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                            "</tr>"
                            );
                            $.each(arr4, function(key, value) {  
                              if( value === val4){ 
                                $('#'+sel4).append($("<option selected></option>").attr("value", value).text(value)); 
                              } else {
                                $('#'+sel4).append($("<option></option>").attr("value", value).text(value)); 
                              }
                            });
            
                          } else if(in4==="IMAGE") {
                            if (val4 ===""){
                              var dataimage4 = "Belum upload gambar yang dimaksud.";
                              var textupload4 = "Upload Gambar";
                              var mimg4 = "";
                              var delimg4 = "";
                            } else {
                              var dataimage4 = "<img width='350' src='../RND_Upload/BP/Modul/"+val4+"'>";
                              var textupload4 = "Re-Upload Gambar";
                              var delimg4 = "<div class='ui mini label red hapusgambar' idc='"+id4+"'>Hapus</div>";

                              if (v_mainimage4 =="NO"){
                                var mimg4 = "<div class='ui mini label orange tandaigambar' idc='"+id4+"'>Jadikan gambar utama produk PSC.pdf</div>";
                              } else {
                                var mimg4 = "<div class='ui mini label basic'>Gambar ini sebagai gambar utama</div>";
                              }

                            }
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                              "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='41%' class='left aligned'><br>"+dataimage4+"<br><br><div class='ui mini label teal uploadimage' idc='"+id4+"'>"+textupload4+"</div>"+delimg4+mimg4+"</td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                            "</tr>"
                            );
                          } else if(in4==="FILE") {
                            if (val4 ===""){
                              var datafile4 = "Belum upload file yang dimaksud.";
                              var textfile4 = "Upload File";
                            } else {
                              var datafile4 = "<a href='../RND_Upload/BP/Modul/"+val4+"' target='_blank'>"+val4+"</a>";
                              var textfile4 = "Re-Upload File";
                            }
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                              "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='41%' class='left aligned'><br>"+datafile4+"<br><br><div class='ui mini label teal uploadfile' idc='"+id4+"'>"+textfile4+"</div></td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned'>"+iconresult4+"</td>"+
                            "</tr>"
                            );
                          } else if(in4==="MULTIPLE") {
                            val4x = val4.replaceAll(";", " - ");
                            $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                                "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                                "<td width='41%' class='left aligned '><div class='inputmultiple EditInputMultiple'  idc='"+id4+"' idv='"+val4+"'><span>"+val4x+"</span> <div>"+
                                "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                                "<td width='10%' class='left aligned'>"+iconresult4+"</td>"+
                              "</tr>"
                              );
                          }
            
                        } else {
                          $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='4%' class='right aligned AddChildField' sect='"+section+"' lv='L5' idx='"+id4+"' nm='"+de4+"'><i class='plus whiteicon link small square outline icon addchild BtnAddChild"+section+"'></td>"+
                            "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L4' idx='"+id4+"' nm='"+de4+"' atx='"+at4+"' inx='"+in4+"' opx='"+op4+"' ><span class='sub3'>"+de4+"</span></td>"+
                            "<td width='41%' class='left aligned'></td>"+
                            "<td width='15%' class='left aligned'></td>"+
                            "<td width='10%' class='left aligned' ></td>"+
                          "</tr>"
                          );
                        }

                        //List Level 5
                        if (typeof obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'] !== 'undefined'){
                          jmlDatae = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'].length;
                          for (e = 0; e < jmlDatae; e++) {
                            var id5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_id'];
                            var de5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_name'];
                            var at5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_attrib'];
                            var in5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_input'];
                            var op5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_option'];
                            
                              var doc15 = "";
                              var doc25 = "";

                            //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 5
                            var val5= "";
                            for (value_a = 0; value_a < jmlvalue; value_a++) {
                              var v_idc = obj["read_value"][value_a]['v_idcontent'];
                              if(id5 == v_idc){
                                var val5   = obj["read_value"][value_a]['v_value'];
                                var v_res5 = obj["read_value"][value_a]['v_result'];
                                var v_cek5 = obj["read_value"][value_a]['v_checker'];
                                var v_mainimage5 = obj["read_value"][value_a]['v_mainpic'];
                                break;
                              } else {
                                var v_res5 = "-";
                              }  
                            }

                            if(v_res5 === "OK"){
                              var iconresult5 = "<i class='check green icon'></i>";
                            } else if (v_res5 === "NOT OK"){
                              var iconresult5 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                            } else if ((v_cek5 === "MODIF") && (v_cek5 !== null)){
                              var iconresult5 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                            } else {
                              var iconresult5 = "";
                            }

                            if(at5==="YES"){
                              if(in5==="TEXT"){
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                  "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='41%' class='left aligned'><input class='inputpsc inputubahvalue' idc='"+id5+"' type='text' value='"+val5+"'></td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                "</tr>"
                                );
                
                              } else if(in5==="OPTION") {
                                var arr5 = op5.split(';');
                                var sel5 = "SelectLv2"+id5;
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                  "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='41%' class='left aligned'>"+
                                    "<select class='selectpsc dropdownubahvalue' id='"+sel5+"' idc='"+id5+"'>"+
                                      "<option selected value='-'>-</option>"+
                                    "</select>"+
                                  "</td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                "</tr>"
                                );
                                $.each(arr5, function(key, value) {  
                                  if( value === val5){ 
                                    $('#'+sel5).append($("<option selected></option>").attr("value", value).text(value)); 
                                  } else {
                                    $('#'+sel5).append($("<option></option>").attr("value", value).text(value)); 
                                  }
                                });
                
                              } else if(in5==="IMAGE") {
                                if (val5 ===""){
                                  var dataimage5 = "Belum upload gambar yang dimaksud.";
                                  var textupload5 = "Upload Gambar";
                                  var mimg5= "";
                                  var delimg5 = "";
                                } else {
                                  var dataimage5 = "<img width='350' src='../RND_Upload/BP/Modul/"+val5+"'>";
                                  var textupload5 = "Re-Upload Gambar";
                                  var delimg5 = "<div class='ui mini label red hapusgambar' idc='"+id5+"'>Hapus</div>";

                                  if (v_mainimage5 =="NO"){
                                    var mimg5 = "<div class='ui mini label orange tandaigambar' idc='"+id5+"'>Jadikan gambar utama produk PSC.pdf</div>";
                                  } else {
                                    var mimg5 = "<div class='ui mini label basic'>Gambar ini sebagai gambar utama</div>";
                                  }

                                }
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                  "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='41%' class='left aligned'><br>"+dataimage5+"<br><br><div class='ui mini label teal uploadimage' idc='"+id5+"'>"+textupload5+"</div>"+delimg5+mimg5+"</td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                "</tr>"
                                );
                              } else if(in5==="FILE") {
                                if (val5 ===""){
                                  var datafile5 = "Belum upload file yang dimaksud.";
                                  var textfile5 = "Upload File";
                                } else {
                                  var datafile5 = "<a href='../RND_Upload/BP/Modul/"+val5+"' target='_blank'>"+val5+"</a>";
                                  var textfile5 = "Re-Upload File";
                                }
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                  "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='41%' class='left aligned'><br>"+datafile5+"<br><br><div class='ui mini label teal uploadfile' idc='"+id5+"'>"+textfile5+"</div></td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned'>"+iconresult5+"</td>"+
                                "</tr>"
                                );
                              } else if(in5==="MULTIPLE") {
                                val5x = val5.replaceAll(";", " - ");
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                  "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='41%' class='left aligned '><div class='inputmultiple EditInputMultiple'  idc='"+id5+"' idv='"+val5+"'><span>"+val5x+"</span> <div>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned'>"+iconresult5+"</td>"+
                                "</tr>"
                                );
                              }
                
                            } else {
                              $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='4%' class='right aligned ' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"'></td>"+
                                "<td width='30%' class='left aligned EditChildField BtnEditCh"+section+"' sect='"+section+"' lv='L5' idx='"+id5+"' nm='"+de5+"' atx='"+at5+"' inx='"+in5+"' opx='"+op5+"' ><span class='sub4'>"+de5+"</span></td>"+
                                "<td width='41%' class='left aligned'></td>"+
                                "<td width='15%' class='left aligned'></td>"+
                                "<td width='10%' class='left aligned' ></td>"+
                              "</tr>"
                              );
                            }
                          }

                          if(jmlDatae > 1){
                            $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='97%' colspan ='5' class='left aligned '>"+
                                  "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                                  "<div class='ui tealish tiny label SortGroupFieldLv5' sect='"+section+"' idx='"+obj['read_content'][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_id']+"'><i class='random icon'></i>Lv5</div>"+
                                "</td>"+
                              "</tr>"
                            );
                          }

                        }
                      }

                      if(jmlDatad > 1){
                        $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='97%' colspan ='5' class='left aligned '>"+
                              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                              "<div class='ui tealish tiny label SortGroupFieldLv4' sect='"+section+"' idx='"+obj['read_content'][a]['nodes'][b]['nodes'][c]['c_id']+"'><i class='random icon'></i>Lv4</div>"+
                            "</td>"+
                          "</tr>"
                        );
                      }

                    }
                  }
                  if(jmlDatac > 1){
                    $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='97%' colspan ='5' class='left aligned '>"+
                          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                          "<div class='ui tealish tiny label SortGroupFieldLv3' sect='"+section+"' idx='"+obj['read_content'][a]['nodes'][b]['c_id']+"'><i class='random icon'></i>Lv3</div>"+
                        "</td>"+
                      "</tr>"
                    );
                  }

                }

                
              
              }
              if(jmlDatab > 1){
                // console.log(section + "1");
                $('.'+section+a).find("tbody").append(
                  "<tr>"+
                    "<td width='97%' colspan ='5' class='left aligned '>"+
                    "<span class='sub1 BtnAddLv2"+section+"'>"+
                      "&nbsp;&nbsp;&nbsp;&nbsp;<div class='ui redish tiny label AddChildField' sect='"+section+"' lv='L2' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus circle icon'></i> Add Sub Item for: "+obj['read_content'][a]['c_name']+"</div>"+
                      "<div class='ui tealish tiny label SortGroupFieldLv2' sect='"+section+"' idx='"+obj['read_content'][a]['c_id']+"'><i class='random icon'></i>Lv2</div>"+
                    "</span></td>"+
                  "</tr>"
                );
              } else {
                // console.log(section + "2");
                $('.'+section+a).find("tbody").append(
                  "<tr>"+
                    "<td width='97%' colspan ='5' class='left aligned '>"+
                    "<span class='sub1 BtnAddLv2"+section+"'>"+
                      "&nbsp;&nbsp;&nbsp;&nbsp;<div class='ui redish tiny label AddChildField' sect='"+section+"' lv='L2' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus circle icon'></i> Add Sub Item for: "+obj['read_content'][a]['c_name']+"</div>"+
                    "</span></td>"+
                  "</tr>"
                );
              }
            } else {
              // console.log(section +a);
              $('.'+section+a).find("tbody").append(
                "<tr>"+
                  "<td width='97%' colspan ='5' class='left aligned ' >"+
                  "<span class='sub1 BtnAddLv2"+section+"'>"+
                    "&nbsp;&nbsp;&nbsp;&nbsp;<div class='ui redish tiny label AddChildField' sect='"+section+"' lv='L2' idx='"+obj['read_content'][a]['c_id']+"' nm='"+obj['read_content'][a]['c_name']+"'><i class='plus circle icon'></i> Add Sub Item for: "+obj['read_content'][a]['c_name']+"</div>"+
                  "</span></td>"+
                "</tr>"
              );
            }
          }

        }
         else {
          // MODE VIEWER
          //kondisi ketika PIC dqa masih ada yang proses dan masih ada yg belum sign ATAU hasil sudah OK dan sudah sign semua
          $('#addgprlv1'+section).hide();
          for (a = 0; a < jmlDataa; a++) {

            $(TC).append(
            "<div class='active title'>"+
              "<i class='dropdown icon'></i>"+obj["read_content"][a]['c_name']+
            "</div>"+
            "<div class='active content'>"+
              "<table class='ui very basic very compact table "+section+a+"'>"+
                "<tbody>"+
                "</tbody>"+
              "</table>"+
            "</div>"
            );
            
            //List Level 2
            if (typeof obj["read_content"][a]['nodes'] !== "undefined") {
              jmlDatab = obj["read_content"][a]['nodes'].length;
              for (b = 0; b < jmlDatab; b++) {
                var id2 = obj["read_content"][a]['nodes'][b]['c_id'];
                var de2 = obj["read_content"][a]['nodes'][b]['c_name'];
                var at2 = obj["read_content"][a]['nodes'][b]['c_attrib'];
                var in2 = obj["read_content"][a]['nodes'][b]['c_input'];
                var op2 = obj["read_content"][a]['nodes'][b]['c_option'];
                // var do2 = obj["read_content"][a]['nodes'][b]['c_docs'];
                // var ad2 = do2.split(',');
                
                //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                // if($.inArray('NPI', ad2) > -1){
                //   var doc12 = "<div class='ui mini basic label teal'>NPI</div>"; 
                // } else {
                  var doc12 = "";
                // }
                // if($.inArray('BP', ad2) > -1){
                //   var doc22 = "<div class='ui mini basic label grey'>BP</div>"; 
                // } else {
                  var doc22 = "";
                // }
                
                //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 2
                var val2 = "";
                for (value_a = 0; value_a < jmlvalue; value_a++) {
                  var v_idc = obj["read_value"][value_a]['v_idcontent'];
                  if(id2 == v_idc){
                    var val2 = obj["read_value"][value_a]['v_value'];
                    var v_res2 = obj["read_value"][value_a]['v_result'];
                    var v_designer = obj["read_value"][value_a]['v_result'];
                    // console.log();
                    // var v_res2 = obj["read_value"][value_a]['v_result'];
                    var v_cek2 = obj["read_value"][value_a]['v_checker'];
                    break;
                  } else {
                    var v_res2 = "-";
                  }  
                  if(!v_res2){
                    v_res2 = "-";
                  }
                  if(v_res2 === "NOT OK" || v_res2 === "-" || v_res2 === "MODIF"){
                    Finalresult++
                  }
                }

                if(v_res2 === "OK"){
                  var iconresult2 = "<i class='check green icon'></i>";
                } else if (v_res2 === "NOT OK"){
                  var iconresult2 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                } else if ((v_res2 === "MODIF") && (v_cek2 !== null)){
                  var iconresult2 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                } else {
                  var iconresult2 = "";
                }

                if(at2==="YES"){
                  if(in2==="IMAGE"){
                    if (val2 ===""){
                      var dataimage2 = "Belum upload gambar yang dimaksud.";
                    } else {
                      var dataimage2 = "<img width='350' src='../RND_Upload/BP/Modul/"+val2+"'>";
                    }
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='2%' class='right aligned'></td>"+
                      "<td width='30%' class='left aligned'><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='43%' class='left aligned'>"+dataimage2+"</td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                      "<td width='10%' class='left aligned' >"+iconresult2+"</td>"+
                    "</tr>"
                    );
                  } else if(in2==="FILE"){
                    if (val2 ===""){
                      var datafile2 = "Belum upload file yang dimaksud.";
                    } else {
                      var datafile2 = "<a href='../RND_Upload/BP/Modul/"+val2+"' target='_blank'>"+val2+"</a>";
                    }
                    $('.'+section+a).find("tbody").append(
                    "<tr>"+
                      "<td width='2%' class='right aligned'></td>"+
                      "<td width='30%' class='left aligned'><span class='sub1'>"+de2+"</span></td>"+
                      "<td width='43%' class='left aligned'>"+datafile2+"</td>"+
                      "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                      "<td width='10%' class='left aligned' >"+iconresult2+"</td>"+
                    "</tr>"
                    );
                  } else if(in2==="MULTIPLE"){
                    $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='2%' class='right aligned'></td>"+
                        "<td width='30%' class='left aligned'><span class='sub1'>"+de2+"</span></td>"+
                        "<td width='43%' class='left aligned'>"+val2.replaceAll(';', ' - ')+"</td>"+
                        "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                        "<td width='10%' class='left aligned' >"+iconresult2+"</td>"+
                      "</tr>"
                    );
                  } else {
                    $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='2%' class='right aligned'></td>"+
                        "<td width='30%' class='left aligned'><span class='sub1'>"+de2+"</span></td>"+
                        "<td width='43%' class='left aligned'>"+val2+"</td>"+
                        "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                        "<td width='10%' class='left aligned' >"+iconresult2+"</td>"+
                      "</tr>"
                    );
                  }
                } else {
                  $('.'+section+a).find("tbody").append(
                  "<tr>"+
                    "<td width='2%' class='right aligned'></td>"+
                    "<td width='30%' class='left aligned'><span class='sub1'>"+de2+"</span></td>"+
                    "<td width='43%' class='left aligned'></td>"+
                    "<td width='15%' class='left aligned'>"+doc12+doc22+"</td>"+
                    "<td width='10%' class='left aligned' >"+iconresult2+"</td>"+
                  "</tr>"
                  );
                }

                //List Level 3
                if (typeof obj["read_content"][a]['nodes'][b]['nodes'] !== 'undefined'){
                  jmlDatac = obj["read_content"][a]['nodes'][b]['nodes'].length;
                  for (c = 0; c < jmlDatac; c++) {
                    var id3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_id'];
                    var de3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_name'];
                    var at3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_attrib'];
                    var in3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_input'];
                    var op3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_option'];
                    // var do3 = obj["read_content"][a]['nodes'][b]['nodes'][c]['c_docs'];
                    // var ad3 = do3.split(',');
                    
                    //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                    // if($.inArray('NPI', ad3) > -1){
                    //   var doc13 = "<div class='ui mini basic label teal'>NPI</div>"; 
                    // } else {
                      var doc13 = "";
                    // }
                    // if($.inArray('BP', ad3) > -1){
                    //   var doc23 = "<div class='ui mini basic label grey'>BP</div>"; 
                    // } else {
                      var doc23 = "";
                    // }

                    //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 3
                    var val3= "";
                    for (value_a = 0; value_a < jmlvalue; value_a++) {
                      var v_idc = obj["read_value"][value_a]['v_idcontent'];
                      if(id3 == v_idc){
                        var val3 = obj["read_value"][value_a]['v_value'];
                        var v_res3 = obj["read_value"][value_a]['v_result'];
                        var v_res = obj["read_value"][value_a]['v_result'];
                        var v_cek3 = obj["read_value"][value_a]['v_checker'];
                        break;
                      } else {
                        var v_res3 = "-";
                      } 
                      if(!v_res3){
                        v_res3 = "-";
                      }
                      if(v_res3 === "NOT OK" || v_res3 === "-" || v_res3 === "MODIF"){
                        Finalresult++
                      }
                    }

                    if(v_res3 === "OK"){
                      var iconresult3 = "<i class='check green icon'></i>";
                    } else if (v_res3 === "NOT OK"){
                      var iconresult3 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                    } else if ((v_cek3 === "MODIF") && (v_cek3 !== null)){
                      var iconresult3 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                    } else {
                      var iconresult3 = "";
                    }
                                    
                    if(at3==="YES"){
                      if(in3==="IMAGE"){
                        if (val3 ===""){
                          var dataimage3 = "Belum upload gambar yang dimaksud.";
                        } else {
                          var dataimage3 = "<img width='350' src='../RND_Upload/BP/Modul/"+val3+"'>";
                        }
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='2%' class='right aligned'></td>"+
                          "<td width='30%' class='left aligned'><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='43%' class='left aligned'>"+dataimage3+"</td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                        "</tr>"
                        );
                      } else if(in3==="FILE"){
                        if (val3 ===""){
                          var datafile3 = "Belum upload file yang dimaksud.";
                        } else {
                          var datafile3 = "<a href='../RND_Upload/BP/Modul/"+val3+"' target='_blank'>"+val3+"</a>";
                        }
                        $('.'+section+a).find("tbody").append(
                        "<tr>"+
                          "<td width='2%' class='right aligned'></td>"+
                          "<td width='30%' class='left aligned'><span class='sub2'>"+de3+"</span></td>"+
                          "<td width='43%' class='left aligned'>"+datafile3+"</td>"+
                          "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                          "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                        "</tr>"
                        );
                      } else if(in3==="MULTIPLE"){
                        $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='2%' class='right aligned'></td>"+
                            "<td width='30%' class='left aligned'><span class='sub2'>"+de3+"</span></td>"+
                            "<td width='43%' class='left aligned'>"+val3.replaceAll(';', ' - ')+"</td>"+
                            "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                            "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                          "</tr>"
                        );
                      } else {
                        $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='2%' class='right aligned'></td>"+
                            "<td width='30%' class='left aligned'><span class='sub2'>"+de3+"</span></td>"+
                            "<td width='43%' class='left aligned'>"+val3+"</td>"+
                            "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                            "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                          "</tr>"
                        );
                      }
                    } else {
                      $('.'+section+a).find("tbody").append(
                      "<tr>"+
                        "<td width='2%' class='right aligned'></td>"+
                        "<td width='30%' class='left aligned'><span class='sub2'>"+de3+"</span></td>"+
                        "<td width='43%' class='left aligned'></td>"+
                        "<td width='15%' class='left aligned'>"+doc13+doc23+"</td>"+
                        "<td width='10%' class='left aligned' >"+iconresult3+"</td>"+
                      "</tr>"
                      );
                    }


                    //List Level 4
                    if (typeof obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'] !== 'undefined'){
                      jmlDatad = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'].length;
                      for (d = 0; d < jmlDatad; d++) {
                        var id4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_id'];
                        var de4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_name'];
                        var at4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_attrib'];
                        var in4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_input'];
                        var op4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_option'];
                        // var do4 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_docs'];
                        // var ad4 = do4.split(',');

                        //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                        // if($.inArray('NPI', ad4) > -1){
                        //   var doc14 = "<div class='ui mini basic label teal'>NPI</div>"; 
                        // } else {
                          var doc14 = "";
                        // }
                        // if($.inArray('BP', ad4) > -1){
                        //   var doc24 = "<div class='ui mini basic label grey'>BP</div>"; 
                        // } else {
                          var doc24 = "";
                        // }

                        //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 4
                        var val4= "";
                        for (value_a = 0; value_a < jmlvalue; value_a++) {
                          var v_idc = obj["read_value"][value_a]['v_idcontent'];
                          if(id4 == v_idc){
                            var val4 = obj["read_value"][value_a]['v_value'];
                            var v_res4 = obj["read_value"][value_a]['v_result'];
                            var v_res4 = obj["read_value"][value_a]['v_result'];
                            var v_cek4 = obj["read_value"][value_a]['v_checker'];
                            break;
                          } else {
                            var v_res4 = "-";
                          } 
                          if(!v_res4){
                            v_res4 = "-";
                          }
                          if(v_res4 === "NOT OK" || v_res4 === "-" || v_res4 === "MODIF"){
                            Finalresult++
                          }
                        }

                        if(v_res4 === "OK"){
                          var iconresult4 = "<i class='check green icon'></i>";
                        } else if (v_res4 === "NOT OK"){
                          var iconresult4 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                        } else if ((v_cek4 === "MODIF") && (v_cek4 !== null)){
                          var iconresult4 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                        } else {
                          var iconresult4 = "";
                        }

                        if(at4==="YES"){
                          if(in4==="IMAGE"){
                            if (val4 ===""){
                              var dataimage4 = "Belum upload gambar yang dimaksud.";
                            } else {
                              var dataimage4 = "<img width='350' src='../RND_Upload/BP/Modul/"+val4+"'>";
                            }
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='2%' class='right aligned'></td>"+
                              "<td width='30%' class='left aligned'><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='43%' class='left aligned'>"+dataimage4+"</td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                            "</tr>"
                            );
                          } else if(in4==="FILE"){
                            if (val4 ===""){
                              var datafile4 = "Belum upload file yang dimaksud.";
                            } else {
                              var datafile4 = "<a href='../RND_Upload/BP/Modul/"+val4+"' target='_blank'>"+val4+"</a>";
                            }
                            $('.'+section+a).find("tbody").append(
                            "<tr>"+
                              "<td width='2%' class='right aligned'></td>"+
                              "<td width='30%' class='left aligned'><span class='sub3'>"+de4+"</span></td>"+
                              "<td width='43%' class='left aligned'>"+datafile4+"</td>"+
                              "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                              "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                            "</tr>"
                            );
                          } else if(in4==="MULTIPLE"){
                            $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='2%' class='right aligned'></td>"+
                                "<td width='30%' class='left aligned'><span class='sub3'>"+de4+"</span></td>"+
                                "<td width='43%' class='left aligned'>"+val4.replaceAll(';', ' - ')+"</td>"+
                                "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                                "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                              "</tr>"
                            );
                          } else {
                            $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='2%' class='right aligned'></td>"+
                                "<td width='30%' class='left aligned'><span class='sub3'>"+de4+"</span></td>"+
                                "<td width='43%' class='left aligned'>"+val4+"</td>"+
                                "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                                "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                              "</tr>"
                            );
                          }
                        } else {
                          $('.'+section+a).find("tbody").append(
                          "<tr>"+
                            "<td width='2%' class='right aligned'></td>"+
                            "<td width='30%' class='left aligned'><span class='sub3'>"+de4+"</span></td>"+
                            "<td width='43%' class='left aligned'></td>"+
                            "<td width='15%' class='left aligned'>"+doc14+doc24+"</td>"+
                            "<td width='10%' class='left aligned' >"+iconresult4+"</td>"+
                          "</tr>"
                          );
                        }

                        //List Level 5
                        if (typeof obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'] !== 'undefined'){
                          jmlDatae = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'].length;
                          for (e = 0; e < jmlDatae; e++) {
                            var id5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_id'];
                            var de5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_name'];
                            var at5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_attrib'];
                            var in5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_input'];
                            var op5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_option'];
                            // var do5 = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_docs'];
                            // var ad5 = do5.split(',');
                            
                            //Tampilkan jika data tersebut untuk Suppoert Document NPI/BP
                            // if($.inArray('NPI', ad5) > -1){
                            //   var doc15 = "<div class='ui mini basic label teal'>NPI</div>"; 
                            // } else {
                              var doc15 = "";
                            // }
                            // if($.inArray('BP', ad5) > -1){
                            //   var doc25 = "<div class='ui mini basic label grey'>BP</div>"; 
                            // } else {
                              var doc25 = "";
                            // }

                            //Baca Value dari Json 'read_value' sesuai dengan content_id nya di level 5
                            var val5= "";
                            for (value_a = 0; value_a < jmlvalue; value_a++) {
                              var v_idc = obj["read_value"][value_a]['v_idcontent'];
                              if(id5 == v_idc){
                                var val5 = obj["read_value"][value_a]['v_value'];
                                var v_res5 = obj["read_value"][value_a]['v_result'];
                                var v_res5 = obj["read_value"][value_a]['v_result'];
                                var v_cek5 = obj["read_value"][value_a]['v_checker'];
                                break;
                              } else {
                                var v_res5 = "-";
                              } 
                              if(!v_res5){
                                v_res5 = "-";
                              }
                              if(v_res5 === "NOT OK" || v_res5 === "-" || v_res5 === "MODIF"){
                                Finalresult++
                              }
                            }

                            if(v_res5 === "OK"){
                              var iconresult5 = "<i class='check green icon'></i>";
                            } else if (v_res5 === "NOT OK"){
                              var iconresult5 = "<div class='ui tiny left pointing red basic label'>NOT OK</div>";
                            } else if ((v_cek5 === "MODIF") && (v_cek5 !== null)){
                              var iconresult5 = "<div class='ui tiny left pointing orange basic label'>MODIF</div>";
                            } else {
                              var iconresult5 = "";
                            }

                            if(at5==="YES"){
                              if(in5==="IMAGE"){
                                if (val5 ===""){
                                  var dataimage5 = "Belum upload gambar yang dimaksud.";
                                } else {
                                  var dataimage5 = "<img width='350' src='../RND_Upload/BP/Modul/"+val5+"'>";
                                }
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='2%' class='right aligned'></td>"+
                                  "<td width='30%' class='left aligned'><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='43%' class='left aligned'>"+dataimage5+"</td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                "</tr>"
                                );
                              } else if(in5==="FILE"){
                                if (val5 ===""){
                                  var datafile5 = "Belum upload file yang dimaksud.";
                                } else {
                                  var datafile5 = "<a href='../RND_Upload/BP/Modul/"+val5+"' target='_blank'>"+val5+"</a>";
                                }
                                $('.'+section+a).find("tbody").append(
                                "<tr>"+
                                  "<td width='2%' class='right aligned'></td>"+
                                  "<td width='30%' class='left aligned'><span class='sub4'>"+de5+"</span></td>"+
                                  "<td width='43%' class='left aligned'>"+datafile5+"</td>"+
                                  "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                  "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                "</tr>"
                                );
                              } else if(in5==="MULTIPLE"){
                                $('.'+section+a).find("tbody").append(
                                  "<tr>"+
                                    "<td width='2%' class='right aligned'></td>"+
                                    "<td width='30%' class='left aligned'><span class='sub4'>"+de5+"</span></td>"+
                                    "<td width='43%' class='left aligned'>"+val5.replaceAll(';', ' - ')+"</td>"+
                                    "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                    "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                  "</tr>"
                                );
                              } else {
                                $('.'+section+a).find("tbody").append(
                                  "<tr>"+
                                    "<td width='2%' class='right aligned'></td>"+
                                    "<td width='30%' class='left aligned'><span class='sub4'>"+de5+"</span></td>"+
                                    "<td width='43%' class='left aligned'>"+val5+"</td>"+
                                    "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                    "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                                  "</tr>"
                                );
                              }
                            } else {
                              $('.'+section+a).find("tbody").append(
                              "<tr>"+
                                "<td width='2%' class='right aligned'></td>"+
                                "<td width='30%' class='left aligned'><span class='sub4'>"+de5+"</span></td>"+
                                "<td width='43%' class='left aligned'></td>"+
                                "<td width='15%' class='left aligned'>"+doc15+doc25+"</td>"+
                                "<td width='10%' class='left aligned' >"+iconresult5+"</td>"+
                              "</tr>"
                              );
                            }
                          }
                        }
                      }
                    }
                  }
                }
              
              }
              
            
            } 
          }
        }

        
      }
      FungsiTableContent();
      FungsiSaveValue();
      
      $('.BtnAddLv2CYCLE').hide();
      $('.BtnAddLv2ELECTRONIC').hide();
      $('.BtnAddLv2MD').hide();
      $('.BtnAddLv2ID').hide();
      $('.BtnEditLv1CYCLE').hide();
      $('.BtnEditLv1ELECTRONIC').hide();
      $('.BtnEditLv1MD').hide();
      $('.BtnEditLv1ID').hide();
      $('.BtnAddChildCYCLE').hide();
      $('.BtnAddChildELECTRONIC').hide();
      $('.BtnAddChildMD').hide();
      $('.BtnAddChildID').hide();

      $('.BtnEditChCYCLE').removeClass('EditChildField');
      $('.BtnEditChELECTRONIC').removeClass('EditChildField');
      $('.BtnEditChMD').removeClass('EditChildField');
      $('.BtnEditChID').removeClass('EditChildField');

      

      if((pic_c === Udecrypt) || (pic_hc === Udecrypt) || ((sect_pl === Sdecrypt) && (Jdecrypt === "PROJECT LEADER")) || ((sect_hog === Sdecrypt) && (Jdecrypt === "HEAD OF GROUP PRODUCT"))){
        $('.BtnAddLv2CYCLE').show();
        $('.BtnEditLv1CYCLE').show();
        $('.BtnAddChildCYCLE').show();
        $('.BtnEditChCYCLE').addClass('EditChildField');

      }

      if((pic_e === Udecrypt) || (pic_he === Udecrypt) || ((sect_pl === Sdecrypt) && (Jdecrypt === "PROJECT LEADER")) || ((sect_hog === Sdecrypt) && (Jdecrypt === "HEAD OF GROUP PRODUCT"))){
        $('.BtnAddLv2ELECTRONIC').show();
        $('.BtnEditLv1ELECTRONIC').show();
        $('.BtnAddChildELECTRONIC').show();
        $('.BtnEditChELECTRONIC').addClass('EditChildField');
      }

      if((pic_m === Udecrypt) || (pic_hm === Udecrypt) || ((sect_pl === Sdecrypt) && (Jdecrypt === "PROJECT LEADER")) || ((sect_hog === Sdecrypt) && (Jdecrypt === "HEAD OF GROUP PRODUCT"))){
        $('.BtnAddLv2MD').show();
        $('.BtnEditLv1MD').show();
        $('.BtnAddChildMD').show();
        $('.BtnEditChMD').addClass('EditChildField');
      }

      if((pic_i === Udecrypt) || (pic_hi === Udecrypt) || ((sect_pl === Sdecrypt) && (Jdecrypt === "PROJECT LEADER")) || ((sect_hog === Sdecrypt) && (Jdecrypt === "HEAD OF GROUP PRODUCT"))){
        $('.BtnAddLv2ID').show();
        $('.BtnEditLv1ID').show();
        $('.BtnAddChildID').show();
        $('.BtnEditChID').addClass('EditChildField');
      }


      $('.EditChildField').click(function(){
        var idx = $(this).attr('idx');
        var lv = $(this).attr('lv');
        var nmx = $(this).attr('nm');
        var sect = $(this).attr('sect');
        var attrib = $(this).attr('atx');
        var inputs = $(this).attr('inx');
        var option = $(this).attr('opx');
    
        $(".xwinaddchild").modal("show");
        $("#FieldSect").val(sect);
        $("#FieldId_C").val(idx);
        $("#FieldLevel").val(lv);
        $("#textxwinchild").text("Ubah field");
        $("#FieldDesc").val(nmx);
    
        $("#FieldJenis").dropdown("clear");
        if(attrib =="NO"){
          $("#FieldJenis").dropdown("set selected", attrib);
        } else {
          $("#FieldJenis").dropdown("set selected", inputs);
        }
        $("#FieldOption").val(option);
        
      });


      $('.EditInputMultiple').click(function(){ 
        var idc = $(this).attr('idc');
        var idv = $(this).attr('idv');
        $.ajax({
          type    : "POST",
          url     : `${restlocpsc}loadcoption`,
          headers : {
            user  : vusrnm,
            token : vtoken
          },
          data: {
            idc    : idc
          },
          cache: false,
          success: function (response){
            var obj = JSON.parse(response);
            if(isEmpty(obj)) {
              IsResponseEmptyObj();
            } else {
              var arrmulti = obj[0]['c_option'].split(';');
              var arrval   = idv.split(';');
              $('#chkbox').empty();
              $("#IdCx").val(obj[0]['c_id']);
              $('#textxwinmultiple').text(obj[0]['c_name']);
              $.each(arrmulti, function(key, value) {  
                if( value !== "-"){
                  if(arrval.indexOf(value) >= 0){ 
                    $("#chkbox").append("<input class='chkbox' type='checkbox' checked value='"+value+"'><label>"+value+"</label><br>");
                  } else {
                    $("#chkbox").append("<input class='chkbox' type='checkbox' value='"+value+"'><label>"+value+"</label><br>");
                  }
                }
              });
              $(".xwinmultipleoption").modal({ autofocus: false }).modal("show");
            }
          }
        });

      });


      if(Finalresult>0){
        var FResult = "NOT OK";
      } else {
        var FResult = "OK";
      }

      // if(Msg == 'NULL' || Msg == "OK"){
      //   var FFResult = "OK";
      // } else {
      //   var FFResult = "NOT OK";
      // }
      // $("#FinalResult"+section).text(FFResult);

    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
}

function FungsiUnsign(){
$('.BtnUnsign').on('click', function() {
  let encryption = new Encryption();
  var idchk = $(this).attr('idchk');
  var idvl = $(this).attr('idvl');
  var dlink = encryption.encrypt(idbp, NonceValue);
  Swal.fire({
    title: "<h3>Unsign Designer ini ?</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url     : `../RND_BackEnd/backend_bp/bp/unsign/`+idchk,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_bp   : idbp,
          id_chk  : idchk,
          id_vl   : idvl
          // dlink   : 'psccontent&i='+dlink
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            // IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            FungsiSignPIC();
            $(".xwinaddcheckdesign").modal("hide");
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

$('#BtnSignPL').click(function(){
  let encryption = new Encryption();
  var nm = $(this).attr('nm');
  var dlink = encryption.encrypt(idbp, NonceValue);
  Swal.fire({
    title: "<h3>Publish Buku Petunjuk ini ?</h3>",
    confirmButtonText: "Ya",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url: `${restlocpsc}sign_projectleader`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_psc  : idbp,
          pic     : nm,
          dlink   : 'psccontent&i='+dlink
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            LoadDataSign();
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
});


$('#BtnRejectHOG').click(function(){
  $(".xwinrejecthog").modal({
    autofocus: false,
  }).modal("show");
  $("#PSCRejectSection").dropdown("clear");
});


$('#BtnRejectPL').click(function(){
  $(".xwinrejectpl").modal({
    autofocus: false,
  }).modal("show");
  $("#PSCRejectSection").dropdown("clear");
});

$('#BtnRevisi').click(function(){
  $(".xwinrevisipsc").modal({
    autofocus: false,
  }).modal("show");
  $("#PSCRevisiSection").dropdown("clear");
  $("#RevisiReason").val('');
});


$('#BtnCopyPSC').click(function(){
  $(".xwincopyvaluepsc").modal({
    autofocus: false,
  }).modal("show");
  // $("#PSCRejectSection").dropdown("clear");
});

$('#BtnChooseTemplate').click(function(){
  $(".xwintemplate").modal({
    autofocus: false,
  }).modal("show");
  // $("#PSCRejectSection").dropdown("clear");
});

function FungsiSignPIC(){

  $('.BtnSignPIC').on('click', function() {
    var idcheck = $(this).attr("idchk");
    var role    = $(this).attr("role");
    var idvl    = $(this).attr("idvl");
    $.ajax({
      type    : "POST",
      url     : `../RND_BackEnd/backend_bp/bp/load-checkerresult/`+idvl,
      headers : {
        user  : vusrnm,
        token : vtoken
      },
      data: {
        BpId    : idbp,
        idchk   : idcheck,
        roles   : role
      },
      cache: false,
      success: function (response){
        var obj = JSON.parse(response);
        $(".xwinfeedbackchecker").modal("show");
        if(isEmpty(obj)) {
          IsResponseEmptyObj();
        } else {
          $("#FeedCheckList").empty();
          jmlData = obj.length;
          for (a = 0; a < jmlData; a++) {
            var filelink = "<a target='_blank' href='../RND_Upload/BP/CustomerFeedback/"+obj[a]["NamaFile"]+"'>";
            $("#TableFeedCheckList").find("tbody").append(
              "<tr>"+
                "<td width='60%'>"+obj[a]['Note']+"</td>"+
                "<td width='10%'>"+obj[a]['Date']+"</td>"+
                "<td width='10%'>"+obj[a]['User']+"</td>"+
                "<td width='15%'>"+filelink+obj[a]['NamaFile']+"</td>"+
              "</tr><tr></tr>"
            );   
            // $("#FootFeedCheckList").empty();
            // $("#TableFeedCheckList").find("tfoot").append(
            //   "<tr>"+
            //   "<td colspan='6'><button class='ui button blue small' id='AddDraft' >Add Draft</button>"+
            //   "</td></tr>"
            // );
          }
        }
      }
    });
  });
}


function CustFeedback(){
  $.ajax({
    type    : "POST",
    url     : `../RND_BackEnd/backend_bp/bp/load-custfeedback/`+idbp,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      BpId    : idbp,
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      // $(".xwinhistorypsc").modal("show");
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReportList").empty();
        jmlData = obj.length;
        for (a = 0; a < jmlData; a++) {
          var filelink = "<a target='_blank' href='../RND_Upload/BP/CustomerFeedback/"+obj[a]["NamaFile"]+"'>";
          $("#TableReportList").find("tbody").append(
            "<tr>"+
              "<td width='60%'>"+obj[a]['Note']+"</td>"+
              "<td width='10%'>"+obj[a]['Date']+"</td>"+
              "<td width='10%'>"+obj[a]['User']+"</td>"+
              "<td width='15%'>"+filelink+obj[a]['NamaFile']+"</td>"+
            "</tr>"
          );   
        }
      }
    }
  });
}

// function FeedbackChecker(ds){
  
//   var idval = getCookie('IdValueBP');
//   console.log(idval);
//   console.log(ds);
//   $.ajax({
//     type    : "POST",
//     url     : `../RND_BackEnd/backend_bp/bp/table-feedbackcheck/`+idval,
//     headers : {
//       user  : vusrnm,
//       token : vtoken
//     },
//     data: {
//       BpId    : idbp,
//       des     : ds
//     },
//     cache: false,
//     success: function (response){
//       var obj = JSON.parse(response);
//       // $(".xwinhistorypsc").modal("show");
//       if(isEmpty(obj)) {
//         IsResponseEmptyObj();
//       } else {
//         $("#ReportList").empty();
//         jmlData = obj.length;
//         for (a = 0; a < jmlData; a++) {
//           var filelink = "<a target='_blank' href='../RND_Upload/BP/CustomerFeedback/"+obj[a]["NamaFile"]+"'>";
//           $("#TableReportList").find("tbody").append(
//             "<tr>"+
//               "<td width='60%'>"+obj[a]['Note']+"</td>"+
//               "<td width='10%'>"+obj[a]['Date']+"</td>"+
//               "<td width='10%'>"+obj[a]['User']+"</td>"+
//               "<td width='15%'>"+filelink+obj[a]['NamaFile']+"</td>"+
//             "</tr>"
//           );   
//         }
//       }
//     }
//   });
// }

function LoadDraft(){
  $.ajax({
    type    : "POST",
    url     : `../RND_BackEnd/backend_bp/bp/load-draft/`+idbp,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      BpId    : idbp,
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      // $(".xwinhistorypsc").modal("show");
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#DraftList").empty();
        jmlData = obj.length;
        for (a = 0; a < jmlData; a++) {
          var filelink = "<a target='_blank' href='../RND_Upload/BP/Draft/"+obj[a]["NamaFile"]+"'>";
          $("#TableDraftList").find("tbody").append(
            "<tr>"+
              "<td width='60%'>"+obj[a]['Note']+"</td>"+
              "<td width='10%'>"+obj[a]['Date']+"</td>"+
              "<td width='10%'>"+obj[a]['User']+"</td>"+
              "<td width='15%'>"+filelink+obj[a]['NamaFile']+"</td>"+
            "</tr>"
          );   
        }
      }
    }
  });
}

// $(".BtnFeedbackResult").on("click", function () {
//   var sid = $(this).attr("idbp");
//   var des = $(this).attr("ds");
//   $(".xwinuploadfeedback").modal("show");
//   $("#labelresult").text(nbp);
//   $("#BPID").val(sid);
//   $("#NOBP").val(nbp);
//   FeedbackChecker(des);
// });

$("#BtnUploadFeedback").on("click", function () {
  var sid = $(this).attr("idbp");
  var nbp = $(this).attr("nmbp");
  $(".xwinuploadfeedback").modal("show");
  $("#labelresult").text(nbp);
  $("#BPID").val(sid);
  $("#NOBP").val(nbp);
  CustFeedback();
});

$("#BtnUploadDraft").on("click", function () {
  var sid = $(this).attr("idbp");
  var nbp = $(this).attr("nmbp");
  $(".xwinuploaddraft").modal("show");
  $("#labelresult").text(nbp);
  $("#BPID").val(sid);
  $("#NOBP").val(nbp);
  LoadDraft();
});


$(document).ready(function () {

  // LoadDataSign();
  // FungsiSaveChecker();
  Master();

  if(groupprd =="BROWN GOODS"){
    LoadDataContent('ELECTRONIC');
    LoadDataContent('MD');
    // LoadDataPICDQA('ELECTRONIC');
    setCookie("TabPSC", "ELECTRONIC HARDWARE", 5);
  } else {
    // LoadDataContent('CYCLE');
    LoadDataContent('ELECTRONIC');
    LoadDataContent('MD');
    // LoadDataPICDQA('CYCLE');
    // LoadDataPICDQA('ELECTRONIC');
    setCookie("TabPSC", "ELECTRONIC HARDWARE", 5);
  }
  // LoadDataContent('MD');
  // LoadDataContent('ID');
  // LoadDataPICDQA('MD');
  // LoadDataPICDQA('ID');

  $('#addgprlv1CYCLE').show();
  $('#addgprlv1ELECTRONIC').show();
  $('#addgprlv1MD').show();
  $('#addgprlv1ID').show();
  $('.optinput1').hide();
  $('#cyclepic_e').text(pic_c);
  $('#electpic_e').text(pic_e);
  $('#mdpic_e').text(pic_m);
  $('#idpic_e').text(pic_i);

  $('#headofgrouppic').text(pic_hog);
  $('#plpic').text(pic_pl);
  $('#headofdqapic').text(pic_hod);

  $('#tabpsclist').on('click', function() {
    window.location.href = "./?link=bpindex";
  });

  $('#SubTabCycle').on('click', function() {
    setCookie("TabPSC", "CYCLE UNIT", 5);
  });
  $('#SubTabElect').on('click', function() {
    setCookie("TabPSC", "ELECTRONIC HARDWARE", 5);
  });
  $('#SubTabMech').on('click', function() {
    setCookie("TabPSC", "MECHANICAL DESIGN", 5);
  });
  $('#SubTabID').on('click', function() {
    setCookie("TabPSC", "INDUSTRIAL DESIGN", 5);
  });

  $('#tabcompare').on('click', function() {
    window.location.href = "./?link=psccompare";
  });

  $('#tabuserguide').on('click', function() {
    window.location.href = "./?link=guidebp";
  });
  $('.tabsuratgolive').on('click', function() {
    window.location.href = "./?link=golivembp";
  });
  $('.tabhasilmonitoring').on('click', function() {
    window.location.href = "./?link=monitormbp";
  });
  $('.tabversion').on('click', function() {
    window.location.href = "./?link=versionhistory&app=MBP";
  });

  $('#BtnEditHeader').on('click', function() {
    var idx = $(this).attr('idbp');
    window.location.href = "./?link=bpheader&i="+idx;
  });

  $('.ui.dropdown.fullsearch').dropdown( {fullTextSearch:'exact', sortSelect: true, match:'text'} );


  new Sortable(ReOrder, {
    animation: 350,
    ghostClass: 'chosen',
    dataIdAttr: 'id',
    onEnd: function (event) {
      var pscfrom = event.oldIndex;
      var pscto = event.newIndex;
      var psccontent = event.item.textContent;
    },
    store: {
      set: function (sortable) {
        var order  = sortable.toArray();
        var level  = "1";
        var sect    = $("#SortGroupFieldSect").val();
        $.ajax({
          url: `${restlocbp}bp/sorting`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            level   : level,
            sect    : sect,
            jprd    : jprd,
            pprd    : template,
            order   : order,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          // console.log(obj);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
      
            }
          }
        })
      }
    }
  });


  new Sortable(ReOrderL2, {
    animation: 350,
    ghostClass: 'chosen',
    dataIdAttr: 'id',
    onEnd: function (event) {
      var pscfrom = event.oldIndex;
      var pscto = event.newIndex;
      var psccontent = event.item.textContent;
    },
    store: {
      set: function (sortable) {
        var order  = sortable.toArray();
        var level  = "2";
        var sect    = $("#SortGroupFieldSectLv2").val();
        $.ajax({
          url: `${restlocbp}bp/sorting`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            level   : level,
            sect    : sect,
            jprd    : jprd,
            pprd    : template,
            order   : order,
          },
          success: function (response) {
          var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
      
            }
          }
        })
      }
    }
  });


  new Sortable(ReOrderL3, {
    animation: 350,
    ghostClass: 'chosen',
    dataIdAttr: 'id',
    onEnd: function (event) {
      var pscfrom = event.oldIndex;
      var pscto = event.newIndex;
      var psccontent = event.item.textContent;
    },
    store: {
      set: function (sortable) {
        var order  = sortable.toArray();
        var level  = "3";
        var sect    = $("#SortGroupFieldSectLv3").val();
        $.ajax({
          url: `${restlocbp}bp/sorting`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            level   : level,
            sect    : sect,
            jprd    : jprd,
            pprd    : template,
            order   : order,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
      
            }
          }
        })
      }
    }
  });


  new Sortable(ReOrderL4, {
    animation: 350,
    ghostClass: 'chosen',
    dataIdAttr: 'id',
    onEnd: function (event) {
      var pscfrom = event.oldIndex;
      var pscto = event.newIndex;
      var psccontent = event.item.textContent;
    },
    store: {
      set: function (sortable) {
        var order  = sortable.toArray();
        var level  = "4";
        var sect    = $("#SortGroupFieldSectLv4").val();
        $.ajax({
          url: `${restlocbp}bp/sorting`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            level   : level,
            sect    : sect,
            jprd    : jprd,
            pprd    : template,
            order   : order,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
      
            }
          }
        })
      }
    }
  });


  new Sortable(ReOrderL5, {
    animation: 350,
    ghostClass: 'chosen',
    dataIdAttr: 'id',
    onEnd: function (event) {
      var pscfrom = event.oldIndex;
      var pscto = event.newIndex;
      var psccontent = event.item.textContent;
    },
    store: {
      set: function (sortable) {
        var order  = sortable.toArray();
        var level  = "5";
        var sect    = $("#SortGroupFieldSectLv5").val();
        $.ajax({
          url: `${restlocbp}bp/sorting`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            level   : level,
            sect    : sect,
            jprd    : jprd,
            pprd    : template,
            order   : order,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
      
            }
          }
        })
      }
    }
  });

  
});



$('#RejectPSCPL').on('click', function() {
  var sect     = $('#PSCRejectSectionPL').val();
  var reason   = $('#RejectReasonPL').val();
  $.ajax({
    url: `${restlocpsc}reject_projectleader`,
    type: "POST",
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: {
      id_psc  : idbp,
      section : sect,
      reason  : reason
    },
    success: function (response) {
    var obj = JSON.parse(response);
    if (obj.status == false) {
      IsResponseFalse(obj.message);
    } else {
      IsResponseTrue(obj.message);
        // LoadDataSign();
        $(".xwinrejectpl").modal("hide");

      }
    }
  })

});

$('#RevisiPSC').on('click', function() {
  // var sect     = $('#PSCRevisiSection').val();
  var reason   = $('#RevisiReason').val();
  $.ajax({
    url: `${restlocbp}bp/revisi_bp`,
    type: "POST",
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: {
      id_psc  : idbp,
      reason  : reason
    },
    success: function (response) {
    var obj = JSON.parse(response);
    if (obj.status == false) {
      IsResponseFalse(obj.message);
    } else {
      IsResponseTrue(obj.message);
        // LoadDataSign();
        Master();
        $(".xwinrevisipsc").modal("hide");

      }
    }
  })

});



function FungsiTableContent(){
  $('.ui.accordion').accordion(
    {exclusive : false}
  );


  


  //Add Group Field Lv1
  $('.AddGroupFieldLv1').click(function(){
    var sect = $(this).attr('sect');
    $(".xwinaddchild-main").modal("show");
    $("#textxwinmainchild").text("Tambahkan");
    $("#GroupFieldDesc").val('');
    $("#GroupFieldSect").val(sect);
    $("#GroupFieldId_C").val('');
  });

    //Add Group Field Lv1
    $('.AddFileBP').click(function(){
      // var idbps = $(this).attr('idbp');
      // console.log(idbps);
      $(".xwinaddfilebplengkap").modal("show");
      $("#GroupFieldDesc").val(idbp);
      $("#textxwinmainchild").text("Tambahkan");
    });


  //Edit Group Field Lv1
  $('.EditGroupFieldLv1').click(function(){
    $(".accordion").unbind("click");
    var idx  = $(this).attr('idx');
    var nmx  = $(this).attr('nm');
    var sect = $(this).attr('sect');
    $(".xwinaddchild-main").modal('setting', 'closable', false).modal("show");
    $("#textxwinmainchild").text("Ubah");
    $("#GroupFieldDesc").val(nmx);
    $("#GroupFieldSect").val(sect);
    $("#GroupFieldId_C").val(idx);
    // $(".accordion").bind("click");
  });


  //Add Group/Item Field Sub Lv2-5
  $('.AddChildField').click(function(){
    var idx = $(this).attr('idx');
    var lv = $(this).attr('lv');
    var nmx = $(this).attr('nm');
    var sect = $(this).attr('sect');
    $(".xwinaddchild").modal("show");
    $("#FieldSect").val(sect);
    $("#FieldId_C").val(idx);
    $("#FieldLevel").val(lv);
    $("#FieldDesc").val('');
    $("#FieldOption").val('');
    $("#FieldJenis").dropdown("clear");
    $("#FieldSupportDoc").dropdown("clear");
    $("#textxwinchild").html("Tambah Grup/Item baru untuk sub:  <span class='redheader'>"+nmx+"</span>");
  });

    //Add Group/Item Field Sub Lv2-5
    $('.AddCheckDesigner').click(function(){
      var vid = $(this).attr('idx');
      var BPID = $(this).attr('idbp');
      var nmx = $(this).attr('nm');
      var sect = $(this).attr('sect');
      var chks = "Designer";
      // console.log(vid);
      
      $("#FieldSect").val(sect);
      $("#FieldId_V").val(vid);
      $("#FieldBPID").val(BPID);
      $("#FieldDesc").val('');
      $("#FieldOption").val('');
      $("#Designer1").dropdown("clear");
      $("#Designer2").dropdown("clear");
      $("#Designer3").dropdown("clear");
      $("#Designer4").dropdown("clear");
      $("#Designer5").dropdown("clear");
      $("#Designer6").dropdown("clear");
      $("#Designer7").dropdown("clear");
      $(".SignDesigner1").text('');
      $(".SignDesigner2").text('');
      $(".SignDesigner3").text('');
      $(".SignDesigner4").text('');
      $(".SignDesigner5").text('');
      $(".SignDesigner6").text('');
      $(".SignDesigner7").text('');
      $("#BtnFeedbackResultD1").html("");
      $("#BtnFeedbackResultD2").html("");
      $("#BtnFeedbackResultD3").html("");
      $("#BtnFeedbackResultD4").html("");
      $("#BtnFeedbackResultD5").html("");
      $("#BtnFeedbackResultD6").html("");
      $("#BtnFeedbackResultD7").html("");
      $("#FinalResultDesigner").text('');
      $("#VersiDesigner").text('');
      var IDValue = setCookie('IdValueBP',vid,1);
      $(".xwinaddcheckdesign").modal({
        autofocus: false,
      }).modal("show");
      $("#textxwinchilds").html("Pengecekan Designer untuk module:  <span class='redheader'>"+nmx+"</span>");
      LoadDataPICDQA(IDValue, chks);
    });


    //Add Group/Item Field Sub Lv2-5
    $('.AddCheckDQA').click(function(){
      var vid = $(this).attr('idx');
      var BPID = $(this).attr('idbp');
      var nmx = $(this).attr('nm');
      var sect = $(this).attr('sect');
      var chks = "Checker";
      // console.log(vid);
      
      $("#FieldSect").val(sect);
      $("#FieldId_V").val(vid);
      $("#FieldBPID").val(BPID);
      $("#FieldDesc").val('');
      $("#FieldOption").val('');
      $("#Checker1").text('');
      $("#Checker2").text('');
      $("#Checker3").text('');
      $("#Checker4").text('');
      $("#Checker5").text('');
      $("#Checker6").text('');
      $("#Checker7").text('');
      $(".SignChecker1").text('');
      $(".SignChecker2").text('');
      $(".SignChecker3").text('');
      $(".SignChecker4").text('');
      $(".SignChecker5").text('');
      $(".SignChecker6").text('');
      $(".SignChecker7").text('');
      $("#BtnFeedbackResultC1").html("");
      $("#BtnFeedbackResultC2").html("");
      $("#BtnFeedbackResultC3").html("");
      $("#BtnFeedbackResultC4").html("");
      $("#BtnFeedbackResultC5").html("");
      $("#BtnFeedbackResultC6").html("");
      $("#BtnFeedbackResultC7").html("");
      $("#FinalResultChecker").text('');
      $("#VersiChecker").text('');
      var IDValue = setCookie('IdValueBP',vid,1);
      $(".xwinaddcheckdqa").modal({
        autofocus: false,
      }).modal("show");
      $("#textxwinchilds").html("Pengecekan Designer untuk module:  <span class='redheader'>"+nmx+"</span>");
      LoadDataPICDQA(IDValue, chks);
    });
  

    // //Add Group/Item Field Sub Lv2-5
    // $('.AddCheckQA').click(function(){
    //   var vid = $(this).attr('idx');
    //   var BPID = $(this).attr('idbp');
    //   var nmx = $(this).attr('nm');
    //   var sect = $(this).attr('sect');
    //   $(".xwinaddcheckdesign").modal("show");
    //   $("#FieldSect").val(sect);
    //   $("#FieldId_V").val(vid);
    //   $("#FieldBPID").val(BPID);
    //   $("#FieldDesc").val('');
    //   $("#FieldOption").val('');
    //   $("#FieldJenis").dropdown("clear");
    //   $("#FieldSupportDoc").dropdown("clear");
    //   $("#textxwinchilds").html("Pengecekan Designer untuk module:  <span class='redheader'>"+nmx+"</span>");
    // });

    
//Load Group Field Lv5 for Sorting
$('.SortGroupFieldLv5').click(function(){
  var sect = $(this).attr('sect');
  var c_id = $(this).attr('idx');
  $("#SortGroupFieldSectLv5").val(sect);
  $("#ReOrderL5").empty();
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReOrderL5").empty();
        jmlData = obj["read_content"].length;
        
        for (a = 0; a < jmlData; a++) {
          if (typeof obj["read_content"][a]['nodes'] !== 'undefined'){
            jmlDatab = obj["read_content"][a]['nodes'].length;

            for (b = 0; b < jmlDatab; b++) {
              if (typeof obj["read_content"][a]['nodes'][b]['nodes'] !== 'undefined'){
                jmlDatac = obj["read_content"][a]['nodes'][b]['nodes'].length;

                for (c = 0; c < jmlDatac; c++) {
                  if (typeof obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'] !== 'undefined'){
                    jmlDatad = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'].length;
                
                    for (d = 0; d < jmlDatad; d++) {
                      
                      if(obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_id'] === c_id){
                        jmlDatae = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'].length;
                  
                        for (e = 0; e < jmlDatae; e++) {
                          $("#TOrderL5").find("tbody").append(
                            "<tr class='handle' id='"+obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_id']+"'>"+
                              "<td>"+obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['nodes'][e]['c_name']+"</td>"+
                            "</tr>"
                          );   
                        }
                  
                      }

                    }
                  }
                }
              }
            }

          }

        }
      }
    }
  });
  $(".xwinsortgroupL5").modal("show");

});



//Load Group Field Lv4 for Sorting
$('.SortGroupFieldLv4').click(function(){
  var sect = $(this).attr('sect');
  var c_id = $(this).attr('idx');
  $("#SortGroupFieldSectLv4").val(sect);
  $("#ReOrderL4").empty();
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReOrderL4").empty();
        jmlData = obj["read_content"].length;
        
        for (a = 0; a < jmlData; a++) {
          if (typeof obj["read_content"][a]['nodes'] !== 'undefined'){
            jmlDatab = obj["read_content"][a]['nodes'].length;

            for (b = 0; b < jmlDatab; b++) {
              if (typeof obj["read_content"][a]['nodes'][b]['nodes'] !== 'undefined'){
                jmlDatac = obj["read_content"][a]['nodes'][b]['nodes'].length;
                
                for (c = 0; c < jmlDatac; c++) {
                  
                  if(obj["read_content"][a]['nodes'][b]['nodes'][c]['c_id'] === c_id){
                    jmlDatad = obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'].length;
              
                    for (d = 0; d < jmlDatad; d++) {
                      $("#TOrderL4").find("tbody").append(
                        "<tr class='handle' id='"+obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_id']+"'>"+
                          "<td>"+obj["read_content"][a]['nodes'][b]['nodes'][c]['nodes'][d]['c_name']+"</td>"+
                        "</tr>"
                      );   
                    }
              
                  }

                }
              }
            }

          }

        }
      }
    }
  });
  $(".xwinsortgroupL4").modal("show");

});




//Load Group Field Lv3 for Sorting
$('.SortGroupFieldLv3').click(function(){
  var sect = $(this).attr('sect');
  var c_id = $(this).attr('idx');
  $("#SortGroupFieldSectLv3").val(sect);
  $("#ReOrderL3").empty();
  console.log(c_id);
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReOrderL3").empty();
        jmlData = obj["read_content"].length;

        for (a = 0; a < jmlData; a++) {
          if (typeof obj["read_content"][a]['nodes'] !== 'undefined'){
            jmlDatab = obj["read_content"][a]['nodes'].length;

            for (b = 0; b < jmlDatab; b++) {

              if(obj["read_content"][a]['nodes'][b]['c_id'] === c_id){
                jmlDatac = obj["read_content"][a]['nodes'][b]['nodes'].length;

                for (c = 0; c < jmlDatac; c++) {
                  $("#TOrderL3").find("tbody").append(
                    "<tr class='handle' id='"+obj["read_content"][a]['nodes'][b]['nodes'][c]['c_id']+"'>"+
                      "<td>"+obj["read_content"][a]['nodes'][b]['nodes'][c]['c_name']+"</td>"+
                    "</tr>"
                  );   
                }

              }

            }

          }
        }

      }
    }
  });
  $(".xwinsortgroupL3").modal("show");

});

  
//Load Group Field Lv2 for Sorting
$('.SortGroupFieldLv2').click(function(){
  var sect = $(this).attr('sect');
  var c_id = $(this).attr('idx');
  $("#SortGroupFieldSectLv2").val(sect);
  $("#ReOrderL2").empty();
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReOrderL2").empty();
        jmlData = obj["read_content"].length;
        for (a = 0; a < jmlData; a++) {
          if(obj["read_content"][a]['c_id'] === c_id){
            jmlDatab = obj["read_content"][a]['nodes'].length;
            for (b = 0; b < jmlDatab; b++) {
              $("#TOrderL2").find("tbody").append(
                "<tr class='handle' id='"+obj["read_content"][a]['nodes'][b]['c_id']+"'>"+
                  "<td>"+obj["read_content"][a]['nodes'][b]['c_name']+"</td>"+
                "</tr>"
              );   
            }
          }
        }
      }
    }
  });
  $(".xwinsortgroupL2").modal("show");

});




}

//Load Group Field Lv1 for Sorting
$('.SortGroupFieldLv1').click(function(){
  var sect = $(this).attr('sect');
  $("#SortGroupFieldSect").val(sect);
  $("#ReOrder").empty();
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : template,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReOrder").empty();
        jmlData = obj["read_content"].length;
        for (a = 0; a < jmlData; a++) {
          $("#TOrder").find("tbody").append(
            "<tr class='handle' id='"+obj["read_content"][a]['c_id']+"'>"+
              "<td>"+obj["read_content"][a]['c_name']+"</td>"+
            "</tr>"
          );   
        }
      }
    }
  });
  $(".xwinsortgroup").modal("show");

});




  //Save Add/Edit Group Field Lv1
  $('#SaveNewGroupField').on('click', function() {
    var s = $('#GroupFieldSect').val();
    var d = $('#GroupFieldDesc').val();
    var i = $('#GroupFieldId_C').val();

    $.ajax({
      url: `${restlocbp}bp/create_level1`,
      type: "POST",
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        id_psc  : idbp,
        c_id    : i,
        desc    : d,
        section : s,
        prd     : template,
        jenis   : jprd
      },
      success: function (response) {
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == false) {
        IsResponseFalse(obj.message);
      } else {
        IsResponseTrue(obj.message);
          $(".xwinaddchild-main").modal("hide");
          if(groupprd =="BROWN GOODS"){
            LoadDataContent('ELECTRONIC');
          } else {
            // LoadDataContent('CYCLE');
            LoadDataContent('ELECTRONIC');
          }
          LoadDataContent('MD');
          // LoadDataContent('ID');

        }
      }
    })

  });

   //Delete Group Field Lv1
   $('#DeleteGroupField').on('click', function() {
    var d = $('#GroupFieldDesc').val();
    var i = $('#GroupFieldId_C').val();

    Swal.fire({
      title: "<h3>Delete This Group Field ?</h3>",
      text: d,
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_bp/bp/delete-level/`+i,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            c_id    : i,
            Username    : vusrnm,
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              // FuncLoadDoc();
              $(".xwinaddchild-main").modal("hide");
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');

            }
          },
          error: function () {
            // IsTimeOut(LogoutProtect);
          },
        });
      }
    });

  });
  
  //Save Add/Edit Field Sub Lv2-5
  $('#SaveNewField').on('click', function() {
    var s = $('#FieldSect').val();
    var d = $('#FieldDesc').val();
    var i = $('#FieldId_C').val();
    var l = $('#FieldLevel').val();
    var j = $('#FieldJenis').val();
    var o = $('#FieldOption').val();
    // var n = $('#FieldSupportDoc').val();
    var t = $('#textxwinchild').text();

    if(t=="Ubah field"){
      var funcname = "bp/update_sublevel";
    } else {
      var funcname = "bp/create_sublevel";
    }

    $.ajax({
      url: `${restlocbp}${funcname}`,
      type: "POST",
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        id_psc  : idbp,
        c_id    : i,
        desc    : d,
        section : s,
        level   : l,
        attribut: j,
        option  : o,
        // doc     : n,
        prd     : template,
        jenis   : jprd
      },
      success: function (response) {
      var obj = JSON.parse(response);
      if (obj.status == false) {
        IsResponseFalse(obj.message);
      } else {
        IsResponseTrue(obj.message);
          $(".xwinaddchild").modal("hide");
          if(groupprd =="BROWN GOODS"){
            LoadDataContent('ELECTRONIC');
          } else {
            // LoadDataContent('CYCLE');
            LoadDataContent('ELECTRONIC');
          }
          LoadDataContent('MD');
          // LoadDataContent('ID');

        }
      }
    })

  });

  //Delete Field Sub Lv2-5
  $('#DeleteItemField').on('click', function() {
    var d = $('#FieldDesc').val();
    var i = $('#FieldId_C').val();

    Swal.fire({
      title: "<h3>Delete This Item Field ?</h3>",
      text: d,
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_bp/bp/delete-level/`+i,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            c_id    : i,
            username: vusrnm,
            desc    : d,
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              $(".xwinaddchild").modal("hide");

              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');


            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });

  });
  
    
    $('#SaveNewDesChecker').on('click', function() {
      var idc   = $(this).attr("idc");
      // var tst   = $(this).attr("ts");
      var sect  = $(this).attr("sc");
      var role  = "Designer";
      Des1 = $("#Designer1").val();
      Des2 = $("#Designer2").val();
      Des3 = $("#Designer3").val();
      Des4 = $("#Designer4").val();
      Des5 = $("#Designer5").val();
      Des6 = $("#Designer6").val();
      Des7 = $("#Designer7").val();
      var checkBox = document.getElementById("myCheck");
      // console.log(statuswajib);
      if(checkBox.checked === true){
        var kirim = "YES";
      }else{  
        var kirim = "NO";
      }

      var app = "";
      if(Des1 !==null && Des1 !=="" && Des1 !=="-"){
        app = app+Des1+",";
      }
      if(Des2 !==null && Des2 !=="" && Des2 !=="-"){
        app = app+Des2+",";
      }
      if(Des3 !==null && Des3 !=="" && Des3 !=="-"){
        app = app+Des3+",";
      }
      if(Des4 !==null && Des4 !=="" && Des4 !=="-"){
        app = app+Des4+",";
      }
      if(Des5 !==null && Des5 !=="" && Des5 !=="-"){
        app = app+Des5+",";
      }
      if(Des6 !==null && Des6 !=="" && Des6 !=="-"){
        app = app+Des6+",";
      }
      if(Des7 !==null && Des7 !=="" && Des7 !=="-"){
        app = app+Des7+",";
      }
      app = app.replace(/,$/, "");

      var aryapp = app.split(',');
      var arylen = aryapp.length;
      if (arylen === 0) {
        app = app+",,,,,,";
      } else if (arylen === 1) {
        app = app+",,,,,";
      } else if (arylen === 2) {
        app = app+",,,,";
      } else if (arylen === 3) {
        app = app+",,,";
      } else if (arylen === 4) {
        app = app+",,";
      } else if (arylen === 5) {
        app = app+",";
      } else if (arylen === 6) {
        app = app+",";
      } else if (arylen === 7) {
        app = app+",";
      }
      var idval = getCookie('IdValueBP');
      // console.log(idval);
      $.ajax({
        url: `${restlocbp}bp/save-checker`,
        type: "POST",
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_bp : idbp,
          sect   : sect,
          pic    : app,
          idv    : idval,
          role   : role,
          krim   : kirim,
          pics   : Udecrypt
        },
        success: function (data) {
          var obj = JSON.parse(data);
          if(obj.status == true){
            Swal.fire({
              text: "Saved",
              timer: 500,
              toast: true,
              showConfirmButton: false,
              showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
                icon: ''                       // disable icon animation
              },
              position: 'bottom'
            });
          }
          $(".xwinaddcheckdesign").modal("hide");
        }
      })
  
    });
    $('#BtnSignRelease').click(function(){
      var sts = $('#StsSignRelease').val();
      console.log(sts);
      if (sts ===""){
        Swal.fire({
          title: "<h3>Release Product Spec ini ?</h3>",
          confirmButtonText: "Ya",
          showCancelButton: true,
        }).then((result) => {
          if (result.value) {
            $.ajax({
              type: "POST",
              url: `${restlocbp}bp/release-bp/`+idbp,
              headers: {
                user: vusrnm,
                token: vtoken,
              },
              data: {
                
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
                    title: "product Specification Released!",
                    timer: 1500,
                    icon: "success",
                    showConfirmButton: false,
                  });
                  LoadDataSign();
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
      }
    });
    
  $('#PilihTemplate').on('change', function() {
    var temp = $(this).val();
    var sect = "ELECTRONIC";
  $("#ReTemp").empty();
  $.ajax({
    type    : "POST",
    url     : `${restlocbp}loadcontentvalue`,
    headers : {
      user  : vusrnm,
      token : vtoken
    },
    data: {
      PSCId    : idbp,
      section  : sect,
      produk   : temp,
      jenisprd : jprd
    },
    cache: false,
    success: function (response){
      var obj = JSON.parse(response);
      if(isEmpty(obj)) {
        IsResponseEmptyObj();
      } else {
        $("#ReTemp").empty();
        jmlData = obj["read_content"].length;
        for (a = 0; a < jmlData; a++) {
          $("#TTemp").find("tbody").append(
            "<tr class='handle' id='"+obj["read_content"][a]['c_id']+"'>"+
              "<td>"+obj["read_content"][a]['c_name']+"</td>"+
            "</tr>"
          );   
        }
      }
    }
  });
  });

// saving psc value -------------------------------------------
function FungsiSaveValue(sc){
  $('.ui.accordion').accordion(
    {exclusive : false}
  );

  $('#FieldJenis').on('change', function() {
    var jns = $(this).val();
    if (jns == "OPTION" || jns == "MULTIPLE"){
      $('.optinput1').show();
    } else {
      $('.optinput1').hide();
    }
  });
  

  
  $('.uploadimage').on('click', function() {
    var SignRoleCookies = getCookie('SignRolePSC');
    var TabCookies = getCookie('TabPSC');
    if((SignRoleCookies !== TabCookies) && (SignRoleCookies !== "HEAD OF "+TabCookies)){
      Swal.fire({
        title: "<h3>Section tidak sesuai!</h3>",
        html: "Anda akan merubah value di Section yang tidak sesuai dengan section anda!<br>Lanjutkan ubah value ?",
        icon: "warning",
        confirmButtonText: "Ya",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          $(".xwinuploadimg").modal("show");
          var idup_c   = $(this).attr("idc");
          $("#idupc").val(idup_c);
        } 
      });
    } else {
      $(".xwinuploadimg").modal("show");
      var idup_c   = $(this).attr("idc");
      $("#idupc").val(idup_c);
    }
    
  });

  
  $('.uploadfile').on('click', function() {
    var SignRoleCookies = getCookie('SignRolePSC');
    var TabCookies = getCookie('TabPSC');
    if((Udecrypt != pic_e)){
      Swal.fire({
        title: "<h3>Hanya Designer Buku Petunjuk yang boleh mengubah!</h3>",
        // html: "Anda akan merubah value di Section yang tidak sesuai dengan section anda!<br>Lanjutkan ubah value ?",
        icon: "warning",
        // confirmButtonText: "Ya",
        showCancelButton: true,
      });
    } else {
      $(".xwinuploadfile").modal("show");
      var idup_c   = $(this).attr("idc");
      $("#idupc").val(idup_c);
    }
  });

  

  
  $('.dropdownubahvalue').on('change', function() {
    var idc   = $(this).attr("idc");
    var vin   = $(this).val();
    var SignRoleCookies = getCookie('SignRolePSC');
    var TabCookies = getCookie('TabPSC');
    if((SignRoleCookies !== TabCookies) && (SignRoleCookies !== "HEAD OF "+TabCookies)){
      Swal.fire({
        title: "<h3>Section tidak sesuai!</h3>",
        html: "Anda akan merubah value di Section yang tidak sesuai dengan section anda!<br>Lanjutkan ubah value ?",
        icon: "warning",
        confirmButtonText: "Ya",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: `${restlocpsc}savevalue`,
            type: "POST",
            headers: {
              user: vusrnm,
              token: vtoken,
            },
            data: {
              id_psc : idbp,
              id_cont: idc,
              value  : vin,
              tipe   : tipe
            },
            success: function (data) {
              var obj = JSON.parse(data);
              Swal.fire({
                text: "Saved",
                timer: 500,
                toast: true,
                showConfirmButton: false,
                showClass: {
                  backdrop: 'swal2-noanimation', // disable backdrop animation
                  popup: '',                     // disable popup animation
                  icon: ''                       // disable icon animation
                },
                position: 'bottom'
              });
            }
          })
        } else {
          if(groupprd =="BROWN GOODS"){
            LoadDataContent('ELECTRONIC');
          } else {
            // LoadDataContent('CYCLE');
            LoadDataContent('ELECTRONIC');
          }
          LoadDataContent('MD');
          // LoadDataContent('ID');
        }
      });
    } else {
      $.ajax({
        url: `${restlocpsc}savevalue`,
        type: "POST",
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_psc : idbp,
          id_cont: idc,
          value  : vin,
          tipe   : tipe
        },
        success: function (data) {
          var obj = JSON.parse(data);
          Swal.fire({
            text: "Saved",
            timer: 500,
            toast: true,
            showConfirmButton: false,
            showClass: {
              backdrop: 'swal2-noanimation', // disable backdrop animation
              popup: '',                     // disable popup animation
              icon: ''                       // disable icon animation
            },
            position: 'bottom'
          });
        }
      })
    }
  });

  $('.inputubahvalue').on('change', function() {
    var idc   = $(this).attr("idc");
    var vin   = $(this).val();
    var SignRoleCookies = getCookie('SignRolePSC');
    var TabCookies = getCookie('TabPSC');
    if((SignRoleCookies !== TabCookies) && (SignRoleCookies !== "HEAD OF "+TabCookies)){
      Swal.fire({
        title: "<h3>Section tidak sesuai!</h3>",
        html: "Anda akan merubah value di Section yang tidak sesuai dengan section anda!<br>Lanjutkan ubah value ?",
        icon: "warning",
        confirmButtonText: "Ya",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          $.ajax({
            url: `${restlocpsc}savevalue`,
            type: "POST",
            headers: {
              user: vusrnm,
              token: vtoken,
            },
            data: {
              id_psc : idbp,
              id_cont: idc,
              value  : vin,
              tipe   : tipe
            },
            success: function (data) {
              var obj = JSON.parse(data);
              Swal.fire({
                text: "Saved",
                timer: 500,
                toast: true,
                showConfirmButton: false,
                showClass: {
                  backdrop: 'swal2-noanimation', // disable backdrop animation
                  popup: '',                     // disable popup animation
                  icon: ''                       // disable icon animation
                },
                position: 'bottom'
              });

            }
          })
        } else {
          if(groupprd =="BROWN GOODS"){
            LoadDataContent('ELECTRONIC');
          } else {
            // LoadDataContent('CYCLE');
            LoadDataContent('ELECTRONIC');
          }
          LoadDataContent('MD');
          // LoadDataContent('ID');
        }
      });
    } else {
      $.ajax({
        url: `${restlocpsc}savevalue`,
        type: "POST",
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_psc : idbp,
          id_cont: idc,
          value  : vin,
          tipe   : tipe
        },
        success: function (data) {
          var obj = JSON.parse(data);
          Swal.fire({
            text: "Saved",
            timer: 500,
            toast: true,
            showConfirmButton: false,
            showClass: {
              backdrop: 'swal2-noanimation', // disable backdrop animation
              popup: '',                     // disable popup animation
              icon: ''                       // disable icon animation
            },
            position: 'bottom'

          });

        }
      })
    }
  });

  
  //hapus Gambar Produk PSC
  $('.hapusgambar').on('click', function() {
    var idval   = $(this).attr("idc");

    Swal.fire({
      title: "<h3>Hapus Gambar ini ?</h3>",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: `${restlocpsc}delpicc`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            id_psc  : idbp,
            idval   : idval,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
    
            }
          }
        })
      } 
    });
  });


    //Tandai sebagai Gambar Produk PSC
  $('.tandaigambar').on('click', function() {
    var idval   = $(this).attr("idc");

    Swal.fire({
      title: "<h3>Tandai Gambar ?</h3>",
      html: "Gambar akan di tandai sebagai gambar identifikasi produk dan akan muncul di halaman awal Buku Petunjuk .pdf",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: `${restlocpsc}save_mainpic`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            id_psc  : idbp,
            idval   : idval,
          },
          success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
    
            }
          }
        })
      } 
    });

  });

  
}




//Fungsi simpan untuk input multiple
$('#SaveMultipleValue').on('click', function() {
  var idc   = $('#IdCx').val();
  var array = []
  var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (var i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value)
  }
  var vin = array.join(';');

  var SignRoleCookies = getCookie('SignRolePSC');
  var TabCookies = getCookie('TabPSC');
  if((SignRoleCookies !== TabCookies) && (SignRoleCookies !== "HEAD OF "+TabCookies)){
    Swal.fire({
      title: "<h3>Section tidak sesuai!</h3>",
      html: "Anda akan merubah value di Section yang tidak sesuai dengan section anda!<br>Lanjutkan ubah value ?",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          url: `${restlocpsc}savevalue`,
          type: "POST",
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            id_psc : idbp,
            id_cont: idc,
            value  : vin,
            tipe   : tipe
          },
          success: function (data) {
            var obj = JSON.parse(data);
            Swal.fire({
              text: "Saved",
              timer: 500,
              toast: true,
              showConfirmButton: false,
              showClass: {
                backdrop: 'swal2-noanimation', // disable backdrop animation
                popup: '',                     // disable popup animation
                icon: ''                       // disable icon animation
              },
              position: 'bottom'
            });

          }
        })
      } else {
        if(groupprd =="BROWN GOODS"){
          LoadDataContent('ELECTRONIC');
        } else {
          // LoadDataContent('CYCLE');
          LoadDataContent('ELECTRONIC');
        }
        LoadDataContent('MD');
        // LoadDataContent('ID');
      }
      $(".xwinmultipleoption").modal("hide");

    });
  } else {
    $.ajax({
      url: `${restlocpsc}savevalue`,
      type: "POST",
      headers: {
        user: vusrnm,
        token: vtoken,
      },
      data: {
        id_psc : idbp,
        id_cont: idc,
        value  : vin,
        tipe   : tipe
      },
      success: function (data) {
        var obj = JSON.parse(data);
        Swal.fire({
          text: "Saved",
          timer: 500,
          toast: true,
          showConfirmButton: false,
          showClass: {
            backdrop: 'swal2-noanimation', // disable backdrop animation
            popup: '',                     // disable popup animation
            icon: ''                       // disable icon animation
          },
          position: 'bottom'

        });

        if(groupprd =="BROWN GOODS"){
          LoadDataContent('ELECTRONIC');
        } else {
          // LoadDataContent('CYCLE');
          LoadDataContent('ELECTRONIC');
        }
        LoadDataContent('MD');
        // LoadDataContent('ID');
      $(".xwinmultipleoption").modal("hide");

      }
    })
  }
});


//-------------------------------------------------------
$("#UploadFileResult").on("click", function () {
      var file_bp = $("#filebukupetunjuk").prop("files")[0];
      var desc_bp = $("#NoteBukuPetunjuk").val();
      var form_data = new FormData();
    
      form_data.append("file_bp", file_bp);
      form_data.append("idbp", idbp);
      form_data.append("desc_bp", desc_bp);
      form_data.append("user", Udecrypt);
    
      $.ajax({
        type: "POST",
        dataType: "text",
        contentType: false,
        processData: false,
        url     : `../RND_BackEnd/backend_bp/bp/upload-bplengkap`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: form_data,
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
    
            $(".xwinaddfilebplengkap").modal("hide");
                //DRAW ARRAY KE DATATABLES
            Master();
              }
        },
        error: function () {
          window.location.href = "./?link=loclogout";
          Swal.fire(
            "Error",
            "Server tidak merespon, segera hubungi Administrator di ext. 3553 !",
            "error"
          );
        },
      });
    });

    $("#UploadCustFeedback").on("click", function () {
      var file_data = $("#fileupload").prop("files")[0];
      var note = $("#Note").val();
      var form_data = new FormData();
      console.log(note);
    
      form_data.append("file", file_data);
      form_data.append("idbp", idbp);
      form_data.append("note", note);
      form_data.append("user", Udecrypt);
    
      $.ajax({
        type: "POST",
        dataType: "text",
        contentType: false,
        processData: false,
        url     : `../RND_BackEnd/backend_bp/bp/upload-custfeedback`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: form_data,
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            $(".windowaddcustfeedback").modal("hide");
            CustFeedback();
          }
        },
        error: function () {
          window.location.href = "./?link=loclogout";
          Swal.fire(
            "Error",
            "Server tidak merespon, segera hubungi Administrator di ext. 3553 !",
            "error"
          );
        },
      });
    });


    $("#UploadDraft").on("click", function () {
      var file_data_draft = $("#fileuploaddraft").prop("files")[0];
      var note_draft = $("#NoteDraft").val();
      var form_data = new FormData();
      // console.log(note);
    
      form_data.append("file_draft", file_data_draft);
      form_data.append("idbp", idbp);
      form_data.append("note_draft", note_draft);
      form_data.append("user", Udecrypt);
    
      $.ajax({
        type: "POST",
        dataType: "text",
        contentType: false,
        processData: false,
        url     : `../RND_BackEnd/backend_bp/bp/upload-draft`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: form_data,
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
    
            $(".windowadddraft").modal("hide");
            LoadDraft();
            window.location.href = "./?link=bpindex";
          }
        },
        error: function () {
          window.location.href = "./?link=loclogout";
          Swal.fire(
            "Error",
            "Server tidak merespon, segera hubungi Administrator di ext. 3553 !",
            "error"
          );
        },
      });
    });


$("#SaveUploadImg").on("click", function () {
  var idc   = $('#idupc').val();
  var file_data   = $("#uploadimg").prop("files")[0];
  var form_data   = new FormData();
  form_data.append("file", file_data);
  form_data.append("id_psc", idbp);
  form_data.append("id_cont", idc);
  form_data.append("tipe", tipe);
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: false,
    processData: false,
    url: `${restlocpsc}saveimage`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: form_data,
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      if (obj.status == false) {
        IsResponseFalse(obj.message);
      } else {
        IsResponseTrue(obj.message);
        $(".xwinuploadimg").modal("hide");
          if(groupprd =="BROWN GOODS"){
            LoadDataContent('ELECTRONIC');
          } else {
            // LoadDataContent('CYCLE');
            LoadDataContent('ELECTRONIC');
          }
          LoadDataContent('MD');
          // LoadDataContent('ID');
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
});


$("#SaveUploadFile").on("click", function () {
  var idc   = $('#idupc').val();
  var file_data   = $("#uploadfile").prop("files")[0];
  var form_data   = new FormData();
  form_data.append("file", file_data);
  form_data.append("id_psc", idbp);
  form_data.append("id_cont", idc);
  form_data.append("tipe", tipe);
  $.ajax({
    type: "POST",
    dataType: "text",
    contentType: false,
    processData: false,
    url: `${restlocbp}bp/savefile`,
    headers: {
      user: vusrnm,
      token: vtoken,
    },
    data: form_data,
    cache: false,
    success: function (response) {
      var obj = JSON.parse(response);
      if (obj.status == false) {
        IsResponseFalse(obj.message);
      } else {
        IsResponseTrue(obj.message);
        $(".xwinuploadfile").modal("hide");
        LoadDataContent('ELECTRONIC');
        LoadDataContent('MD');
          // LoadDataContent('ID');
      }
    },
    error: function () {
      IsTimeOut(LogoutProtect);
    },
  });
});

$('.CancelData').click(function(){
  $(".xwinuploadimg").modal("hide");
  $(".xwinaddfilebp-main").modal("hide");
  $(".xwinuploadfile").modal("hide");
  $(".xwinaddchild-main").modal("hide");
  $(".xwinaddchild").modal("hide");
  $(".xwinengineersign").modal("hide");
  $(".xwinrejecthog").modal("hide");
  $(".xwinrejectpl").modal("hide");
  $(".xwinrevisipsc").modal("hide");
  $(".xwinhistorypsc").modal("hide");
  $(".xwinaddcheckdesign").modal("hide");
  $(".xwinaddcheckdqa").modal("hide");
  $(".xwinregulasi").modal("hide");
  $('.ui.accordion').accordion(
    {exclusive : false}
  );
  $(".xwinsortgroup").modal("hide");
  $(".xwintemplate").modal("hide");
  $(".xwinsortgroupL2").modal("hide");
  $(".xwinsortgroupL3").modal("hide");
  $(".xwinsortgroupL4").modal("hide");
  $(".xwinsortgroupL5").modal("hide");
  $(".xwincopyvaluepsc").modal("hide");
  $(".xwinmultipleoption").modal("hide");

  


});

  $('.copyvalue').click(function(){
    $(".xwincopyvalue").modal("show");
  });

  $('#BtnHistoryPSC').click(function(){
    $.ajax({
      type    : "POST",
      url: `${restlocbp}bp/load-datarevisi/`+idbp,
      headers : {
        user  : vusrnm,
        token : vtoken
      },
      data: {
      },
      cache: false,
      success: function (response){
        var obj = JSON.parse(response);
        $(".xwinhistorypsc").modal("show");
        if(isEmpty(obj)) {
          IsResponseEmptyObj();
        } else {
          $("#BodyRevisi").empty();
          jmlData = obj.length;
          // console.log(jmlData);
          for (a = 0; a < jmlData; a++) {
            console.log(obj[a]['no_bp']);
            $("#TableRevisi").find("tbody").append(
              "<tr>"+
                "<td width='28%'>"+obj[a]['no_bp']+" "+obj[a]['Rev']+"</td>"+
                "<td>"+obj[a]['TypeSupply']+" "+obj[a]['reason']+"</td>"+
              "</tr>"
            );   
          }
        }
      }
    });


  });

  $("#BtnCreateNPI").on("click", function () {
    window.location.href = "./?link=createnpi&i="+idlink;
  });

  //Download Buku Petunjuk Pdf
$("#Master").on("click", ".downloadbplengkap", function () {
  var efilepdf = $(this).attr("efile");
  $('<a href="../RND_Upload/'+efilepdf+'" target="blank"></a>')[0].click();
  // window.location.href = "./?link=viewbppdf&i=" + eidpdf;

});


  //fungsi hapus product spec
  $("#BtnCancelPSC").on("click", function () {
    var id_bp = $(this).attr("idbp");
    // var nm_psc = $(this).attr("nmpsc");
    Swal.fire({
      title: "<h3>Cancel Buku Petunjuk ini ?</h3>",
      text: 'Buku Petunjuk ini akan di Cancel dan tidak bisa dilanjutkan prosesnya.',
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocbp}bp/cancel_bp`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            id_bp : id_bp,
            username : vusrnm
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              //reload tabel dokumen
              window.location.href = "./?link=bpindex";
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });

//fungsi agree dengan perubahan produk-subproduk
$("#BtnAgreePSC").on("click", function () {
  var id_psc = $(this).attr("idbp");
  Swal.fire({
    title: "<h3>Setuju dengan Perubahan Produk-SubProduk di Buku Petunjuk ini ?</h3>",
    text: 'Product-SubProduct akan menggunakan isian/update yang baru tetapi efeknya adalah Field Content dan Value akan di-reset dan harus Approval ulang.',
    icon: "warning",
    confirmButtonText: "Ya",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url: `${restlocpsc}accept_syncpsc`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_psc : id_psc
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            //reload tabel dokumen
            window.location.href = "./?link=bpindex";
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
});


//fungsi agree dengan perubahan produk-subproduk
$("#BtnNotAgreePSC").on("click", function () {
  var id_psc = $(this).attr("idbp");
  Swal.fire({
    title: "<h3>Tidak Setuju Perubahan di Buku Petunjuk ini ?</h3>",
    text: 'Product-SubProduct akan tetap menggunakan isian Product-SubProduct yang sebelumnya.',
    icon: "warning",
    confirmButtonText: "Ya",
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      $.ajax({
        type: "POST",
        url: `${restlocpsc}reject_syncpsc`,
        headers: {
          user: vusrnm,
          token: vtoken,
        },
        data: {
          id_psc : id_psc
        },
        cache: false,
        success: function (response) {
          var obj = JSON.parse(response);
          if (obj.status == false) {
            IsResponseFalse(obj.message);
          } else {
            IsResponseTrue(obj.message);
            //reload tabel dokumen
            window.location.href = "./?link=bpindex";
          }
        },
        error: function () {
          IsTimeOut(LogoutProtect);
        },
      });
    }
  });
});
  
  //fungsi copy product spec
  $("#CopyValue").on("click", function () {
    var id_pscfrom = $("#CopyPSCFrom").val();
    // var id_pscto   = $("#PSCIdTo").val();
    console.log(idbp);
    Swal.fire({
      title: "<h3>Copy Buku Petunjuk ini ?</h3>",
      // text: nm_psc,
      icon: "info",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocbp}bp/copy-bp`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            IdFrom : id_pscfrom,
            IdTo   : idbp,
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              //reload tabel dokumen
              window.location.href = "./?link=bpindex";
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });

   //fungsi copy product spec
   $("#SaveTemplate").on("click", function () {
    var template = $("#PilihTemplate").val();
    // var id_pscto   = $("#PSCIdTo").val();
    Swal.fire({
      title: "<h3>Pilih Template Buku Petunjuk ini ?</h3>",
      // text: nm_psc,
      icon: "info",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocbp}bp/save-template`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            templates : template,
            idbpt   : idbp,
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              $(".xwintemplate").modal("hide");
              //reload tabel dokumen
              // window.location.href = "./?link=bpindex";
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });

  //fungsi copy product spec
  $("#NewTemplate").on("click", function () {
    var template = $("#template").val();
    // var id_pscto   = $("#PSCIdTo").val();
    Swal.fire({
      title: "<h3>Tambah template Buku Petunjuk ?</h3>",
      // text: nm_psc,
      icon: "info",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocbp}bp/save-template`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            templates : template,
            idbpt   : idbp,
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              //reload tabel dokumen
              window.location.href = "./?link=bpindex";
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });



  //fungsi hapus product spec
  $(".SendBackDQA").on("click", function () {
    var section = $(this).attr("sect");
    Swal.fire({
      title: "<h3>Kirim kembali Produk Spec ini ke DQA untuk evaluasi lebih lanjut ?</h3>",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: `${restlocpsc}returndqa`,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            PSCId : idbp,
            section: section
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              if(groupprd =="BROWN GOODS"){
                LoadDataContent('ELECTRONIC');
                // LoadDataPICDQA('ELECTRONIC');
              } else {
                // LoadDataContent('CYCLE');
                LoadDataContent('ELECTRONIC');
                // LoadDataPICDQA('CYCLE');
                // LoadDataPICDQA('ELECTRONIC');
              }
              LoadDataContent('MD');
              // LoadDataContent('ID');
              // LoadDataPICDQA('MD');
              // LoadDataPICDQA('ID');
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });


  //fungsi hapus product spec
  $(".SendNotifReg").on("click", function () {
    var section = $(this).attr("sect");
    Swal.fire({
      title: "<h3>Kirim Notif Buku Petunjuk ke DQA Regulasi untuk upload Nomor Disperindag ?</h3>",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_bp/bp/send-dqareg/`+idbp,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            BPId : idbp
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              // CustFeedback();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });

  //fungsi hapus product spec
  $(".SendNotifDesCheck").on("click", function () {
    var section = $(this).attr("sect");
    var idc = getCookie('IdValueBP');
    Swal.fire({
      title: "<h3>Kirim Notif ke Designer Checker untuk Pengecekan Buku Petunjuk ?</h3>",
      icon: "warning",
      confirmButtonText: "Ya",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          type: "POST",
          url     : `../RND_BackEnd/backend_bp/bp/send-designerchecker/`+idc,
          headers: {
            user: vusrnm,
            token: vtoken,
          },
          data: {
            BPId : idbp,
            IdChecker : idc
          },
          cache: false,
          success: function (response) {
            var obj = JSON.parse(response);
            if (obj.status == false) {
              IsResponseFalse(obj.message);
            } else {
              IsResponseTrue(obj.message);
              // CustFeedback();
            }
          },
          error: function () {
            IsTimeOut(LogoutProtect);
          },
        });
      }
    });
  });

  $("#AddTestResult").on("click", function (e) {
    $(".windowaddcustfeedback").modal("show");
  });

  $("#AddDraft").on("click", function (e) {
    $(".windowadddraft").modal("show");
  });

  $("#AddNewTemplate").on("click", function (e) {
    $(".windowaddtemplate").modal("show");
  });

  