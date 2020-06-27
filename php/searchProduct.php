<?php
  include('connection.php');
  $search = $_REQUEST['search'];
  if(!empty($search)) {
    // echo "conection " . $search;
    $query = "SELECT * FROM catalogue WHERE name LIKE '$search%'";
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
        'price' => $row['price']
      );
    }

    $jsonString = json_encode($json);
    echo($jsonString);
  }
?>
