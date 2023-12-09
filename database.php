<?php
$servername = "localhost";
$username = "simon";
$password = "1234";
$conn = new mysqli($servername, $username, $password);

if($conn->connect_error) {
    die("".$conn->connect_error);
}
echo "Connected successfully <br>";

$dbname = "CheckersDB";
$dbExistsQuery = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
$dbExistsResult = $conn->query($dbExistsQuery);

if($dbExistsResult->num_rows > 0) {
    echo "Database already exists.";
} else {
    $sql = "CREATE DATABASE ".$dbname;
    if($conn->query($sql)) {
        echo "Database ".$dbname." created successfully<br>";
    } else {
        echo "Error creating database ".$dbname." : ".$conn->error."<br>";
    }
}

$conn->select_db($dbname);

$sql = "CREATE TABLE CheckersTable (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
password VARCHAR(30) NOT NULL,
gamesplayed INT(30) NOT NULL,
gameswon INT(30) NOT NULL,
timeplayed INT(30) NOT NULL,
reg_date TIMESTAMP
)";

if($conn->query($sql) === TRUE) {
    echo "Table CheckersTable created successfully";
} else {
    echo "Error creating table: ".$conn->error;
}

$conn->close();
?>