document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        if (username === "admin" && password === "1234") {
          sessionStorage.setItem("loggedIn", "true");
          window.location.href = "../reportes.html";
        } else {
          document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos";
        }
      });
    }
  
    // Validar si el usuario está autenticado en reportes.html
    if (window.location.pathname.includes("reportes.html")) {
      if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
      }
    }
  });