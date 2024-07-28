<?php 
session_start();
unset($_COOKIE["usrnm"]);
setcookie('usrnm', '', 1, '/');
unset($_COOKIE["token"]);
setcookie('token', '', 1, '/');
session_unset();
session_destroy();
header("Location: ./?link=login");
exit(); 
?>