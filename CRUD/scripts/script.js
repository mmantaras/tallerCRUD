inputPostNombre.addEventListener("input", function() {
    // Verificamos si el valor del input está vacío
    if (inputPostNombre.value.trim() !== "") {
      // Si no está vacío, habilitamos el botón
      btnPost.removeAttribute("disabled");
    } else {
      // Si está vacío, deshabilitamos el botón
      btnPost.setAttribute("disabled", "true");
    }
})
inputPostApellido.addEventListener("input", function() {
    // Verificamos si el valor del input está vacío
    if (inputPostApellido.value.trim() !== "") {
      // Si no está vacío, habilitamos el botón
      btnPost.removeAttribute("disabled");
    } else {
      // Si está vacío, deshabilitamos el botón
      btnPost.setAttribute("disabled", "true");
    }
})
inputPutId.addEventListener("input", function() {
    // Verificamos si el valor del input está vacío
    if (inputPutId.value.trim() !== "") {
      // Si no está vacío, habilitamos el botón
      btnPut.removeAttribute("disabled");
    } else {
      // Si está vacío, deshabilitamos el botón
      btnPut.setAttribute("disabled", "true");
    }
})
inputDelete.addEventListener("input", function() {
    // Verificamos si el valor del input está vacío
    if (inputDelete.value.trim() !== "") {
      // Si no está vacío, habilitamos el botón
      btnDelete.removeAttribute("disabled");
    } else {
      // Si está vacío, deshabilitamos el botón
      btnDelete.setAttribute("disabled", "true");
    }
})
