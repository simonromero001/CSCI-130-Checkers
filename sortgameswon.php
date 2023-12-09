<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "IdolsDB";

$conn = new mysqli($servername, $username, $password, $name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Idols ORDER BY romajiname";
$result = $conn->query($sql);

$idols = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $idols[] = $row;
    }
}

echo json_encode($idols);
$conn->close();
?>