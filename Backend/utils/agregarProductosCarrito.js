"use strict";

/**----------------------------Agregar productos al carrito---------------------------------*/
//Variable array de productos carrito
let carrito = [];
//Variable tbody (En la funcion renderizar)
const tbody = document.querySelector('.tbody');
//Seleccionar todos los botones de "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

//Iterar sobre los botones y agregar un evento de clic a cada uno
addToCartButtons.forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

/*---------------------------------------Funcion producto----------------------------------------------*/
function agregarAlCarrito(event) {
    const button = event.target;
    const product = button.closest('.product'); // Encontrar el contenedor del producto
    const imagen = product.querySelector('img').src;
    const nombre = product.querySelector('.product-title').textContent;
    const precio = product.querySelector('.discount-price').textContent;

    // Crear un objeto con la información del producto
    const nuevoProducto = {
        img: imagen,
        titulo: nombre,
        precio: precio,
        cantidad: 1
    };

    // Llamar a la función agregarCarrito del script agregarProductosCarrito.js
    agregarCarrito(nuevoProducto);
}

/*---------------------------------------Funcion agregar producto----------------------------------------------*/
function agregarCarrito(nuevoItem) {
    //Variable inputElemento id ('inputElemt') para aumentar el numero del input
    const inputElemento = tbody.getElementsByClassName('inputElement')
    //Recorremos el carrito para preguntar si ya hay dos productos con el mismo titulo
    for (let i = 0; i < carrito.length; i++) {
        //Si titulo es igual al nuevo titulo del nuevo prodcuto se aumenta la cantidad
        if (carrito[i].titulo === nuevoItem.titulo && carrito[i].producto === nuevoItem.producto) {
            //Aumentamos el numero del input y el de cantidad
            carrito[i].cantidad++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            //funcion precio total
            precioTotal()
            return null;
        }
    }
    //Agregamos el nuevoItem al carrito
    carrito.push(nuevoItem)
    renderizar()
}

/**
 *------------------------------------Funcion Renderizar Dibuja todos los productos guardados en el carrito
 */
function renderizar() {
    //Visualizamos el tbody con los nuevos item con la siguiente estructura
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        //Agregarmos clase('itemCarrito')
        tr.classList.add('itemCarrito')
        //Variable contenido
        const content = `
        <tr>
            <td class="imagenAlto"><img src=${item.img}></td>
            <td class="title">${item.titulo}</td>
            <td class="producto">${item.producto}</td>
            <td>${item.precio}</td>
            <td>
                <input type="number" min="1" value=${item.cantidad} class="inputElement">
            </td>
            <td><button id="delete">X</button></td>
        </tr>
        `
        //tr se iguala al content que es el contenido
        tr.innerHTML = content;
        //tr se agregar al tbody
        tbody.append(tr)
        //item eliminar producto del carrito
        tr.querySelector("#delete").addEventListener('click', eliminarProducto)
        //item cambiar valor input  del carrito
        tr.querySelector(".inputElement").addEventListener('change', sumaCantidad)
    })
    precioTotal()
}

/*---------------------------------------Funcion precio total----------------------------------------------*/
function precioTotal() {
    let total = 0;
    const itemTotal = document.querySelector('.itemTotal')
    carrito.forEach((item) => {
        let precioFinal = Number((item.precio).replace("$", ''))
        //Si item.titulo es igual a alguno que esta en promociones.html se divide el precioFinal a la mitad
        if (item.titulo == 'Pizza Pollo y Champinones' || item.titulo == 'Pizza Hawaina' || item.titulo == 'Pizza Napolitana'
            || item.titulo == 'Pizza Super Peperoni' || item.titulo == 'Hamburguesa Sencilla Filet' || item.titulo == 'Hamburguesa Sencilla Champinones'
            || item.titulo == 'Hot Dot Carnes' || item.titulo == 'Hot Dot Queso') {
            precioFinal = precioFinal / 2
        }
        total = total + precioFinal * item.cantidad
    })
    itemTotal.innerHTML = `Total $ ${total}`
    addlocalStorage()
}

/*----------------------------------------Funcion remover producto--------------------------------------- */
function eliminarProducto(e) {
    const botonEliminar = e.target
    const tr = botonEliminar.closest('.itemCarrito')
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].titulo === title) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    precioTotal()
}

/*----------------------------------------Funcion suma  valor producto--------------------------------------- */
function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest('.itemCarrito')
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.titulo === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            precioTotal()
        }
    })
}

/*----------------------------------------Funcion windows---------------------------------------*/
//Lo guardamos como STRING
function addlocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

/*----------------------------------------Funcion windows---------------------------------------*/
//Funcion cada vez que carga la pantalla
window.onload = function () {
    //Si existe un item en el localStorage llamado carrito se guarda en la variable storage
    const storage = JSON.parse(localStorage.getItem('carrito'));
    //Si existe se llama la funcion renderizar
    if (storage) {
        carrito = storage;
        renderizar()
    }
}
