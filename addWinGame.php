<?php
$servername = "localhost";
$DBusername = "simon";
$password = "1234";
$dbname = "CheckersDB";

$conn = new mysqli($servername, $DBusername, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_GET["username"];
$time = $_GET["time"];

// Update gameswon
$sqlSelect = "SELECT gameswon FROM CheckersTable WHERE username = '$username'";
$result = $conn->query($sqlSelect);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentGamesWon = $row['gameswon'];

    // Increment the value
    $newGamesWon = $currentGamesWon + 1;

    // Update the database with the new value
    $sqlUpdate = "UPDATE CheckersTable SET gameswon = $newGamesWon WHERE username = '$username'";
    
    if ($conn->query($sqlUpdate) === TRUE) {
        echo "Games won incremented successfully. New value: $newGamesWon\n";
    } else {
        echo "Error updating gameswon: " . $conn->error . "\n";
    }
} else {
    echo "No user found with the specified username.\n";
}

// Update timeplayed
$sqlSelect = "SELECT timeplayed FROM CheckersTable WHERE username = '$username'";
$result = $conn->query($sqlSelect);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $currentTimePlayed = $row['timeplayed'];

    // Increment the value
    $newTimePlayed = $currentTimePlayed + $time;

    // Update the database with the new value
    $sqlUpdate = "UPDATE CheckersTable SET timeplayed = $newTimePlayed WHERE username = '$username'";
    
    if ($conn->query($sqlUpdate) === TRUE) {
        echo "Time played incremented successfully. New value: $newTimePlayed\n";
    } else {
        echo "Error updating timeplayed: " . $conn->error . "\n";
    }
} else {
    echo "No user found with the specified username.\n";
}

// Close the database connection
$conn->close();
?>