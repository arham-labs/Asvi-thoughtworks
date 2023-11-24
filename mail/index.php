<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';
require 'utils/send_mail.php';

$mail = new PHPMailer(true);

try {
    // Send email only if request type is post
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get env variable
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $mailPort = $_ENV["MAIL_PORT"];
        $mailHost = $_ENV["MAIL_HOST"];
        $mailUsername = $_ENV["MAIL_USERNAME"];
        $mailPassword = $_ENV["MAIL_PASSWORD"];
        $mailEncryption = $_ENV["MAIL_ENCRYPTION"];
        $mailFromAddress = $_ENV["MAIL_FROM_ADDRESS"];
        $mailFromName = $_ENV["MAIL_FROM_NAME"];
        
        // Server settings
        $mail->isSMTP();
        $mail->SMTPOptions = array(
            'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
        $mail->SMTPSecure = false;
        $mail->SMTPAutoTLS = false;
        $mail->Host = $mailHost;
        $mail->SMTPAuth = true;
        $mail->Username = $mailUsername;
        $mail->Password = $mailPassword;
        $mail->SMTPSecure = $mailEncryption;
        $mail->Port = $mailPort;

        // Set Mail From
        $mail->setFrom("_mainaccount@asvithoughtworks.com", $mailFromName);

        // Validating post request
        $request = array();
        
        // Check if mail type is passed
        $request["mail_type"] = $_POST["mail_type"] ?? "";
        
        // Throw error if mail type is empty
        if (empty($request["mail_type"])) {
            throw new Exception("Mail type is required");
        }

        $request["first_name"] = $_POST["first_name"] ?? "";
        $request["last_name"] = $_POST["last_name"] ?? "";
        $request["email_id"] = $_POST["email_id"] ?? "";
        $request["mobile_number"] = $_POST["mobile_number"] ?? "";
        $request["company_name"] = $_POST["company_name"] ?? "";
        $request["additional_message"] = $_POST["additional_message"] ?? "";
        $request["name"] = $_POST["name"] ?? "";

        // Dispatch data to send mail function
        $success = sendMail($mail, $request);

        // Throw error if email was not sent
        if (!$success) {
            throw new Exception("Error sending email. Message could not be sent");
        }

        echo json_encode('Email Sent Successfully');
    }else{
        echo "404!, No page found";
    }
} catch (Exception $e) 
{
    $logFilePath = __DIR__ . '/error.log';
    $error = "\n" . date("Y-m-d H:i:s") . " " . $e->getMessage();
    error_log($error, 1, $logFilePath);
    error_log($mail->ErrorInfo, 1, $logFilePath);
    echo json_encode($mail->ErrorInfo);
}

?>