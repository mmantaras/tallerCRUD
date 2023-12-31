
const apiURL = "https://65423580f0b8287df1ffb219.mockapi.io/users";
const listaRegistros = document.getElementById("results");
const inputGet1Id = document.getElementById("inputGet1Id");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const inputPutId = document.getElementById("inputPutId");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const inputDelete = document.getElementById("inputDelete");
const btnGet1 = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDelete = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");
const alertError = document.getElementById("alert-error");
const dataModal = document.getElementById("dataModal");

// Mantén una referencia a la lista original de registros
let registrosOriginales = [];

// Función para cargar la lista de registros desde el servidor
function cargarRegistros() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      registrosOriginales = data; // Actualiza la lista original de registros

      listaRegistros.innerHTML = "";

      data.forEach((registro) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
        listaRegistros.appendChild(listItem);
      });
    })
    .catch((error) => alertError.style.display = "block");
}

// Función para buscar un registro por ID
function buscarRegistroPorID(id) {
  // Filtra la lista de registros originales para mostrar solo el registro correspondiente
  const registroEncontrado = registrosOriginales.find((registro) => registro.id == id);
  listaRegistros.innerHTML = "";

  if (registroEncontrado) {
    const listItem = document.createElement("li");
    listItem.textContent = `ID: ${registroEncontrado.id}, Nombre: ${registroEncontrado.name}, Apellido: ${registroEncontrado.lastname}`;
    listaRegistros.appendChild(listItem);
  } else {
    alert("No se encontró un registro con ese ID.");
  }
}



// Función para agregar un registro
function agregarRegistro(nombre, apellido) {
  const nuevoRegistro = {
    name: nombre,
    lastname: apellido,
  };

  fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoRegistro),
  })
    .then((response) => response.json())
    .then((data) => {
      cargarRegistros();
    })
    .catch((error) => alertError.style.display = "block");
}

// Función para modificar un registro por ID
function modificarRegistroPorID(id, nombre, apellido) {
  const registroModificado = {
    name: nombre,
    lastname: apellido,
  };

  fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registroModificado),
  })
    .then((response) => response.json())
    .then((data) => {
      cargarRegistros();
      dataModal.style.display = "none";
    })
    .catch((error) => alertError.style.display = "block");
}

// Función para eliminar un registro por ID
function eliminarRegistroPorID(id) {
  fetch(`${apiURL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        cargarRegistros();
      } else {
        alert("No se pudo eliminar el registro.");
      }
    })
    .catch((error) => alertError.style.display = "block");
}

// Evento al hacer clic en el botón de búsqueda
btnGet1.addEventListener("click", () => {
  const id = inputGet1Id.value;
  if (id) {
    buscarRegistroPorID(id);
  } else {
    cargarRegistros();
  }
});

// Carga inicial de registros
cargarRegistros();

// Evento al hacer clic en el botón de agregar
btnPost.addEventListener("click", () => {
  const nombre = inputPostNombre.value;
  const apellido = inputPostApellido.value;
  if (nombre && apellido) {
    agregarRegistro(nombre, apellido);
  } else {
    alert("Por favor, complete los campos de nombre y apellido.");
  }
});

// Evento al hacer clic en el botón de modificar
btnPut.addEventListener("click", () => {
  const id = inputPutId.value;
  if (id) {
    const registroEncontrado = registrosOriginales.find((registro) => registro.id == id);
    if (registroEncontrado) {
      // Llenar los campos del modal con los datos del registro
      inputPutNombre.value = registroEncontrado.name;
      inputPutApellido.value = registroEncontrado.lastname;
      // Habilitar el botón de "Guardar" en el modal
      btnSendChanges.disabled = false;
      // Mostrar el modal
      $('#dataModal').modal('show'); // Utiliza jQuery para abrir el modal
    } else {
      alert("No se encontró un registro con ese ID.");
    }
  } else {
    alert("Por favor, complete el campo 'ID del registro a modificar'.");
  }
});

// Evento al hacer clic en el botón de borrar
btnDelete.addEventListener("click", () => {
  const id = inputDelete.value;
  if (id) {
    eliminarRegistroPorID(id);
  } else {
    alert("Por favor, ingrese el ID del registro a eliminar.");
  }
});
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

// Otros eventos y funciones pueden agregarse aquí
// Evento al hacer clic en el botón "Guardar" dentro del modal
btnSendChanges.addEventListener("click", () => {
  const id = inputPutId.value;
  const nombre = inputPutNombre.value;
  const apellido = inputPutApellido.value;
  if (id && nombre && apellido) {
    modificarRegistroEnModal(id, nombre, apellido);
  } else {
    alert("Por favor, complete todos los campos.");
  }
});

// Función para modificar un registro por ID desde el modal
function modificarRegistroEnModal(id, nombre, apellido) {
  const registroModificado = {
    name: nombre,
    lastname: apellido,
  };

  fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registroModificado),
  })
    .then((response) => response.json())
    .then((data) => {
      cargarRegistros();
      $('#dataModal').modal('hide'); // Cierra el modal después de guardar
    })
    .catch((error) => alertError.style.display = "block");
}

