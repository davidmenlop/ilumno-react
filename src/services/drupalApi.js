export const fetchDrupalData = async () => {
    try {
      const response = await fetch('/api/formulario');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Retornar los datos obtenidos
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-lanzar el error para manejarlo en el lugar que llame a fetchData
    }
  };
  

  
  

  
  