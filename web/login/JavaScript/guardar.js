// Código para ejecutar la función `guardar()`
document.getElementById("ingresar").addEventListener("click", function () {
    // Obtenemos los valores del correo y contraseña
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    // Consultar si el usuario ya existe en Firestore
    db.collection("usuarios").where("usuario", "==", correo)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // El usuario no existe, guardamos los datos y mostramos mensaje
                db.collection("usuarios").add({
                    usuario: correo,
                    contraseña: contraseña,
                }).then(() => {
                    // Redirigir a otra página (puedes agregar el código aquí)
                    mostrarMensaje("Usuario registrado correctamente");
                    redirigir('/web/PaginaPrincipal/index.html');
                });
            } else {
                // El usuario existe, validar la contraseña
                querySnapshot.forEach((doc) => {
                    const usuarioData = doc.data();
                    if (usuarioData.contraseña === contraseña) {
                        // Contraseña correcta, redirigir a otra página (puedes agregar el código aquí)
                        mostrarMensaje("Inicio de sesión exitoso");
                        redirigir('/web/PaginaPrincipal/index.html');
                    } else {
                        // Contraseña incorrecta, mostrar mensaje de error
                        mostrarMensaje2("Contraseña incorrecta");
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error al consultar la base de datos", error);
        });
});

// Función para mostrar mensajes con SweetAlert2
function mostrarMensaje(mensaje) {
    Swal.fire({
        position: 'top-end',
        icon: 'success', // Puedes cambiar 'success' por 'error' para mensajes de error
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

// Función para mostrar mensajes con SweetAlert2
function mostrarMensaje2(mensaje) {
    Swal.fire({
        position: 'top-end',
        icon: 'error', // Puedes cambiar 'success' por 'error' para mensajes de error
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}


function redirigir(pagina) {
    window.location.href = pagina;
}