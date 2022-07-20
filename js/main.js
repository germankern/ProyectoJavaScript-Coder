function textoConListadoDeProductos() {
    let texto = ""
    for (let i = 0; i < productos.length; i++){
        texto 
            += i + 1
            + " - " + productos[i].nombre
            + " ($" + productos[i].precio + ")\n"
    }
    return texto
}

function preguntarQueQuiereComprar() {
    let respuesta
    const listadoDeOpciones = textoConListadoDeProductos()
    const pregunta = "¿Que te interesa comprar?\nEstos son nuestros productos:\n\n" + listadoDeOpciones + "0 - Ir al carrito"
    do {
        respuesta = Number(prompt(pregunta))
        if (isNaN(respuesta) || respuesta > productos.length ) {
            alert("Ingrese una opcion valida")
        }
    } while(isNaN(respuesta))
    return productos[respuesta - 1]
}

function preguntarCantidad() {
    let cantidad
    do {
        cantidad = Number(prompt("Que cantidad quiere comprar"))
        if (isNaN(cantidad)) {
            alert("Ingrese un numero valido")
        }
    } while(isNaN(cantidad))
    return cantidad
}


function cargarProducto() {
    // Preguntar al usuario que quiere comprar y darle las opciones, la primera opcion es salir
    const respuesta = preguntarQueQuiereComprar()
    // si la respuesta es uno de los productos tiene que ir al siguiente paso
    if (respuesta) {
        // Preguntar la cantidad a comrpar de ese producto
        const cantidad = preguntarCantidad()
        // Agrega producto y cantidad al carrito
        const nuevaCompra = {
            producto: respuesta,
            cantidad: cantidad
        }
        carrito.push(nuevaCompra)
    }
    return respuesta
}

function generarTextoDelCarrito() {
    let texto = ""
    for (let i = 0; i < carrito.length; i++){
        texto 
            += carrito[i].cantidad
            + " x "
            + carrito[i].producto.nombre
            + " ($"
            + carrito[i].producto.precio
            +")\n"
    }
    return texto
}

function obtenerTotal() {
    let total = 0
    for (let i = 0; i < carrito.length; i++){
        total += carrito[i].cantidad * carrito[i].producto.precio
    }
    return total
}


// Aca comienza a correr el codigo
const productos = [
    {
        id: 1,
        nombre: "Ryzen 7 5700g",
        precio: 42000
    },
    {
        id: 2,
        nombre: "Ryzen 5 5600g",
        precio: 34000
    },
    {
        id: 3,
        nombre: "Ryzen 7 5800x",
        precio: 51000
    },
    {
        id: 4,
        nombre: "Ryzen 7 5600x",
        precio: 35000
    },
    {
        id: 5,
        nombre: "Ryzen 9 5900x",
        precio: 65000
    }, 
    {
        id: 6,
        nombre: "Intel i5 12400f",
        precio: 27390
    }, 
    {
        id: 7,
        nombre: "Intel i5 12400",
        precio: 30475
    }, 
    {
        id: 8,
        nombre: "Intel i7 12700kf",
        precio: 60540
    },
    {
        id: 9,
        nombre: "Intel i7 12700k",
        precio: 61980
    },
    {
        id: 10,
        nombre: "Intel i9 12900k",
        precio: 97500
    }, 
]

const carrito = []

// Cargar producto 
let respuesta
do {
    respuesta = cargarProducto()
} while (respuesta)

// Mostrar Carrito
const textoCarrito = generarTextoDelCarrito()
const total = obtenerTotal()

alert("Tu carrito es:\n" + textoCarrito + "\nEl total es: $" + total)

// const containerProductos = document.getElementsByClassName('container-productos')
// const resultadoCarrito = document.getElementById('carrito')


// const mostrarCarrito = () => {
//     containerProductos.style.display = "none";
//     carrito.forEach((dato) => {
//         const li = document.createElement('li')
//         li.innerHTML = `Tu carrito es ${dato}`
//         carrito.appendChild(li)
//     });
// }

// const productosEnCarrito = ['Ryzen 7', 'Ryzen 5', 'Ryzen 3', 'Intel i5', 'Intel i7'];
// const resultadoCarrito = document.getElementById('carrito');

// productosEnCarrito.forEach((dato) => {
//     const li = document.createElement('li')
//     li.innerHTML = `Tu carrito es ${dato}`
//     carrito.append(li)
// });

const tiposProcesadores = carrito;
const listaProcesadores = document.getElementById('lista-carrito');

tiposProcesadores.forEach((dato) => {
    const li = document.createElement('li')
    li.innerHTML = `Tu carrito es ${dato} ${textoCarrito} y cuesta $" ${total}`
    li.className = "success"
    listaProcesadores.appendChild(li)    
})

console.log(carrito);


