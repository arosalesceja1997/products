<?php
  include('connection.php');
  $query = "SELECT * FROM catalogue";
  $result = mysqli_query($conn, $query);

  if(!$result){
    die('Query error: ' . mysqli_error($conn));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'id' => $row['id'],
      'name' => $row['name'],
      'typeProduct' => $row['typeProduct'],
      'description' => $row['description'],
      'price' => $row['price'],
      'img' => $row[img]
    );
  }

  $jsonString = json_encode($json);
  echo $jsonString;
?>
