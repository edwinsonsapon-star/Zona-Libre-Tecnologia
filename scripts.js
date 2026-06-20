const contenedorProductos = document.getElementById("contenedor-productos");
const carritoTexto = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const carritoPanel = document.getElementById("carrito-panel");
const overlay = document.getElementById("overlay");
const cerrarCarritoBtn = document.getElementById("cerrar-carrito");

const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroPrecio = document.getElementById("filtro-precio");
const filtroTamano = document.getElementById("filtro-tamano");
const btnOfertas = document.getElementById("btn-ofertas");
const btnInicio = document.getElementById("btn-inicio");
//=======================================================
// CONFIGURACIÓN GENERAL DEL SISTEMA
//=======================================================

const CONFIG = {

    // Empresa

    nombreEmpresa: "AHURA Webstore",

    version: "1.0.0",

    ambiente: "produccion", // desarrollo | produccion

    debug: false,

    // Moneda

    moneda: "Q",

    simboloMoneda: "Q",

    // Carrito

    simboloCarrito: "🛒",

    guardarCarritoAutomaticamente: true,

    // Stock

    stockCritico: 3,

    mostrarStock: true,

    mostrarProductosAgotados: true,

    permitirCompraSinStock: false,

    // Badges

    mostrarBadgeNuevo: true,

    mostrarBadgeOferta: true,

    // Notificaciones

    tiempoNotificacion: 2500,

    // Impuestos

    impuestosIncluidos: true,

    porcentajeIVA: 12

};
//=======================================================
// SESION DEL USUARIO
//=======================================================


const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
);

const usuarioMenu =
document.getElementById("usuario-menu");

if(usuarioActivo && usuarioMenu){

    usuarioMenu.innerHTML = `

<div class="dropdown">

    <button class="btn-login btn-usuario">

        👤 ${usuarioActivo.nombre} ▼

    </button>

    <div class="dropdown-content">

        <a href="perfil.html">

            Mi perfil

        </a>

        <a href="pedidos.html">

            Mis pedidos

        </a>

        <a href="#" onclick="cerrarSesion()">

            Cerrar sesión

        </a>

    </div>

</div>

`;

}

function cerrarSesion(){
    if(confirm("¿Desea cerrar sesión?")){
        localStorage.removeItem(
            "usuarioActivo"
        );
        window.location.href="index.html";
    }
}

//============================================================
//CARRITO DE COMPRAS
//============================================================


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productosGuardados = JSON.parse(
    localStorage.getItem("productos")
);

if(!productosGuardados){
    productosGuardados = productos;
}


carrito = carrito.map(producto => ({
    ...producto,
    cantidad: producto.cantidad || 1
}));

if(carritoTexto && carritoPanel && overlay){

    carritoTexto.addEventListener("click",() => {
         
        carritoPanel.classList.add("active");
        overlay.classList.add("active");
    });
 
}

if(cerrarCarritoBtn){

    cerrarCarritoBtn.addEventListener("click", cerrarCarrito);

}

if(overlay){
    overlay.addEventListener("click",cerrarCarrito);
}

if(buscador){

    buscador.addEventListener("input", filtrarProductos);

}

if(filtroCategoria){
    filtroCategoria.addEventListener("change",filtrarProductos);

}


if(filtroPrecio){
    filtroPrecio.addEventListener("change",filtrarProductos);
}

if(filtroTamano){
    filtroTamano.addEventListener("change",filtrarProductos);

}

//aqui comienzan los enlaces del navegador

if(btnOfertas){
    btnOfertas.addEventListener("click",(e) => {
        e.preventDefault();
        const productosOferta = productosGuardados.filter(
            producto => producto.oferta === true
        );

        mostrarProductos(productosOferta);
    });
}

function resetFiltros(){

    if(buscador){

        buscador.value = "";

    }

    if(filtroCategoria){

        filtroCategoria.value = "todos";

    }

    if(filtroPrecio){

        filtroPrecio.value = "todos";

    }

    if(filtroTamano){

        filtroTamano.value = "todos";

    }

}


