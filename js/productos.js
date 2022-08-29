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
  // Cerrar carrito si no hay productos
  if (productosEnCarro.length == 0) {
    nav.classList.remove("show");
  }
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
    aux += `<div class="producto-en-carro">
                <img class="procesadores-img" 
                  src=${productosEnCarro[i].img} alt="microprocesador-para-comprar"/>
                <h3>${productosEnCarro[i].nombre}</h3>
                <p>$ ${productosEnCarro[i].precio}</p>
                <p>Cantidad: <span id="cantidad">${productosEnCarro[i].cantidad}</span></p>
                  <button class="borrar-producto"
                    onclick="borrarDelCarro(${i})" 
                    >Eliminar 🗑️
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

// Buscador
let btnBuscar = document.getElementById("buscar-btn");

btnBuscar.addEventListener("click", () => {
  fetch("../data.json")
    .then((respuestaInicial) => respuestaInicial.json())
    .then((res) => {
      let inputBuscar = document.getElementById("buscar").value;

      const produc = res.filter((p) => {
        return p.nombre.toLowerCase().includes(inputBuscar.toLowerCase());
      });

      document.getElementById("div-productos").innerHTML = "";
      if (produc.length != 0) {
        for (let i = 0; i < produc.length; i++) {
          document.getElementById("div-productos").innerHTML += `<article>
                            <img class="procesadores-img" src=${produc[i].img} alt="microprocesador-amd-para-comprar"/>
                            <h3>${produc[i].nombre}</h3>
                            <p>${produc[i].descripcion}</p>
                            <p><strong>$${produc[i].precio}</strong></p>
                            <p class="envio">Envío gratis</p>
                            <a
                              onclick="agregarAlCarrito({id: ${produc[i].id}, img: '${produc[i].img}', nombre: '${produc[i].nombre}', precio: ${produc[i].precio}, cantidad: ${produc[i].cantidad}})"
                              id="but-carrito"
                              class="ver-mas"
                              href="#">🛒</a>
                          </article>`;
          document.getElementById("textBusqueda").innerHTML = `Mostrando coincidencias con '${inputBuscar}'`;
        }
      } else {
        document.getElementById("textBusqueda").innerHTML = `No se escontraron coincidencias con '${inputBuscar}'`;
        pintandoListado();
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
