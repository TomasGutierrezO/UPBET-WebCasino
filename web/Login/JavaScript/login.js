// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDOtg6PuFfGaa5T5SB-1ldxPps8rlk1DtQ",
    authDomain: "upbet-final.firebaseapp.com",
    projectId: "upbet-final",
    storageBucket: "upbet-final.appspot.com",
    messagingSenderId: "657319406313",
    appId: "1:657319406313:web:8ea7130a8517922c2fde78",
  };

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);

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
        // El usuario ya ha iniciado sesión, hacer algo si es necesario
        console.log('El usuario ya ha iniciado sesión');
    } else {
        // El usuario no ha iniciado sesión, intentar iniciar sesión
        auth.signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso, hacer algo si es necesario
                console.log('Inicio de sesión exitoso', userCredential.user.uid);

                // Redirigir a la página deseada
                window.location.href = '../PaginaPrincipal/PaginaPrincipal.html';
            })
            .catch((error) => {
                // Error al iniciar sesión, manejar como desees
                console.log('Error al iniciar sesión:', error.code, error.message);
                if (error.code === 'auth/user-not-found') {
                    // Usuario no existe, intentar crear uno nuevo
                    auth.createUserWithEmailAndPassword(username, password)
                        .then((userCredential) => {
                            console.log('Usuario creado exitosamente', userCredential.user.uid);
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