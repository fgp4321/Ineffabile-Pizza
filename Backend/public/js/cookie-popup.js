document.addEventListener("DOMContentLoaded", function() {
    var cookiePopup = document.getElementById("cookie-popup");
    var acceptButton = document.getElementById("accept-cookies");
    var rejectButton = document.getElementById("reject-cookies");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Mostrar el pop-up solo si la cookie 'functional-cookie' no está establecida como 'true'
    if (getCookie("functional-cookie") !== "true") {
        cookiePopup.style.display = "block";
    }

    acceptButton.addEventListener("click", function() {
        // Establecer las cookies según las selecciones del usuario
        checkboxes.forEach(function(checkbox) {
            setCookie(checkbox.name + "-cookie", checkbox.checked ? "true" : "false", 365);
        });
        cookiePopup.style.display = "none";
    });

    rejectButton.addEventListener("click", function() {
        // Establecer todas las cookies como 'false' excepto las funcionales que deben ser 'true'
        checkboxes.forEach(function(checkbox) {
            if (checkbox.name === "functional") {
                setCookie("functional-cookie", "true", 365); // La cookie funcional no se puede rechazar
            } else {
                setCookie(checkbox.name + "-cookie", "false", 365);
            }
        });
        cookiePopup.style.display = "none";
    });

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

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