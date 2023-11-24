<?php

/**
 * returns mail subject and body
 * according to the email type 
 * passed
 * 
 * @param array $request
 * @return array
 */
function createMailTemplateFromMailType($request) : array 
{
    // Fetching mail type from request
    $mailType = strtolower($request["mail_type"]);

    // Creating subject line
    $subject = "Website Enquiry: Schedule a free consultation";

    // Creating body according to the mail type

    // First Line of the body common for all
    $body = '<p>Hi Team Asvi,</p>'; 
    
    // Middle Content & user details of the email according to mail type
    if ($mailType === "home_page" || $mailType === "contact_us") {

        // Update subject based on email type
        if ($mailType === "home_page") {
            $subject = "Website Enquiry: Homepage";
        } else {
            $subject = "Website Enquiry: Contact Us";
        }

        $body .= '<p>A new form inquiry has been received on the website, kindly check their contact details below:</p><br/>';

        // User details
        $body .= '<p>First Name: ' . $request["first_name"] . "</p>";
        $body .= '<p>Last Name: ' . $request["last_name"] . "</p>";
        $body .= '<p>Email Id: ' . $request["email_id"] . "</p>";
        $body .= '<p>Mobile Number: ' . $request["mobile_number"] . "</p>";
        $body .= '<p>Company Name: ' . $request["company_name"] . "</p>";
        $body .= '<p>Additional message:</p>';
        $body .= '<p>'. $request["additional_message"] .'</p>';

    } else {
        $body .= '<p>A new inquiry to book a consultation has been received, find their contact details below:</p><br/>';

        // If mail type is about us add one more field of name for the field
        if ($mailType === "about_us") {
            // Update subject for about us page
            $subject = "Website Enquiry: About Us"; 
            $body .= '<p>Name: ' . $request["name"] . "</p>";
        }

        $body .= '<p>Email Id: ' . $request["email_id"] . "</p>";
    }

    $array = array();
    $array["subject"] = $subject;
    $array["body"] = $body;

    return $array;
}

?>