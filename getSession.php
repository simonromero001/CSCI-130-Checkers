<?php
session_start();

// Assume you have a session variable named 'username'
if (isset($_SESSION['username'])) {
    $response = array('username' => $_SESSION['username']);
    echo json_encode($response);
} else {
    echo json_encode(array('username' => ''));
}
?>
