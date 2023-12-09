<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "CheckersDB";

$conn = new mysqli($servername, $username, $password, $name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM CheckersTable ORDER BY timeplayed DESC";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);
$conn->close();
?>