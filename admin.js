const formulario = document.getElementById("form-admin");
const adminProductos = document.getElementById("admin-productos");

//Cargamos productos

let productosGuardados = JSON.parse(
    localStorage.getItem("productos")
)|| productos;

let productoEditando = null;

console.log(productosGuardados);

function actualizarDashboard(){
    document.getElementById("total-productos")
    .textContent = productosGuardados.length;

    document.getElementById("total-ofertas")
    .textContent = productosGuardados.filter(
        producto => producto.oferta
    ).length;

    document.getElementById("total-agotados")
    .textContent = productosGuardados.filter(
        producto => producto.stock === 0
    ).length;

    const stockTotal = productosGuardados.reduce(
        (total,producto) => 
            total + (producto.stock || 0),
        0
    );

    document.getElementById("stock-total")
    .textContent = stockTotal;
}

//mostrar los productos

function mostrarProductosAdmin(){

    adminProductos.innerHTML = "";

    productosGuardados.forEach((producto, index) => {
        adminProductos.innerHTML += `
        
        <div class="admin-card">
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            ${producto.nuevo ? "<p>🟢 Nuevo ingreso</p>" : ""}

            ${producto.oferta ? "<p>🔥 En oferta</p>" : ""}

            <span>
                Q${producto.precio}
            </span>

            <p>
                stock:
                ${producto.stock || 0}
            </p>

            <button onclick ="editarProducto(${index})">
                Editar
            </button>

            <button onclick="eliminarProducto(${index})">
                Eliminar
            </button>
        </div>
        
        `;
    });

}

//agregar producto

formulario.addEventListener("submit", (e) =>{

    e.preventDefault();

    const precioOfertaInput = document.getElementById("precio-oferta").value;

    const ofertaActiva = document.getElementById("oferta").checked;



if(ofertaActiva && precioOfertaInput === ""){

    alert("Debes agregar un precio de oferta");

    return;

}

    const nuevoProducto = {

        id: Date.now(),

        nombre: document.getElementById("nombre").value,

        categoria: document.getElementById("categoria").value.trim(),

        precio: Number(document.getElementById("precio").value),

        precioOferta: Number(document.getElementById("precio-oferta").value)
        ? Number(document.getElementById("precio-oferta").value)
        :null,

        imagen: document.getElementById("imagen").value,

        descripcion: document.getElementById("descripcion").value,

        nuevo: document.getElementById("nuevo").checked,

        oferta: document.getElementById("oferta").checked,

        stock: Number(
            document.getElementById("stock").value
        ),


    };

    if(productoEditando !== null){

    productosGuardados[productoEditando] = {

    ...productosGuardados[productoEditando],

    ...nuevoProducto,

    id: productosGuardados[productoEditando].id

};



    productoEditando = null;

}else{

    productosGuardados.push(nuevoProducto);

}

    localStorage.setItem(

        "productos",
        JSON.stringify(productosGuardados)
    );

    formulario.reset();

    productoEditando = null;

    mostrarProductosAdmin();

    actualizarDashboard();


});


//elimnar producto

function eliminarProducto(index){

    if(!confirm("¿Está seguro de eliminar este producto?")){
        return;
    }

    productosGuardados.splice(index, 1);

    localStorage.setItem(
        "productos",
        JSON.stringify(productosGuardados)
    );

    mostrarProductosAdmin();
    actualizarDashboard();

    mostrarNotificacion("✅ Producto eliminado correctamente");

}

function editarProducto(index){

    const producto = productosGuardados[index];



    document.getElementById("nombre").value = producto.nombre;

    document.getElementById("categoria").value = producto.categoria || "";

    document.getElementById("precio").value = producto.precio;

    document.getElementById("stock").value = 
    producto.stock || 0;

    document.getElementById("precio-oferta").value = producto.precioOferta || "";

    document.getElementById("imagen").value = producto.imagen;

    document.getElementById("descripcion").value = producto.descripcion;

    document.getElementById("nuevo").checked = producto.nuevo;

    document.getElementById("oferta").checked = producto.oferta;



    productoEditando = index;

}

mostrarProductosAdmin();
actualizarDashboard();
