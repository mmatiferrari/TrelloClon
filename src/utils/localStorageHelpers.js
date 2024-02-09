// Función para cargar datos del localStorage
export const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  // Función para guardar datos en el localStorage
  export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  