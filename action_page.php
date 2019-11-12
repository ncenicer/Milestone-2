<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $connect = mysql_connect ($servername, $username, $password) or die("unable to connect to host");
    $sql = mysql_select_db ('database',$connect) or die("unable to connect to database");

    $user_info = "INSERT INTO users (firstName, lastName, email, password) VALUES ('$_POST[firstname]', '$_POST[lastname]', '$_POST[email]', '$_POST[password]')";
        if (!mysql_query($user_info, $connect)) { die('Error: ' . mysql_error()); }

        echo "Your information was added to the database";
    
    mysql_close($connect);
?>