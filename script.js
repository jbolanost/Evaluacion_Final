// script.js

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('loggedIn'); // Eliminar el estado de sesión
    alert("Has cerrado sesión.");
    window.location.href = "../index.html"; // Redirigir a la página de inicio
}

// Función para verificar el estado de inicio de sesión
function checkLoginStatus() {
    const loggedIn = sessionStorage.getItem('loggedIn');

    // Bloquear acceso a los cursos si no está logueado
    if (loggedIn !== 'true') {
        document.querySelectorAll('.course-link').forEach(link => {
            link.onclick = function(event) {
                event.preventDefault();
                alert('Por favor, inicie sesión para acceder a los cursos.');
            };
        });
    } else {
        // Cambiar el texto del botón de login a logout si está logueado
        document.getElementById('loginBtn').innerText = 'Logout';
    }
}

// Ejecutar la verificación de inicio de sesión al cargar la página
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// Manejo del clic en el botón de login/logout
document.getElementById('loginBtn').onclick = function() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        logout();
    } else {
        document.getElementById('loginModal').style.display = 'block'; // Mostrar modal de login
    }
};

// Manejo del cierre del modal de login
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('loginModal').style.display = 'none';
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
};

// Manejo del envío del formulario de login
document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'alumno' && password === '2024') {
        sessionStorage.setItem('loggedIn', 'true');
        alert('Inicio de sesión exitoso');
        document.getElementById('loginModal').style.display = 'none';
        window.location.reload(); // Recargar la página para aplicar cambios
    } else {
        alert('Usuario o contraseña incorrectos');
    }
};