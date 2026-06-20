const formulario =
document.getElementById("form-login");
formulario.addEventListener("submit",(e) => {
    e.preventDefault();

    const correo = 
    document.getElementById("correo").value;

    const pasword = 
    document.getElementById("password").value;
    
    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const usuario = usuarios.find(
        usuario => 
        usuario.correo === correo
        &&
        usuario.pasword === pasword
    );

    if(!usuario){
        alert(
            "Correo o contraseña incorrectos"
        );
        return;
    }
    alert(
        `bienvenido ${usuario.nombre} `
    );
    window.location.href = "index.html";
});