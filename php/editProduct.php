<?php
  include('connection.php');
  if($_POST['thisId'] > 0){
    $id = $_POST['thisId'];
    $query = "DELETE FROM catalogue WHERE id=$id";
    $result = mysqli_query($conn, $query);
    if(!$result){
      die('Query error: ' . mysqli_error($conn));
    }
    echo "Se elimino producto correctamente.";
  }
?>
