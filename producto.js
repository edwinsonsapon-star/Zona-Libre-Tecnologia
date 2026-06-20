const contenedorDetalle = document.getElementById("detalle-producto");

const productosRelacionados = document.getElementById("productos-relacionados");



// =========================
// CARGAR PRODUCTOS
// =========================

productosGuardados = JSON.parse(
    localStorage.getItem("productos")
) || productos;



// =========================
// REDIRECCIÓN
// =========================

function irProducto(id){

    window.location.href = `producto.html?id=${id}`;

}



// =========================
// OBTENER ID URL
// =========================

const parametros = new URLSearchParams(window.location.search);

const idProducto = parametros.get("id");



// =========================
// BUSCAR PRODUCTO
// =========================

const producto = productosGuardados.find(

    producto => String(producto.id) === String(idProducto)

);



// =========================
// VALIDAR PRODUCTO
// =========================

if(!producto){

    contenedorDetalle.innerHTML = `

        <h2>
            Producto no encontrado
        </h2>

    `;

    throw new Error("Producto no encontrado");

}



// =========================
// DEBUG
// =========================

console.log("ID URL:", idProducto);

console.log("Productos:", productosGuardados);

console.log("Producto encontrado:", producto);



// =========================
// MOSTRAR PRODUCTO
// =========================

contenedorDetalle.innerHTML = `
    <div class="detalle-card">

        <img src="${producto.imagen}" alt="${producto.nombre}">

        <div class="detalle-info">

            <h1>${producto.nombre}</h1>

            <p>${producto.descripcion}</p>



            ${
                producto.oferta && producto.precioOferta
                ? `
                    <div class="precios">

                        <span class="precio-original">

                            Q${producto.precio}

                        </span>

                        <span class="precio-oferta">

                            Q${producto.precioOferta}

                        </span>

                    </div>
                `
                : `
                    <h2>
                        Q${producto.precio}
                    </h2>
                `
            }



            <button
            class="btn-comprar"
            id="btn-comprar-producto">

                 🛒 Comprar

            </button>

        </div>

    </div>
`;



// =========================
// BOTÓN COMPRAR
// =========================

const botonComprar = document.getElementById("btn-comprar-producto");



botonComprar.addEventListener("click", () => {

    agregarAlCarrito(producto.id);

});



// =========================
// PRODUCTOS RELACIONADOS
// =========================

productosRelacionados.innerHTML = "";



const relacionados = productosGuardados.filter(

    item => item.id !== producto.id

);



// =========================
// MOSTRAR RELACIONADOS
// =========================

relacionados.forEach(item => {

    productosRelacionados.innerHTML += `

    <div class="card" onclick="irProducto(${item.id})">

        ${item.nuevo ? '<span class="badge nuevo">NUEVO</span>' : ''}

        ${item.oferta ? '<span class="badge oferta">OFERTA</span>' : ''}



        <img src="${item.imagen}" alt="${item.nombre}">

        <h3>${item.nombre}</h3>

        <p>${item.descripcion}</p>



        ${
            item.oferta && item.precioOferta
            ? `
                <div class="precios">

                    <span class="precio-original">

                        Q${item.precio}

                    </span>

                    <span class="precio-oferta">

                        Q${item.precioOferta}

                    </span>

                </div>
            `
            : `
                <span class="precio">

                    Q${item.precio}

                </span>
            `
        }



        <button>

            Ver producto

        </button>

    </div>

    `;

});