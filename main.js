let articulosCarrito = [];
const listaProductos = document.getElementById("lista-productos");
const carrito = document.getElementById("carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const links = document.querySelectorAll("#navProductos a");
//console.log(links);

for (let link of links) {
  link.addEventListener("click", setURL);
}

function setURL(evt) {
  evt.preventDefault();
  //console.log("click");
  //console.log(evt.target.href);
  let url = `${evt.target.dataset.pagina}.html`;
  //console.log(url);
  pedirPagina(url);
}

function pedirPagina(url) {
  //console.log(url);
  fetch(url)
    .then((res) => {
      return res.text();
    })
    .then((pagina) => {
      //console.log(pagina);
      document.getElementById("presentaTarjetas").innerHTML = pagina;
    })
    .catch((err) => {
      alert(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  if (JSON.parse(localStorage.getItem("carrito")) == null) {
    articulosCarrito = [];
    console.log(articulosCarrito);
  } else {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(articulosCarrito);
  }
  carritoHTML();
});

listaProductos.addEventListener("click", agregarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
carrito.addEventListener("click", eliminarProducto);

function agregarProducto(evt) {
  if (evt.target.classList.contains("agregar-carrito")) {
    const producto = evt.target.parentElement;
    leerDatosProducto(producto);
  }
}

console.log(agregarProducto);

function eliminarProducto(evt) {
  console.log(evt.target.parentElement);
  if (evt.target.classList.contains("borrar-producto")) {
    const producto = evt.target.parentElement.parentElement;
    const productoId = producto.querySelector("a").getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    carritoHTML();
  }
}

function leerDatosProducto(item) {
  const infoProducto = {
    imagen: item.querySelector("img").src,
    titulo: item.querySelector("h1").textContent,
    precio: item.querySelector(".precio").textContent,
    id: item.querySelector("button").getAttribute("id"),
    cantidad: 1,
  };
  console.log(infoProducto);
  if (articulosCarrito.some((item) => item.id === infoProducto.id)) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        let cantidad = parseInt(producto.cantidad);
        cantidad += 1;
        producto.cantidad = cantidad;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = productos.slice();
  } else {
    articulosCarrito.push(infoProducto);
  }
  carritoHTML();
}

function carritoHTML() {
  limpiarCarrito();
  articulosCarrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td><img src="${producto.imagen}" width = "200"/></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}"> ❌ </a>
        </td>
        `;
    contenedorCarrito.appendChild(fila);
  });
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("articulosCarrito", JSON.stringify(articulosCarrito));
}

function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    articulosCarrito = [];
    sincronizarStorage();
  }
}

/*Quedaron muy bien las modificaciones que realizaste en el código para mostrar los productos agregados en el carrito y utilizar el localStorage para almacenar los datos 
del carrito de compras. Te quería comentar una observación en el código: Hay un problema al recuperar los datos del carrito desde el localStorage. Al obtener los datos del 
carrito desde el storage no estas utilizando la misma clave que utilizaste al guardarlos. 
Además, quería comentarte algunas sugerencias que podrías agregar para la entrega final: Podrías agregar una funcionalidad para que el usuario pueda finalizar la compra, 
en donde tenga que ingresar sus datos personales y luego de validarlos, mostrar un mensaje de compra finalizada y limpiar el carrito de compras. Además, para hacer 
dinámica la carga de nuevos productos podrías modificar el código y generar la información de los productos disponibles desde el código js.*/
