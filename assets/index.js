// let theObject = new XMLHttpRequest();
// theObject.open('GET', 'crud.php', true);
// theObject.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// theObject.onreadystatechange = function () {
//   document.getElementById('title').innerHTML = theObject.responseText;
// }
// theObject.send();

$(function () {
  $('#search').keyup(function () {
    let search = $('#search').val();
    $.ajax({
      url: '/php/config.php',
      type: 'POST',
      data: { search },
      success: function (response) {
        let data = JSON.parse(response);
        let template = '';
        data.forEach(product => {
          template +=
            `<div class="card mb-3">
              <h3 class="card-header"> ${product.name} </h3>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <h6 class="card-subtitle text-muted">Support card subtitle</h6>
              </div>
              <img style="height: 200px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image">
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
              <div class="card-footer text-muted">
                2 days ago
              </div>
            </div>`
        });
      }
    })
  });

  $('#addProduct').submit(function (e) {
    let postData = new FormData($('#addProduct')[0]);

    $.ajax({
      url: 'php/addProduct.php',
      type: 'POST',
      data: postData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log(response);
        $('#addProduct').trigger('reset');
        showProducts();
      }
    });
    e.preventDefault();
  });

  showProducts()
});

function showProducts() {
  $.ajax({
    url: '/php/showProduct.php',
    type: 'GET',
    success: function (response) {
      let data = JSON.parse(response);
      let template = '';
      let img = "";

      data.forEach(product => {
        img = product.img;

        template += `
          <div class="col-6">
            <div class="card mb-3">
              <h3 class="card-header">${product.name}</h3>
              <img style="height: 200px; width: 100%; display: block;" src="${img}" alt="Card image">
              <div class="card-body">
                <p class="card-text">${product.description}</p>
              </div>
              <div class="card-body">
                ${product.price}
              </div>
              <div class="card-footer text-muted">
                <button type="button" class="btn btn-primary" id="ed${product.id}" value="${product.id}" onclick="editProduct(this.value)">Editar</button>
                <button type="button" class="btn btn-secondary" id="de${product.id}" value="${product.id}" onclick="deleteProduct(this.value)">Eliminar</button>
              </div>
            </div>
          </div>`
      });

      $('#contentProducts').html(template);
    }
  })
}

function validarFile(all) {
  //EXTENSIONES Y TAMANO PERMITIDO.
  var extensiones_permitidas = [".png", ".bmp", ".jpg", ".jpeg", ".gif"];
  var tamano = 8; // EXPRESADO EN MB.
  var rutayarchivo = all.value;
  var ultimo_punto = all.value.lastIndexOf(".");
  var extension = rutayarchivo.slice(ultimo_punto, rutayarchivo.length);
  if (extensiones_permitidas.indexOf(extension) == -1) {
    alert("Extensión de archivo no valida");
    document.getElementById(all.id).value = "";
    return; // Si la extension es no válida ya no chequeo lo de abajo.
  }
  if ((all.files[0].size / 1048576) > tamano) {
    alert("El archivo no puede superar los " + tamano + "MB");
    document.getElementById(all.id).value = "";
    return;
  }
}

function editProduct(id) {
  $.ajax({
    url: 'php/addProduct.php',
    type: 'POST',
    data: id,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#addProduct').trigger('reset');
      showProducts();
    }
  });
}

function deleteProduct(id) {
  const data = {
    thisId: id
  };

  $.ajax({
    url: 'php/deleteProduct.php',
    type: 'POST',
    data: data,
    success: function (response) {
      console.log(response);
      showProducts();
    }
  });
}
