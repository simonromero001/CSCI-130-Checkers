<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "CheckersDB";

$conn = new mysqli($servername, $username, $password, $name);

$username = $_POST['username'];
$password = $_POST['password'];


$query = "INSERT INTO CheckersTable (username, password, gamesplayed, gameswon, timeplayed) VALUES ('$username', '$password', 0, 0 ,0);";

$conn->query($query);
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>CSCI 130 Checkers</title>
</head>
<body>
	<ul>
		<li><img src="https://1000logos.net/wp-content/uploads/2019/11/Fresno-State-Bulldogs-Logo-1992.png"></li>
		<li><a class="active" href="index.html">Home</a></li>
        <li><a class="active" href="login.html">Login/Sign up</a></li>
        <li><a class="active" href="contact.html">Contact</a></li>
        <li><a class="active" href="pickgame.html">Play</a></li>
        <li><a class="active" href="leaderboard.html">Leaderboard</a></li>
        <li><a class="active" href="howto.html">How to</a></li>
	</ul>
    <h1>Checkers!</h1>
    <button class="page" onclick="location.href='login.html';" >Login/Sign Up</button>
    <button class="page" onclick="location.href='contact.html';">Contact</button> 
    <button class="page" onclick="location.href='pickgame.html';">Play</button>
    <button class="page" onclick="location.href='leaderboard.html';">Leaderboard</button>
    <button class="page" onclick="location.href='howto.html';">How to</button>
</body>
</html>