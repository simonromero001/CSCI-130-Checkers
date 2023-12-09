<?php

$servername = "localhost";
$username = "simon";
$password = "1234";
$dbname = "CheckersDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userInput = $_POST['username'];
$passInput = $_POST['password'];

$sql = "SELECT * FROM CheckersTable WHERE username = '$userInput' AND password = '$passInput'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    session_start();
    $_SESSION['username'] = $row['username'];
    $_SESSION['password'] = $row['password'];
}

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
        <li><a class="active" href="logout.php">Logout</a></li>
    </ul>
    </div>
    <?php

    if (isset($_SESSION['username'])) {
        echo '<p>Hello, ' . $_SESSION['username'] . '!</p>';
    } else {
        echo 'Not Logged In';
    }
    ?>
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