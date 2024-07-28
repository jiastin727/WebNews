$('#tab1').on('click', function() {
  window.location.href = "./?link=mppindex&i="+IdMPP;
});

if(!MenuDisable){
$('#tab2').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&i="+IdMPP;
});

$('#tab3').on('click', function() {
  window.location.href = "./?link=scheduletrial&i="+IdMPP;
});
}

$('#tab4').on('click', function() {
  window.location.href = "./?link=ihpmpp&i="+IdMPP;
});

$('#tab5').on('click', function() {
  window.location.href = "./?link=ihpevaluationmpp&i="+IdMPP;
});

$('#tab6').on('click', function() {
  window.location.href = "./?link=shipmentmpp&i="+IdMPP;
});

if(!MenuDisable){
$('#tab7').on('click', function() {
  window.location.href = "./?link=approvalmpp&i="+IdMPP;
});
}

$('#tab8').on('click', function() {
  window.location.href = "./?link=materiallist&i="+IdMPP;
});

$('#tab9').on('click', function() {
  window.location.href = "./?link=changepicmpp&i="+IdMPP;
});

$('#tab10').on('click', function() {
  window.location.href = "./?link=mpptimeline&i="+IdMPP;
});

if(!MenuDisable){
$('#tab2A').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=1&i="+IdMPP;
});

$('#tab2B').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=2&i="+IdMPP;
});

$('#tab2C').on('click', function() {
  window.location.href = "./?link=listkebutuhanmpp&t=3&i="+IdMPP;
});

$('#tab3A').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=1&i="+IdMPP;
});

$('#tab3B').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=2&i="+IdMPP;
});

$('#tab3C').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=3&i="+IdMPP;
});

$('#tab3D').on('click', function() {
  window.location.href = "./?link=scheduletrial&t=4&i="+IdMPP;
});


$('#tab7A').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=1&i="+IdMPP;
});

$('#tab7B').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=2&i="+IdMPP;
});

$('#tab7C').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=3&i="+IdMPP;
});

$('#tab7D').on('click', function() {
  window.location.href = "./?link=approvalmpp&t=4&i="+IdMPP;
});
}