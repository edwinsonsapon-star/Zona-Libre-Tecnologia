const productos = [
    {   id: 1,
        nombre: "Mochila CAT Azul",
        categoria:"Mochilas",
        tamano: "Grande",
        descripcion: "Mochila resistente para uso diario",
        precio: 100,
        stock: 2,
        imagen: "https://caterpillargt.com/cdn/shop/files/30074459_460x@2x.jpg?v=1756922956"
    },
    {
        id: 2,
        nombre: "Mochila CAT Roja",
        categoria:"Mochilas",
        tamano: "Grande",
        descripcion: "Ideal para universidad y trabajo",
        stock: 8,
        precio: 150,
        imagen: "https://optimapy.vtexassets.com/arquivos/ids/190332-800-450?v=638405073109970000&width=800&height=450&aspect=true" 
    },
{
        id: 3,
        nombre: "Mochila Everest White",
        categoria:"Mochilas",
        tamano: "Mediano",
        descripcion: "Ideal para universidad y trabajo",
        stock: 15,
        precio: 200,
        imagen: "https://i5.walmartimages.com/seo/Everest-15-White-Basic-Backpack-All-Ages-Unisex-1045K-WHT_94760e1e-3476-48cf-95ac-1497d94c895b.3146da0123484fb0334796d5ca9611c2.jpeg" 
    },
    {
        id: 4,
        nombre: "Cartera Everest White",
        categoria:"Carteras",
        tamano: "Pequeño",
        descripcion: "Ideal para universidad y trabajo",
        stock: 15,
        precio: 200,
        imagen: "https://amphora.cl/cdn/shop/files/p-40363884802-1-5390356b-f778-42af-9b36-4b82af477dc8.jpg?v=1732747987&width=1600" 
    },
    {
        id: 5,
        nombre: "Mochila Totto",
        categoria:"Mochilas",
        tamano: "Grande",
        descripcion: "Ideal para Estudiantes",
        stock: 15,
        precio: 1500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoAE1gbKNaHQK_ILnG1nzgDsZhl6OFu5VuJg&s" 
    },
    
];

if(!localStorage.getItem("productos")){
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}