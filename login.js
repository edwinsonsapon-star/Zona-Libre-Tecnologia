const formulario =
document.getElementById("form-login");
formulario.addEventListener("submit",(e) => {
    e.preventDefault();

    const correo = 
    document.getElementById("correo").value;

    const password = 
    document.getElementById("password").value;
    
    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const usuario = usuarios.find(
        usuario => 
        usuario.correo === correo
        &&
        usuario.pasword === password
    );

    if(!usuario){
        alert(
            "Correo o contraseña incorrectos"
        );
        return;
    }

    localStorage.setItem(
        "usuarioactivo",
        JSON.stringify(usuario)
    );

    alert(
        `bienvenido ${usuario.nombre} `
    );
    window.location.href = "index.html";
});