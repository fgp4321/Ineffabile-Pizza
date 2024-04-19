document.addEventListener("DOMContentLoaded", function() {
    var cookiePopup = document.getElementById("cookie-popup");
    var acceptButton = document.getElementById("accept-cookies");
    var rejectButton = document.getElementById("reject-cookies");

    // Mostrar el pop-up solo si la cookie 'cookies-accepted' no está establecida
    if (!getCookie("cookies-accepted")) {
        cookiePopup.style.display = "block";
    }

    // Manejar clic en el botón 'Aceptar'
    acceptButton.addEventListener("click", function() {
        setCookie("cookies-accepted", "true", 365); // Establecer la cookie por un año
        cookiePopup.style.display = "none";
    });

    // Manejar clic en el botón 'No aceptar'
    rejectButton.addEventListener("click", function() {
        cookiePopup.style.display = "none";
    });

    // Función para obtener el valor de una cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
        }
        return null;
    }

    // Función para establecer una cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
});
