const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const AUTOSLIST = "https://japceibal.github.io/emercado-api/cats_products/"
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
async function getjsondataasyinc(url){
  showSpinner();
  try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data) 
      hideSpinner();
      return (data);
  } catch (error) {
      console.log(error);
      alert(error)
      hideSpinner();
  }
  
}
document.addEventListener("DOMContentLoaded", function(e){
  if(localStorage.getItem("email") != null){
    let contenido = ""
    let email = localStorage.getItem("email");
    contenido += email;
    let userItem = document.getElementById("userEmail");
    if(!!userItem){
      userItem.innerHTML = contenido;
    }
  }
});
  
  

function showNavbar (){
  document.getElementById("navbar").innerHTML = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="home.html">Inicio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="categories.html">Categorias</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="products.html">Productos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Hola, ${localStorage.getItem("email")}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="cart.html">Ver mi Carrito</a>
          <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
          <button type="button" class="dropdown-item" onclick="logout()">Cerrar Sesión</button>
        </div>
      </li>
    </ul>
  </div>
</nav>`
}

function logout(){ 
  localStorage.removeItem("email", undefined);
  window.location ="index.html";
  
  return false
  
  } 
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  showNavbar();
});