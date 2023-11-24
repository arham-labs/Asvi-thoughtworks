<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'mail_template.php';

/**
 * Send Mail according to the email 
 * type passed in request
 *
 * @param PHPMailer $mail
 * @param mixed $request
 * @return boolean
 */
function sendMail(PHPMailer $mail, $request) : bool
{
    // setting recipient for the mail
    $mail->addAddress('snigdhatripathi@asvithoughtworks.com', $request['first_name'] . ' ' . $request['last_name']);

    $mailDataArray = createMailTemplateFromMailType($request);

    // Email content
    $mail->isHTML(true);
    $mail->Subject = $mailDataArray["subject"];
    $mail->Body = $mailDataArray["body"];

    // Send email
    $isSent = $mail->send();

    // Check if sent successfully
    if ($isSent) {
        return true;
    }

    return false;
}

?>