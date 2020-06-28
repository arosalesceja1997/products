<?php
  include('connection.php');
  if($_POST['thisId'] > 0){
    $id = $_POST['thisId'];

    $query1 = "SELECT * FROM catalogue WHERE id=$id";
    $result1 = mysqli_query($conn, $query1);

    $json = array();
    while($row = mysqli_fetch_array($result1)) {
      $json[] = array(
        'img' => $row['img']
      );
    }

    $query = "DELETE FROM catalogue WHERE id=$id";
    $result = mysqli_query($conn, $query);
    if(!$result){
      die('Query error: ' . mysqli_error($conn));
    }
    unlink('../'.$json[0]['img']);
    echo "Se elimino producto correctamente.";
  }
?>
