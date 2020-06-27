<?php
  include('connection.php');
  $destino = "assets/img/";

  if(isset($_POST['name'])) {
    $name = $_POST['name'];
    $type = $_POST['type'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $destino .= $name.$_FILES['fileImg']['name'];
    $tempimg = $_FILES['fileImg']['tmp_name'];
    $resp = move_uploaded_file($tempimg, '../'.$destino);

    if(!$resp){
      die("No se agrego la imagen " .$tempimg . " ---------- " .$img);
    }else{
      // die("Todo salio bien");
    }

    $query = "INSERT into catalogue(name, typeProduct, description, price, img) VALUES ('$name', '$type', '$description', '$price', '$destino')";
    $result = mysqli_query($conn, $query);
    if(!$result){
      die('Query failed: ' . mysqli_error($conn));
    }

    echo "Producto agregado";
  }else{
    echo "Agrege el nombre";
  }
?>
