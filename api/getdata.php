<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

$servername = "hackate.chi7azzc6jzj.ap-southeast-2.rds.amazonaws.com";
$username = "hackate";
$password = "hackate2017";

// Create connection
$conn = new mysqli($servername, $username, $password, 'hackate', 3306);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql = "SELECT * FROM test";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($r = $result->fetch_assoc()) {
        $rows['mydata'][] = $r;
    }
    print json_encode($rows);
} else {
    echo "0 results";
}
$conn->close();

?>

