<?php
session_start();

if (isset($_SESSION['username'])) {
    $response = array('username' => $_SESSION['username']);
    echo json_encode($response);
} else {
    echo json_encode(array('username' => ''));
}
?>
