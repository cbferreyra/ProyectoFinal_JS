const seccion = document.getElementsByClassName("section");

const divContenedor = document.createElement("div");
divContenedor.id = "productosIndex";
const contenedorCarrito = document.getElementById("carrito-contenedor");

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
          carrito.push(item);
          actualizarCarrito();
          console.log(carrito);
        };
        /* const eliminarDelCarrito = (prodId) => {
          const item = carrito.find((prod) => prod.id == prodId);
          const indice = carrito.indexOf(item);
          carrito.splice(indice, 1);
          actualizarCarrito();
        }; */
        const actualizarCarrito = () => {
          contenedorCarrito.innerHTML = "";

          carrito.forEach((prod) => {
            const div = document.createElement("div");
            div.className = "productoEnCarrito";
            div.innerHTML = `<p>${prod.name}</p>
<p>Precio: ${prod.precio}</p>
<p>Cantidad: <span id = "cantidad">${prod.cantidad}</span><p>
<button onclick ="eliminarDelCarrito(${prod.id})" class = "boton-eliminar">eliminar</button>`;
            contenedorCarrito.appendChild(div);
          });
        };
      }
    });
};
renderProductos();
