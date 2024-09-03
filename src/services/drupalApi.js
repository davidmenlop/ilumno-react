export const fetchDrupalData = async () => {
  try {
    // Realiza la solicitud al endpoint de Drupal
    const response = await fetch('http://localhost:8080/API/formulario');

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
    }

    // Convierte la respuesta a JSON
    const data = await response.json(); // Leer el cuerpo de la respuesta una vez
    console.log('Data:', data); // Registrar los datos para verificación

    return data; // Retorna los datos obtenidos
  } catch (error) {
    console.error('Error fetching data from Drupal:', error);
    throw error; // Re-lanzar el error para manejarlo en el lugar que llama a fetchDrupalData
  }
};



  

  
  

  
  