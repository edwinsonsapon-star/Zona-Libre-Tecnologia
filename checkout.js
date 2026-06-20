const checkoutProductos = document.getElementById("checkout-productos");
const checkoutTotal= document.getElementById("checkout-total");
const formulario = document.getElementById("form-checkout");

//obtencion del carrito

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//mostrar los productos

let total = 0;

carrito.forEach( producto => {

    const precioProducto = producto.precioOferta != null
        ? producto.precioOferta
        : producto.precio;

    total += precioProducto * producto.cantidad;

    checkoutProductos.innerHTML +=`
    
        <div class= "checkout-item">
        
        <p>
            ${producto.nombre}
        </p>

        <p>
            Cantidad: ${producto.cantidad}
        </p>

        <p>
            Q${precioProducto*producto.cantidad}
        </p>
        
        
        </div>
    
    
    `;

});

checkoutTotal.textContent = `Total: Q${total}`;

//finalizar la compra

formulario.addEventListener("submit",(e) =>{

    e.preventDefault();

    if(carrito.length === 0){
        alert("El carrito está vacío");
        return;
    }

    let productos = JSON.parse(
        
        localStorage.getItem("productos")
    ) || [];

    let stockValido = true;

    carrito.forEach(item => {

        const producto = productos.find(
            p => p.id === item.id
        );

        if(producto){

           if(producto.stock < item.cantidad){
            stockValido = false;
            alert(`No hay suficiente stock para ${producto.nombre}`
            );
           }


        }

    });

    if(!stockValido){
        return;
    }

    //Desconectar el stock
    carrito.forEach(item => {
        const producto = productos.find(
            p => p.id === item.id
        );

        if(producto){
            producto.stock -= item.cantidad;
            if(producto.stock < 0){
                producto.stock = 0;
            }
        }
    });


    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    localStorage.removeItem("carrito");

    alert("✅ Pedido realizado correctamente");

    window.location.href = "index.html";

});
