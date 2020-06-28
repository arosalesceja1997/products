<?php
  include('connection.php');
  $destino = "assets/img/";

  $code = $_POST['code'];
  if($code > 0) {
    $query1 = "SELECT * FROM catalogue WHERE id=$code";
    $result1 = mysqli_query($conn, $query1);
    if(!$result1){
      die('Query error: ' . mysqli_error($conn));
    }

    $json = array();
    while($row = mysqli_fetch_array($result1)) {
      $json[] = array(
        'img' => $row['img'],
      );
    }
  }

  $name = $_POST['name'];
  $type = $_POST['type'];
  $description = $_POST['description'];
  $price = $_POST['price'];

  $destino .= $name.$_FILES['fileImg']['name'];
  $tempimg = $_FILES['fileImg']['tmp_name'];
  $resp = move_uploaded_file($tempimg, '../'.$destino);

  if(!$resp){
    die("No se agrego la imagen");
  }

  unlink('../'.$json[0]['img']);

  if($code > 0){
    $query = "UPDATE catalogue SET name='$name', typeProduct='$type', description='$description', price='$price', img='$destino'";
    $result = mysqli_query($conn, $query);
    if(!$result){
      die('Query failed: ' . mysqli_error($conn));
    }
  }
  else{
    if(isset($_POST['name'])) {
      $query = "INSERT into catalogue(name, typeProduct, description, price, img) VALUES ('$name', '$type', '$description', '$price', '$destino')";
      $result = mysqli_query($conn, $query);
      if(!$result){
        die('Query failed: ' . mysqli_error($conn));
      }

      echo "Producto agregado";
    }else{
      echo "Agrege el nombre";
    }
  }
?>
