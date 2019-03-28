<?php


require ('PHPMailer.php');
require ('SMTP.php');


    $email= $_POST["email"];
    


    $message ='<table style="width:100%">
        <tr>
        </tr>
        <tr><td>Email: '.$email.'</td></tr>
        
    </table>';

	$mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->IsSMTP(); // enable SMTP

    //$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "marcs3591@gmail.com";
    $mail->Password = "jar4ik3591";
    $mail->SetFrom("studyso@studyso.at");
    $mail->Subject = "Test";
    $mail->Body = $message;
    $mail->AddAddress("vinni95@ukr.net");
if(!$mail->send()) {
  echo 'Message was not sent.';
  echo 'Mailer error: ' . $mail->ErrorInfo;
} else {
  echo 'Message has been sent.';
}
