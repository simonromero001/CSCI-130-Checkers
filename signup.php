<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$name = "CheckersDB";

$conn = new mysqli($servername, $username, $password, $name);

$username = $_POST['username'];
$password = $_POST['password'];


$query = "INSERT INTO CheckersTable (username, password, gamesplayed, gameswon, timeplayed) VALUES ('$username', '$password', 0, 0 ,0);";
$cookieName = "username";
$cookieValue = $username;
$cookieExpiration = time() + (86400 * 30); // 30 days
session_start();
$_SESSION['username'] = $username;
$_SESSION['password'] = $password;
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
        <li><a class="active" href="logout.php">Logout</a></li>
	</ul>
    <div id="userInfo"></div>

    <script>
        // Use AJAX to get session data from PHP
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'getSession.php', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const userInfoContainer = document.getElementById('userInfo');
                var responseData = JSON.parse(xhr.responseText);
                var username = responseData.username;

                if (username !== '') {
                    console.log('Username from session:', username);
                    userInfoContainer.textContent = 'Hello, ' + username; // Fix here
                    // Now you can use the 'username' variable in your JavaScript code
                } else {
                    console.log('User not logged in.');
                    userInfoContainer.textContent = 'Not logged in!';
                }
            }
        };
        
        xhr.send();
    </script>
    <h1>Checkers!</h1>
    <button class="page" onclick="location.href='login.html';" >Login/Sign Up</button>
    <button class="page" onclick="location.href='contact.html';">Contact</button> 
    <button class="page" onclick="location.href='pickgame.html';">Play</button>
    <button class="page" onclick="location.href='leaderboard.html';">Leaderboard</button>
    <button class="page" onclick="location.href='howto.html';">How to</button>
</body>
</html>