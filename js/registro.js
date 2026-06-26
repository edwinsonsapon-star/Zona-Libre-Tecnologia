const formulario = document.getElementById("form-registro");

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    const nombre =
    document.getElementById("nombre").value;

    const correo =
    document.getElementById("correo").value;

    const password =
    document.getElementById("password").value;

    const confirmar =
    document.getElementById("confirmar").value;

    if(password !== confirmar){

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

        alert("Este correo ya está registrado");

        return;

    }

    const nuevoUsuario = {

        id: Date.now(),

        nombre,

        correo,

        password,

        rol:"cliente"

    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

    alert("Cuenta creada correctamente");

    window.location.href="login.html";

});