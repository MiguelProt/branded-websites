<?php
// Include PHPMailer classes directly (standalone version)
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Honeypot validation
if (!empty($_POST['honeypot'])) {
    die('Spam detected');
}

// Collect form data
$fullName = $_POST['fullName'];
$email = $_POST['email'];
$message = $_POST['message'];

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Set mailer to use SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';       // Use Gmail SMTP server
    $mail->SMTPAuth = true;               // Enable SMTP authentication
    $mail->Username = 'yourcompany@gmail.com';  // Your Gmail email address
    $mail->Password = 'your_gmail_app_password'; // Gmail app password (or account password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port = 587;                    // TCP port for Gmail

    // Set email headers
    $mail->setFrom('yourcompany@gmail.com', 'Your Company');  // From address
    $mail->addReplyTo($email, $fullName);                     // Reply-to address
    $mail->addAddress('yourcompany@gmail.com', 'Your Name');  // Recipient address

    // Set email content
    $mail->isHTML(true);  // Enable HTML email format
    $mail->Subject = 'New Form Submission';
    $mail->Body    = "<p><strong>Name:</strong> $fullName</p>
                      <p><strong>Email:</strong> $email</p>
                      <p><strong>Message:</strong> $message</p>";

    // Send the email
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    // Handle errors
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
