const apiURL = "https://SECRET.mockapi.io/users";
const listaRegistros = document.getElementById("listaRegistros"); // El elemento donde mostrarás los registros

// Función para cargar la lista de registros desde el servidor
function cargarRegistros() {
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      listaRegistros.innerHTML = "";

      // Muestra los registros en la interfaz
      data.forEach((registro) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${registro.id}, Nombre: ${registro.name}, Apellido: ${registro.lastname}`;
        listaRegistros.appendChild(listItem);
      });
    })
    .catch((error) => alert("Error al cargar registros: " + error));
}

// Función para buscar un registro por ID
function buscarRegistroPorID(id) {
  fetch(`${apiURL}/${id}`)
    .then((response) => response.json())
    .then((data) => {
    })
    .catch((error) => alert("Error al buscar registro por ID: " + error));
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
    .catch((error) => alert("Error al agregar registro: " + error));
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
    })
    .catch((error) => alert("Error al modificar registro por ID: " + error));
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
    .catch((error) => alert("Error al eliminar registro por ID: " + error));
}

// Evento al hacer clic en el botón de búsqueda
document.getElementById("buscarBtn").addEventListener("click", () => {
  const id = document.getElementById("idInput").value;
  if (id) {
    buscarRegistroPorID(id);
  } else {
    cargarRegistros();
  }
});

// Evento al hacer clic en el botón de agregar
document.getElementById("agregarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("nombreInput").value;
  const apellido = document.getElementById("apellidoInput").value;
  if (nombre && apellido) {
    agregarRegistro(nombre, apellido);
  } else {
    alert("Por favor, complete los campos de nombre y apellido.");
  }
});

// Evento al hacer clic en el botón de modificar
document.getElementById("modificarBtn").addEventListener("click", () => {
  const id = document.getElementById("idInput").value;
  const nombre = document.getElementById("nombreInput").value;
  const apellido = document.getElementById("apellidoInput").value;
  if (id && nombre && apellido) {
    modificarRegistroPorID(id, nombre, apellido);
  } else {
    alert("Por favor, complete todos los campos.");
  }
});

// Evento al hacer clic en el botón de borrar
document.getElementById("borrarBtn").addEventListener("click", () => {
  const id = document.getElementById("idInput").value;
  if (id) {
    eliminarRegistroPorID(id);
  } else {
    alert("Por favor, ingrese el ID del registro a eliminar.");
  }
});

cargarRegistros();
