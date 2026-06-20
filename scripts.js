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

const usuarioActivo = JSON.parse(
    localStorage.getItem("usuarioActivo")
);

const usuarioMenu =
document.getElementById("usuario-menu");

if(usuarioActivo){

    usuarioMenu.innerHTML = `

<div class="dropdown">

    <button class="btn-usuario">

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

    localStorage.removeItem(
        "usuarioActivo"
    );

    location.reload();

}


const btnLogin =
document.getElementById("btn-login");

if(usuarioActivo){
    btnLogin.textContent = 
    `hola ${usuarioActivo.nombre}`;
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let productosGuardados = JSON.parse(
    localStorage.getItem("productos")
);

if(!productosGuardados){
    productosGuardados = productos;
}


/*let productosGuardados = JSON.parse(
    localStorage.getItem("productos")
)|| productos;*/


carrito = carrito.map(producto => {
    return{
        ...producto,
        cantidad: producto.cantidad || 1
    };
});

if(carritoTexto){

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

if(btnInicio){
    btnInicio.addEventListener("click", (e) => {

        if(buscador){
            buscador.value = "todos";
        }
        if(filtroCategoria){
            filtroCategoria.value = "todos";
        }
        if(filtroTamano){
            filtroTamano.value = "todos";
        }
        if(filtroPrecio){
            filtroPrecio.value = "todos";
        }

        mostrarProductos(productosGuardados);

    });
}

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

    console.log(productosFiltrados);
    mostrarProductos(productosFiltrados);

}


function cerrarCarrito(){

    carritoPanel.classList.remove("active");

    overlay.classList.remove("active");

}

function irProducto(id){
    window.location.href = `producto.html?id=${id}`;
}

function irCheckout(){

    window.location.href = "checkout.html";

}


function mostrarProductos(listaProductos = productosGuardados){
    if(!contenedorProductos){
        return;
    }
    contenedorProductos.innerHTML = "";
    listaProductos.forEach(producto =>{
       contenedorProductos.innerHTML += `
<div class="card" onclick="irProducto(${producto.id})">

    <div class="card-contenido">

        ${producto.nuevo ? `
        
            <span class="badge nuevo">

                NUEVO

            </span>
        
        ` : ''}

        ${producto.oferta && producto.precioOferta ? `
        
            <span class="badge oferta">

                OFERTA

            </span>
        
        ` : ''}

        <img src="${producto.imagen}" alt="${producto.nombre}">


        <h3>
            ${producto.nombre}
        </h3>


        <p>
            ${producto.descripcion}
        </p>

        <p class="stock">
            ${
                producto.stock === 0
                ? "❌ Agotado"
                : producto.stock <=3
                ? `🔥 Últimas ${producto.stock} unidades`
                : "✅ Disponible"
            }


        </p>
        <div class="precios">

            ${producto.oferta ? `

                <span class="precio-original">

                    Q${producto.precio}

                </span>

                <span class="precio-oferta">

                    Q${producto.precioOferta || producto.precio}

                </span>

            ` : `

                <span class="precio">

                    Q${producto.precio}

                </span>

            `}

        </div>

    </div>

   <button

class="btn-comprar"

${producto.stock === 0 ? "disabled" : ""}

onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">

${producto.stock === 0

? "Agotado"

: "🛒 Comprar"}

</button>

</div> 
`;
    });

};

function agregarAlCarrito(id){
    const productoEncontrado = productosGuardados.find(
        producto => producto.id === id
    );
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
            cantidad: 1,
        });
    }

    /*(//ESTA ES LA VERSION ANTERIOR\\)if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        carrito.push({
            ...productoEncontrado,
            cantidad: 1
        });
    }*/
    actualizarCarrito();
    mostrarNotificacion("✔ Producto agregado al carrito")

};


function actualizarCarrito(){
    if (carritoTexto){
        carritoTexto.textContent = `🛒 Carrito (${carrito.length})`;
    }

    localStorage.setItem("carrito",JSON.stringify(carrito));

    if (!listaCarrito || !totalCarrito){
        return;
    }
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((producto, index) =>{
        total += producto.precio * producto.cantidad;
        listaCarrito.innerHTML += `
        <div class="item-carrito">
        <p>
            ${producto.nombre} 
            
        </p>
        <p>
            cantidad: ${producto.cantidad}
        </p>
        <P>
            Q${producto.precio*producto.cantidad}
        </P>
        <button onclick="eliminarProducto(${index})">
             ❌
        </button>
        </div>
        `;
    });

    carritoTexto.textContent = `🛒 Carrito (${carrito.length})`;
    totalCarrito.textContent = `Total: Q${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function eliminarProducto(index){
    if (carrito[index].cantidad > 1){
        carrito[index].cantidad--;
    }else{
        carrito.splice(index,1);
    }
    actualizarCarrito();
}

function vaciarCarrito(){

    carrito = [];

    actualizarCarrito();

}

function mostrarNotificacion(mensaje){

    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.classList.add("active");

    },100);

    setTimeout (() => {
        notificacion.classList.remove("active");
        setTimeout(() => {
            notificacion.remove();
        }, 300);


    },2500);

}
if(contenedorProductos){
    mostrarProductos();
}
actualizarCarrito();