class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }
}

const productos = [
  new Producto(1, "Ryzen 7 5700g", 42000, "../imagenes/ryzen-5000.png"),
  new Producto(2, "Ryzen 5 5600g", 34000, "../imagenes/ryzen-5000.png"),
  new Producto(3, "Ryzen 7 5800x", 51000, "../imagenes/ryzen-5000.png"),
  new Producto(4, "Ryzen 7 5600x", 35000, "../imagenes/ryzen-5000.png"),
  new Producto(5, "Ryzen 9 5900x", 65000, "../imagenes/ryzen-5000.png"),
  new Producto(6, "Intel i5 12400f", 27390, "../imagenes/intel-12.png"),
  new Producto(7, "Intel i5 12400", 30475, "../imagenes/intel-12.png"),
  new Producto(8, "Intel i7 12700kf", 60540, "../imagenes/intel-12.png"),
  new Producto(9, "Intel i7 12700k", 61980, "../imagenes/intel-12.png"),
  new Producto(10, "Intel i9 12900k", 97500, "../imagenes/intel-12.png"),
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
    aux += `<article>
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
    aux += `<div style="border: 3px solid green; display: flex; flex-direction: column; max-width: 120px; margin: 10px; text-align: center;">
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
