<?php
$servername = "localhost";
$DBusername = "simon";
$password = "1234";
$dbname = "CheckersDB";

$conn = new mysqli($servername, $DBusername, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_GET["username"];

$sqlSelect = "SELECT gamesplayed FROM CheckersTable WHERE username = '$username'";
$result = $conn->query($sqlSelect);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentGamesPlayed = $row['gamesplayed'];

    $newGamesPlayed = $currentGamesPlayed + 1;
    $sqlUpdate = "UPDATE CheckersTable SET gamesplayed = $newGamesPlayed WHERE username = '$username'";
    
    if ($conn->query($sqlUpdate) === TRUE) {
        echo "Games played incremented successfully. New value: $newGamesPlayed\n";
    } else {
        echo "Error updating gamesplayed: " . $conn->error . "\n";
    }
} else {
    echo "No user found with the specified username.\n";
}
$conn->close();
?>