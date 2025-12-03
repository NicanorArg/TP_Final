const API_URL = 'http://localhost:3000/api';

export const getProductos = async (page = 1, limit = 10, tipo = "") => {
  try {
    let url = `${API_URL}/productos?page=${page}&limit=${limit}&activo=true`;

    if (tipo) {
      url += `&tipo=${tipo}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al cargar productos');

    return await response.json();
  } catch (error) {
    
    console.error('Error:', error);
    throw error;
  }
};

export const getproductoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    if (!response.ok) throw new Error('Error al cargar producto');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const crearVenta = async (ventaData) => {
    console.log('crearVenta called with:', ventaData);
  try {
    const response = await fetch(`${API_URL}/ventas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventaData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la venta');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};