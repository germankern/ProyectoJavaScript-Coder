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
];

let aux = localStorage.getItem('productosEnCarro');
let productosEnCarro;

if (!aux) {
    productosEnCarro = [];
} else {
    productosEnCarro = JSON.parse(aux);
    pintarProductosEnCarro();
}


function pintandoListado() {
    let aux = '';
    for(let i = 0; i < productos.length; i++){
        
        aux = aux + `<div style="cursor: pointer; margin: 85px; border: 5px solid; padding: 16px; font-size: 22px; text-align: center; background-color: lightblue" 
                            onclick="agregarAlCarrito(
                                {id: ${productos[i].id}, nombre: '${productos[i].nombre}', precio: ${productos[i].precio}})">
                        <h3>${productos[i].nombre}</h3>
                        <p>$ ${productos[i].precio}</p>
                    </div>`;
    }
    // Ejemplo de DOM (acá lo "pintamos" en el DOM)
    
    document.getElementById('div-productos').innerHTML = aux;
}
pintandoListado();

// ----- Funciones de Carro --------- //
function agregarAlCarrito(objetoProducto) {
    productosEnCarro.push(objetoProducto);

    localStorage.setItem('productosEnCarro', JSON.stringify(productosEnCarro));
    pintarProductosEnCarro();
}

function borrarDelCarro(indice) {
    productosEnCarro.splice(indice, 1);

    localStorage.setItem('productosEnCarro', JSON.stringify(productosEnCarro));
    pintarProductosEnCarro();
}
// ------------------------------- //


function pintarProductosEnCarro() {
    let aux = '';
    for(let i=0; i < productosEnCarro.length; i++){
        
        aux = aux + `<div style="border: 4px solid green; display: flex; flex-direction: column; max-width: 200px; margin: 10px; text-align: center;">
                        <h3>${productosEnCarro[i].nombre}</h3>
                        <p>$ ${productosEnCarro[i].precio}</p>
                        <button onclick="borrarDelCarro(${i})" style="cursor: pointer;">Eliminar 🗑️</button>
                    </div>`;
    }
    // Ejemplo de DOM (acá lo "pintamos" en el DOM)
    document.getElementById('div-carrito').innerHTML = aux;
}