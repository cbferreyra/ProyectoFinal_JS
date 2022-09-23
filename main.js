const seccion = document.getElementsByClassName("section");

const divContenedor = document.createElement("div");
divContenedor.id = "productosIndex";
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
let carrito = [];

const renderProductos = async function () {
  fetch("api/catalogo.json")
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      for (let cardItem of productos) {
        let cards = document.createElement("div");
        cards.className = "cardsStyle";
        cards.innerHTML = `<img class= cardImage src= imagenes/${cardItem.imagen}
  />
    <h3 class = "card__title"> ${cardItem.name}</h3> 
    <p class = "card__precio" >  $${cardItem.precio}</p>
    <button class= "card__btn" id= "${cardItem.id}">Agregar al carrito</button>
    <div class = "confirmacion_carrito"></div>
    `;
        seccion[0].appendChild(cards);

        const boton = document.getElementById(`${cardItem.id}`);

        boton.addEventListener("click", () => {
          agregarAlCarrito(cardItem.id);
        });

        const agregarAlCarrito = (prodId) => {
          const item = productos.find((elemento) => elemento.id == prodId);
          console.log(item);
          const existe = carrito.some(function (objeto) {
            return item.id === objeto.id;
          });

          if (existe) {
            item.cantidad++;
          } else carrito.push(item);
          actualizarCarrito();
          console.log(carrito);
        };
        const eliminarDelCarrito = (prodId) => {
          const item = carrito.find((prod) => prod.id == prodId);
          const indice = carrito.indexOf(item);
          carrito.splice(indice, 1);
          actualizarCarrito();
        };
        const actualizarCarrito = () => {
          contenedorCarrito.innerHTML = "";

          botonVaciar.addEventListener("click", () => {
            carrito.length = 0;
            actualizarCarrito();
          });

          carrito.forEach((prod) => {
            const div = document.createElement("div");
            div.className = "productoEnCarrito";
            div.innerHTML = `<p>${prod.name}</p>
<p>Precio unidad: ${prod.precio}</p>
<p>Cantidad: <span id = "cantidad">${prod.cantidad}</span><p>
<p>Precio: <span id = "precioPorProducto">$${
              prod.precio * prod.cantidad
            }</span></p>
<button id="EliminarCart${prod.id}"  class="boton-eliminar">eliminar</button>`;
            contenedorCarrito.appendChild(div);
            document
              .getElementById(`EliminarCart${prod.id}`)
              .addEventListener("click", eliminarDelCarrito);
          });
          //contadorCarrito.innerText = carrito.length;
          contadorCarrito.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad,
            0
          );
          precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.precio * prod.cantidad,
            0
          );
        };
      }
    });
};
renderProductos();