if(btnInicio){

    btnInicio.addEventListener("click",(e)=>{

        e.preventDefault();

        resetFiltros();

        cerrarCarrito();

        mostrarProductos(productosGuardados);

    });

}

//===============================================================
// FILTROS
//===============================================================

function filtrarProductos(){

    const textoBusqueda = buscador
    ? buscador.value.toLowerCase()
    : "";


    const categoriaSeleccionada = filtroCategoria
    ? filtroCategoria.value
    : "todos";


    const precioSeleccionado = filtroPrecio
    ? filtroPrecio.value
    : "todos";

    const tamanoSeleccionado = filtroTamano
    ? filtroTamano.value
    : "todos";


    const productosFiltrados = productosGuardados.filter(producto => {

        const coincidenciaBusqueda = producto.nombre
        .toLowerCase()
        .includes(textoBusqueda);


        const coincidenciaCategoria = categoriaSeleccionada === "todos"
        || producto.categoria === categoriaSeleccionada;

        const coincidenciaTamano = tamanoSeleccionado === "todos"
        || producto.tamano === tamanoSeleccionado;

        let coincidenciaPrecio = true;


        if(precioSeleccionado === "menor100"){

            coincidenciaPrecio = producto.precio < 100;

        }


        if(precioSeleccionado === "100-500"){

            coincidenciaPrecio = producto.precio >= 100
            && producto.precio <= 500;

        }


        if(precioSeleccionado === "mayor500"){

            coincidenciaPrecio = producto.precio > 500;

        }


        return coincidenciaBusqueda
        && coincidenciaCategoria
        && coincidenciaPrecio
        && coincidenciaTamano;

    });
    mostrarProductos(productosFiltrados);

}


function cerrarCarrito(){

    if(carritoPanel){
        carritoPanel.classList.remove("active");
        if(overlay){
            overlay.classList.remove("active");
        }
    }

}

function irProducto(id){
    window.location.href = `producto.html?id=${id}`;
}

function irCheckout(){

    if(carrito.length===0){
        mostrarNotificacion(
            "❌ El carrito está vacío"
        );
        return;
    }
    window.location.href="checkout.html";

}

function crearCardProducto(producto){

    const estadoStock =
        producto.stock === 0
            ? "❌ Agotado"
            : producto.stock <= CONFIG.stockCritico
            ? `🔥 Últimas ${producto.stock} unidades`
            : "✅ Disponible";

    const badgeNuevo =
        CONFIG.mostrarBadgeNuevo && producto.nuevo
        ? `
            <span class="badge nuevo">

                NUEVO

            </span>
        `
        : "";

    const badgeOferta =
        CONFIG.mostrarBadgeOferta &&
        producto.oferta &&
        producto.precioOferta
        ? `
            <span class="badge oferta">

                OFERTA

            </span>
        `
        : "";

    const precioHTML =
        producto.oferta

        ? `

            <span class="precio-original">

                ${CONFIG.simboloMoneda}${producto.precio}

            </span>

            <span class="precio-oferta">

                ${CONFIG.simboloMoneda}${producto.precioOferta || producto.precio}

            </span>

        `

        : `

            <span class="precio">

                ${CONFIG.simboloMoneda}${producto.precio}

            </span>

        `;

    return `

    <div class="card" onclick="irProducto(${producto.id})">

        <div class="card-contenido">

            ${badgeNuevo}

            ${badgeOferta}

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>

                ${producto.nombre}

            </h3>

            <p>

                ${producto.descripcion}

            </p>

            <p class="stock">

                ${CONFIG.mostrarStock ? estadoStock : ""}

            </p>

            <div class="precios">

                ${precioHTML}

            </div>

        </div>

        <button

            class="btn-comprar"

            ${producto.stock === 0 && !CONFIG.permitirCompraSinStock ? "disabled" : ""}

            onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">

            ${producto.stock === 0

                ? "Agotado"

                : "🛒 Comprar"}

        </button>

    </div>

    `;

}


