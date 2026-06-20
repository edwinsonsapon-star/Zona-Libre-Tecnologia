const formulario = document.getElementById("form-registro");

formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const nombre = 
    document.getElementById("nombre").value;

    const correo = 
    document.getElementById("correo").value;

    const pasword = 
    document.getElementById("password").value;

    const  confirmar = 
    document.getElementById("confirmar").value;

    if(pasword !== confirmar){
        alert("Las contraseñas no coinciden");
        return;
    }

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const usuarioExiste = usuarios.find(
        usuario => usuario.correo === correo
    );

    if(usuarioExiste){
        alert("Este correo ya esta registrado");
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        correo,
        pasword,
        rol: "cliente"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    alert("Cuenta creada correctamentee");
    window.location.href ="login.html";
});
