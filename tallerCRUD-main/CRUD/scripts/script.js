const apiURL = "https://65423580f0b8287df1ffb219.mockapi.io/users";
const inputGet1Id = document.getElementById("inputGet1Id");
const btnGet1 = document.getElementById("btnGet1");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const btnPost = document.getElementById("btnPost");
const inputPutId = document.getElementById("inputPutId");
const btnPut = document.getElementById("btnPut");
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");
const alertError = document.getElementById("alert-error");
const results = document.getElementById("results");

// Función para mostrar una alerta de error
function showErrorAlert(message) {
  alertError.textContent = message;
  alertError.classList.add("show");
  setTimeout(() => {
    alertError.classList.remove("show");
  }, 3000);
}

// Función para obtener la lista de registros
function getList() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      // Mostrar la lista de registros en el elemento "results"
      results.innerHTML = data.map((record) => `<li>${record.name} ${record.lastname}</li>`).join("");
    })
    .catch((error) => {
      showErrorAlert("Error al obtener la lista de registros.");
    });
}

// Función para buscar un registro por ID
btnGet1.addEventListener("click", () => {
  const id = inputGet1Id.value;
  if (id) {
    fetch(`${apiURL}/${id}`)
      .then((response) => response.json())
      .then((record) => {
        // Mostrar el registro en el elemento "results"
        results.innerHTML = `<li>${record.name} ${record.lastname}</li>`;
      })
      .catch((error) => {
        showErrorAlert("Registro no encontrado.");
      });
  } else {
    getList(); // Mostrar la lista completa si no se proporciona un ID
  }
});

// Función para agregar un nuevo registro
btnPost.addEventListener("click", () => {
  const nombre = inputPostNombre.value;
  const apellido = inputPostApellido.value;
  if (nombre && apellido) {
    const data = {
      name: nombre,
      lastname: apellido,
    };

    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        inputPostNombre.value = "";
        inputPostApellido.value = "";
        getList(); // Actualizar la lista de registros después de agregar uno nuevo
      })
      .catch((error) => {
        showErrorAlert("Error al agregar el registro.");
      });
  } else {
    showErrorAlert("Por favor, complete los campos nombre y apellido.");
  }
});

// Función para abrir el modal de edición de registro
btnPut.addEventListener("click", () => {
  const id = inputPutId.value;
  if (id) {
    fetch(`${apiURL}/${id}`)
      .then((response) => response.json())
      .then((record) => {
        // Llenar los campos del modal con los valores actuales del registro
        document.getElementById("inputPutNombre").value = record.name;
        document.getElementById("inputPutApellido").value = record.lastname;
        // Habilitar el botón para guardar cambios
        btnSendChanges.disabled = false;
        // Mostrar el modal
        new bootstrap.Modal(document.getElementById("dataModal")).show();
      })
      .catch((error) => {
        showErrorAlert("Registro no encontrado.");
      });
  } else {
    showErrorAlert("Por favor, ingrese un ID para modificar el registro.");
  }
});

// Función para guardar los cambios en un registro
btnSendChanges.addEventListener("click", () => {
  const id = inputPutId.value;
  const nombre = document.getElementById("inputPutNombre").value;
  const apellido = document.getElementById("inputPutApellido").value;
  if (id && nombre && apellido) {
    const data = {
      name: nombre,
      lastname: apellido,
    };

    fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        // Cerrar el modal
        new bootstrap.Modal(document.getElementById("dataModal")).hide();
        // Deshabilitar el botón para guardar cambios
        btnSendChanges.disabled = true;
        getList(); // Actualizar la lista de registros después de la modificación
      })
      .catch((error) => {
        showErrorAlert("Error al modificar el registro.");
      });
  } else {
    showErrorAlert("Por favor, complete los campos ID, nombre y apellido.");
  }
});

// Función para eliminar un registro
btnDelete.addEventListener("click", () => {
  const id = inputDelete.value;
  if (id) {
    fetch(`${apiURL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        inputDelete.value = "";
        getList(); // Actualizar la lista de registros después de eliminar uno
      })
      .catch((error) => {
        showErrorAlert("Error al eliminar el registro.");
      });
  } else {
    showErrorAlert("Por favor, ingrese un ID para eliminar el registro.");
  }
});

// Agregar manejadores de eventos para deshabilitar botones cuando los campos estén vacíos
inputPostNombre.addEventListener("input", () => {
  btnPost.disabled = !inputPostNombre.value || !inputPostApellido.value;
});
inputPostApellido.addEventListener("input", () => {
  btnPost.disabled = !inputPostNombre.value || !inputPostApellido.value;
});
inputPutId.addEventListener("input", () => {
  btnPut.disabled = !inputPutId.value;
});
inputDelete.addEventListener("input", () => {
  btnDelete.disabled = !inputDelete.value;
});

// Cargar la lista de registros al cargar la página
getList();
