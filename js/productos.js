const productos = [
  {
    id: 1,
    nombre: "Ryzen 7 5700g",
    precio: 42000,
    img: "../imagenes/ryzen-5000.png",
  },
  {
    id: 2,
    nombre: "Ryzen 5 5600g",
    precio: 34000,
    img: "../imagenes/ryzen-5000.png",
  },
  {
    id: 3,
    nombre: "Ryzen 7 5800x",
    precio: 51000,
    img: "../imagenes/ryzen-5000.png",
  },
  {
    id: 4,
    nombre: "Ryzen 7 5600x",
    precio: 35000,
    img: "../imagenes/ryzen-5000.png",
  },
  {
    id: 5,
    nombre: "Ryzen 9 5900x",
    precio: 65000,
    img: "../imagenes/ryzen-5000.png",
  },
  {
    id: 6,
    nombre: "Intel i5 12400f",
    precio: 27390,
    img: "../imagenes/intel-12.png",
  },
  {
    id: 7,
    nombre: "Intel i5 12400",
    precio: 30475,
    img: "../imagenes/intel-12.png",
  },
  {
    id: 8,
    nombre: "Intel i7 12700kf",
    precio: 60540,
    img: "../imagenes/intel-12.png",
  },
  {
    id: 9,
    nombre: "Intel i7 12700k",
    precio: 61980,
    img: "../imagenes/intel-12.png",
  },
  {
    id: 10,
    nombre: "Intel i9 12900k",
    precio: 97500,
    img: "../imagenes/intel-12.png",
  },
];

// Guardar el LocalStorage: Hacer Local Stoe.setItem luego de JSONparse y stringify
let aux = localStorage.getItem("productosEnCarro");
let productosEnCarro;

if (!aux) {
  productosEnCarro = [];
} else {
  productosEnCarro = JSON.parse(aux);
  pintarProductosEnCarro();
}

function pintandoListado() {
  let aux = "";
  for (let i = 0; i < productos.length; i++) {
    aux =
      aux +
      `<article>
        <img class="procesadores-img" src=${productos[i].img} alt="microprocesador-amd-para-comprar"/>
        <h3>${productos[i].nombre}</h3>
        <p>4.2Ghz 8 Núcleos 16 Hilos</p>
        <p><strong>$${productos[i].precio}</strong></p>
        <p class="envio">Envío gratis</p>
        <a
          onclick="agregarAlCarrito({img: '${productos[i].img}', nombre: '${productos[i].nombre}', precio: '${productos[i].precio}'})"
          id="but-carrito"
          class="ver-mas"
          href="#">🛒</a>
      </article>`;
  }
  // Ejemplo de DOM (acá lo "pintamos" en el DOM)
  document.getElementById("div-productos").innerHTML = aux;
}
pintandoListado();

// ----- Funciones del Carrito --------- //
function agregarAlCarrito(objetoProducto) {
  productosEnCarro.push(objetoProducto);

  localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
  pintarProductosEnCarro();
}

function borrarDelCarro(indice) {
  productosEnCarro.splice(indice, 1);

  localStorage.setItem("productosEnCarro", JSON.stringify(productosEnCarro));
  pintarProductosEnCarro();
}

// ------------------------------- //

function pintarProductosEnCarro() {
  let aux = "";
  for (let i = 0; i < productosEnCarro.length; i++) {
    aux =
      aux +
      `<div style="border: 3px solid green; display: flex; flex-direction: column; max-width: 120px; margin: 10px; text-align: center;">
        <img class="procesadores-img" src=${productosEnCarro[i].img} alt="microprocesador-para-comprar"/>
                        <h3>${productosEnCarro[i].nombre}</h3>
                        <p>$ ${productosEnCarro[i].precio}</p>
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
  contadorCarrito.innerText = productosEnCarro.length;
  // Precio Total productos en carro
  const precioTotal = document.getElementById("precioTotal");
  precioTotal.innerText = productosEnCarro.reduce((acc, producto) => acc + parseInt(producto.precio), 0);
}

const button = document.querySelector("button");
const closebtn = document.querySelector(".closebtn");
const nav = document.querySelector(".nav");

button.onclick = () => {
  nav.classList.add("show");
};

closebtn.onclick = () => {
  nav.classList.remove("show");
};
