<?php
if(isset($_POST['name']) && isset($_POST['mail']) && isset($_POST['subject']) && isset($_POST['message'])){
	$address="your@mail.com";
	$fname = $_POST['name'];
	$fmail = $_POST['mail'];
	$fsubject = $_POST['subject'];
	$fmessage = $_POST['message'];
	$title = "From: $fname <$fmail>\n";
if (mail($address, $fsubject, $fmessage, $title)){
echo "1";
}else {
echo "0";
}
}
?>