<?php
    //import DBConfig file
    include 'DBConfig.php';

    //create connection
    $con = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);

    //received JSON goes into $json variable
    $json = file_get_contents('php://input');

    //decoding the received JSON and store into $obj variable
    $obj = json_decode($json, true);

    //populate name from JSON $obj array and store into $name
    $name = $obj['name'];

    //populate email from JSON $obj array and store into $email
    $email = $obj['email'];

    //populate password from JSON $obj array and store into $password
    $password = $obj['password'];

    //create SQL query and insert the record into MySQL database table
    $Sql_Query = "INSERT INTO account (name, email, password) VALUES ('$name', '$email', '$password')";

    if(mysqli_query($con, $Sql_Query)){
        //insert successfully, throw message
        $MSG = 'Data inserted successfully.';
    }