// Inicializar variables
const auth = firebase.auth();
const database = firebase.database();

// Función para verificar si el usuario ha iniciado sesión
function isUserLoggedIn() {
    return firebase.auth().currentUser !== null;
}

// Manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma convencional

    // Obtener los valores de usuario y contraseña
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    // Verificar si el usuario ha iniciado sesión
    if (isUserLoggedIn()) {
        // El usuario ya ha iniciado sesión, redirigir a la página principal
        console.log('El usuario ya ha iniciado sesión');
        window.location.href = '/PaginaPrincipal/PaginaPrincipal.html';
    } else {
        // El usuario no ha iniciado sesión, intentar iniciar sesión
        auth.signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso, redirigir a la página principal
                console.log('Inicio de sesión exitoso', userCredential.user.uid);
                window.location.href = '/PaginaPrincipal/PaginaPrincipal.html';
            })
            .catch((error) => {
                // Resto del código para manejar errores
                console.log('Error al iniciar sesión:', error.code, error.message);
                if (error.code === 'auth/user-not-found') {
                    // Usuario no existe, intentar crear uno nuevo
                    auth.createUserWithEmailAndPassword(username, password)
                        .then((userCredential) => {
                            console.log('Usuario creado exitosamente', userCredential.user.uid);
                            window.location.href = '/PaginaPrincipal/PaginaPrincipal.html';
                        })
                        .catch((error) => {
                            console.log('Error al crear usuario:', error.code, error.message);
                        });
                } else if (error.code === 'auth/wrong-password') {
                    // Contraseña incorrecta, manejar como desees
                    console.log('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                }
            });
    }
});
