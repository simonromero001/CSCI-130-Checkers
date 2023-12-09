<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$dbname = "CheckersDB";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get username and password from POST request
$userInput = $_POST['username'];
$passInput = $_POST['password'];

// Use prepared statement to avoid SQL injection
$sql = "SELECT * FROM CheckersTable WHERE username = '$userInput' AND password = '$passInput'";
$result = $conn->query($sql);

// Check if a row was returned (login successful)
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $cookieName = "username";
    $cookieValue = $row['username'];
    $cookieExpiration = time() + (86400 * 30); // 30 days

    setcookie($cookieName, $cookieValue, $cookieExpiration, "/");
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>Document</title>
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
    <div id="userInfo">
        <?php
        // Check if the user_id cookie is set
        if (isset($_COOKIE['username'])) {
            $username = $_COOKIE['username'];
            echo 'Username: ' . htmlspecialchars($username);
        } else {
            echo 'Username not found.';
        }
        ?>
    </div>
    <div class="container">
        <form action="login.php" method="post">
            <h1>Login</h1>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>
    </div>

    <div class="container">
        <form action="signup.php" method="post">
            <h1>Sign Up</h1>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Sign Up</button>
        </form>
    </div>
</body>
</html>

