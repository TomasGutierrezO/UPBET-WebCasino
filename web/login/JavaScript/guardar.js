// Código para ejecutar la función `guardar()`
document.getElementById("ingresar").addEventListener("click", function () {
    // Obtenemos los valores del correo y contraseña
    const correo = document.getElementById("correo").value.trim();
    const contraseña = document.getElementById("contraseña").value;

    // Validar que el correo no esté vacío y tenga formato de correo electrónico
    if (!validarCorreo(correo)) {
        mostrarMensaje("Por favor, ingresa un correo electrónico válido");
        return;
    }

    // Validar que la contraseña no esté vacía
    if (contraseña.trim() === '') {
        mostrarMensaje("Por favor, ingresa una contraseña");
        return;
    }

    // Consultar si el usuario ya existe en Firestore
    db.collection("usuarios").where("usuario", "==", correo)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                // El usuario no existe, guardamos los datos y redirigimos
                db.collection("usuarios").add({
                    usuario: correo,
                    contraseña: contraseña,
                }).then(() => {
                    // Redirigir a otra página
                    redirigir('/web/PaginaPrincipal/index.html');
                });
            } else {
                // El usuario existe, validar la contraseña
                querySnapshot.forEach((doc) => {
                    const usuarioData = doc.data();
                    if (usuarioData.contraseña === contraseña) {
                        // Contraseña correcta, redirigir a otra página
                        redirigir('/web/PaginaPrincipal/index.html');
                    } else {
                        // Contraseña incorrecta, mostrar mensaje de error
                        mostrarMensaje("Contraseña incorrecta");
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error al consultar la base de datos", error);
        });
});

// Función para validar formato de correo electrónico con expresión regular
function validarCorreo(correo) {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(correo);
}

// Función para mostrar mensajes con SweetAlert2
function mostrarMensaje(mensaje) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

// Función para redirigir a otra página
function redirigir(pagina) {
    window.location.href = pagina;
}