function mostrarProductos(listaProductos = productosGuardados){

    if(!listaProductos || !contenedorProductos){
        return;
    }

    let html = "";

    listaProductos.forEach(producto => {

        html += crearCardProducto(producto);

    });

    contenedorProductos.innerHTML = html;

}



//=============================================================
// FUNCIONES DEL CARRITO 
//=============================================================

function agregarAlCarrito(id){

    // Sincronizar siempre con localStorage
    carrito = JSON.parse(

        localStorage.getItem("carrito")

    ) || [];

    const productoEncontrado = productosGuardados.find(

        producto => producto.id === id

    );

    if(!productoEncontrado){

        mostrarNotificacion(

            "❌ Producto no encontrado"

        );

        return;

    }

    const productoEnCarrito = carrito.find(

        producto => producto.id === id

    );

    if(productoEnCarrito){

        if(productoEnCarrito.cantidad >= productoEncontrado.stock){

            mostrarNotificacion(

                "❌ No hay más unidades disponibles"

            );

            return;

        }

        productoEnCarrito.cantidad++;

    }else{

        if(productoEncontrado.stock <= 0){

            mostrarNotificacion(

                "❌ Producto agotado"

            );

            return;

        }

        carrito.push({

            ...productoEncontrado,

            cantidad: 1

        });

    }

    actualizarCarrito();

    mostrarNotificacion(

        "✔ Producto agregado al carrito"

    );

}

function actualizarContadorCarrito(){

    if(!carritoTexto){

        return;

    }

    const carritoActual = JSON.parse(

        localStorage.getItem("carrito")

    ) || [];

    const totalItems = carritoActual.reduce(

        (total,item) => total + item.cantidad,

        0

    );

    carritoTexto.innerHTML =

        `${CONFIG.simboloCarrito} Carrito <strong>(${totalItems})</strong>`;

}



function actualizarCarrito(){

    guardarCarrito();

    actualizarContadorCarrito();

    if(!listaCarrito || !totalCarrito){

        return;

    }

    let html = "";

    let total = 0;

    carrito.forEach((producto,index)=>{

        const precioProducto = producto.precioOferta != null
            ? producto.precioOferta
            : producto.precio;

        total += precioProducto * producto.cantidad;

        html += `

        <div class="item-carrito">

            <p>

                ${producto.nombre}

            </p>

            <p>

                Cantidad: ${producto.cantidad}

            </p>

            <p>

                ${CONFIG.simboloMoneda}${precioProducto * producto.cantidad}

            </p>

            <button onclick="eliminarProducto(${index})">

                ❌

            </button>

        </div>

        `;

    });

    listaCarrito.innerHTML = html;

    totalCarrito.textContent =

        `Total: ${CONFIG.simboloMoneda}${total}`;

}

function guardarCarrito(){

    if(!CONFIG.guardarCarritoAutomaticamente){

        return;

    }

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

}

function eliminarProducto(index){
   if(!carrito[index]){
    return;
   }
   if(carrito[index].cantidad>1){
        carrito[index].cantidad--;
   }else{
    carrito.splice(index,1);
   }
   actualizarCarrito();
}

function vaciarCarrito(){
    if(!confirm("¿Desea vaciar el carrito?")){
        return;
    }
    carrito = [];
    actualizarCarrito();
}

//===========================================================
// NOTIFICACIONES
//===========================================================

function mostrarNotificacion(mensaje){

    const notificacion = document.createElement("div");

    notificacion.classList.add("notificacion");

    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    setTimeout(()=>{

        notificacion.classList.add("active");

    },100);

    setTimeout(()=>{

        notificacion.classList.remove("active");

        setTimeout(()=>{

            notificacion.remove();

        },300);

    },CONFIG.tiempoNotificacion);

}

if(contenedorProductos){

    mostrarProductos();

}

actualizarCarrito();

