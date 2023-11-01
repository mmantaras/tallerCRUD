// MODIFICAR
function modificarRegistroPorId(id, newData) {
    fetch(`https://SECRET.mockapi.io/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json(); 
        } else {
          throw new Error('No se pudo modificar el registro.');
        }
      })
      .then((data) => {
        console.log('Registro modificado:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  const newData = {
    name: 'Nuevo Nombre',
    lastname: 'Nuevo Apellido',
  };
  
  const registroAActualizar = registros.find((registro) => registro.id === idAActualizar);
  
  if (registroAActualizar) {
    actualizarRegistroPorId(idAActualizar, newData);
  } else {
    console.log(`No se encontró un registro con el ID ${idAActualizar}`);
  }

//BORRAR
function eliminarRegistroPorId(id) {
    fetch(`https://SECRET.mockapi.io/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('No se pudo eliminar el registro.');
        }
      })
      .then((data) => {
        console.log('Registro eliminado:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }