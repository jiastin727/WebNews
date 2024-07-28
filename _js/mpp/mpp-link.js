var EncId = Ucrypt.encrypt(IdMPP, NonceValue); 

$('.tabuserguide').on('click', function() {
  window.location.href = "./?link=guidempp";
});

$('.tabsuratgolive').on('click', function() {
  window.location.href = "./?link=golivempp";
});

$('.tabhasilmonitoring').on('click', function() {
  window.location.href = "./?link=monitormpp";
});

$('.tabversion').on('click', function() {
  window.location.href = "./?link=versionhistory&app=MPP";
});

$('#tab1').on('click', function() {
  window.location.href = "./?link=mppindex&i="+EncId;
});

if(!MenuDisable){
$('#tab2').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&i="+EncId;
});

$('#tab3').on('click', function() {
  window.location.href = "./?link=scheduletrial&i="+EncId;
});
}

$('#tab4').on('click', function() {
  window.location.href = "./?link=ihpmpp&i="+EncId;
});

$('#tab5').on('click', function() {
  window.location.href = "./?link=ihpevaluationmpp&i="+EncId;
});

$('#tab6').on('click', function() {
  window.location.href = "./?link=shipmentmpp&i="+EncId;
});

if(!MenuDisable){
$('#tab7').on('click', function() {
  window.location.href = "./?link=approvalmpp&i="+EncId;
});
}

$('#tab8').on('click', function() {
  window.location.href = "./?link=materiallist&i="+EncId;
});

$('#tab9').on('click', function() {
  window.location.href = "./?link=changepicmpp&i="+EncId;
});

$('#tab10').on('click', function() {
  window.location.href = "./?link=mpptimeline&i="+EncId;
});

if(!MenuDisable){
$('#tab2A').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=1&i="+EncId;
});

$('#tab2B').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=2&i="+EncId;
});

$('#tab2BView').on('click', function() {
  window.location.href = "./?link=listkebutuhanmppv&t=2&i="+EncId;
});

$('#tab2C').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=3&i="+EncId;
});

$('#tab3A').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=1&i="+EncId;
});

$('#tab3B').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=2&i="+EncId;
});

$('#tab3C').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=3&i="+EncId;
});

$('#tab3D').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=4&i="+EncId;
});


$('#tab7A').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=1&i="+EncId;
});

$('#tab7B').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=2&i="+EncId;
});

$('#tab7C').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=3&i="+EncId;
});

$('#tab7D').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=4&i="+EncId;
});

}