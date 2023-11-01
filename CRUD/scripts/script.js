//Seccion de Constantes Input
    const inputPostName = document.getElementById("inputPostNombre");
    const inputPostAppellido = document.getElementById("inputPostApellido");
    const inputId = document.getElementById("inputPutId");
    const inputDelete = document.getElementById("inputDelete");

    //Seccion de constantes de boton

    const boton = document.getElementById("btnPost");
    const botonID = document.getElementById("btnPut")
    const botonDelete = document.getElementById("btnDelete")
    //Seccion de Eventos oidos

    inputPostName.addEventListener("input", function() {
        // Verificamos si el valor del input está vacío
        if (inputPostName.value.trim() !== "") {
          // Si no está vacío, habilitamos el botón
          boton.removeAttribute("disabled");
        } else {
          // Si está vacío, deshabilitamos el botón
          boton.setAttribute("disabled", "true");
        }
    })
    inputPostApellido.addEventListener("input", function() {
        // Verificamos si el valor del input está vacío
        if (inputPostApellido.value.trim() !== "") {
          // Si no está vacío, habilitamos el botón
          boton.removeAttribute("disabled");
        } else {
          // Si está vacío, deshabilitamos el botón
          boton.setAttribute("disabled", "true");
        }
    })
    inputId.addEventListener("input", function() {
        // Verificamos si el valor del input está vacío
        if (inputId.value.trim() !== "") {
          // Si no está vacío, habilitamos el botón
          botonID.removeAttribute("disabled");
        } else {
          // Si está vacío, deshabilitamos el botón
          botonID.setAttribute("disabled", "true");
        }
    })
    inputDelete.addEventListener("input", function() {
        // Verificamos si el valor del input está vacío
        if (inputDelete.value.trim() !== "") {
          // Si no está vacío, habilitamos el botón
          botonDelete.removeAttribute("disabled");
        } else {
          // Si está vacío, deshabilitamos el botón
          botonDelete.setAttribute("disabled", "true");
        }
    })
 