// class Producto {
//   constructor(id, nombre, descripcion, precio, img, cantidad) {
//     this.id = id;
//     this.nombre = nombre;
//     this.descripcion = descripcion;
//     this.precio = precio;
//     this.img = img;
//     this.cantidad = cantidad;
//   }
// }

// const productos = [
//   new Producto(1, "Ryzen 5 5600g", "3.9Ghz 6 Núcleos 12 Hilos", 34000, "../imagenes/ryzen-5000.png", 1),
//   new Producto(2, "Ryzen 5 5600x", "3.7Ghz 6 Núcleos 12 Hilos", 35000, "../imagenes/ryzen-5000.png", 1),
//   new Producto(3, "Ryzen 7 5700g", "3.8Ghz 8 Núcleos 16 Hilos", 42000, "../imagenes/ryzen-5000.png", 1),
//   new Producto(4, "Ryzen 7 5800x", "3.8Ghz 8 Núcleos 16 Hilos", 51000, "../imagenes/ryzen-5000.png", 1),
//   new Producto(5, "Ryzen 9 5900x", "3.7Ghz 12 Núcleos 24 Hilos", 65000, "../imagenes/ryzen-5000.png", 1),
//   new Producto(6, "Intel i5 12400f", "4.2Ghz 6 Núcleos 12 Hilos", 27390, "../imagenes/intel-12.png", 1),
//   new Producto(7, "Intel i5 12400", "2.5Ghz 6 Núcleos 12 Hilos", 30475, "../imagenes/intel-12.png", 1),
//   new Producto(8, "Intel i7 12700kf", "2.7Ghz 12 Núcleos 20 Hilos", 60540, "../imagenes/intel-12.png", 1),
//   new Producto(9, "Intel i7 12700k", "4.2Ghz 12 Núcleos 20 Hilos", 61980, "../imagenes/intel-12.png", 1),
//   new Producto(10, "Intel i9 12900k", "4.2Ghz 16 Núcleos 24 Hilos", 97500, "../imagenes/intel-12.png", 1),
// ];

// Guardar el LocalStorage: Hacer Local Stoe.setItem luego de JSONparse y stringify
let productosEnCarro;

let aux = localStorage.getItem("productosEnCarro");

if (!aux) {
  productosEnCarro = [];
} else {
  productosEnCarro = JSON.parse(aux);
  pintarProductosEnCarro();
}

function pintandoListado() {
  fetch("../data.json")
    .then((respuestaInicial) => respuestaInicial.json())
    .then((res) => {
      const productos = res;

      let aux = "";
      for (let i = 0; i < productos.length; i++) {
        aux += `<article>
        <img class="procesadores-img" src=${productos[i].img} alt="microprocesador-amd-para-comprar"/>
        <h3>${productos[i].nombre}</h3>
        <p>${productos[i].descripcion}</p>
        <p><strong>$${productos[i].precio}</strong></p>
        <p class="envio">Envío gratis</p>
        <a
          onclick="agregarAlCarrito({id: ${productos[i].id}, img: '${productos[i].img}', nombre: '${productos[i].nombre}', precio: ${productos[i].precio}, cantidad: ${productos[i].cantidad}})"
          id="but-carrito"
          class="ver-mas"
          href="#">🛒</a>
      </article>`;
      }
      // Ejemplo de DOM (acá lo "pintamos" en el DOM)
      document.getElementById("div-productos").innerHTML = aux;
    })
    .catch((e) => {
      // Mostrar Error de Fetch con SweetAlert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e,
      });
    });
}
pintandoListado();

// ----- Funciones del Carrito --------- //
function agregarAlCarrito(objetoProducto) {
  const existe = productosEnCarro.some((producto) => producto.id === objetoProducto.id);

  if (existe) {
    const prod = productosEnCarro.map((producto) => {
      if (producto.id === objetoProducto.id) {
        producto.cantidad++;
      }
      Swal.fire({
        title: "Excelente",
        text: "Agregado al Carrito",
        icon: "success",
        timer: 800,
        width: 400,
      });
    });
  } else {
    productosEnCarro.push(objetoProducto);
    Swal.fire({
      title: "Excelente",
      text: "Agregado al Carrito",
      icon: "success",
      timer: 800,
      width: 400,
    });
  }
  localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
  pintarProductosEnCarro();
}

// Borrar un item del carro
function borrarDelCarro(indice) {
  productosEnCarro.splice(indice, 1);

  localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
  pintarProductosEnCarro();
}

// Vaciar todo el carrito de compras
const botonVaciar = document.getElementById("vaciarCarrito");
botonVaciar.addEventListener("click", () => {
  if ((result = true)) {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Deseas eliminar los productos del carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Cerrando Modal
        nav.classList.remove("show");
        productosEnCarro.length = 0;
        localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
        pintarProductosEnCarro();
        Swal.fire("Eliminado!", "Tu carrito está vacio.", "success");
      }
    });
  }
});

// ------------------------------- //

function pintarProductosEnCarro() {
  let aux = "";
  for (let i = 0; i < productosEnCarro.length; i++) {
    aux += `<div style="border: 3px solid green; display: flex; flex-direction: column; max-width: 120px; margin: 10px; text-align: center;">
            <img class="procesadores-img" src=${productosEnCarro[i].img} alt="microprocesador-para-comprar"/>
                        <h3>${productosEnCarro[i].nombre}</h3>
                        <p>$ ${productosEnCarro[i].precio}</p>
                        <p>Cantidad: <span id="cantidad">${productosEnCarro[i].cantidad}</span></p>
                        <button 
                          onclick="borrarDelCarro(${i})" 
                          style="cursor: pointer; color: white; background-color: red; padding: 3px;">Eliminar 🗑️
                        </button>
                    </div>
                    `;
  }
  // Ejemplo de DOM (acá lo "pintamos" en el DOM)
  document.getElementById("div-carrito").innerHTML = aux;
  // Contador de Productos en Carrito
  const contadorCarrito = document.getElementById("contadorCarrito");
  contadorCarrito.innerText = productosEnCarro.reduce((acc, producto) => acc + parseInt(producto.cantidad), 0);
  // Precio Total productos en carro
  const precioTotal = document.getElementById("precioTotal");
  precioTotal.innerText = productosEnCarro.reduce(
    (acc, producto) => acc + parseInt(producto.precio * producto.cantidad),
    0
  );
}
pintarProductosEnCarro();
// Modal del Carrito
const button = document.querySelector("button");
const closebtn = document.querySelector(".closebtn");
const nav = document.querySelector(".nav");

button.onclick = () => {
  if (productosEnCarro.length >= 1) {
    nav.classList.add("show");
  } else {
    Swal.fire({
      icon: "error",
      title: "Carrito Vacio",
      text: "Aún no tienes productos",
      timer: 1800,
    });
  }
};
closebtn.onclick = () => {
  nav.classList.remove("show");
};
